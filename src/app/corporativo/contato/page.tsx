'use client';

import React, { useState } from 'react';

export default function ContatoCorporativoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    cargo: '',
    funcionarios: '',
    interesse: '',
    mensagem: '',
    aceiteTermos: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceiteTermos) {
      alert('Você deve aceitar os termos de uso');
      return;
    }
    
    setIsLoading(true);
    
    // TODO: Implementar envio real do formulário
    setTimeout(() => {
      setIsLoading(false);
      alert('Solicitação enviada com sucesso! Nossa equipe comercial entrará em contato em até 24 horas.');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        cargo: '',
        funcionarios: '',
        interesse: '',
        mensagem: '',
        aceiteTermos: false
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Contato Corporativo
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Soluções educacionais personalizadas para sua empresa. Transforme sua equipe com conhecimento especializado.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Por que escolher a AreLuna para sua empresa?
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Soluções educacionais que impulsionam o crescimento profissional da sua equipe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Treinamento Personalizado</h3>
              <p className="text-grey-600 text-sm">
                Cursos adaptados às necessidades específicas da sua empresa e equipe.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Relatórios Detalhados</h3>
              <p className="text-grey-600 text-sm">
                Acompanhe o progresso e performance de cada colaborador com relatórios completos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Implementação Rápida</h3>
              <p className="text-grey-600 text-sm">
                Comece a treinar sua equipe em poucos dias com nossa implementação ágil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-brand font-bold text-grey-900 mb-6">
                  Solicite uma proposta
                </h2>
                <p className="text-grey-600 mb-8">
                  Preencha o formulário e nossa equipe comercial entrará em contato para apresentar a melhor solução para sua empresa.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-grey-900 mb-1">Consultoria Gratuita</h3>
                      <p className="text-grey-600 text-sm">Análise das necessidades da sua empresa sem compromisso.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-grey-900 mb-1">Proposta Personalizada</h3>
                      <p className="text-grey-600 text-sm">Solução educacional sob medida para seus objetivos.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-grey-900 mb-1">Suporte Dedicado</h3>
                      <p className="text-grey-600 text-sm">Equipe especializada para acompanhar sua implementação.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-grey-700 mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-grey-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-grey-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-grey-700 mb-2">
                        Empresa *
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cargo" className="block text-sm font-medium text-grey-700 mb-2">
                        Cargo *
                      </label>
                      <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        required
                        value={formData.cargo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Seu cargo"
                      />
                    </div>

                    <div>
                      <label htmlFor="funcionarios" className="block text-sm font-medium text-grey-700 mb-2">
                        Número de funcionários
                      </label>
                      <select
                        id="funcionarios"
                        name="funcionarios"
                        value={formData.funcionarios}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      >
                        <option value="">Selecione</option>
                        <option value="1-10">1-10 funcionários</option>
                        <option value="11-50">11-50 funcionários</option>
                        <option value="51-200">51-200 funcionários</option>
                        <option value="201-500">201-500 funcionários</option>
                        <option value="500+">Mais de 500 funcionários</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interesse" className="block text-sm font-medium text-grey-700 mb-2">
                      Área de interesse
                    </label>
                    <select
                      id="interesse"
                      name="interesse"
                      value={formData.interesse}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    >
                      <option value="">Selecione</option>
                      <option value="implantodontia">Implantodontia</option>
                      <option value="ortodontia">Ortodontia</option>
                      <option value="periodontia">Periodontia</option>
                      <option value="endodontia">Endodontia</option>
                      <option value="prostese">Prótese Dentária</option>
                      <option value="gestao">Gestão Clínica</option>
                      <option value="todas">Todas as áreas</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-grey-700 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={4}
                      value={formData.mensagem}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      placeholder="Conte-nos sobre suas necessidades educacionais..."
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      id="aceiteTermos"
                      name="aceiteTermos"
                      type="checkbox"
                      required
                      checked={formData.aceiteTermos}
                      onChange={handleChange}
                      className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-grey-300 rounded mt-1"
                    />
                    <label htmlFor="aceiteTermos" className="ml-2 block text-sm text-grey-700">
                      Aceito os{' '}
                      <a href="/termos" className="text-gold-500 hover:text-gold-600 underline">
                        Termos de Uso
                      </a>
                      {' '}e a{' '}
                      <a href="/privacidade" className="text-gold-500 hover:text-gold-600 underline">
                        Política de Privacidade
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gold-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Enviando...' : 'Solicitar Proposta'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Outras formas de contato
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Nossa equipe comercial está disponível para atendê-lo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Email Corporativo</h3>
              <p className="text-grey-600 mb-2">comercial@areluna.com.br</p>
              <p className="text-grey-600">Resposta em até 4 horas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Telefone</h3>
              <p className="text-grey-600 mb-2">(11) 99999-9999</p>
              <p className="text-grey-600">Segunda a Sexta, 9h às 18h</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">WhatsApp</h3>
              <p className="text-grey-600 mb-2">(11) 99999-9999</p>
              <p className="text-grey-600">Atendimento instantâneo</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
