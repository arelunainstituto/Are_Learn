import { SafeImage } from '@/components/ui/SafeImage';
import { SimpleVideoPlayer } from '@/components/curso/SimpleVideoPlayer';
import { Clock, BookOpen, BarChart3, Award, Download, CheckCircle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { formatDuration } from '@/lib/utils';

// Mock data com vídeos reais do YouTube
const curso = {
  id: '1',
  titulo: 'Fundamentos de Implantodontia',
  descricao: `Domine os fundamentos da implantodontia moderna com este curso completo. 
  
  Aprenda com casos reais, demonstrações práticas e o conhecimento de um dos maiores especialistas da área. Este curso aborda desde os conceitos básicos até as técnicas fundamentais de reabilitação oral com implantes.
  
  Você aprenderá sobre anatomia óssea, planejamento cirúrgico, técnicas de instalação, materiais e superfícies, e muito mais. Ideal para dentistas que desejam se especializar ou atualizar seus conhecimentos em implantodontia.`,
  thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
  banner: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
  nivel: 'Iniciante',
  duracao_total: 480,
  total_modulos: 6,
  total_aulas: 24,
  tags: ['implantodontia', 'fundamentos', 'cirurgia'],
  instrutor: {
    nome: 'Dr. Carlos Eduardo',
    bio: 'Especialista em Implantodontia com 15 anos de experiência. Mestre e Doutor pela USP, coordenador de cursos de especialização.',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    especialidade: 'Implantodontia',
    total_cursos: 8,
    total_alunos: 2500,
  },
  categoria: 'Implantodontia',
  modulos: [
    {
      id: '1',
      titulo: 'Introdução à Implantodontia',
      descricao: 'Conceitos fundamentais e histórico',
      ordem: 1,
      duracao_total: 60,
      aulas: [
        { 
          id: '1', 
          titulo: 'História dos Implantes Dentários', 
          duracao: 15, 
          disponivel_preview: true,
          video_id: '9bZkp7q19f0',
          youtube_url: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
        },
        { 
          id: '2', 
          titulo: 'Anatomia Óssea Aplicada', 
          duracao: 20, 
          disponivel_preview: true,
          video_id: 'L_jWHffIx5E',
          youtube_url: 'https://www.youtube.com/watch?v=L_jWHffIx5E'
        },
        { 
          id: '3', 
          titulo: 'Materiais e Superfícies', 
          duracao: 25, 
          disponivel_preview: false,
          video_id: 'ZXsQAXx_ao0',
          youtube_url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0'
        },
      ],
    },
    {
      id: '2',
      titulo: 'Planejamento e Diagnóstico',
      descricao: 'Técnicas de planejamento e diagnóstico',
      ordem: 2,
      duracao_total: 90,
      aulas: [
        { 
          id: '4', 
          titulo: 'Exames de Imagem', 
          duracao: 30, 
          disponivel_preview: false,
          video_id: 'dQw4w9WgXcQ',
          youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        { 
          id: '5', 
          titulo: 'Planejamento Digital', 
          duracao: 35, 
          disponivel_preview: false,
          video_id: '9bZkp7q19f0',
          youtube_url: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
        },
        { 
          id: '6', 
          titulo: 'Guias Cirúrgicos', 
          duracao: 25, 
          disponivel_preview: false,
          video_id: 'M7lc1UVf-VE',
          youtube_url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE'
        },
      ],
    },
    {
      id: '3',
      titulo: 'Técnicas Cirúrgicas Básicas',
      descricao: 'Procedimentos cirúrgicos fundamentais',
      ordem: 3,
      duracao_total: 120,
      aulas: [
        { 
          id: '7', 
          titulo: 'Protocolo Cirúrgico Básico', 
          duracao: 40, 
          disponivel_preview: false,
          video_id: 'dQw4w9WgXcQ',
          youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        { 
          id: '8', 
          titulo: 'Técnicas de Instalação', 
          duracao: 45, 
          disponivel_preview: false,
          video_id: '9bZkp7q19f0',
          youtube_url: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
        },
        { 
          id: '9', 
          titulo: 'Complicações e Soluções', 
          duracao: 35, 
          disponivel_preview: false,
          video_id: 'M7lc1UVf-VE',
          youtube_url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE'
        },
      ],
    },
  ],
  materiais: [
    { titulo: 'Apostila Completa do Curso', tipo: 'pdf', tamanho: '15.2 MB' },
    { titulo: 'Checklist Cirúrgico', tipo: 'pdf', tamanho: '2.1 MB' },
    { titulo: 'Protocolo de Atendimento', tipo: 'pdf', tamanho: '1.8 MB' },
  ],
};

export default function CursoDetalhePage() {
  const progresso = 35; // Mock - substituir por progresso real do usuário

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero com Banner */}
      <div className="relative h-[400px] bg-gradient-to-r from-gray-900 to-gray-800">
        <SafeImage
          src={curso.banner}
          alt={curso.titulo}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 container-custom flex items-center">
          <div className="max-w-3xl text-white">
            <Badge variant="warning" className="mb-4">Curso em Destaque</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {curso.titulo}
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              {curso.descricao.split('\n\n')[0]}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} />
                <span>{curso.nivel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{formatDuration(curso.duracao_total * 60)}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>{curso.total_aulas} aulas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sobre o Curso */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-display font-bold mb-4">
                  Sobre o Curso
                </h2>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  {curso.descricao.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vídeo Principal */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-brand font-bold text-grey-900 mb-4">
                  Vídeo de Apresentação
                </h2>
                <SimpleVideoPlayer
                  videoId={curso.modulos[0].aulas[0].video_id}
                  title={curso.modulos[0].aulas[0].titulo}
                  isPreview={curso.modulos[0].aulas[0].disponivel_preview}
                  isLocked={!curso.modulos[0].aulas[0].disponivel_preview}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Módulos do Curso */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-display font-bold mb-4">
                  Conteúdo do Curso
                </h2>
                <div className="space-y-4">
                  {curso.modulos.map((modulo, index) => (
                    <div key={modulo.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-bold text-gray-900">
                            Módulo {index + 1}: {modulo.titulo}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {modulo.descricao}
                          </p>
                        </div>
                        <div className="text-sm text-gray-600">
                          {modulo.aulas.length} aulas • {formatDuration(modulo.duracao_total * 60)}
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {modulo.aulas.map((aula) => (
                          <div key={aula.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              {aula.disponivel_preview ? (
                                <PlayCircle size={20} className="text-primary-600" />
                              ) : (
                                <CheckCircle size={20} className="text-gray-400" />
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{aula.titulo}</div>
                                {aula.disponivel_preview && (
                                  <Badge variant="info" className="mt-1">Preview Gratuito</Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {aula.duracao}min
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instrutor */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-display font-bold mb-4">
                  Sobre o Instrutor
                </h2>
                <div className="flex items-start gap-4">
                  <Avatar name={curso.instrutor.nome} size="xl" />
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                      {curso.instrutor.nome}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {curso.instrutor.especialidade}
                    </p>
                    <p className="text-gray-700 mb-4">{curso.instrutor.bio}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold text-gray-900">{curso.instrutor.total_cursos}</span> Cursos
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">{curso.instrutor.total_alunos}</span> Alunos
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Card de Ação */}
              <Card>
                <CardContent className="p-6">
                  {progresso > 0 ? (
                    <>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Seu Progresso
                          </span>
                          <span className="text-sm font-bold text-primary-600">
                            {progresso}%
                          </span>
                        </div>
                        <ProgressBar value={progresso} />
                      </div>
                      <Button className="w-full mb-3" size="lg">
                        <PlayCircle className="mr-2" size={20} />
                        Continuar Assistindo
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full mb-3" size="lg">
                      <PlayCircle className="mr-2" size={20} />
                      Começar Curso
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    Adicionar à Minha Lista
                  </Button>
                </CardContent>
              </Card>

              {/* Informações */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold mb-4">Este curso inclui:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock className="text-primary-600" size={20} />
                      <span>{formatDuration(curso.duracao_total * 60)} de vídeo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-primary-600" size={20} />
                      <span>{curso.total_aulas} aulas em {curso.total_modulos} módulos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Download className="text-primary-600" size={20} />
                      <span>Materiais para download</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="text-primary-600" size={20} />
                      <span>Certificado de conclusão</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Materiais */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold mb-4">Materiais de Apoio</h3>
                  <div className="space-y-2">
                    {curso.materiais.map((material, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Download size={18} className="text-primary-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {material.titulo}
                            </div>
                            <div className="text-xs text-gray-500">
                              {material.tipo.toUpperCase()} • {material.tamanho}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {curso.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

