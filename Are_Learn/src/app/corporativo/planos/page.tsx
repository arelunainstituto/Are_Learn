import React from 'react';
import Link from 'next/link';

const planos = [
  {
    nome: 'Starter',
    descricao: 'Ideal para pequenas clínicas',
    preco: 'R$ 97',
    periodo: '/mês',
    funcionarios: 'até 10',
    caracteristicas: [
      'Acesso a todos os cursos',
      'Certificados digitais',
      'Suporte por email',
      'Relatórios básicos',
      '1 administrador'
    ],
    destaque: false,
    cor: 'border-grey-200'
  },
  {
    nome: 'Professional',
    descricao: 'Para clínicas em crescimento',
    preco: 'R$ 197',
    periodo: '/mês',
    funcionarios: 'até 50',
    caracteristicas: [
      'Tudo do plano Starter',
      'Treinamentos personalizados',
      'Suporte prioritário',
      'Relatórios avançados',
      'Até 3 administradores',
      'Integração com LMS'
    ],
    destaque: true,
    cor: 'border-gold-500'
  },
  {
    nome: 'Enterprise',
    descricao: 'Para grandes organizações',
    preco: 'R$ 497',
    periodo: '/mês',
    funcionarios: 'ilimitado',
    caracteristicas: [
      'Tudo do plano Professional',
      'Conteúdo exclusivo',
      'Suporte dedicado',
      'Analytics avançados',
      'Administradores ilimitados',
      'API personalizada',
      'Treinamento presencial'
    ],
    destaque: false,
    cor: 'border-grey-200'
  }
];

const beneficios = [
  {
    titulo: 'Redução de Custos',
    descricao: 'Elimine gastos com treinamentos presenciais e viagens',
    icone: '💰',
    economia: 'Até 70%'
  },
  {
    titulo: 'Flexibilidade Total',
    descricao: 'Seus colaboradores estudam quando e onde quiserem',
    icone: '⏰',
    economia: '24/7'
  },
  {
    titulo: 'Escalabilidade',
    descricao: 'Adicione novos funcionários sem custos adicionais',
    icone: '📈',
    economia: 'Ilimitado'
  },
  {
    titulo: 'ROI Comprovado',
    descricao: 'Aumento da produtividade e qualidade dos atendimentos',
    icone: '📊',
    economia: '300%'
  }
];

const casos = [
  {
    empresa: 'Clínica Odontológica São Paulo',
    funcionarios: '25 profissionais',
    resultado: '40% de aumento na produtividade',
    depoimento: 'A AreLuna transformou nossa equipe. Os resultados foram visíveis em apenas 3 meses.',
    autor: 'Dr. João Silva, Diretor'
  },
  {
    empresa: 'Rede Odonto Plus',
    funcionarios: '150 profissionais',
    resultado: '60% de redução nos custos de treinamento',
    depoimento: 'A plataforma nos permitiu padronizar o conhecimento em todas as unidades.',
    autor: 'Dra. Maria Santos, CEO'
  },
  {
    empresa: 'Instituto de Odontologia',
    funcionarios: '80 profissionais',
    resultado: '95% de satisfação dos colaboradores',
    depoimento: 'Nossos profissionais se sentem mais confiantes e atualizados.',
    autor: 'Dr. Carlos Lima, Coordenador'
  }
];

export default function PlanosCorporativosPage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Planos Corporativos
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Soluções educacionais sob medida para empresas de todos os tamanhos. 
              Transforme sua equipe com conhecimento especializado.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Escolha o plano ideal
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Planos flexíveis que se adaptam ao tamanho e necessidades da sua empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planos.map((plano, index) => (
              <div key={index} className={`relative bg-white rounded-xl shadow-sm border-2 ${plano.cor} overflow-hidden ${plano.destaque ? 'ring-2 ring-gold-500' : ''}`}>
                {plano.destaque && (
                  <div className="absolute top-0 left-0 right-0 bg-gold-500 text-white text-center py-2 text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                
                <div className={`p-8 ${plano.destaque ? 'pt-12' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-grey-900 mb-2">{plano.nome}</h3>
                    <p className="text-grey-600 mb-4">{plano.descricao}</p>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-grey-900">{plano.preco}</span>
                      <span className="text-grey-600">{plano.periodo}</span>
                    </div>
                    <p className="text-sm text-grey-500">{plano.funcionarios} funcionários</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plano.caracteristicas.map((caracteristica, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-gold-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-grey-600 text-sm">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="/corporativo/contato"
                    className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-all ${
                      plano.destaque 
                        ? 'bg-gold-500 text-white hover:bg-gold-600' 
                        : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                    }`}
                  >
                    Solicitar Proposta
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-grey-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Benefícios para sua empresa
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Resultados comprovados que impulsionam o crescimento do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-4xl mb-4">{beneficio.icone}</div>
                <h3 className="text-lg font-bold text-grey-900 mb-2">{beneficio.titulo}</h3>
                <p className="text-grey-600 text-sm mb-3">{beneficio.descricao}</p>
                <div className="text-2xl font-bold text-gold-500">{beneficio.economia}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Casos de sucesso
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Empresas que já transformaram suas equipes com a AreLuna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {casos.map((caso, index) => (
              <div key={index} className="bg-grey-50 rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-grey-900 mb-1">{caso.empresa}</h3>
                  <p className="text-grey-600 text-sm mb-2">{caso.funcionarios}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {caso.resultado}
                  </div>
                </div>
                
                <blockquote className="text-grey-600 text-sm mb-4 italic">
                  "{caso.depoimento}"
                </blockquote>
                
                <div className="text-sm text-grey-500">
                  — {caso.autor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-grey-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Dúvidas comuns sobre nossos planos corporativos
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Posso alterar meu plano a qualquer momento?
              </h3>
              <p className="text-grey-600">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                As alterações entram em vigor no próximo ciclo de cobrança.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Há desconto para pagamento anual?
              </h3>
              <p className="text-grey-600">
                Sim! Oferecemos 20% de desconto para pagamentos anuais em todos os planos. 
                Entre em contato conosco para mais informações.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Como funciona a implementação?
              </h3>
              <p className="text-grey-600">
                Nossa equipe de sucesso do cliente cuida de toda a implementação, incluindo 
                configuração, treinamento dos administradores e migração de dados.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Posso personalizar o conteúdo?
              </h3>
              <p className="text-grey-600">
                Sim! Nos planos Professional e Enterprise, oferecemos criação de conteúdo 
                personalizado e treinamentos sob medida para sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-grey-900 to-grey-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Pronto para transformar sua equipe?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Solicite uma proposta personalizada e descubra como a AreLuna pode 
            impulsionar o crescimento da sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/corporativo/contato"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
            >
              Solicitar Proposta
            </Link>
            <Link 
              href="/demo-video"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-2 border-grey-300 bg-transparent hover:bg-grey-50 focus:ring-grey-500 px-6 py-3 text-lg border-white text-white hover:bg-white/10"
            >
              Ver Demonstração
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
