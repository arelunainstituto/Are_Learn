# 📺 Integração com YouTube - AreLuna

Guia completo para integração da plataforma AreLuna com o YouTube.

## 🎯 Visão Geral

A integração com YouTube permite:
- ✅ Buscar vídeos diretamente no YouTube
- ✅ Adicionar vídeos por URL
- ✅ Player customizado com controles próprios
- ✅ Tracking de progresso
- ✅ Buscar playlists e canais
- ✅ Importar vídeos em lote

## 🔑 Configuração da API Key

### 1. Criar Projeto no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Nome sugerido: "AreLuna YouTube Integration"

### 2. Ativar YouTube Data API v3

1. No menu lateral, vá para **APIs & Services** > **Library**
2. Busque por "YouTube Data API v3"
3. Clique em **Enable**

### 3. Criar Credenciais

1. Vá para **APIs & Services** > **Credentials**
2. Clique em **Create Credentials** > **API Key**
3. Copie a API Key gerada
4. **(Opcional)** Clique em "Restrict Key" para adicionar restrições:
   - **Application restrictions**: HTTP referrers
   - **API restrictions**: YouTube Data API v3

### 4. Configurar no Projeto

Adicione ao arquivo `.env.local`:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=sua_api_key_aqui
```

## 📦 Funcionalidades

### 1. Buscar Vídeos

```typescript
import { searchYouTubeVideos } from '@/lib/youtube';

const result = await searchYouTubeVideos('implantodontia', 10);

console.log(result.videos); // Array de vídeos
console.log(result.nextPageToken); // Para paginação
```

### 2. Buscar Vídeo por ID

```typescript
import { getYouTubeVideo } from '@/lib/youtube';

const video = await getYouTubeVideo('dQw4w9WgXcQ');
console.log(video.title, video.duration, video.viewCount);
```

### 3. Extrair ID de URL

```typescript
import { extractYouTubeVideoId } from '@/lib/youtube';

const id = extractYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
console.log(id); // 'dQw4w9WgXcQ'
```

### 4. Buscar Playlists

```typescript
import { getChannelPlaylists } from '@/lib/youtube';

const playlists = await getChannelPlaylists('UCxxxxxx');
```

### 5. Vídeos de uma Playlist

```typescript
import { getPlaylistVideos } from '@/lib/youtube';

const videos = await getPlaylistVideos('PLxxxxxx');
```

## 🎮 Componentes

### YouTubePlayer

Player customizado com controles próprios:

```tsx
import { YouTubePlayer } from '@/components/youtube/YouTubePlayer';

<YouTubePlayer
  videoId="dQw4w9WgXcQ"
  onProgress={(seconds) => console.log('Progresso:', seconds)}
  onComplete={() => console.log('Vídeo completo')}
  initialTime={30}
  autoplay={false}
/>
```

**Props:**
- `videoId` (string, required): ID do vídeo do YouTube
- `onProgress` (function, optional): Callback com progresso em segundos
- `onComplete` (function, optional): Callback quando vídeo termina
- `initialTime` (number, optional): Tempo inicial em segundos
- `autoplay` (boolean, optional): Reproduzir automaticamente

### YouTubeSearchModal

Modal para buscar e selecionar vídeos:

```tsx
import { YouTubeSearchModal } from '@/components/youtube/YouTubeSearchModal';

const [isOpen, setIsOpen] = useState(false);

<YouTubeSearchModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSelect={(video) => {
    console.log('Vídeo selecionado:', video);
  }}
/>
```

## 🔧 Uso no Admin

### Página de Integração

Acesse: `/admin/youtube`

**Funcionalidades:**
1. **Adicionar por URL**: Cole o link do YouTube
2. **Buscar**: Use o modal de busca
3. **Gerenciar**: Veja vídeos selecionados
4. **Adicionar ao Curso**: Salve os vídeos

### Fluxo de Trabalho

```
1. Admin acessa /admin/youtube
2. Busca vídeos ou cola URLs
3. Revisa vídeos selecionados
4. Clica em "Adicionar ao Curso"
5. Vídeos são salvos como aulas
```

## 📊 Estrutura de Dados

### YouTubeVideo

```typescript
interface YouTubeVideo {
  id: string;                 // ID do vídeo
  title: string;              // Título
  description: string;        // Descrição
  thumbnail: string;          // URL da thumbnail
  duration: number;           // Duração em segundos
  channelTitle: string;       // Nome do canal
  channelId: string;          // ID do canal
  publishedAt: string;        // Data de publicação
  viewCount: number;          // Número de visualizações
  likeCount: number;          // Número de likes
  tags: string[];             // Tags do vídeo
}
```

## 🎨 Customização

### Cores do Player

Edite `YouTubePlayer.tsx`:

```typescript
// Mudar cor do botão play
className="bg-red-600 hover:bg-red-700"

