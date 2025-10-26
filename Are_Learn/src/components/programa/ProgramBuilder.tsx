'use client';

import { useState, useCallback } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Eye, 
  ChevronDown, 
  ChevronRight,
  GripVertical,
  BookOpen,
  Settings
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Program, CourseSet, CourseSetItem, Curso } from '@/types';

interface ProgramBuilderProps {
  program: Program;
  courseSets: CourseSet[];
  courseSetItems: CourseSetItem[];
  availableCourses: Curso[];
  onSave: (program: Program, courseSets: CourseSet[], courseSetItems: CourseSetItem[]) => void;
  onAddCourseSet: (parentId?: string) => void;
  onAddCourseToSet: (courseSetId: string, courseId: string) => void;
  onRemoveCourseSet: (courseSetId: string) => void;
  onRemoveCourseFromSet: (courseSetItemId: string) => void;
  onUpdateCourseSet: (courseSetId: string, updates: Partial<CourseSet>) => void;
  onUpdateCourseSetItem: (courseSetItemId: string, updates: Partial<CourseSetItem>) => void;
}

interface DraggableCourseSetProps {
  courseSet: CourseSet;
  items: CourseSetItem[];
  availableCourses: Curso[];
  level: number;
  onAddCourse: (courseSetId: string, courseId: string) => void;
  onRemoveCourse: (courseSetItemId: string) => void;
  onUpdateCourseSet: (courseSetId: string, updates: Partial<CourseSet>) => void;
  onUpdateCourseSetItem: (courseSetItemId: string, updates: Partial<CourseSetItem>) => void;
  onRemoveCourseSet: (courseSetId: string) => void;
}

