# OmniSupreme - AreLuna ERP (Local Development)

## Overview

OmniSupreme is a comprehensive ERP system for Grupo AreLuna, designed with a local-first development approach. The system includes inventory management, QR code generation, and multi-tenant support.

## Architecture

### Monorepo Structure
```
/TRAe-Projects
├── inventory-service/     # NestJS API with SQLite
├── inventory-ui/          # Next.js frontend
├── packages/              # Shared packages
│   ├── adapters/         # External service adapters
│   ├── schemas/          # Zod validation schemas
│   ├── ui/               # Shared UI components
│   └── utils/            # Utility functions
├── Grupo AreLuna/        # Legacy components
│   └── QR-Code-Generator/ # QR code service
└── scripts/              # Development scripts
```

### Services

1. **Inventory Service** (Port 3005)
   - NestJS API with TypeScript
   - SQLite database with Prisma ORM
   - Multi-tenant architecture
   - Swagger API documentation

2. **Inventory UI** (Port 3006)
   - Next.js with App Router
   - Tailwind CSS for styling
   - TypeScript support
   - Responsive design

3. **QR Code Generator** (Port 3001)
   - Legacy Node.js service
   - QR code generation for inventory items
   - Web interface for QR management

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- SQLite (included with Node.js)

### Installation

1. **Clone and setup the workspace:**
   ```bash
   cd /Users/dr.saraiva/Documents/TRAe-Projects
   npm install
   ```

2. **Setup Inventory Service:**
   ```bash
   cd inventory-service
   npm install
   
   # Setup database
   DATABASE_URL="file:./data/inventory.db" npx prisma migrate dev --name init
   
   # Build the service
   npm run build
   ```

3. **Setup Inventory UI:**
   ```bash
   cd ../inventory-ui
   npm install
   ```

4. **Setup QR Code Generator:**
   ```bash
   cd "../Grupo AreLuna/QR-Code-Generator"
   npm install
   ```

### Running the Services

#### Option 1: Run All Services (Recommended)
```bash
# From project root
npm run dev:all
```

#### Option 2: Run Services Individually

**Inventory Service:**
```bash
cd inventory-service
DATABASE_URL="file:./data/inventory.db" node dist/main.js
```

**Inventory UI:**
```bash
cd inventory-ui
npm run dev
```

**QR Code Generator:**
```bash
cd "Grupo AreLuna/QR-Code-Generator"
npm run dev
```

## Service URLs

- **Inventory UI**: http://localhost:3006
- **Inventory API**: http://localhost:3005
  - API Docs: http://localhost:3005/api/docs
  - Health Check: http://localhost:3005/healthz
- **QR Code Generator**: http://localhost:3001

## API Testing

### Create a Tenant
```bash
curl -X POST http://localhost:3005/api/tenants \
  -H "Content-Type: application/json" \
  -d '{"name": "AreLuna Test Company"}'
```

### List Tenants
```bash
curl http://localhost:3005/api/tenants
```

### Health Check
```bash
curl http://localhost:3005/healthz
```

## Database

### Schema
The system uses SQLite with the following main entities:
- **Tenants**: Multi-tenant support
- **Categories**: Item categorization
- **Locations**: Physical locations
- **InventoryItems**: Main inventory items
- **InventoryMovements**: Item movement tracking

### Database Management
```bash
# View database in Prisma Studio
cd inventory-service
DATABASE_URL="file:./data/inventory.db" npx prisma studio

# Reset database
DATABASE_URL="file:./data/inventory.db" npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

## Development

### Project Structure
- **Local-first**: All data stored locally in SQLite
- **TypeScript**: Full type safety across the stack
- **Modular**: Shared packages for common functionality
- **API-first**: RESTful APIs with OpenAPI documentation

### Environment Variables
Create `.env.local` files in each service directory:

**inventory-service/.env.local:**
```bash
DATABASE_URL="file:./data/inventory.db"
NODE_ENV=development
```

**inventory-ui/.env.local:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3005
```

### Adding New Features
1. Update Prisma schema if needed
2. Run migrations: `npx prisma migrate dev`
3. Update API endpoints in inventory-service
4. Update UI components in inventory-ui
5. Test with curl or Postman

## Troubleshooting

### Common Issues

1. **Port conflicts**: Check if ports 3001, 3005, 3006 are available
2. **Database errors**: Ensure SQLite file permissions are correct
3. **Build errors**: Run `npm run build` in inventory-service after changes
4. **Missing dependencies**: Run `npm install` in each service directory

### Logs
- Inventory Service: Check terminal output for detailed logs
- UI: Check browser console for frontend errors
- QR Generator: Check terminal output

### Database Issues
```bash
# Check database file exists
ls -la inventory-service/data/

# Recreate database
cd inventory-service
rm -f data/inventory.db
DATABASE_URL="file:./data/inventory.db" npx prisma migrate dev --name init
```

## Next Steps

### Cloud Migration (When Ready)
- Migrate from SQLite to PostgreSQL/Supabase
- Deploy API to Azure Container Apps
- Deploy UI to Vercel
- Setup CI/CD pipelines

### Features to Add
- User authentication
- Role-based permissions
- Advanced reporting
- Bulk operations
- Export/import functionality

## Support

For issues or questions:
1. Check the logs in terminal outputs
2. Verify all services are running on correct ports
3. Test API endpoints with curl
4. Check database connectivity with Prisma Studio

---

**OmniLuner - Grupo AreLuna ERP System**  
Local Development Version - Built with Node.js, NestJS, Next.js, and SQLite