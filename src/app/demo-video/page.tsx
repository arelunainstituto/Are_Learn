import { YouTubePlayer } from '@/components/curso/YouTubePlayer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Play, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function DemoVideoPage() {
  const videos = [
    {
      id: '9bZkp7q19f0',
      title: 'História dos Implantes Dentários',
      duration: '15 min',
      description: 'Aula introdutória sobre a evolução histórica dos implantes dentários',
      isPreview: true
    },
    {
      id: 'L_jWHffIx5E',
      title: 'Anatomia Óssea Aplicada',
      duration: '20 min',
      description: 'Fundamentos da anatomia óssea para implantodontia',
      isPreview: true
    },
    {
      id: 'ZXsQAXx_ao0',
      title: 'Materiais e Superfícies',
      duration: '25 min',
      description: 'Estudo dos materiais utilizados em implantes dentários',
      isPreview: false
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Exames de Imagem',
      duration: '30 min',
      description: 'Técnicas de diagnóstico por imagem em implantodontia',
      isPreview: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/cursos">
              <Button variant="outline" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Voltar aos Cursos
              </Button>
            </Link>
            <Badge variant="primary">Demo - Integração YouTube</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
            Demonstração - Player de Vídeo
          </h1>
          <p className="text-gray-600">
            Teste a integração com a API do YouTube e visualize como os vídeos são reproduzidos na plataforma.
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play size={20} className="text-primary-600" />
                  Player de Vídeo - YouTube
                </CardTitle>
              </CardHeader>
              <CardContent>
                <YouTubePlayer
                  videoId={videos[0].id}
                  title={videos[0].title}
                  autoplay={false}
                  controls={true}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Lista de Vídeos */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Lista de Aulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        index === 0 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Play size={16} className="text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{video.title}</h4>
                            <p className="text-sm text-gray-600">{video.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {video.isPreview && (
                            <Badge variant="info" size="sm">Preview</Badge>
                          )}
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Fundamentos de Implantodontia</h3>
                    <p className="text-sm text-gray-600">
                      Curso completo sobre os fundamentos da implantodontia moderna.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <BookOpen size={16} className="text-primary-600" />
                      <span>6 módulos • 24 aulas</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock size={16} className="text-primary-600" />
                      <span>8 horas de conteúdo</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Instrutor</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">CE</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Dr. Carlos Eduardo</div>
                        <div className="text-sm text-gray-600">Especialista em Implantodontia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recursos do Player</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Integração nativa com YouTube</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Controles personalizados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Qualidade HD automática</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Modo tela cheia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Tracking de progresso</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
