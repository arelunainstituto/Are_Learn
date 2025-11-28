import React from 'react';
import Link from 'next/link';

const steps = [
  {
    numero: 1,
    titulo: 'Crie sua conta',
    descricao: 'Cadastre-se gratuitamente na plataforma e tenha acesso a todos os recursos.',
    icone: '👤',
    detalhes: [
      'Preencha seus dados pessoais',
      'Confirme seu email',
      'Escolha seu plano de assinatura'
    ]
  },
  {
    numero: 2,
    titulo: 'Explore os cursos',
    descricao: 'Navegue por nossa biblioteca de cursos organizados por especialidade.',
    icone: '🔍',
    detalhes: [
      'Filtre por categoria ou instrutor',
      'Leia as descrições detalhadas',
      'Assista às aulas demonstrativas'
    ]
  },
  {
    numero: 3,
    titulo: 'Inscreva-se',
    descricao: 'Escolha os cursos que mais se adequam ao seu perfil e objetivos.',
    icone: '📝',
    detalhes: [
      'Selecione os cursos de interesse',
      'Confirme sua inscrição',
      'Receba confirmação por email'
    ]
  },
  {
    numero: 4,
    titulo: 'Estude no seu ritmo',
    descricao: 'Acesse o conteúdo 24/7 e estude quando e onde quiser.',
    icone: '📚',
    detalhes: [
      'Aulas em vídeo de alta qualidade',
      'Material didático complementar',
      'Fórum de discussão com instrutores'
    ]
  },
  {
    numero: 5,
    titulo: 'Pratique',
    descricao: 'Aplique o conhecimento através de exercícios práticos e casos clínicos.',
    icone: '🛠️',
    detalhes: [
      'Exercícios interativos',
      'Casos clínicos reais',
      'Simulações práticas'
    ]
  },
  {
    numero: 6,
    titulo: 'Certifique-se',
    descricao: 'Receba seu certificado após completar o curso e aprovar na avaliação.',
    icone: '🏆',
    detalhes: [
      'Avaliação final do curso',
      'Certificado digital válido',
      'Compartilhamento no LinkedIn'
    ]
  }
];

const features = [
  {
    titulo: 'Acesso Ilimitado',
    descricao: 'Estude quantas vezes quiser, sem restrições de tempo ou local.',
    icone: '⏰'
  },
  {
    titulo: 'Certificados Reconhecidos',
    descricao: 'Receba certificados válidos que agregam valor ao seu currículo.',
    icone: '📜'
  },
  {
    titulo: 'Instrutores Especialistas',
    descricao: 'Aprenda com profissionais renomados e experientes.',
    icone: '👨‍⚕️'
  },
  {
    titulo: 'Conteúdo Atualizado',
    descricao: 'Materiais sempre atualizados com as últimas técnicas e tecnologias.',
    icone: '🔄'
  },
  {
    titulo: 'Suporte Técnico',
    descricao: 'Equipe especializada para ajudar com qualquer dúvida.',
    icone: '🛟'
  },
  {
    titulo: 'Comunidade Ativa',
    descricao: 'Conecte-se com outros profissionais e expanda sua rede.',
    icone: '👥'
  }
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Como Funciona
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Descubra como é fácil começar sua jornada de aprendizado na AreLuna INNSiDE.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Seu caminho para o sucesso
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Um processo simples e intuitivo para maximizar seu aprendizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.numero} className="relative">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-white text-xl font-bold">
                      {step.numero}
                    </div>
                    <div className="text-3xl">{step.icone}</div>
                  </div>

                  <h3 className="text-lg font-brand font-bold text-grey-900 mb-2">
                    {step.titulo}
                  </h3>
                  
                  <p className="text-grey-600 text-sm mb-4">
                    {step.descricao}
                  </p>

                  <ul className="space-y-1">
                    {step.detalhes.map((detalhe, idx) => (
                      <li key={idx} className="flex items-center text-sm text-grey-600">
                        <svg className="w-4 h-4 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detalhe}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gold-200 transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gold-200 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-grey-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Por que escolher a AreLuna?
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Vantagens exclusivas que fazem a diferença na sua formação profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icone}</div>
                <h3 className="text-lg font-brand font-bold text-grey-900 mb-2">
                  {feature.titulo}
                </h3>
                <p className="text-grey-600 text-sm">
                  {feature.descricao}
                </p>
              </div>
            ))}
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
              Tire suas dúvidas sobre como funciona nossa plataforma
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Como posso acessar os cursos?
              </h3>
              <p className="text-grey-600">
                Após criar sua conta e escolher um plano, você terá acesso imediato a todos os cursos disponíveis. 
                Basta navegar pela biblioteca, escolher o curso desejado e começar a estudar.
              </p>
            </div>

            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Os certificados são válidos?
              </h3>
              <p className="text-grey-600">
                Sim! Nossos certificados são reconhecidos e válidos. Eles podem ser compartilhados no LinkedIn 
                e agregam valor ao seu currículo profissional.
              </p>
            </div>

            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Posso estudar no meu ritmo?
              </h3>
              <p className="text-grey-600">
                Absolutamente! Você tem acesso 24/7 aos cursos e pode estudar no seu próprio ritmo, 
                pausando e retomando quando quiser.
              </p>
            </div>

            <div className="bg-grey-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-grey-900 mb-2">
                Há suporte técnico disponível?
              </h3>
              <p className="text-grey-600">
                Sim! Nossa equipe de suporte está disponível para ajudar com qualquer dúvida técnica 
                ou sobre o conteúdo dos cursos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-grey-900 to-grey-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram suas carreiras com a AreLuna INNSiDE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/cadastro"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
            >
              Começar Agora
            </Link>
            <Link 
              href="/cursos"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-2 border-grey-300 bg-transparent hover:bg-grey-50 focus:ring-grey-500 px-6 py-3 text-lg border-white text-white hover:bg-white/10"
            >
              Ver Cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
