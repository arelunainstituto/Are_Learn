import React from 'react';
import Link from 'next/link';

const categorias = [
  {
    id: 1,
    nome: 'Implantodontia',
    descricao: 'Cursos especializados em implantes dentários, técnicas cirúrgicas e reabilitação oral.',
    cor: 'bg-blue-500',
    corClara: 'bg-blue-100',
    corTexto: 'text-blue-800',
    cursos: 12,
    instrutores: 8,
    icone: '🦷'
  },
  {
    id: 2,
    nome: 'Ortodontia',
    descricao: 'Tratamentos ortodônticos, aparelhos modernos e ortodontia digital.',
    cor: 'bg-green-500',
    corClara: 'bg-green-100',
    corTexto: 'text-green-800',
    cursos: 15,
    instrutores: 10,
    icone: '🦷'
  },
  {
    id: 3,
    nome: 'Periodontia',
    descricao: 'Tratamento de doenças gengivais, cirurgia periodontal e estética gengival.',
    cor: 'bg-purple-500',
    corClara: 'bg-purple-100',
    corTexto: 'text-purple-800',
    cursos: 8,
    instrutores: 6,
    icone: '🦷'
  },
  {
    id: 4,
    nome: 'Endodontia',
    descricao: 'Tratamento de canal, técnicas endodônticas e microcirurgia.',
    cor: 'bg-red-500',
    corClara: 'bg-red-100',
    corTexto: 'text-red-800',
    cursos: 10,
    instrutores: 7,
    icone: '🦷'
  },
  {
    id: 5,
    nome: 'Prótese Dentária',
    descricao: 'Reabilitação oral, próteses fixas e removíveis, estética dental.',
    cor: 'bg-yellow-500',
    corClara: 'bg-yellow-100',
    corTexto: 'text-yellow-800',
    cursos: 14,
    instrutores: 9,
    icone: '🦷'
  },
  {
    id: 6,
    nome: 'Odontopediatria',
    descricao: 'Atendimento infantil, prevenção e tratamento em crianças.',
    cor: 'bg-pink-500',
    corClara: 'bg-pink-100',
    corTexto: 'text-pink-800',
    cursos: 6,
    instrutores: 4,
    icone: '🦷'
  },
  {
    id: 7,
    nome: 'Cirurgia Oral',
    descricao: 'Extração de terceiros molares, cirurgias complexas e enxertos.',
    cor: 'bg-indigo-500',
    corClara: 'bg-indigo-100',
    corTexto: 'text-indigo-800',
    cursos: 9,
    instrutores: 6,
    icone: '🦷'
  },
  {
    id: 8,
    nome: 'Estética Dental',
    descricao: 'Facetas, clareamento, harmonização facial e estética do sorriso.',
    cor: 'bg-teal-500',
    corClara: 'bg-teal-100',
    corTexto: 'text-teal-800',
    cursos: 11,
    instrutores: 8,
    icone: '🦷'
  },
  {
    id: 9,
    nome: 'Gestão Clínica',
    descricao: 'Administração de consultório, marketing digital e gestão financeira.',
    cor: 'bg-orange-500',
    corClara: 'bg-orange-100',
    corTexto: 'text-orange-800',
    cursos: 7,
    instrutores: 5,
    icone: '📊'
  }
];

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Categorias de Cursos
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Explore nossa ampla gama de especialidades odontológicas e encontre o curso ideal para sua carreira.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-grey-200">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">9</div>
              <div className="text-grey-600">Especialidades</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">100+</div>
              <div className="text-grey-600">Cursos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">50+</div>
              <div className="text-grey-600">Instrutores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">10k+</div>
              <div className="text-grey-600">Alunos Ativos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Escolha sua especialidade
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Cursos organizados por área de atuação para facilitar seu aprendizado e desenvolvimento profissional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <Link 
                key={categoria.id} 
                href={`/cursos?categoria=${categoria.id}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${categoria.cor} flex items-center justify-center text-white text-2xl`}>
                      {categoria.icone}
                    </div>
                    <div>
                      <h3 className="text-lg font-brand font-bold text-grey-900 group-hover:text-gold-500 transition-colors">
                        {categoria.nome}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-grey-500">
                        <span>{categoria.cursos} cursos</span>
                        <span>•</span>
                        <span>{categoria.instrutores} instrutores</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-grey-600 text-sm mb-4 line-clamp-2">
                    {categoria.descricao}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoria.corClara} ${categoria.corTexto}`}>
                        {categoria.cursos} cursos
                      </span>
                    </div>
                    <div className="flex items-center text-gold-500 group-hover:text-gold-600 transition-colors">
                      <span className="text-sm font-medium">Explorar</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Categorias em Destaque
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              As especialidades mais procuradas pelos nossos alunos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categorias.slice(0, 3).map((categoria) => (
              <div key={categoria.id} className="relative bg-gradient-to-br from-grey-900 to-grey-800 rounded-xl overflow-hidden text-white">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${categoria.cor} flex items-center justify-center text-white text-2xl`}>
                      {categoria.icone}
                    </div>
                    <div>
                      <h3 className="text-xl font-brand font-bold">
                        {categoria.nome}
                      </h3>
                      <p className="text-grey-300 text-sm">
                        {categoria.cursos} cursos disponíveis
                      </p>
                    </div>
                  </div>

                  <p className="text-grey-300 text-sm mb-6 line-clamp-2">
                    {categoria.descricao}
                  </p>

                  <Link 
                    href={`/cursos?categoria=${categoria.id}`}
                    className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-4 py-2 text-sm"
                  >
                    Ver Cursos
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-grey-900 to-grey-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e sugira novas categorias ou cursos que gostaria de ver na plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contato"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
            >
              Sugerir Categoria
            </Link>
            <Link 
              href="/cursos"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-2 border-grey-300 bg-transparent hover:bg-grey-50 focus:ring-grey-500 px-6 py-3 text-lg border-white text-white hover:bg-white/10"
            >
              Ver Todos os Cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
