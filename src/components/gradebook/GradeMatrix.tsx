'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Save, 
  X, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { User, Quiz, QuizAttempt } from '@/types';

interface GradeMatrixProps {
  users: User[];
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  onGradeUpdate?: (attemptId: string, newGrade: number) => void;
  onBulkGradeUpdate?: (updates: Array<{ attemptId: string; grade: number }>) => void;
}

interface GradeData {
  userId: string;
  userName: string;
  userEmail: string;
  grades: Record<string, {
    attemptId: string;
    grade: number | null;
    status: string;
    submittedAt: string | null;
    isEditable: boolean;
  }>;
  average: number;
  totalQuizzes: number;
  completedQuizzes: number;
}

export function GradeMatrix({ 
  users, 
  quizzes, 
  attempts, 
  onGradeUpdate,
  onBulkGradeUpdate 
}: GradeMatrixProps) {
  const [gradeData, setGradeData] = useState<GradeData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [editingCell, setEditingCell] = useState<{ userId: string; quizId: string } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'average' | 'completed'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Mock data - substituir por dados reais
  const mockGradeData: GradeData[] = [
    {
      userId: 'user-1',
      userName: 'João Silva',
      userEmail: 'joao@email.com',
      grades: {
        'quiz-1': {
          attemptId: 'attempt-1',
          grade: 85,
          status: 'completed',
          submittedAt: '2024-01-15',
          isEditable: true
        },
        'quiz-2': {
          attemptId: 'attempt-2',
          grade: 92,
          status: 'completed',
          submittedAt: '2024-01-20',
          isEditable: true
        },
        'quiz-3': {
          attemptId: 'attempt-3',
          grade: null,
          status: 'in_progress',
          submittedAt: null,
          isEditable: false
        }
      },
      average: 88.5,
      totalQuizzes: 3,
      completedQuizzes: 2
    },
    {
      userId: 'user-2',
      userName: 'Maria Santos',
      userEmail: 'maria@email.com',
      grades: {
        'quiz-1': {
          attemptId: 'attempt-4',
          grade: 78,
          status: 'completed',
          submittedAt: '2024-01-16',
          isEditable: true
        },
        'quiz-2': {
          attemptId: 'attempt-5',
          grade: 88,
          status: 'completed',
          submittedAt: '2024-01-21',
          isEditable: true
        },
        'quiz-3': {
          attemptId: 'attempt-6',
          grade: 95,
          status: 'completed',
          submittedAt: '2024-01-25',
          isEditable: true
        }
      },
      average: 87,
      totalQuizzes: 3,
      completedQuizzes: 3
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setGradeData(mockGradeData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredData = gradeData.filter(data => {
    const matchesSearch = data.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         data.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.userName.localeCompare(b.userName);
        break;
      case 'average':
        comparison = a.average - b.average;
        break;
      case 'completed':
        comparison = a.completedQuizzes - b.completedQuizzes;
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleCellClick = (userId: string, quizId: string, currentGrade: number | null) => {
    setEditingCell({ userId, quizId });
    setEditValue(currentGrade?.toString() || '');
  };

  const handleCellSave = () => {
    if (!editingCell) return;
    
    const newGrade = parseFloat(editValue);
    if (isNaN(newGrade) || newGrade < 0 || newGrade > 100) {
      alert('Nota deve ser um número entre 0 e 100');
      return;
    }

    const userData = gradeData.find(d => d.userId === editingCell.userId);
    if (!userData) return;

    const gradeInfo = userData.grades[editingCell.quizId];
    if (!gradeInfo) return;

    // Atualizar estado local
    setGradeData(prev => prev.map(data => {
      if (data.userId === editingCell.userId) {
        return {
          ...data,
          grades: {
            ...data.grades,
            [editingCell.quizId]: {
              ...data.grades[editingCell.quizId],
              grade: newGrade
            }
          }
        };
      }
      return data;
    }));

    // Chamar callback
    onGradeUpdate?.(gradeInfo.attemptId, newGrade);
    
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleBulkGradeUpdate = () => {
    if (selectedUsers.length === 0) return;
    
    const updates: Array<{ attemptId: string; grade: number }> = [];
    
    selectedUsers.forEach(userId => {
      const userData = gradeData.find(d => d.userId === userId);
      if (!userData) return;
      
      Object.values(userData.grades).forEach(gradeInfo => {
        if (gradeInfo.grade !== null) {
          updates.push({
            attemptId: gradeInfo.attemptId,
            grade: gradeInfo.grade
          });
        }
      });
    });
    
    onBulkGradeUpdate?.(updates);
    setSelectedUsers([]);
  };

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'text-grey-400';
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBackground = (grade: number | null) => {
    if (grade === null) return 'bg-grey-50';
    if (grade >= 90) return 'bg-green-50';
    if (grade >= 80) return 'bg-blue-50';
    if (grade >= 70) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'in_progress':
        return <Clock size={16} className="text-yellow-500" />;
      case 'graded':
        return <TrendingUp size={16} className="text-blue-500" />;
      default:
        return <AlertCircle size={16} className="text-grey-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-grey-200 rounded mb-4"></div>
          <div className="h-64 bg-grey-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Livro de Notas
          </h1>
          <p className="text-grey-600">
            Gerencie notas e progresso dos alunos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleBulkGradeUpdate}
            disabled={selectedUsers.length === 0}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <Edit size={16} className="mr-2" />
            Atualizar Selecionados
          </Button>
          
          <Button
            variant="outline"
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar alunos..."
              onSearch={setSearchQuery}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="average">Ordenar por Média</option>
              <option value="completed">Ordenar por Completados</option>
            </select>
            
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
            >
              {sortOrder === 'asc' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Grade Matrix */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === sortedData.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(sortedData.map(d => d.userId));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="rounded border-grey-300"
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-grey-900">
                  Aluno
                </th>
                {quizzes.map(quiz => (
                  <th key={quiz.id} className="px-4 py-3 text-center font-medium text-grey-900 min-w-24">
                    <div className="flex flex-col items-center">
                      <span className="text-sm">{quiz.titulo}</span>
                      <span className="text-xs text-grey-500">{quiz.nota_minima}% min</span>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-medium text-grey-900">
                  Média
                </th>
                <th className="px-4 py-3 text-center font-medium text-grey-900">
                  Progresso
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-200">
              {sortedData.map((data) => (
                <tr key={data.userId} className="hover:bg-grey-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(data.userId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, data.userId]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== data.userId));
                        }
                      }}
                      className="rounded border-grey-300"
                    />
                  </td>
                  
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-grey-900">{data.userName}</div>
                      <div className="text-sm text-grey-500">{data.userEmail}</div>
                    </div>
                  </td>
                  
                  {quizzes.map(quiz => {
                    const gradeInfo = data.grades[quiz.id];
                    const isEditing = editingCell?.userId === data.userId && editingCell?.quizId === quiz.id;
                    
                    return (
                      <td key={quiz.id} className="px-4 py-3 text-center">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-16 px-2 py-1 border border-grey-300 rounded text-sm"
                              min="0"
                              max="100"
                              step="0.1"
                            />
                            <Button size="sm" onClick={handleCellSave}>
                              <Save size={12} />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCellCancel}>
                              <X size={12} />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${getGradeBackground(gradeInfo?.grade || null)}`}
                            onClick={() => {
                              if (gradeInfo?.isEditable) {
                                handleCellClick(data.userId, quiz.id, gradeInfo.grade);
                              }
                            }}
                          >
                            {gradeInfo?.grade !== null ? (
                              <>
                                <span className={`font-medium ${getGradeColor(gradeInfo.grade)}`}>
                                  {gradeInfo.grade.toFixed(1)}
                                </span>
                                {getStatusIcon(gradeInfo.status)}
                              </>
                            ) : (
                              <span className="text-grey-400">-</span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                  
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${getGradeBackground(data.average)}`}>
                      <span className={`font-medium ${getGradeColor(data.average)}`}>
                        {data.average.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium text-grey-900">
                        {data.completedQuizzes}/{data.totalQuizzes}
                      </span>
                      <div className="w-16 bg-grey-200 rounded-full h-2">
                        <div 
                          className="bg-gold-500 h-2 rounded-full"
                          style={{ width: `${(data.completedQuizzes / data.totalQuizzes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {sortedData.length === 0 && (
        <Card className="p-8 text-center">
          <AlertCircle size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum aluno encontrado
          </h3>
          <p className="text-grey-600">
            {searchQuery ? 'Tente ajustar os filtros de busca' : 'Nenhum aluno matriculado nos cursos'}
          </p>
        </Card>
      )}
    </div>
  );
}
