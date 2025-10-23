# 🚀 Quick Start - Integração YouTube

Guia rápido para começar a usar a integração com YouTube em 5 minutos.

## ⚡ Setup Rápido

### 1. Obter API Key (2 minutos)

1. Acesse: [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto ou selecione existente
3. Habilite "YouTube Data API v3"
4. Crie uma API Key em "Credentials"
5. Copie a key

### 2. Configurar no Projeto (1 minuto)

```bash
# Adicione ao .env.local
NEXT_PUBLIC_YOUTUBE_API_KEY=sua_api_key_aqui
```

### 3. Testar (2 minutos)

```bash
# Reinicie o servidor
npm run dev

# Acesse
http://localhost:3000/admin/youtube
```

## 🎯 Usar a Integração

### Opção 1: Buscar Vídeos

1. Clique em "Abrir Busca do YouTube"
2. Digite termo de busca (ex: "implantodontia")
3. Clique nos vídeos para selecioná-los
4. Veja vídeos selecionados na lista

### Opção 2: Adicionar por URL

1. Copie URL do YouTube
2. Cole no campo "Adicionar por URL"
3. Clique no botão "+"
4. Vídeo aparece na lista

### Finalizar

1. Revise os vídeos selecionados
2. Clique em "Adicionar ao Curso"
3. Pronto! ✅

## 🎮 Usar o Player

```tsx
import { YouTubePlayer } from '@/components/youtube/YouTubePlayer';

<YouTubePlayer videoId="dQw4w9WgXcQ" />
```

## 📚 Exemplos Prontos

### Buscar e Exibir

```tsx
'use client';

import { useState } from 'react';
import { searchYouTubeVideos } from '@/lib/youtube';

export default function MyPage() {
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    const result = await searchYouTubeVideos('tutorial');
    setVideos(result.videos);
  };

  return (
    <div>
      <button onClick={handleSearch}>Buscar</button>
      {videos.map(video => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <img src={video.thumbnail} alt={video.title} />
        </div>
      ))}
    </div>
  );
}
```

### Player com Progresso

```tsx
import { YouTubePlayer } from '@/components/youtube/YouTubePlayer';

<YouTubePlayer
  videoId="VIDEO_ID"
  onProgress={(seconds) => {
    // Salvar progresso no banco
    console.log('Progresso:', seconds);
  }}
  onComplete={() => {
    // Marcar como concluído
    alert('Parabéns! Aula concluída');
  }}
/>
```

## 🐛 Problemas Comuns

### Não encontra vídeos?
- ✅ Verifique se API key está no `.env.local`
- ✅ Reinicie o servidor (`npm run dev`)

### Player não aparece?
- ✅ Aguarde carregar (API do YouTube demora ~2s)
- ✅ Verifique console do navegador

### Quota excedida?
- ✅ Aguarde reset diário (meia-noite PST)
- ✅ Use menos buscas

## 📖 Documentação Completa

Para mais detalhes, veja: `docs/YOUTUBE_INTEGRATION.md`

## 🎉 Pronto!

Você agora tem:
- ✅ Busca de vídeos do YouTube
- ✅ Player customizado
- ✅ Tracking de progresso
- ✅ Interface admin completa

---

**Dica:** Adicione vídeos educacionais de canais autorizados para enriquecer seus cursos!

