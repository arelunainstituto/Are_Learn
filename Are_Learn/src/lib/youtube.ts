// Integração com YouTube API v3
// Documentação: https://developers.google.com/youtube/v3

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // em segundos
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  tags: string[];
}

export interface YouTubeSearchResult {
  videos: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  totalResults: number;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  channelTitle: string;
}

/**
 * Converte duração ISO 8601 do YouTube para segundos
 * Exemplo: "PT4M13S" -> 253 segundos
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Busca vídeos no YouTube
 */
export async function searchYouTubeVideos(
  query: string,
  maxResults: number = 10,
  pageToken?: string
): Promise<YouTubeSearchResult> {
  try {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: maxResults.toString(),
      key: YOUTUBE_API_KEY!,
      ...(pageToken && { pageToken }),
    });

    const searchResponse = await fetch(
      `${YOUTUBE_API_BASE}/search?${searchParams}`
    );
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return {
        videos: [],
        totalResults: 0,
      };
    }

    // Buscar detalhes dos vídeos (duração, estatísticas)
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const detailsParams = new URLSearchParams({
      part: 'contentDetails,statistics,snippet',
      id: videoIds,
      key: YOUTUBE_API_KEY!,
    });

    const detailsResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?${detailsParams}`
    );
    const detailsData = await detailsResponse.json();

    const videos: YouTubeVideo[] = detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      duration: parseDuration(item.contentDetails.duration),
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics.viewCount || '0'),
      likeCount: parseInt(item.statistics.likeCount || '0'),
      tags: item.snippet.tags || [],
    }));

    return {
      videos,
      nextPageToken: searchData.nextPageToken,
      prevPageToken: searchData.prevPageToken,
      totalResults: searchData.pageInfo.totalResults,
    };
  } catch (error) {
    console.error('Erro ao buscar vídeos do YouTube:', error);
    throw new Error('Falha ao buscar vídeos do YouTube');
  }
}

/**
 * Busca detalhes de um vídeo específico
 */
export async function getYouTubeVideo(videoId: string): Promise<YouTubeVideo> {
  try {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: videoId,
      key: YOUTUBE_API_KEY!,
    });

    const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params}`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error('Vídeo não encontrado');
    }

    const item = data.items[0];
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      duration: parseDuration(item.contentDetails.duration),
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics.viewCount || '0'),
      likeCount: parseInt(item.statistics.likeCount || '0'),
      tags: item.snippet.tags || [],
    };
  } catch (error) {
    console.error('Erro ao buscar vídeo:', error);
    throw new Error('Falha ao buscar vídeo do YouTube');
  }
}

/**
 * Busca playlists de um canal
 */
export async function getChannelPlaylists(
  channelId: string,
  maxResults: number = 10
): Promise<YouTubePlaylist[]> {
  try {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      channelId,
      maxResults: maxResults.toString(),
      key: YOUTUBE_API_KEY!,
    });

    const response = await fetch(`${YOUTUBE_API_BASE}/playlists?${params}`);
    const data = await response.json();

    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      itemCount: item.contentDetails.itemCount,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error('Erro ao buscar playlists:', error);
    return [];
  }
}

/**
 * Busca vídeos de uma playlist
 */
export async function getPlaylistVideos(
  playlistId: string,
  maxResults: number = 50
): Promise<YouTubeVideo[]> {
  try {
    const params = new URLSearchParams({
      part: 'snippet',
      playlistId,
      maxResults: maxResults.toString(),
      key: YOUTUBE_API_KEY!,
    });

    const response = await fetch(`${YOUTUBE_API_BASE}/playlistItems?${params}`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Buscar detalhes dos vídeos
    const videoIds = data.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(',');
      
    const detailsParams = new URLSearchParams({
      part: 'contentDetails,statistics,snippet',
      id: videoIds,
      key: YOUTUBE_API_KEY!,
    });

    const detailsResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?${detailsParams}`
    );
    const detailsData = await detailsResponse.json();

    return detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      duration: parseDuration(item.contentDetails.duration),
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics.viewCount || '0'),
      likeCount: parseInt(item.statistics.likeCount || '0'),
      tags: item.snippet.tags || [],
    }));
  } catch (error) {
    console.error('Erro ao buscar vídeos da playlist:', error);
    return [];
  }
}

/**
 * Extrai ID do vídeo de uma URL do YouTube
 */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  // Se já é só o ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
}

/**
 * Gera URL de embed do YouTube
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = false): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0', // Não mostrar vídeos relacionados
    modestbranding: '1', // Minimal branding
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

/**
 * Gera URL de thumbnail do YouTube
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality === 'maxres' ? 'maxresdefault' : `${quality}default`}.jpg`;
}

