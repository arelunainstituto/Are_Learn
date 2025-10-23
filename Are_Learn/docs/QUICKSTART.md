# 🚀 Quick Start - AreLuna

Guia rápido para começar a desenvolver na plataforma AreLuna em 5 minutos.

## ⚡ Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/areluna-platform.git
cd areluna-platform

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas credenciais

# 4. Inicie o servidor
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🗄️ Setup do Banco (5 minutos)

1. **Crie conta no Supabase**: [app.supabase.com](https://app.supabase.com)
2. **Crie novo projeto** (aguarde 2-3 min)
3. **Execute o schema**:
   - SQL Editor → Cole `supabase/schema.sql` → Run
4. **Copie as credenciais**:
   - Settings → API → Copie URL e keys para `.env.local`

## 📁 Estrutura Básica

```
src/
├── app/              # Páginas (Next.js App Router)
│   ├── page.tsx      # Homepage
│   ├── cursos/       # Páginas de cursos
│   ├── dashboard/    # Dashboard do usuário
│   └── admin/        # Painel admin
├── components/       # Componentes React
│   ├── ui/           # Componentes base
│   ├── curso/        # Componentes de curso
│   └── layout/       # Header, Footer, etc
├── lib/              # Utilitários
│   ├── supabase.ts   # Cliente Supabase
│   └── utils.ts      # Funções úteis
└── types/            # Tipos TypeScript
```

## 🎨 Criar um Novo Componente

```typescript
// src/components/MeuComponente.tsx
import { Card } from '@/components/ui/Card';

interface MeuComponenteProps {
  titulo: string;
}

export function MeuComponente({ titulo }: MeuComponenteProps) {
  return (
    <Card>
      <h2 className="text-2xl font-bold">{titulo}</h2>
    </Card>
  );
}
```

## 📄 Criar uma Nova Página

```typescript
// src/app/minha-pagina/page.tsx
export default function MinhaPagina() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-display font-bold">
        Minha Página
      </h1>
    </div>
  );
}
```

## 🗃️ Consultar o Banco

```typescript
import { supabase } from '@/lib/supabase';

// Listar cursos
const { data: cursos } = await supabase
  .from('cursos')
  .select('*')
  .eq('publicado', true);

// Buscar por ID
const { data: curso } = await supabase
  .from('cursos')
  .select('*, categoria:categorias(*)')
  .eq('id', cursoId)
  .single();

// Inserir
const { data, error } = await supabase
  .from('cursos')
  .insert({
    titulo: 'Novo Curso',
    descricao: 'Descrição...',
    // ...
  });
```

## 🎯 Tarefas Comuns

### Adicionar Nova Categoria

```sql
-- No Supabase SQL Editor
INSERT INTO categorias (nome, slug, descricao, cor)
VALUES ('Minha Categoria', 'minha-categoria', 'Descrição', '#FF0000');
```

### Criar Novo Curso (via Admin)

1. Acesse `/admin/cursos`
2. Clique em "Novo Curso"
3. Preencha os dados
4. Adicione módulos e aulas

### Customizar Cores

```typescript
// tailwind.config.ts
primary: {
  600: '#sua-cor',
  700: '#sua-cor-escura',
}
```

## 🔧 Scripts Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm run start

# Verificar erros
npm run lint
npm run type-check

# Formatar código
npm run format
```

## 🐛 Solução de Problemas

### Erro de conexão com Supabase
- Verifique se as variáveis em `.env.local` estão corretas
- Confirme que o schema foi executado

### Componentes não aparecem
- Verifique se o import está correto: `@/components/...`
- Rode `npm run build` para verificar erros de build

### Erros de TypeScript
- Execute `npm run type-check`
- Verifique se todos os tipos estão definidos

## 📚 Recursos

- **Documentação Completa**: `README.md`
- **API**: `docs/API.md`
- **Deploy**: `docs/DEPLOYMENT.md`
- **Schema do Banco**: `supabase/README.md`

## 💡 Próximos Passos

1. Explore a homepage: `http://localhost:3000`
2. Acesse o admin: `http://localhost:3000/admin`
3. Veja a área B2B: `http://localhost:3000/corporativo`
4. Customize os componentes em `src/components/ui`
5. Adicione seus próprios cursos no banco

## 🆘 Ajuda

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/areluna/issues)
- **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/areluna/discussions)
- **Email**: dev@areluna.com.br

---

**Bem-vindo à plataforma AreLuna! 🎉**

Continue lendo a documentação completa no `README.md` para recursos avançados.

