'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, BookOpen, Award, BarChart3 } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Substituir por dados reais do usuário quando implementar auth
  const isAuthenticated = false;
  const user = {
    nome: 'João Silva',
    avatar: '',
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              {/* Circular emblem with A pattern */}
              <div className="w-12 h-12 rounded-full border-4 border-grey-900 flex items-center justify-center relative overflow-hidden">
                {/* Outer A pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-grey-900 flex items-center justify-center">
                    <span className="text-white font-brand font-bold text-lg">A</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-brand font-bold text-grey-900 leading-tight">
                AreLuna
              </span>
              <span className="text-sm font-sans font-medium text-gold-500 -mt-1">
                INNSiDE
              </span>
            </div>
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <SearchBar
              placeholder="Buscar cursos, instrutores ou categorias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/cursos"
              className="flex items-center gap-2 text-grey-700 hover:text-gold-500 transition-colors font-medium"
            >
              <BookOpen size={20} />
              <span>Cursos</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  href="/meu-progresso"
                  className="flex items-center gap-2 text-grey-700 hover:text-gold-500 transition-colors font-medium"
                >
                  <BarChart3 size={20} />
                  <span>Meu Progresso</span>
                </Link>
                <Link
                  href="/conquistas"
                  className="flex items-center gap-2 text-grey-700 hover:text-gold-500 transition-colors font-medium"
                >
                  <Award size={20} />
                  <span>Conquistas</span>
                </Link>
              </>
            )}
          </nav>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/perfil">
                <Avatar name={user.nome} src={user.avatar} />
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button variant="primary" size="sm" className="bg-gold-500 hover:bg-gold-600 text-white">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search (Mobile) */}
        <div className="md:hidden pb-4">
          <SearchBar
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container-custom py-4 space-y-4">
            <Link
              href="/cursos"
              className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen size={20} />
              <span className="font-medium">Cursos</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/meu-progresso"
                  className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart3 size={20} />
                  <span className="font-medium">Meu Progresso</span>
                </Link>
                <Link
                  href="/conquistas"
                  className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Award size={20} />
                  <span className="font-medium">Conquistas</span>
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <Link href="/perfil" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3">
                      <Avatar name={user.nome} src={user.avatar} />
                      <span className="font-medium">{user.nome}</span>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

