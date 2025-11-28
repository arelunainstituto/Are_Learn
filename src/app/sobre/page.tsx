import React from 'react';
import Link from 'next/link';

const valores = [
  {
    titulo: 'Excelência Acadêmica',
    descricao: 'Comprometidos com o mais alto padrão de qualidade em educação odontológica.',
    icone: '🎓'
  },
  {
    titulo: 'Inovação Tecnológica',
    descricao: 'Utilizamos as mais modernas tecnologias para maximizar o aprendizado.',
    icone: '💡'
  },
  {
    titulo: 'Acessibilidade',
    descricao: 'Democratizamos o acesso à educação de qualidade para todos os profissionais.',
    icone: '🌍'
  },
  {
    titulo: 'Comunidade',
    descricao: 'Fomentamos uma rede de profissionais conectados e colaborativos.',
    icone: '🤝'
  }
];

const numeros = [
  { valor: '10k+', label: 'Profissionais Formados' },
  { valor: '100+', label: 'Cursos Disponíveis' },
  { valor: '50+', label: 'Instrutores Especialistas' },
  { valor: '95%', label: 'Satisfação dos Alunos' }
];

const timeline = [
  {
    ano: '2020',
    titulo: 'Fundação',
    descricao: 'AreLuna INNSiDE foi fundada com a missão de democratizar a educação odontológica de qualidade.'
  },
  {
    ano: '2021',
    titulo: 'Primeiros Cursos',
    descricao: 'Lançamento dos primeiros cursos especializados em Implantodontia e Ortodontia.'
  },
  {
    ano: '2022',
    titulo: 'Expansão',
    descricao: 'Ampliação da biblioteca de cursos e parcerias com universidades renomadas.'
  },
  {
    ano: '2023',
    titulo: 'Tecnologia',
    descricao: 'Implementação de recursos de realidade virtual e simulações práticas.'
  },
  {
    ano: '2024',
    titulo: 'Internacionalização',
    descricao: 'Expansão para outros países da América Latina com cursos em múltiplos idiomas.'
  }
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Sobre a AreLuna INNSiDE
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Transformando vidas através da educação odontológica de excelência, 
              conectando profissionais e democratizando o conhecimento.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-brand font-bold text-grey-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-grey-600 mb-6">
                Democratizar o acesso à educação odontológica de qualidade, conectando profissionais 
                de todo o Brasil e América Latina através de uma plataforma inovadora e acessível.
              </p>
              <p className="text-grey-600 mb-8">
                Acreditamos que o conhecimento deve ser compartilhado e que cada profissional 
                merece ter acesso às melhores práticas e técnicas da odontologia moderna.
              </p>
              <Link 
                href="/contato"
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3"
              >
                Conheça Nossa Equipe
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gold-500 to-glossy-400 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                <p className="text-gold-100 mb-6">
                  Ser a principal referência em educação odontológica online na América Latina, 
                  formando uma comunidade global de profissionais excelentes.
                </p>
                <div className="border-t border-gold-300 pt-4">
                  <h4 className="font-bold mb-2">Nossos Valores</h4>
                  <ul className="space-y-1 text-sm text-gold-100">
                    <li>• Excelência em tudo que fazemos</li>
                    <li>• Inovação constante</li>
                    <li>• Transparência e ética</li>
                    <li>• Compromisso com resultados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-grey-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Os princípios que guiam nossa atuação e definem nossa identidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{valor.icone}</div>
                <h3 className="text-lg font-brand font-bold text-grey-900 mb-3">
                  {valor.titulo}
                </h3>
                <p className="text-grey-600 text-sm">
                  {valor.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Números que Impressionam
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Resultados que comprovam nosso compromisso com a excelência
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {numeros.map((numero, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                  {numero.valor}
                </div>
                <div className="text-grey-600">{numero.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-grey-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Nossa História
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Uma jornada de crescimento e inovação em educação odontológica
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-200"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                    {item.ano}
                  </div>
                  <div className="ml-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-1">
                    <h3 className="text-lg font-bold text-grey-900 mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-grey-600">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Profissionais dedicados e apaixonados por educação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-glossy-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                CEO
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Direção Executiva</h3>
              <p className="text-grey-600 text-sm mb-4">
                Liderança estratégica e visão de futuro para o crescimento da plataforma.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-glossy-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                EDU
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Equipe Pedagógica</h3>
              <p className="text-grey-600 text-sm mb-4">
                Especialistas em educação que desenvolvem conteúdos de alta qualidade.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-glossy-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                SUP
              </div>
              <h3 className="text-lg font-bold text-grey-900 mb-2">Suporte Técnico</h3>
              <p className="text-grey-600 text-sm mb-4">
                Equipe especializada para garantir a melhor experiência dos nossos usuários.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-grey-900 to-grey-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Faça parte da nossa história
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram suas carreiras 
            com a AreLuna INNSiDE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/cadastro"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
            >
              Começar Agora
            </Link>
            <Link 
              href="/contato"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-2 border-grey-300 bg-transparent hover:bg-grey-50 focus:ring-grey-500 px-6 py-3 text-lg border-white text-white hover:bg-white/10"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
