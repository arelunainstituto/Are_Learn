# Endereços locais estáveis (localhost)

Este documento define as portas e URLs padrão para execução local dos serviços do Grupo AreLuna.

Como iniciar todos:
- `npm run dev:all`

Mapeamento de serviços e URLs:
- Frontend (Next.js): `http://localhost:3000/`
- QR-Code Generator (Express + SQLite): `http://localhost:3001/`
- Prostoral LAB (Express): `http://localhost:3002/`
- Leitor-De-Faturas (Express): `http://localhost:3003/`
- Leitor de Arquivos SAF-T (TS/Express): `http://localhost:3004/`

Observações:
- As portas são definidas via `PORT` pelo orquestrador (`scripts/serve-local.js`).
- O CORS no Prostoral LAB aceita dinamicamente o `localhost:${PORT}` atual.
- O frontend Next é iniciado com `-p ${PORT:-3000}` e respeita o `PORT` do orquestrador.
- Se novos serviços forem adicionados, inclua-os em `scripts/serve-local.js` com uma porta entre `3005-3009`.

Endpoints úteis:
- SAFT Health: `http://localhost:3004/health`
- SAFT Upload: `http://localhost:3004/api/saft/upload`
- Leitor-De-Faturas Health: `http://localhost:3003/health`
- QR Items API: `http://localhost:3001/api/qr-items`