'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Eye, Edit, Trash2, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProgramCard } from '@/components/programa/ProgramCard';
import { Program, ProgramEnrollment } from '@/types';

// Mock data - substituir por dados reais do Supabase
const mockPrograms: Program[] = [
  {
    id: '1',
    titulo: 'Trilha de Implantodontia Avançada',
    descricao: 'Programa completo de especialização em implantodontia com casos clínicos reais e técnicas avançadas.',
    imagem: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
    tenant_id: 'default-tenant',
    status: 'published',
    enrollment_type: 'self',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    titulo: 'Gestão Odontológica Completa',
    descricao: 'Aprenda a gerir sua clínica de forma eficiente com foco em resultados e satisfação do paciente.',
    imagem: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tenant_id: 'default-tenant',
    status: 'published',
    enrollment_type: 'approval',
    created_at: '2024-01-05',
    updated_at: '2024-01-05'
  },
  {
    id: '3',
    titulo: 'Ortodontia Digital Moderna',
    descricao: 'Explore as inovações da ortodontia digital com planejamento 3D e execução precisa.',
    imagem: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80',
    tenant_id: 'default-tenant',
    status: 'draft',
    enrollment_type: 'manual',
    created_at: '2024-01-10',
    updated_at: '2024-01-10'
  }
];

const mockEnrollments: ProgramEnrollment[] = [
  {
    id: '1',
    program_id: '1',
    user_id: 'user-1',
    status: 'active',
    progress_percentage: 65.5,
    started_at: '2024-01-15',
    total_points: 100,
    earned_points: 65
  }
];

export default function AdminProgramasPage() {
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [enrollments, setEnrollments] = useState<ProgramEnrollment[]>(mockEnrollments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [enrollmentFilter, setEnrollmentFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filtrar programas
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    const matchesEnrollment = enrollmentFilter === 'all' || program.enrollment_type === enrollmentFilter;
    
    return matchesSearch && matchesStatus && matchesEnrollment;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDeleteProgram = async (programId: string) => {
    if (!confirm('Tem certeza que deseja deletar este programa?')) return;
    
    setIsLoading(true);
    try {
      // TODO: Implementar API call para deletar programa
      setPrograms(programs.filter(p => p.id !== programId));
      console.log('Programa deletado:', programId);
    } catch (error) {
      console.error('Erro ao deletar programa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollUser = async (programId: string) => {
    // TODO: Implementar lógica de inscrição
    console.log('Inscrever usuário no programa:', programId);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Gerenciar Programas
          </h1>
          <p className="text-grey-600">
            Crie e gerencie trilhas de aprendizagem para seus alunos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/programas/novo">
            <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Plus size={16} className="mr-2" />
              Novo Programa
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{programs.length}</div>
              <div className="text-sm text-grey-600">Total de Programas</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {programs.filter(p => p.status === 'published').length}
              </div>
              <div className="text-sm text-grey-600">Publicados</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {enrollments.length}
              </div>
              <div className="text-sm text-grey-600">Inscrições Ativas</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {enrollments.filter(e => e.status === 'completed').length}
              </div>
              <div className="text-sm text-grey-600">Concluídos</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar programas..."
              onSearch={handleSearch}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todos os Status</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>

            <select
              value={enrollmentFilter}
              onChange={(e) => setEnrollmentFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todos os Tipos</option>
              <option value="manual">Manual</option>
              <option value="self">Auto-inscrição</option>
              <option value="approval">Aprovação</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => {
          const enrollment = enrollments.find(e => e.program_id === program.id);
          
          return (
            <div key={program.id} className="relative">
              <ProgramCard
                program={program}
                enrollment={enrollment}
                showProgress={true}
                onEnroll={handleEnrollUser}
              />
              
              {/* Admin Actions */}
              <div className="absolute top-2 right-2 flex gap-1">
                <Link href={`/admin/programas/${program.id}`}>
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <Eye size={14} />
                  </Button>
                </Link>
                <Link href={`/admin/programas/${program.id}/editar`}>
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <Edit size={14} />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteProgram(program.id)}
                  disabled={isLoading}
                  className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPrograms.length === 0 && (
        <Card className="p-8 text-center">
          <BookOpen size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum programa encontrado
          </h3>
          <p className="text-grey-600 mb-4">
            {searchQuery || statusFilter !== 'all' || enrollmentFilter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece criando seu primeiro programa de aprendizagem'
            }
          </p>
          {!searchQuery && statusFilter === 'all' && enrollmentFilter === 'all' && (
            <Link href="/admin/programas/novo">
              <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
                <Plus size={16} className="mr-2" />
                Criar Primeiro Programa
              </Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}
