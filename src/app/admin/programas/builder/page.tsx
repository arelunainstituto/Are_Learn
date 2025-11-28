'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgramBuilder } from '@/components/programa/ProgramBuilder';
import { Program, CourseSet, CourseSetItem, Curso } from '@/types';

// Mock data - substituir por dados reais do Supabase
const mockProgram: Program = {
  id: '1',
  titulo: 'Trilha de Implantodontia Avançada',
  descricao: 'Programa completo de especialização em implantodontia com casos clínicos reais e técnicas avançadas.',
  imagem: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
  tenant_id: 'default-tenant',
  status: 'draft',
  enrollment_type: 'self',
  created_at: '2024-01-01',
  updated_at: '2024-01-01'
};

const mockCourseSets: CourseSet[] = [
  {
    id: '1',
    program_id: '1',
    titulo: 'Fundamentos da Implantodontia',
    completion_type: 'all_in_order',
    ordem: 1,
    completion_delay_days: 0
  },
  {
    id: '2',
    program_id: '1',
    parent_set_id: '1',
    titulo: 'Técnicas Cirúrgicas',
    completion_type: 'all_any_order',
    required_count: 2,
    ordem: 2,
    completion_delay_days: 7
  },
  {
    id: '3',
    program_id: '1',
    titulo: 'Casos Clínicos Avançados',
    completion_type: 'min_points',
    required_points: 50,
    ordem: 3,
    completion_delay_days: 0
  }
];

const mockCourseSetItems: CourseSetItem[] = [
  {
    id: '1',
    course_set_id: '1',
    curso_id: 'curso-1',
    points: 10,
    is_required: true,
    ordem: 1
  },
  {
    id: '2',
    course_set_id: '1',
    curso_id: 'curso-2',
    points: 15,
    is_required: true,
    ordem: 2
  },
  {
    id: '3',
    course_set_id: '2',
    curso_id: 'curso-3',
    points: 20,
    is_required: true,
    ordem: 1
  },
  {
    id: '4',
    course_set_id: '2',
    curso_id: 'curso-4',
    points: 25,
    is_required: false,
    ordem: 2
  },
  {
    id: '5',
    course_set_id: '3',
    curso_id: 'curso-5',
    points: 30,
    is_required: true,
    ordem: 1
  }
];

