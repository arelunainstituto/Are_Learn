import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { LocalAvatar } from '@/components/ui/LocalAvatar';
import { getInstrutores } from '@/scripts/migrate-colaboradores';

const instrutores = getInstrutores();

export default function InstrutoresPage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Nossos Instrutores
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Especialistas renomados com anos de experiência e conhecimento de ponta em suas áreas de atuação.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-grey-200">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">{instrutores.length}+</div>
              <div className="text-grey-600">Instrutores Especialistas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">15+</div>
              <div className="text-grey-600">Anos de Experiência Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">100+</div>
              <div className="text-grey-600">Cursos Desenvolvidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">10K+</div>
              <div className="text-grey-600">Alunos Formados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Instrutores Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Conheça nossa equipe de especialistas
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Profissionais altamente qualificados com vasta experiência em suas áreas de especialização
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instrutores.map((instrutor) => (
              <div key={instrutor.id} className="bg-white rounded-xl shadow-sm border border-grey-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Avatar */}
                <div className="relative h-48 bg-gradient-to-br from-gold-500 to-glossy-400 flex items-center justify-center">
                  {instrutor.avatar ? (
                    <SafeImage
                      src={instrutor.avatar}
                      alt={instrutor.nome}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <LocalAvatar
                      name={instrutor.nome}
                      size={120}
                      className="border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      {instrutor.is_admin && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Admin
                        </span>
                      )}
                      <span className="bg-gold-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Instrutor
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="text-xl font-brand font-bold text-grey-900 mb-2">
                    {instrutor.nome}
                  </h3>
                  
                  <p className="text-gold-500 font-medium mb-3">
                    {instrutor.especialidade}
                  </p>
                  
                  <p className="text-grey-600 text-sm mb-4 line-clamp-3">
                    {instrutor.bio}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-grey-500 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-grey-900">{instrutor.total_cursos}</span>
                      <span>cursos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-grey-900">{instrutor.total_alunos}</span>
                      <span>alunos</span>
                    </div>
                  </div>

                  {/* Departamento */}
                  <div className="text-xs text-grey-500 mb-4">
                    <span className="font-medium">Departamento:</span> {instrutor.departamento}
                  </div>

                  {/* Localização */}
                  <div className="text-xs text-grey-500 mb-4">
                    <span className="font-medium">Localização:</span> {instrutor.cidade}, {instrutor.pais}
                  </div>

                  {/* Certificações */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-grey-700 mb-2">Especialidades:</div>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-grey-100 text-grey-700 text-xs px-2 py-1 rounded">
                        {instrutor.especialidade}
                      </span>
                      {instrutor.departamento !== instrutor.especialidade && (
                        <span className="bg-grey-100 text-grey-700 text-xs px-2 py-1 rounded">
                          {instrutor.departamento}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Botão de Contato */}
                  <Link 
                    href={`/contato?instrutor=${encodeURIComponent(instrutor.nome)}`}
                    className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-4 py-2 text-sm"
                  >
                    Entrar em Contato
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
            Quer se tornar um instrutor?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Junte-se à nossa equipe de especialistas e compartilhe seu conhecimento com milhares de profissionais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contato"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
            >
              Candidatar-se como Instrutor
            </Link>
            <Link 
              href="/sobre"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-2 border-grey-300 bg-transparent hover:bg-grey-50 focus:ring-grey-500 px-6 py-3 text-lg border-white text-white hover:bg-white/10"
            >
              Conhecer a AreLuna
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}