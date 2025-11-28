# 💻 Estilo de Código - Padrões Areluna

> **Convenções de código para manter consistência e qualidade**

Diretrizes de estilo, nomenclatura e boas práticas para todos os projetos Areluna.

---

## 📝 Nomenclatura

### Variáveis e Funções

```typescript
// ✅ CORRETO - camelCase
const userName = 'João Silva';
const isUserLoggedIn = true;
const getUserData = () => { /* ... */ };
const calculateTotalPrice = (items) => { /* ... */ };

// ❌ EVITAR
const user_name = 'João';           // snake_case
const IsUserLoggedIn = true;        // PascalCase
const GetUserData = () => {};       // PascalCase
```

### Componentes React

```typescript
// ✅ CORRETO - PascalCase
const UserProfile = () => { /* ... */ };
const LoginForm = () => { /* ... */ };
const OrderCard = () => { /* ... */ };

// ❌ EVITAR
const userProfile = () => {};        // camelCase
const login_form = () => {};        // snake_case
```

### Constantes

```typescript
// ✅ CORRETO - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.areluna.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;

// ❌ EVITAR
const apiBaseUrl = 'https://api.areluna.com';  // camelCase
const maxRetryAttempts = 3;                     // camelCase
```

### Arquivos e Pastas

```typescript
// ✅ CORRETO
UserProfile.tsx           // Componentes React
useAuth.ts                // Hooks
apiService.ts             // Serviços
formatDate.ts             // Utilitários
UserTypes.ts              // Tipos TypeScript

// Pastas
components/
hooks/
services/
utils/
types/

// ❌ EVITAR
user-profile.tsx           // kebab-case para componentes
use_auth.ts               // snake_case
api-service.ts            // kebab-case para arquivos TS
```

---

## 🎯 Convenções de Código

### Declaração de Variáveis

```typescript
// ✅ CORRETO - const por padrão, let quando necessário
const user = await getUser();
const isAdmin = user.role === 'admin';

// Para reatribuição
let retryCount = 0;
retryCount++;

// ❌ EVITAR - var
var userName = 'João';  // Nunca usar var
```

### Funções

```typescript
// ✅ CORRETO - Function declarations para funções principais
function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

// Arrow functions para callbacks e funções simples
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

// ❌ EVITAR - Function expressions desnecessárias
const calculateTotal = function(items) { /* ... */ };
```

### Componentes React

```typescript
// ✅ CORRETO - Functional components com TypeScript
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user)}>Editar</button>
      <button onClick={() => onDelete(user.id)}>Excluir</button>
    </div>
  );
};

// ❌ EVITAR - Class components (legacy)
class UserCard extends React.Component {
  // ...
}
```

---

## 💬 Comentários

### Regras de Comentários

```typescript
// ✅ CORRETO - Comentários objetivos e úteis

/**
 * Calcula o preço total de um pedido incluindo impostos
 * @param items - Lista de itens do pedido
 * @param taxRate - Taxa de imposto (0.1 = 10%)
 * @returns Preço total com impostos
 */
function calculateOrderTotal(items: OrderItem[], taxRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 + taxRate);
}

// Explicar "porquê", não "o quê"
// Usar bcrypt para hash seguro (não MD5 que é vulnerável)
const hashedPassword = await bcrypt.hash(password, 12);

// ❌ EVITAR - Comentários óbvios
// Incrementa o contador
counter++;

// Define a variável user
const user = getUser();
```

### JSDoc para Funções Públicas

```typescript
/**
 * Autentica um usuário no sistema
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns Promise com dados do usuário autenticado
 * @throws {AuthError} Quando credenciais são inválidas
 * @example
 * ```typescript
 * const user = await authenticateUser('user@example.com', 'password123');
 * console.log(user.name); // Nome do usuário
 * ```
 */
async function authenticateUser(email: string, password: string): Promise<User> {
  // Implementação...
}
```

---

## 🛠️ Stack Tecnológica

### Frontend Preferido

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.3.0",
    "styled-components": "^6.1.0",
    "react-router-dom": "^6.8.0",
    "react-query": "^3.39.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.1.0",
    "eslint": "^8.57.0",
    "prettier": "^3.0.0",
    "@types/react": "^18.2.0"
  }
}
```

### Backend Preferido

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "typescript": "^5.3.0",
    "supabase": "^1.0.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "tsx": "^4.7.0",
    "nodemon": "^3.0.0",
    "@types/express": "^4.17.0"
  }
}
```

