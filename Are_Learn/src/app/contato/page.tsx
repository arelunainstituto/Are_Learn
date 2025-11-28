'use client';

import React, { useState } from 'react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
    tipo: 'geral'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implementar envio real do formulário
    // Por enquanto, simular envio
    setTimeout(() => {
      setIsLoading(false);
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
        tipo: 'geral'
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Fale Conosco
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Estamos aqui para ajudar. Entre em contato conosco e responderemos o mais breve possível.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Email</h3>
              <p className="text-grey-600 mb-2">contato@areluna.com.br</p>
              <p className="text-grey-600">suporte@areluna.com.br</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Telefone</h3>
              <p className="text-grey-600 mb-2">(11) 99999-9999</p>
              <p className="text-grey-600">(11) 3333-3333</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Horário</h3>
              <p className="text-grey-600 mb-2">Segunda a Sexta</p>
              <p className="text-grey-600">9h às 18h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
                Envie sua mensagem
              </h2>
              <p className="text-grey-600">
                Preencha o formulário abaixo e entraremos em contato em até 24 horas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-grey-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="tipo" className="block text-sm font-medium text-grey-700 mb-2">
                    Tipo de contato
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  >
                    <option value="geral">Geral</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="comercial">Comercial</option>
                    <option value="parceria">Parceria</option>
                    <option value="instrutor">Quero ser Instrutor</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="assunto" className="block text-sm font-medium text-grey-700 mb-2">
                  Assunto *
                </label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  required
                  value={formData.assunto}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Resumo do seu contato"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="mensagem" className="block text-sm font-medium text-grey-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={6}
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Descreva sua dúvida ou solicitação..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Respostas para as dúvidas mais comuns sobre nossa plataforma
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Como posso cancelar minha assinatura?
              </h3>
              <p className="text-grey-600">
                Você pode cancelar sua assinatura a qualquer momento através da sua área de usuário 
                ou entrando em contato conosco. O cancelamento é imediato e você mantém acesso 
                até o final do período pago.
              </p>
            </div>

            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Os certificados são válidos?
              </h3>
              <p className="text-grey-600">
                Sim! Nossos certificados são reconhecidos e válidos. Eles podem ser compartilhados 
                no LinkedIn e agregam valor ao seu currículo profissional.
              </p>
            </div>

            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Posso acessar os cursos offline?
              </h3>
              <p className="text-grey-600">
                Atualmente, nossos cursos são disponibilizados online. Estamos trabalhando em 
                uma funcionalidade de download para acesso offline em breve.
              </p>
            </div>

            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Há garantia de satisfação?
              </h3>
              <p className="text-grey-600">
                Oferecemos 30 dias de garantia. Se não ficar satisfeito com o conteúdo, 
                devolvemos 100% do seu investimento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
