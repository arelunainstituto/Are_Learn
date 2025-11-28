'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefone: '',
    empresa: '',
    cargo: '',
    aceiteTermos: false,
    aceiteNewsletter: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    if (!formData.aceiteTermos) {
      alert('Você deve aceitar os termos de uso');
      return;
    }
    
    setIsLoading(true);
    
    // TODO: Implementar cadastro real
    // Por enquanto, simular cadastro
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-grey-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 rounded-full border-4 border-grey-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-grey-900 flex items-center justify-center">
                    <span className="text-white font-brand font-bold text-lg">A</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-brand font-bold text-grey-900 leading-tight">AreLuna</span>
              <span className="text-sm font-sans font-medium text-gold-500 -mt-1">INNSiDE</span>
            </div>
          </Link>
          <h2 className="text-3xl font-brand font-bold text-grey-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-grey-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-gold-500 hover:text-gold-600">
              Faça login
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-grey-700">
                Nome completo *
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
                value={formData.nome}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey-300 placeholder-grey-500 text-grey-900 rounded-lg focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-grey-700">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey-300 placeholder-grey-500 text-grey-900 rounded-lg focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-grey-700">
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                autoComplete="tel"
                value={formData.telefone}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey-300 placeholder-grey-500 text-grey-900 rounded-lg focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-grey-700">
                Empresa
              </label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                value={formData.empresa}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey-300 placeholder-grey-500 text-grey-900 rounded-lg focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                placeholder="Nome da sua empresa"
              />
            </div>

            <div>
              <label htmlFor="cargo" className="block text-sm font-medium text-grey-700">
                Cargo
              </label>
              <input
                id="cargo"
                name="cargo"
                type="text"
                value={formData.cargo}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey-300 placeholder-grey-500 text-grey-900 rounded-lg focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                placeholder="Seu cargo atual"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-grey-700">
                Senha *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey-300 placeholder-grey-500 text-grey-900 rounded-lg focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-grey-700">
                Confirmar senha *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey-300 placeholder-grey-500 text-grey-900 rounded-lg focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                placeholder="Digite a senha novamente"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="aceiteTermos"
                  name="aceiteTermos"
                  type="checkbox"
                  required
                  checked={formData.aceiteTermos}
                  onChange={handleChange}
                  className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-grey-300 rounded"
                />
                <label htmlFor="aceiteTermos" className="ml-2 block text-sm text-grey-700">
                  Aceito os{' '}
                  <Link href="/termos" className="text-gold-500 hover:text-gold-600">
                    Termos de Uso
                  </Link>
                  {' '}e a{' '}
                  <Link href="/privacidade" className="text-gold-500 hover:text-gold-600">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="aceiteNewsletter"
                  name="aceiteNewsletter"
                  type="checkbox"
                  checked={formData.aceiteNewsletter}
                  onChange={handleChange}
                  className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-grey-300 rounded"
                />
                <label htmlFor="aceiteNewsletter" className="ml-2 block text-sm text-grey-700">
                  Quero receber novidades e ofertas por email
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  Criando conta...
                </div>
              ) : (
                'Criar conta'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
