# Documentação da API - AreLuna

## Visão Geral

A plataforma AreLuna utiliza Supabase como backend, fornecendo uma API REST automática baseada no schema do banco de dados PostgreSQL.

## Autenticação

> **Nota**: A autenticação completa será implementada em versões futuras. Atualmente, a plataforma funciona sem auth para demonstração.

## Endpoints Principais

### Cursos

#### Listar Cursos

```
GET /rest/v1/cursos
```

Parâmetros de Query:
- `publicado=eq.true` - Apenas cursos publicados
- `categoria_id=eq.{uuid}` - Filtrar por categoria
- `destaque=eq.true` - Apenas cursos em destaque
- `order=criado_em.desc` - Ordenação

Exemplo de Resposta:
```json
[
  {
    "id": "uuid",
    "titulo": "Implantodontia Avançada",
    "descricao": "...",
    "thumbnail": "url",
    "nivel": "avancado",
    "duracao_total": 480,
    "publicado": true
  }
]
```

#### Buscar Curso por ID

```
GET /rest/v1/cursos?id=eq.{uuid}
```

#### Buscar Cursos com Relacionamentos

```
GET /rest/v1/cursos?select=*,categoria:categorias(*),instrutor:usuarios(*)
```

### Progresso

#### Obter Progresso do Usuário

```
GET /rest/v1/progresso_cursos?usuario_id=eq.{uuid}
```

#### Atualizar Progresso

```
PATCH /rest/v1/progresso_cursos?id=eq.{uuid}
Content-Type: application/json

{
  "percentual_completo": 75,
  "tempo_assistido": 180,
  "ultima_visualizacao": "2024-03-20T10:30:00Z"
}
```

### Usuários

#### Listar Usuários (Admin apenas)

```
GET /rest/v1/usuarios
```

#### Criar Usuário

```
POST /rest/v1/usuarios
Content-Type: application/json

{
  "email": "usuario@example.com",
  "nome": "Nome do Usuário",
  "tipo": "aluno"
}
```

### Categorias

#### Listar Categorias

```
GET /rest/v1/categorias?order=ordem.asc
```

### Estatísticas (Views)

#### Estatísticas por Empresa

```
GET /rest/v1/vw_estatisticas_empresas?id=eq.{uuid}
```

#### Cursos Completos (com relacionamentos)

```
GET /rest/v1/vw_cursos_completos
```

## Funções do Banco de Dados

### Calcular Progresso

```sql
SELECT calcular_progresso_curso('usuario_id', 'curso_id');
```

Retorna o percentual de progresso (0-100) baseado nas aulas concluídas.

## Filtros e Operadores

Supabase suporta diversos operadores:

- `eq` - Igual
- `neq` - Diferente
- `gt` - Maior que
- `gte` - Maior ou igual
- `lt` - Menor que
- `lte` - Menor ou igual
- `like` - LIKE SQL
- `ilike` - LIKE case-insensitive
- `in` - IN SQL
- `is` - IS (para null)

Exemplo:
```
GET /rest/v1/cursos?nivel=in.(iniciante,intermediario)&duracao_total=gte.300
```

## Paginação

```
GET /rest/v1/cursos?limit=10&offset=0
```

Headers de resposta:
- `Content-Range`: 0-9/100 (mostra range e total)

## Ordenação

```
GET /rest/v1/cursos?order=criado_em.desc,titulo.asc
```

## Seleção de Campos

```
GET /rest/v1/cursos?select=id,titulo,thumbnail
```

## Contagem

```
GET /rest/v1/cursos?select=count
```

## Inserção em Massa

```
POST /rest/v1/tabela
Content-Type: application/json

[
  { "campo": "valor1" },
  { "campo": "valor2" }
]
```

## Upsert

```
POST /rest/v1/tabela
Prefer: resolution=merge-duplicates
Content-Type: application/json

{ "id": "uuid", "campo": "valor" }
```

## Realtime Subscriptions

```javascript
import { supabase } from '@/lib/supabase';

// Inscrever-se em mudanças
const subscription = supabase
  .channel('cursos-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'cursos'
    },
    (payload) => {
      console.log('Mudança:', payload);
    }
  )
  .subscribe();

// Cancelar inscrição
subscription.unsubscribe();
```

## Storage

### Upload de Arquivo

```javascript
const { data, error } = await supabase.storage
  .from('thumbnails')
  .upload('caminho/arquivo.jpg', file);
```

### URL Pública

```javascript
const { data } = supabase.storage
  .from('thumbnails')
  .getPublicUrl('caminho/arquivo.jpg');
```

## Rate Limiting

Supabase aplica rate limiting por padrão:
- 1000 requisições por minuto para plano gratuito
- Ajustável em planos pagos

## Tratamento de Erros

Sempre verifique erros nas respostas:

```javascript
const { data, error } = await supabase
  .from('cursos')
  .select('*');

if (error) {
  console.error('Erro:', error.message);
  return;
}

// Use data
```

## Headers Importantes

```
Authorization: Bearer {token}
apikey: {sua-anon-key}
Content-Type: application/json
Prefer: return=representation
```

## Exemplos de Uso

### JavaScript/TypeScript

```typescript
import { supabase } from '@/lib/supabase';

// Buscar cursos
const { data: cursos } = await supabase
  .from('cursos')
  .select(`
    *,
    categoria:categorias(*),
    instrutor:usuarios(*)
  `)
  .eq('publicado', true)
  .order('criado_em', { ascending: false });

// Atualizar progresso
const { data } = await supabase
  .from('progresso_cursos')
  .upsert({
    usuario_id: userId,
    curso_id: cursoId,
    percentual_completo: 50,
    tempo_assistido: 120
  });
```

## Recursos Adicionais

- [Documentação Oficial Supabase](https://supabase.com/docs)
- [PostgREST Documentation](https://postgrest.org)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)

## Suporte

Para dúvidas sobre a API:
- Email: dev@areluna.com.br
- Issues: GitHub Issues