// Mudar cor da barra de progresso
style={{
  background: `linear-gradient(to right, #ff0000 ...)`
}}
```

### Thumbnails

Obter diferentes qualidades:

```typescript
import { getYouTubeThumbnail } from '@/lib/youtube';

const thumb = getYouTubeThumbnail('VIDEO_ID', 'maxres');
// Opções: 'default', 'medium', 'high', 'maxres'
```

## 💡 Boas Práticas

### 1. Cache de Resultados

```typescript
// Implementar cache para reduzir chamadas à API
const cache = new Map();

async function searchWithCache(query: string) {
  if (cache.has(query)) {
    return cache.get(query);
  }
  
  const result = await searchYouTubeVideos(query);
  cache.set(query, result);
  return result;
}
```

### 2. Rate Limiting

YouTube API tem limites:
- **10,000 unidades/dia** (plano gratuito)
- Busca = 100 unidades
- Detalhes de vídeo = 1 unidade

**Dica:** Use paginação e cache agressivamente.

### 3. Validação de Vídeos

```typescript
// Verificar se vídeo ainda existe
try {
  await getYouTubeVideo(videoId);
} catch (error) {
  console.error('Vídeo não encontrado ou privado');
}
```

## 🚨 Limitações

1. **Vídeos Privados**: Não podem ser acessados
2. **Vídeos Incorporados Desabilitados**: Alguns criadores desabilitam
3. **Conteúdo com Restrição de Idade**: Requer autenticação
4. **Rate Limits**: Quota diária de 10,000 unidades

## 📈 Monitoramento

### Ver Uso da Quota

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Vá para **APIs & Services** > **Dashboard**
3. Selecione "YouTube Data API v3"
4. Veja gráficos de uso

### Aumentar Quota

Para produção, solicite aumento:
1. **APIs & Services** > **Quotas**
2. Selecione YouTube Data API v3
3. Clique em "Request quota increase"

## 🐛 Troubleshooting

### Erro: "API Key inválida"

- ✅ Verifique se a key está correta no `.env.local`
- ✅ Confirme que YouTube Data API v3 está habilitada
- ✅ Reinicie o servidor de desenvolvimento

### Erro: "Quota excedida"

- ✅ Aguarde o reset (meia-noite PST)
- ✅ Implemente cache
- ✅ Solicite aumento de quota

### Vídeo não carrega

- ✅ Verifique se vídeo é público
- ✅ Confirme que embedding está permitido
- ✅ Tente outro vídeo

### Player não aparece

- ✅ Verifique console do navegador
- ✅ Confirme que videoId está correto
- ✅ Teste com vídeo conhecido funcional

## 🔗 Recursos

- [YouTube Data API v3 Docs](https://developers.google.com/youtube/v3)
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)
- [Google Cloud Console](https://console.cloud.google.com)
- [Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost)

## 📝 Exemplo Completo

```tsx
'use client';

import { useState } from 'react';
import { YouTubePlayer } from '@/components/youtube/YouTubePlayer';
import { YouTubeSearchModal } from '@/components/youtube/YouTubeSearchModal';
import { Button } from '@/components/ui/Button';
import type { YouTubeVideo } from '@/lib/youtube';

export default function MyCourse() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>
        Buscar Vídeo no YouTube
      </Button>

      {selectedVideo && (
        <div className="mt-4">
          <h2>{selectedVideo.title}</h2>
          <YouTubePlayer
            videoId={selectedVideo.id}
            onProgress={(s) => console.log('Progresso:', s)}
            onComplete={() => alert('Vídeo completo!')}
          />
        </div>
      )}

      <YouTubeSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(video) => {
          setSelectedVideo(video);
          setShowModal(false);
        }}
      />
    </div>
  );
}
```

## 🎉 Pronto!

A integração com YouTube está completa. Aproveite para criar cursos incríveis com conteúdo do YouTube!

---

**Dúvidas?** Abra uma issue no GitHub ou consulte a documentação oficial do YouTube.

