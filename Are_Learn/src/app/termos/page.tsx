import React from 'react';
import Link from 'next/link';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Termos de Uso
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
                <h2 className="text-2xl font-bold text-grey-900 mb-6">1. Aceitação dos Termos</h2>
                <p className="text-grey-600 mb-6">
                  Ao acessar e utilizar a plataforma AreLuna INNSiDE, você concorda em cumprir e estar vinculado aos presentes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossa plataforma.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">2. Descrição do Serviço</h2>
                <p className="text-grey-600 mb-4">
                  A AreLuna INNSiDE é uma plataforma de educação online especializada em cursos de odontologia, oferecendo:
                </p>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Cursos online de odontologia</li>
                  <li>Certificados de conclusão</li>
                  <li>Material didático complementar</li>
                  <li>Suporte técnico e pedagógico</li>
                  <li>Comunidade de profissionais</li>
                </ul>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">3. Cadastro e Conta do Usuário</h2>
                <p className="text-grey-600 mb-4">
                  Para utilizar nossos serviços, você deve:
                </p>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Ser responsável por todas as atividades em sua conta</li>
                  <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                </ul>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">4. Uso Aceitável</h2>
                <p className="text-grey-600 mb-4">
                  Você concorda em não utilizar a plataforma para:
                </p>
                <ul className="list-disc list-inside text-grey-600 mb-6 space-y-2">
                  <li>Atividades ilegais ou não autorizadas</li>
                  <li>Violar direitos de propriedade intelectual</li>
                  <li>Interferir no funcionamento da plataforma</li>
                  <li>Compartilhar conteúdo inadequado ou ofensivo</li>
                  <li>Realizar engenharia reversa do software</li>
                </ul>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">5. Propriedade Intelectual</h2>
                <p className="text-grey-600 mb-6">
                  Todo o conteúdo da plataforma, incluindo textos, vídeos, imagens, software e outros materiais, é propriedade da AreLuna INNSiDE ou de seus licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">6. Pagamentos e Reembolsos</h2>
                <p className="text-grey-600 mb-4">
                  <strong>Pagamentos:</strong> Os preços dos cursos são exibidos na plataforma e podem ser alterados a qualquer momento. O pagamento deve ser realizado antes do acesso ao conteúdo.
                </p>
                <p className="text-grey-600 mb-4">
                  <strong>Reembolsos:</strong> Oferecemos 30 dias de garantia de satisfação. Solicitações de reembolso devem ser feitas através do nosso suporte.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">7. Certificados</h2>
                <p className="text-grey-600 mb-6">
                  Os certificados são emitidos após a conclusão do curso e aprovação na avaliação final. Eles são válidos e podem ser utilizados para fins profissionais, mas não substituem certificações oficiais de órgãos reguladores.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">8. Limitação de Responsabilidade</h2>
                <p className="text-grey-600 mb-6">
                  A AreLuna INNSiDE não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso da plataforma. Nossa responsabilidade está limitada ao valor pago pelos serviços.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">9. Modificações</h2>
                <p className="text-grey-600 mb-6">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma. O uso continuado constitui aceitação dos novos termos.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">10. Rescisão</h2>
                <p className="text-grey-600 mb-6">
                  Podemos suspender ou encerrar sua conta a qualquer momento, com ou sem aviso prévio, por violação destes termos ou por qualquer outro motivo a nosso critério.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">11. Lei Aplicável</h2>
                <p className="text-grey-600 mb-6">
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
                </p>

                <h2 className="text-2xl font-bold text-grey-900 mb-6">12. Contato</h2>
                <p className="text-grey-600 mb-6">
                  Para dúvidas sobre estes termos, entre em contato conosco:
                </p>
                <div className="bg-grey-50 rounded-lg p-6">
                  <p className="text-grey-600 mb-2"><strong>Email:</strong> contato@areluna.com.br</p>
                  <p className="text-grey-600 mb-2"><strong>Telefone:</strong> (11) 99999-9999</p>
                  <p className="text-grey-600"><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
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
            Tem dúvidas sobre nossos termos?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Nossa equipe jurídica está disponível para esclarecer qualquer questão sobre nossos termos de uso.
          </p>
          <Link 
            href="/contato"
            className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
          >
            Entrar em Contato
          </Link>
        </div>
      </section>
    </div>
  );
}
