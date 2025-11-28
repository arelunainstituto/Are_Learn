import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { LocalAvatar } from '@/components/ui/LocalAvatar';
import { getAllUsers } from '@/scripts/migrate-colaboradores';

const colaboradores = getAllUsers();

// Agrupar por departamento
const colaboradoresPorDepartamento = colaboradores.reduce((acc, colaborador) => {
  const dept = colaborador.departamento || 'Outros';
  if (!acc[dept]) {
    acc[dept] = [];
  }
  acc[dept].push(colaborador);
  return acc;
}, {} as Record<string, typeof colaboradores>);

export default function ColaboradoresPage() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Nossa Equipe
            </h1>
            <p className="text-xl text-gold-100 mb-8">
              Conheça os profissionais que fazem da AreLuna uma referência em educação odontológica.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-grey-200">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">{colaboradores.length}</div>
              <div className="text-grey-600">Colaboradores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                {Object.keys(colaboradoresPorDepartamento).length}
              </div>
              <div className="text-grey-600">Departamentos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                {colaboradores.filter(c => c.is_instrutor).length}
              </div>
              <div className="text-grey-600">Instrutores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                {colaboradores.filter(c => c.is_admin).length}
              </div>
              <div className="text-grey-600">Administradores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Colaboradores por Departamento */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-brand font-bold text-grey-900 mb-4">
              Nossa equipe por departamento
            </h2>
            <p className="text-grey-600 max-w-2xl mx-auto">
              Profissionais especializados trabalhando juntos para oferecer a melhor experiência educacional
            </p>
          </div>

          {Object.entries(colaboradoresPorDepartamento).map(([departamento, colaboradoresDept]) => (
            <div key={departamento} className="mb-12">
              <h3 className="text-2xl font-brand font-bold text-grey-900 mb-6 border-b border-gold-200 pb-2">
                {departamento} ({colaboradoresDept.length})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colaboradoresDept.map((colaborador) => (
                  <div key={colaborador.id} className="bg-white rounded-lg shadow-sm border border-grey-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        {colaborador.avatar ? (
                          <SafeImage
                            src={colaborador.avatar}
                            alt={colaborador.nome}
                            width={64}
                            height={64}
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <LocalAvatar
                            name={colaborador.nome}
                            size={64}
                            className="w-full h-full"
                          />
                        )}
                      </div>

                      {/* Informações */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-bold text-grey-900 truncate">
                            {colaborador.nome}
                          </h4>
                          <div className="flex gap-1 ml-2">
                            {colaborador.is_admin && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                Admin
                              </span>
                            )}
                            {colaborador.is_instrutor && (
                              <span className="bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full font-medium">
                                Instrutor
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-gold-500 font-medium text-sm mb-1">
                          {colaborador.cargo}
                        </p>

                        <p className="text-grey-600 text-sm mb-2">
                          {colaborador.especialidade}
                        </p>

                        <div className="text-xs text-grey-500 mb-2">
                          <span className="font-medium">Localização:</span> {colaborador.cidade}, {colaborador.pais}
                        </div>

                        {colaborador.bio && (
                          <p className="text-grey-600 text-sm line-clamp-2">
                            {colaborador.bio}
                          </p>
                        )}

                        {/* Stats para instrutores */}
                        {colaborador.is_instrutor && (
                          <div className="flex items-center gap-4 mt-3 text-xs text-grey-500">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-grey-900">{colaborador.total_cursos}</span>
                              <span>cursos</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-grey-900">{colaborador.total_alunos}</span>
                              <span>alunos</span>
                            </div>
                          </div>
                        )}

                        {/* Data de entrada */}
                        <div className="text-xs text-grey-400 mt-2">
                          Entrou em: {new Date(colaborador.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-grey-900 to-grey-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Quer fazer parte da nossa equipe?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Estamos sempre em busca de profissionais talentosos para se juntar à nossa missão de transformar a educação odontológica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contato"
              className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-sm hover:shadow-md px-6 py-3 text-lg"
            >
              Ver Vagas Disponíveis
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
