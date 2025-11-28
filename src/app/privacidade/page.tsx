import React from 'react';
import Link from 'next/link';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Última atualização: 15 de janeiro de 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-grey-900 mb-6">1. Introdução</h2>
                <p className="text-grey-600 mb-6">
                  A AreLuna INNSiDE está comprometida com a proteção da privacidade e segurança dos dados pessoais de nossos usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">2. Informações que Coletamos</h2>
                <h3 className="text-xl font-bold text-grey-900 mb-4">2.1 Informações Fornecidas por Você</h3>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Nome completo e dados de contato</li>
                  <li>Endereço de email</li>
                  <li>Número de telefone</li>
                  <li>Informações profissionais (empresa, cargo)</li>
                  <li>Dados de pagamento</li>
                  <li>Comunicações conosco</li>
                </ul>

                <h3 className="text-xl font-bold text-grey-900 mb-4">2.2 Informações Coletadas Automaticamente</h3>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Endereço IP e localização</li>
                  <li>Informações do dispositivo e navegador</li>
                  <li>Dados de uso da plataforma</li>
                  <li>Cookies e tecnologias similares</li>
                </ul>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">3. Como Usamos suas Informações</h2>
                <p className="text-grey-600 mb-4">Utilizamos seus dados pessoais para:</p>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Processar pagamentos e emitir certificados</li>
                  <li>Comunicar sobre cursos e atualizações</li>
                  <li>Oferecer suporte técnico</li>
                  <li>Personalizar sua experiência</li>
                  <li>Cumprir obrigações legais</li>
                </ul>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">4. Compartilhamento de Informações</h2>
                <p className="text-grey-600 mb-4">Não vendemos seus dados pessoais. Podemos compartilhar informações apenas:</p>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Com seu consentimento explícito</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Com prestadores de serviços confiáveis</li>
                  <li>Em caso de fusão ou aquisição</li>
                </ul>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">5. Segurança dos Dados</h2>
                <p className="text-grey-600 mb-6">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia, controles de acesso e monitoramento regular.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">6. Seus Direitos (LGPD)</h2>
                <p className="text-grey-600 mb-4">Conforme a Lei Geral de Proteção de Dados, você tem direito a:</p>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Confirmar a existência de tratamento de dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou inexatos</li>
                  <li>Solicitar anonimização ou eliminação</li>
                  <li>Portabilidade dos dados</li>
                  <li>Revogar o consentimento</li>
                  <li>Informações sobre compartilhamento</li>
                </ul>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">7. Cookies e Tecnologias Similares</h2>
                <p className="text-grey-600 mb-4">Utilizamos cookies para:</p>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Manter sua sessão ativa</li>
                  <li>Lembrar suas preferências</li>
                  <li>Analisar o uso da plataforma</li>
                  <li>Melhorar a experiência do usuário</li>
                </ul>
                <p className="text-grey-600 mb-6">
                  Você pode controlar o uso de cookies através das configurações do seu navegador.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">8. Retenção de Dados</h2>
                <p className="text-grey-600 mb-6">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Dados de usuários inativos são eliminados após 3 anos de inatividade.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">9. Transferência Internacional</h2>
                <p className="text-grey-600 mb-6">
                  Seus dados podem ser transferidos para países que oferecem nível adequado de proteção de dados ou mediante garantias apropriadas, sempre em conformidade com a LGPD.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">10. Menores de Idade</h2>
                <p className="text-grey-600 mb-6">
                  Nossos serviços são direcionados a profissionais da área odontológica. Não coletamos intencionalmente dados de menores de 18 anos sem o consentimento dos pais ou responsáveis.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">11. Alterações na Política</h2>
                <p className="text-grey-600 mb-6">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por email. Recomendamos revisar esta política regularmente.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">12. Contato e DPO</h2>
                <p className="text-grey-600 mb-4">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
                </p>
                <div className="bg-grey-50 rounded-lg p-6">
                  <p className="text-grey-600 mb-2"><strong>Encarregado de Dados (DPO):</strong> dpo@areluna.com.br</p>
                  <p className="text-grey-600 mb-2"><strong>Email Geral:</strong> privacidade@areluna.com.br</p>
                  <p className="text-grey-600 mb-2"><strong>Telefone:</strong> (11) 99999-9999</p>
                  <p className="text-grey-600"><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Autoridade Nacional de Proteção de Dados</h3>
                  <p className="text-blue-800 text-sm">
                    Você também pode contatar a ANPD para questões relacionadas à proteção de dados pessoais: 
                    <a href="https://www.gov.br/anpd" className="underline ml-1" target="_blank" rel="noopener noreferrer">
                      www.gov.br/anpd
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-grey-900 to-grey-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Dúvidas sobre privacidade?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Nossa equipe de proteção de dados está disponível para esclarecer qualquer questão sobre o tratamento de suas informações pessoais.
          </p>
          <Link 
            href="/contato"
            className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
          >
            Falar com DPO
          </Link>
        </div>
      </section>
    </div>
  );
}
