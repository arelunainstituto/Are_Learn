# Guia de Contribuição - AreLuna

Obrigado por considerar contribuir com a plataforma AreLuna! 🎉

## Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor abra uma issue incluindo:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs comportamento atual
- Screenshots (se aplicável)
- Ambiente (SO, navegador, versão)

### Sugerindo Melhorias

Sugestões são sempre bem-vindas! Inclua:

- Descrição detalhada da funcionalidade
- Por que seria útil
- Exemplos de uso
- Mockups ou referências (opcional)

### Pull Requests

1. **Fork o repositório**
2. **Crie uma branch**: `git checkout -b feature/minha-feature`
3. **Desenvolva seguindo os padrões**:
   - Use TypeScript
   - Mantenha componentes pequenos e reutilizáveis
   - Adicione comentários quando necessário
   - Siga as convenções de código existentes
4. **Teste suas mudanças**
5. **Commit**: `git commit -m 'feat: adiciona nova funcionalidade'`
6. **Push**: `git push origin feature/minha-feature`
7. **Abra um Pull Request**

### Padrões de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação, sem mudança de código
- `refactor:` Refatoração de código
- `test:` Adiciona ou corrige testes
- `chore:` Manutenção

Exemplos:
```
feat: adiciona player de vídeo customizado
fix: corrige cálculo de progresso
docs: atualiza README com instruções de deploy
```

## Estrutura de Código

### Componentes React

```typescript
// Sempre use TypeScript
// Prefira componentes funcionais
// Use interfaces para props

interface MeuComponenteProps {
  titulo: string;
  opcional?: boolean;
}

export function MeuComponente({ titulo, opcional = false }: MeuComponenteProps) {
  return (
    <div>
      <h1>{titulo}</h1>
    </div>
  );
}
```

### Estilização

- Use Tailwind CSS
- Mantenha classes organizadas
- Use utilitário `cn()` para classes condicionais

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  condicao && 'classes-condicionais'
)} />
```

### Nomenclatura

- **Componentes**: PascalCase (`MeuComponente.tsx`)
- **Funções**: camelCase (`minhaFuncao`)
- **Constantes**: UPPER_SNAKE_CASE (`MINHA_CONSTANTE`)
- **Arquivos**: kebab-case para páginas, PascalCase para componentes

## Testando

Antes de submeter um PR:

1. Teste em diferentes navegadores
2. Verifique responsividade (mobile, tablet, desktop)
3. Rode o linter: `npm run lint`
4. Verifique tipos: `npm run type-check`

## Dúvidas?

- Abra uma issue com a tag `question`
- Entre em contato: dev@areluna.com.br

Obrigado pela contribuição! 🚀

