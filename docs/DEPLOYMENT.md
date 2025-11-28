# Guia de Deploy - AreLuna

Este guia cobre o processo completo de deploy da plataforma AreLuna em produção.

## 📋 Pré-requisitos

- [ ] Conta no Supabase (com projeto criado)
- [ ] Conta no Vercel (ou plataforma de hospedagem)
- [ ] Conta no Vimeo ou Mux (para vídeos)
- [ ] Domínio personalizado (opcional)

## 🗄️ Configuração do Banco de Dados

### 1. Criar Projeto no Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Crie um novo projeto
3. Aguarde a inicialização (pode levar alguns minutos)
4. Anote as credenciais:
   - URL do projeto
   - Anon key
   - Service role key

### 2. Executar o Schema

1. No Supabase Dashboard, vá para **SQL Editor**
2. Abra o arquivo `supabase/schema.sql`
3. Copie todo o conteúdo
4. Cole no editor SQL do Supabase
5. Execute o script
6. Verifique se todas as tabelas foram criadas na seção **Table Editor**

### 3. Configurar Storage

1. Vá para **Storage** no Supabase
2. Crie os seguintes buckets:
   - `thumbnails` (público)
   - `banners` (público)
   - `materiais` (privado)
   - `avatars` (público)

3. Configure as políticas de acesso:

```sql
-- Permitir leitura pública em thumbnails
CREATE POLICY "Thumbnails são públicos"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

-- Permitir upload para usuários autenticados
CREATE POLICY "Usuários podem fazer upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');
```

## 🎥 Configuração de Vídeos

### Opção 1: Vimeo

1. Crie uma conta Pro no [Vimeo](https://vimeo.com)
2. Gere um access token:
   - Vá para Developer > My Apps
   - Crie um novo app
   - Gere um token com permissões: `private`, `public`, `video_files`
3. Anote o token

### Opção 2: Mux

1. Crie conta no [Mux](https://mux.com)
2. Crie um novo environment
3. Gere um token ID e secret
4. Anote as credenciais

## 🚀 Deploy no Vercel

### 1. Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em **New Project**
4. Importe o repositório AreLuna
5. Configure o framework: **Next.js**

### 2. Configurar Variáveis de Ambiente

No painel do Vercel, adicione as seguintes variáveis:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Vídeos
NEXT_PUBLIC_VIDEO_PROVIDER=vimeo
VIMEO_ACCESS_TOKEN=seu_token_vimeo

# App
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
NEXT_PUBLIC_APP_NAME=AreLuna
```

### 3. Deploy

1. Clique em **Deploy**
2. Aguarde o build (3-5 minutos)
3. Acesse a URL fornecida para testar

## 🌐 Domínio Personalizado

### 1. Adicionar Domínio no Vercel

1. No projeto, vá para **Settings > Domains**
2. Adicione seu domínio: `www.areluna.com.br`
3. Siga as instruções para configurar DNS

### 2. Configurar DNS

No seu provedor de domínio, adicione os registros:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

### 3. Configurar SSL

O Vercel configura SSL automaticamente. Aguarde alguns minutos.

## 📧 Configuração de Email (Opcional)

Para enviar emails (notificações, convites, etc):

### Opção 1: Supabase Auth Emails

1. No Supabase, vá para **Authentication > Email Templates**
2. Configure SMTP personalizado ou use o padrão
3. Personalize os templates

### Opção 2: SendGrid ou Resend

```bash
npm install @sendgrid/mail
# ou
npm install resend
```

Adicione variável de ambiente:
```env
SENDGRID_API_KEY=sua_api_key
```

## 🔍 Configuração de Analytics

### Google Analytics

1. Crie uma propriedade no Google Analytics
2. Obtenha o ID de medição (G-XXXXXXXXXX)
3. Adicione ao código:

```typescript
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 🔐 Segurança

### 1. Configurar CORS

No Supabase:
1. Vá para **Settings > API**
2. Adicione seu domínio em **CORS allowed origins**:
   - `https://www.areluna.com.br`
   - `https://areluna.com.br`

### 2. Atualizar Políticas RLS

Revise e ajuste as políticas de Row Level Security conforme necessário:

```sql
-- Exemplo: Apenas admins podem criar cursos
CREATE POLICY "Apenas admins criam cursos"
ON cursos FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE id = auth.uid()
    AND tipo = 'admin'
  )
);
```

### 3. Rate Limiting

Configure rate limiting no Vercel:

```javascript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Implementar lógica de rate limiting
  return NextResponse.next();
}
```

## 📊 Monitoramento

### 1. Vercel Analytics

Ative no painel do Vercel:
- **Settings > Analytics** - Habilitar

### 2. Sentry (Erro Tracking)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Configure as variáveis:
```env
SENTRY_DSN=sua_dsn_aqui
```

### 3. Uptime Monitoring

Use serviços como:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)
- [Better Uptime](https://betteruptime.com)

## 🔄 CI/CD

### GitHub Actions (Opcional)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## 🧪 Testes em Produção

### Checklist

- [ ] Homepage carrega corretamente
- [ ] Busca de cursos funciona
- [ ] Player de vídeo reproduz
- [ ] Dashboard exibe dados
- [ ] Admin panel acessível
- [ ] Área corporativa funcional
- [ ] Responsivo em mobile
- [ ] Performance adequada (Lighthouse > 90)
- [ ] SSL configurado
- [ ] Redirects funcionando

## 🚨 Rollback

Se algo der errado:

1. No Vercel, vá para **Deployments**
2. Encontre o deploy anterior estável
3. Clique nos três pontos > **Promote to Production**

## 📝 Checklist Final

Antes de ir ao ar:

- [ ] Banco de dados configurado
- [ ] Variáveis de ambiente definidas
- [ ] Storage configurado
- [ ] Domínio apontando corretamente
- [ ] SSL ativo
- [ ] Analytics configurado
- [ ] Monitoramento ativo
- [ ] Backup configurado
- [ ] Documentação atualizada
- [ ] Equipe treinada

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs no Vercel: **Deployments > Logs**
2. Verifique logs do Supabase: **Logs & Analytics**
3. Consulte a documentação
4. Abra uma issue no GitHub

## 📈 Próximos Passos

Após deploy:

1. Configure backup automático do banco
2. Implemente cache (Redis/Upstash)
3. Configure CDN para assets
4. Otimize imagens (next/image já faz muito)
5. Implemente autenticação completa
6. Configure newsletters
7. Adicione chat de suporte

---

**Boa sorte com o deploy! 🚀**