### Build Tools

```json
{
  "build": "Vite (frontend) + tsx (backend)",
  "linting": "ESLint + Prettier",
  "testing": "Vitest + Testing Library",
  "deployment": "Vercel (frontend) + Railway (backend)"
}
```

---

## 🔧 Configuração de Linting

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    // Nomenclatura
    'camelcase': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'format': ['camelCase', 'UPPER_CASE']
      },
      {
        'selector': 'function',
        'format': ['camelCase']
      },
      {
        'selector': 'typeLike',
        'format': ['PascalCase']
      }
    ],
    
    // Qualidade de código
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

---

## 📦 Imports e Exports

### Organização de Imports

```typescript
// ✅ CORRETO - Ordem organizada
// 1. React e bibliotecas externas
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

// 2. Imports internos (absolutos)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserService } from '@/services/UserService';
import { User } from '@/types/User';

// 3. Imports relativos
import './UserProfile.css';
import { validateEmail } from '../utils/validation';

// ❌ EVITAR - Imports desorganizados
import { User } from '@/types/User';
import React from 'react';
import { Button } from '@/components/ui/Button';
import styled from 'styled-components';
```

### Exports

```typescript
// ✅ CORRETO - Named exports por padrão
export const UserService = {
  async getUser(id: string): Promise<User> {
    // ...
  }
};

export const useAuth = () => {
  // ...
};

// Default export apenas para componentes principais
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // ...
};

export default UserProfile;

// ❌ EVITAR - Default exports desnecessários
export default const UserService = { /* ... */ };
```

---

## 🎨 Styling

### Styled Components (Preferido)

```typescript
// ✅ CORRETO - Styled Components
import styled from 'styled-components';

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background-color: ${props => 
    props.variant === 'primary' ? '#D4AF37' : '#858585'
  };
  color: ${props => 
    props.variant === 'primary' ? '#FFFFFF' : '#292929'
  };
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

// Uso
<Button variant="primary">Salvar</Button>
```

### CSS Modules (Alternativa)

```css
/* Button.module.css */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary {
  background-color: #D4AF37;
  color: #FFFFFF;
}

.secondary {
  background-color: #858585;
  color: #292929;
}
```

```typescript
// Button.tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
};
```

---

## 🧪 Testes

### Convenções de Teste

```typescript
// ✅ CORRETO - Testes organizados
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';
import { User } from '@/types/User';

describe('UserCard', () => {
  const mockUser: User = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'admin'
  };

  it('should render user information correctly', () => {
    render(<UserCard user={mockUser} onEdit={jest.fn()} onDelete={jest.fn()} />);
    
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} onDelete={jest.fn()} />);
    
    fireEvent.click(screen.getByText('Editar'));
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

---

## 📋 Checklist de Qualidade

### Antes de Fazer Commit

- [ ] Código segue convenções de nomenclatura
- [ ] Imports estão organizados
- [ ] Comentários são úteis e objetivos
- [ ] Funções têm JSDoc quando necessário
- [ ] ESLint não apresenta erros
- [ ] Prettier formatou o código
- [ ] Testes passam
- [ ] TypeScript não apresenta erros

### Code Review

- [ ] Código é legível e auto-explicativo
- [ ] Nomes de variáveis/funções são descritivos
- [ ] Não há código duplicado
- [ ] Funções são pequenas e focadas
- [ ] Tratamento de erros adequado
- [ ] Performance considerada
- [ ] Acessibilidade (se aplicável)

---

## 🔗 Ferramentas Recomendadas

### VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Scripts Úteis

```json
{
  "scripts": {
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx,js,jsx}",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 📚 Referências

- **TypeScript**: [Handbook](https://www.typescriptlang.org/docs/)
- **React**: [Best Practices](https://react.dev/learn)
- **ESLint**: [Rules](https://eslint.org/docs/rules/)
- **Prettier**: [Options](https://prettier.io/docs/en/options.html)
- **Testing**: [Testing Library](https://testing-library.com/docs/)

---

**Versão**: 1.0.0  
**Última atualização**: Outubro 2025  
**Aplicável a**: Todos os projetos Areluna
