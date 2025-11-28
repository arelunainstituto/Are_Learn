import React from 'react';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    titulo: 'Tendências em Implantodontia 2024',
    resumo: 'Descubra as principais inovações e técnicas que estão revolucionando a implantodontia.',
    autor: 'Dr. Carlos Eduardo',
    data: '15 Jan 2024',
    categoria: 'Implantodontia',
    tempoLeitura: '5 min',
    imagem: '/blog/implantodontia-2024.jpg',
    destaque: true
  },
  {
    id: 2,
    titulo: 'Ortodontia Digital: O Futuro é Agora',
    resumo: 'Como a tecnologia 3D está transformando o planejamento e execução de tratamentos ortodônticos.',
    autor: 'Dra. Ana Paula',
    data: '12 Jan 2024',
    categoria: 'Ortodontia',
    tempoLeitura: '7 min',
    imagem: '/blog/ortodontia-digital.jpg',
    destaque: false
  },
  {
    id: 3,
    titulo: 'Gestão de Consultório: Dicas Práticas',
    resumo: 'Estratégias eficazes para otimizar a administração do seu consultório odontológico.',
    autor: 'Dr. Roberto Silva',
    data: '10 Jan 2024',
    categoria: 'Gestão',
    tempoLeitura: '6 min',
    imagem: '/blog/gestao-consultorio.jpg',
    destaque: false
  },
  {
    id: 4,
    titulo: 'Periodontia Estética: Técnicas Modernas',
    resumo: 'Abordagens contemporâneas para tratamentos periodontais com foco na estética.',
    autor: 'Dra. Maria Fernanda',
    data: '8 Jan 2024',
    categoria: 'Periodontia',
    tempoLeitura: '8 min',
    imagem: '/blog/periodontia-estetica.jpg',
    destaque: false
  },
  {
    id: 5,
    titulo: 'Marketing Digital para Dentistas',
    resumo: 'Como usar as redes sociais e ferramentas digitais para atrair mais pacientes.',
    autor: 'Equipe AreLuna',
    data: '5 Jan 2024',
    categoria: 'Marketing',
    tempoLeitura: '10 min',
    imagem: '/blog/marketing-digital.jpg',
    destaque: false
  },
  {
    id: 6,
    titulo: 'Endodontia: Casos Complexos',
    resumo: 'Abordagem detalhada para tratamento de canais em situações de alta complexidade.',
    autor: 'Dr. João Pedro',
    data: '3 Jan 2024',
    categoria: 'Endodontia',
    tempoLeitura: '12 min',
    imagem: '/blog/endodontia-complexa.jpg',
    destaque: false
  }
];

const categorias = [
  'Todas',
  'Implantodontia',
  'Ortodontia',
  'Periodontia',
  'Endodontia',
  'Gestão',
  'Marketing',
  'Tecnologia'
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Blog AreLuna
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Artigos, dicas e insights sobre odontologia, gestão e tecnologia para profissionais da área.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gold-100 text-gold-800 mb-4">
                📌 Destaque
              </div>
              <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
                {posts[0].titulo}
              </h2>
              <p className="text-lg text-grey-600 mb-6">
                {posts[0].resumo}
              </p>
              <div className="flex items-center gap-4 text-sm text-grey-500 mb-6">
                <span>Por {posts[0].autor}</span>
                <span>•</span>
                <span>{posts[0].data}</span>
                <span>•</span>
                <span>{posts[0].tempoLeitura} de leitura</span>
              </div>
              <Link 
                href={`/blog/${posts[0].id}`}
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3"
              >
                Ler Artigo Completo
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-gold-500 to-glossy-400 rounded-xl flex items-center justify-center text-white text-6xl">
                🦷
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-grey-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? 'bg-gold-500 text-white' 
                    : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gold-500 to-glossy-400 flex items-center justify-center text-white text-4xl">
                  🦷
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                      {post.categoria}
                    </span>
                    <span className="text-xs text-grey-500">{post.tempoLeitura}</span>
                  </div>

                  <h3 className="text-lg font-brand font-bold text-grey-900 mb-2 line-clamp-2">
                    {post.titulo}
                  </h3>
                  
                  <p className="text-grey-600 text-sm mb-4 line-clamp-2">
                    {post.resumo}
                  </p>

                  <div className="flex items-center justify-between text-sm text-grey-500 mb-4">
                    <span>Por {post.autor}</span>
                    <span>{post.data}</span>
                  </div>

                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-gold-500 hover:text-gold-600 font-medium text-sm"
                  >
                    Ler mais
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-2 border-grey-300 bg-transparent hover:bg-grey-50 focus:ring-grey-500 px-6 py-3 text-base border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
              Carregar Mais Artigos
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-grey-900 to-grey-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Receba nossos artigos
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Cadastre-se em nossa newsletter e receba os melhores conteúdos sobre odontologia 
            diretamente no seu email.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-3 rounded-lg text-grey-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <button className="px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium">
                Inscrever
              </button>
            </div>
            <p className="text-sm text-grey-400 mt-2">
              Não enviamos spam. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
            Quer escrever para nosso blog?
          </h2>
          <p className="text-grey-600 mb-8 max-w-2xl mx-auto">
            Compartilhe seu conhecimento e ajude outros profissionais a crescerem na carreira.
          </p>
          <Link 
            href="/contato"
            className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
          >
            Seja um Colaborador
          </Link>
        </div>
      </section>
    </div>
  );
}