const mockAvailableCourses: Curso[] = [
  {
    id: 'curso-1',
    titulo: 'Anatomia Oral para Implantes',
    descricao: 'Fundamentos da anatomia oral aplicada à implantodontia',
    descricao_curta: 'Anatomia oral para implantes',
    thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80',
    banner: '',
    instrutor_id: '1',
    categoria_id: '1',
    nivel: 'iniciante',
    duracao_total: 120,
    total_modulos: 4,
    total_aulas: 20,
    destaque: false,
    publicado: true,
    tags: ['anatomia', 'implantes'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01'
  },
  {
    id: 'curso-2',
    titulo: 'Planejamento Digital de Implantes',
    descricao: 'Técnicas modernas de planejamento digital para implantes',
    descricao_curta: 'Planejamento digital de implantes',
    thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    banner: '',
    instrutor_id: '2',
    categoria_id: '1',
    nivel: 'intermediario',
    duracao_total: 180,
    total_modulos: 6,
    total_aulas: 30,
    destaque: true,
    publicado: true,
    tags: ['digital', 'planejamento'],
    criado_em: '2024-01-02',
    atualizado_em: '2024-01-02'
  },
  {
    id: 'curso-3',
    titulo: 'Cirurgia de Implantes - Técnicas Básicas',
    descricao: 'Técnicas cirúrgicas fundamentais para implantes',
    descricao_curta: 'Cirurgia de implantes básica',
    thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80',
    banner: '',
    instrutor_id: '1',
    categoria_id: '1',
    nivel: 'intermediario',
    duracao_total: 240,
    total_modulos: 8,
    total_aulas: 40,
    destaque: false,
    publicado: true,
    tags: ['cirurgia', 'implantes'],
    criado_em: '2024-01-03',
    atualizado_em: '2024-01-03'
  },
  {
    id: 'curso-4',
    titulo: 'Cirurgia de Implantes - Técnicas Avançadas',
    descricao: 'Técnicas cirúrgicas avançadas e casos complexos',
    descricao_curta: 'Cirurgia de implantes avançada',
    thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    banner: '',
    instrutor_id: '1',
    categoria_id: '1',
    nivel: 'avancado',
    duracao_total: 300,
    total_modulos: 10,
    total_aulas: 50,
    destaque: true,
    publicado: true,
    tags: ['cirurgia', 'avançado'],
    criado_em: '2024-01-04',
    atualizado_em: '2024-01-04'
  },
  {
    id: 'curso-5',
    titulo: 'Casos Clínicos Complexos',
    descricao: 'Análise e resolução de casos clínicos complexos',
    descricao_curta: 'Casos clínicos complexos',
    thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80',
    banner: '',
    instrutor_id: '2',
    categoria_id: '1',
    nivel: 'avancado',
    duracao_total: 360,
    total_modulos: 12,
    total_aulas: 60,
    destaque: true,
    publicado: true,
    tags: ['casos', 'complexos'],
    criado_em: '2024-01-05',
    atualizado_em: '2024-01-05'
  }
];

export default function ProgramBuilderPage() {
  const router = useRouter();
  const [program, setProgram] = useState<Program>(mockProgram);
  const [courseSets, setCourseSets] = useState<CourseSet[]>(mockCourseSets);
  const [courseSetItems, setCourseSetItems] = useState<CourseSetItem[]>(mockCourseSetItems);
  const [availableCourses, setAvailableCourses] = useState<Curso[]>(mockAvailableCourses);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (updatedProgram: Program, updatedCourseSets: CourseSet[], updatedCourseSetItems: CourseSetItem[]) => {
    setIsSaving(true);
    try {
      // TODO: Implementar API call para salvar programa
      console.log('Salvando programa:', {
        program: updatedProgram,
        courseSets: updatedCourseSets,
        courseSetItems: updatedCourseSetItems
      });
      
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar estado local
      setProgram(updatedProgram);
      setCourseSets(updatedCourseSets);
      setCourseSetItems(updatedCourseSetItems);
      
      console.log('Programa salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar programa:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCourseSet = (parentId?: string) => {
    const newCourseSet: CourseSet = {
      id: `course-set-${Date.now()}`,
      program_id: program.id,
      parent_set_id: parentId,
      titulo: 'Novo Conjunto de Cursos',
      completion_type: 'all_in_order',
      ordem: courseSets.length + 1,
      completion_delay_days: 0
    };
    
    setCourseSets([...courseSets, newCourseSet]);
  };

  const handleAddCourseToSet = (courseSetId: string, courseId: string) => {
    const newItem: CourseSetItem = {
      id: `course-set-item-${Date.now()}`,
      course_set_id: courseSetId,
      curso_id: courseId,
      points: 10,
      is_required: true,
      ordem: courseSetItems.filter(item => item.course_set_id === courseSetId).length + 1
    };
    
    setCourseSetItems([...courseSetItems, newItem]);
  };

  const handleRemoveCourseSet = (courseSetId: string) => {
    setCourseSets(courseSets.filter(cs => cs.id !== courseSetId));
    setCourseSetItems(courseSetItems.filter(item => item.course_set_id !== courseSetId));
  };

  const handleRemoveCourseFromSet = (courseSetItemId: string) => {
    setCourseSetItems(courseSetItems.filter(item => item.id !== courseSetItemId));
  };

  const handleUpdateCourseSet = (courseSetId: string, updates: Partial<CourseSet>) => {
    setCourseSets(courseSets.map(cs => 
      cs.id === courseSetId ? { ...cs, ...updates } : cs
    ));
  };

  const handleUpdateCourseSetItem = (courseSetItemId: string, updates: Partial<CourseSetItem>) => {
    setCourseSetItems(courseSetItems.map(item => 
      item.id === courseSetItemId ? { ...item, ...updates } : item
    ));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar
          </Button>
          
          <div>
            <h1 className="text-2xl font-brand font-bold text-grey-900">
              Construtor de Programa
            </h1>
            <p className="text-grey-600">
              {program.titulo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/programas/${program.id}`)}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          
          <Button
            variant="primary"
            onClick={() => handleSave(program, courseSets, courseSetItems)}
            disabled={isSaving}
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Save size={16} className="mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Programa'}
          </Button>
        </div>
      </div>

      {/* Builder */}
      <ProgramBuilder
        program={program}
        courseSets={courseSets}
        courseSetItems={courseSetItems}
        availableCourses={availableCourses}
        onSave={handleSave}
        onAddCourseSet={handleAddCourseSet}
        onAddCourseToSet={handleAddCourseToSet}
        onRemoveCourseSet={handleRemoveCourseSet}
        onRemoveCourseFromSet={handleRemoveCourseFromSet}
        onUpdateCourseSet={handleUpdateCourseSet}
        onUpdateCourseSetItem={handleUpdateCourseSetItem}
      />
    </div>
  );
}
