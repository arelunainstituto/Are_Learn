import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware para detecção de tenant e redirecionamento
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Extrair subdomain
  const subdomain = hostname.split('.')[0];
  
  // Se for localhost ou domínio principal, permitir acesso direto
  if (hostname === 'localhost:3000' || hostname === 'localhost:3001' || hostname === 'localhost:3002' ||
      hostname === 'areluna.com' || hostname === 'www.areluna.com') {
    return NextResponse.next();
  }

  // Se for subdomain, verificar se é válido
  if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
    // Verificar se subdomain é um tenant válido
    const validTenants = ['default', 'demo', 'test']; // TODO: Buscar da API
    
    if (!validTenants.includes(subdomain)) {
      // Redirecionar para página de tenant não encontrado
      return NextResponse.redirect(new URL('/tenant-not-found', request.url));
    }

    // Adicionar header com tenant ID
    const response = NextResponse.next();
    response.headers.set('x-tenant-id', subdomain);
    response.headers.set('x-tenant-subdomain', subdomain);
    
    return response;
  }

  // Para rotas de API, verificar tenant no header
  if (pathname.startsWith('/api/')) {
    const tenantId = request.headers.get('x-tenant-id');
    
    if (!tenantId && !pathname.startsWith('/api/tenants/')) {
      return NextResponse.json(
        { error: 'Tenant ID required for API access' },
        { status: 400 }
      );
    }
  }

  // Para rotas de site-admin, verificar permissões
  if (pathname.startsWith('/site-admin/')) {
    // TODO: Verificar se usuário é Site Admin
    // Por enquanto, permitir acesso
    return NextResponse.next();
  }

  // Para rotas de admin, verificar se é tenant admin
  if (pathname.startsWith('/admin/')) {
    // TODO: Verificar se usuário é Tenant Admin ou Site Admin
    // Por enquanto, permitir acesso
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configurar quais rotas o middleware deve interceptar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
