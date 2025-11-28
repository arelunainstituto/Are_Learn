# Schema do Banco de Dados - AreLuna

## Estrutura do Banco de Dados

Este diretório contém o schema completo do banco de dados Supabase para a plataforma AreLuna.

### Tabelas Principais

#### Usuários e Empresas
- `usuarios` - Dados dos usuários (alunos, instrutores, admins, corporativos)
- `instrutores` - Extensão de usuários com dados específicos de instrutores
- `empresas` - Dados de empresas B2B

#### Conteúdo
- `categorias` - Categorias de cursos
- `cursos` - Cursos disponíveis
- `modulos` - Módulos dos cursos
- `aulas` - Aulas individuais
- `materiais` - Materiais de apoio (PDFs, documentos, etc)

#### Progresso e Engajamento
- `progresso_cursos` - Progresso do usuário em cada curso
- `progresso_aulas` - Progresso do usuário em cada aula
- `conquistas` - Conquistas/badges disponíveis
- `conquistas_usuarios` - Conquistas desbloqueadas pelos usuários

#### Certificados e Trilhas
- `certificados` - Certificados emitidos
- `playlists` - Trilhas/playlists de cursos
- `playlists_cursos` - Cursos em cada playlist

### Como Aplicar o Schema

1. **Via Supabase Dashboard:**
   - Acesse seu projeto no Supabase
   - Vá para SQL Editor
   - Cole o conteúdo de `schema.sql`
   - Execute o script

2. **Via CLI do Supabase:**
   ```bash
   supabase db reset
   ```

### Views Disponíveis

- `vw_cursos_completos` - Cursos com todas as informações relacionadas
- `vw_estatisticas_empresas` - Estatísticas agregadas por empresa

### Funções Úteis

- `calcular_progresso_curso(usuario_id, curso_id)` - Calcula o percentual de progresso
- `atualizar_timestamp()` - Trigger para atualizar campos de timestamp automaticamente
- `atualizar_contador_instrutor()` - Mantém contadores de cursos atualizados

### Índices

O schema inclui índices otimizados para queries comuns:
- Buscas por email, empresa, tipo de usuário
- Filtros por categoria, instrutor, status de publicação
- Consultas de progresso por usuário e curso

### Segurança (RLS)

Row Level Security está habilitado nas tabelas principais com políticas básicas:
- Usuários só podem ver seus próprios dados
- Todos podem ver cursos publicados
- Usuários só podem ver e atualizar seu próprio progresso

**IMPORTANTE:** Ajuste as políticas RLS conforme suas necessidades de segurança específicas.

### Dados Iniciais (Seeds)

O schema já inclui:
- 6 categorias padrão
- 5 conquistas iniciais

### Próximos Passos

1. Ajustar políticas RLS conforme necessidade
2. Adicionar mais conquistas personalizadas
3. Criar funções adicionais para lógica de negócio
4. Configurar triggers para notificações
5. Implementar sistema de avaliações/reviews