function DraggableCourseSet({
  courseSet,
  items,
  availableCourses,
  level,
  onAddCourse,
  onRemoveCourse,
  onUpdateCourseSet,
  onUpdateCourseSetItem,
  onRemoveCourseSet
}: DraggableCourseSetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(courseSet.titulo);

  const handleSave = () => {
    onUpdateCourseSet(courseSet.id, { titulo: editTitle });
    setIsEditing(false);
  };

  const getCourseById = (courseId: string) => 
    availableCourses.find(c => c.id === courseId);

  return (
    <Card className="mb-4">
      {/* Course Set Header */}
      <div className="p-4 border-b border-grey-200">
        <div className="flex items-center gap-3">
          <GripVertical size={16} className="text-grey-400 cursor-move" />
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-grey-500 hover:text-grey-700"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            <BookOpen size={16} className="text-gold-500" />
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 px-2 py-1 border border-grey-300 rounded text-sm"
                  autoFocus
                />
                <Button size="sm" onClick={handleSave}>
                  <Save size={14} />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-grey-900">{courseSet.titulo}</h4>
                <Badge variant="secondary" className="bg-glossy-100 text-glossy-800">
                  {items.length} cursos
                </Badge>
                <Badge variant="info" className="bg-blue-100 text-blue-800">
                  {courseSet.completion_type === 'all_in_order' && 'Todos em ordem'}
                  {courseSet.completion_type === 'all_any_order' && 'Todos em qualquer ordem'}
                  {courseSet.completion_type === 'at_least_x' && `Pelo menos ${courseSet.required_count}`}
                  {courseSet.completion_type === 'min_points' && `Mínimo ${courseSet.required_points} pts`}
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit size={14} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemoveCourseSet(courseSet.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Course Set Items */}
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-2">
            {items.map((item) => {
              const course = getCourseById(item.curso_id);
              if (!course) return null;

              return (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-grey-50 rounded-lg">
                  <GripVertical size={14} className="text-grey-400 cursor-move" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-grey-900">{course.titulo}</h5>
                      <input
                        type="number"
                        value={item.points}
                        onChange={(e) => onUpdateCourseSetItem(item.id, { points: parseInt(e.target.value) || 0 })}
                        className="w-16 px-2 py-1 border border-grey-300 rounded text-sm"
                        placeholder="Pontos"
                      />
                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={item.is_required}
                          onChange={(e) => onUpdateCourseSetItem(item.id, { is_required: e.target.checked })}
                        />
                        Obrigatório
                      </label>
                    </div>
                    <p className="text-sm text-grey-600">{course.descricao_curta}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRemoveCourse(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Add Course Button */}
          <div className="mt-4">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onAddCourse(courseSet.id, e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="">Adicionar curso ao conjunto...</option>
              {availableCourses
                .filter(course => !items.some(item => item.curso_id === course.id))
                .map(course => (
                  <option key={course.id} value={course.id}>
                    {course.titulo}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
    </Card>
  );
}

export function ProgramBuilder({
  program,
  courseSets,
  courseSetItems,
  availableCourses,
  onSave,
  onAddCourseSet,
  onAddCourseToSet,
  onRemoveCourseSet,
  onRemoveCourseFromSet,
  onUpdateCourseSet,
  onUpdateCourseSetItem
}: ProgramBuilderProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Agrupar items por course set
  const itemsBySet = courseSetItems.reduce((acc, item) => {
    if (!acc[item.course_set_id]) {
      acc[item.course_set_id] = [];
    }
    acc[item.course_set_id].push(item);
    return acc;
  }, {} as Record<string, CourseSetItem[]>);

  const handleSave = () => {
    onSave(program, courseSets, courseSetItems);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Construtor de Programa
          </h1>
          <p className="text-grey-600">
            {program.titulo} - Estrutura e configuração
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? <Edit size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
            {isPreviewMode ? 'Editar' : 'Preview'}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Save size={16} className="mr-2" />
            Salvar Programa
          </Button>
        </div>
      </div>

      {/* Program Settings */}
      <Card className="mb-6 p-4">
        <h3 className="text-lg font-medium text-grey-900 mb-4">Configurações do Programa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              Tipo de Inscrição
            </label>
            <select className="w-full px-3 py-2 border border-grey-300 rounded-lg">
              <option value="manual">Manual (Admin)</option>
              <option value="self">Auto-inscrição</option>
              <option value="approval">Aprovação</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              Status
            </label>
            <select className="w-full px-3 py-2 border border-grey-300 rounded-lg">
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Course Sets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-grey-900">Conjuntos de Cursos</h3>
          <Button
            variant="outline"
            onClick={() => onAddCourseSet()}
            className="border-gold-500 text-gold-500 hover:bg-gold-50"
          >
            <Plus size={16} className="mr-2" />
            Adicionar Conjunto
          </Button>
        </div>

        {courseSets.map((courseSet) => (
          <DraggableCourseSet
            key={courseSet.id}
            courseSet={courseSet}
            items={itemsBySet[courseSet.id] || []}
            availableCourses={availableCourses}
            level={0}
            onAddCourse={onAddCourseToSet}
            onRemoveCourse={onRemoveCourseFromSet}
            onUpdateCourseSet={onUpdateCourseSet}
            onUpdateCourseSetItem={onUpdateCourseSetItem}
            onRemoveCourseSet={onRemoveCourseSet}
          />
        ))}

        {courseSets.length === 0 && (
          <Card className="p-8 text-center">
            <BookOpen size={48} className="text-grey-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-grey-900 mb-2">
              Nenhum conjunto de cursos
            </h4>
            <p className="text-grey-600 mb-4">
              Comece adicionando um conjunto de cursos ao programa
            </p>
            <Button
              variant="primary"
              onClick={() => onAddCourseSet()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              <Plus size={16} className="mr-2" />
              Adicionar Primeiro Conjunto
            </Button>
          </Card>
        )}
      </div>

      {/* Program Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <BookOpen size={24} className="text-gold-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-grey-900 mb-1">
            {courseSets.length}
          </div>
          <div className="text-sm text-grey-600">Conjuntos</div>
        </Card>
        
        <Card className="p-4 text-center">
          <BookOpen size={24} className="text-gold-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-grey-900 mb-1">
            {courseSetItems.length}
          </div>
          <div className="text-sm text-grey-600">Cursos</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Settings size={24} className="text-gold-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-grey-900 mb-1">
            {courseSetItems.filter(item => item.is_required).length}
          </div>
          <div className="text-sm text-grey-600">Obrigatórios</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Settings size={24} className="text-gold-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-grey-900 mb-1">
            {courseSetItems.reduce((total, item) => total + item.points, 0)}
          </div>
          <div className="text-sm text-grey-600">Pontos Totais</div>
        </Card>
      </div>
    </div>
  );
}
