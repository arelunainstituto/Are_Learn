'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Download, 
  Share2, 
  CheckCircle, 
  Award,
  Calendar,
  User,
  BookOpen
} from 'lucide-react';

interface CertificateData {
  id: string;
  userId: string;
  trailId: string;
  trailName: string;
  category: string;
  issuedDate: string;
  expiryDate: string;
  score: number;
  certificateUrl: string;
  status: 'valid' | 'expired' | 'expiring_soon';
}

interface CertificateGeneratorProps {
  certificate: CertificateData;
  userName?: string;
  onDownload: () => void;
  onShare: () => void;
  onRenew?: () => void;
}

export function CertificateGenerator({ certificate, userName = 'Colaborador AreLuna', onDownload, onShare, onRenew }: CertificateGeneratorProps) {
  const isExpired = certificate.status === 'expired';
  const isExpiringSoon = certificate.status === 'expiring_soon';
  return (
    <div className="max-w-4xl mx-auto">
      {/* Certificate Preview */}
      <Card className="mb-8">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center">
            {/* Certificate Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-600 text-white p-4 rounded-full">
                  <Award size={32} />
                </div>
              </div>
              <h1 className="text-3xl font-brand font-bold text-gray-900 mb-2">
                Certificado de Conclusão
              </h1>
              <p className="text-lg text-gray-600">
                Instituto AreLuna - Treinamento Corporativo
              </p>
            </div>

            {/* Certificate Content */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-4">
                  Certificamos que
                </p>
                <h2 className="text-4xl font-brand font-bold text-blue-600 mb-4">
                  {userName}
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  concluiu com sucesso o treinamento em
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {certificate.trailName}
                </h3>
              </div>

              {/* Certificate Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar size={20} className="text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-900">Concluído em</span>
                  </div>
                  <p className="text-gray-700">{new Date(certificate.issuedDate).toLocaleDateString('pt-BR')}</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Award size={20} className="text-green-600 mr-2" />
                    <span className="font-semibold text-gray-900">Pontuação</span>
                  </div>
                  <p className="text-gray-700">{certificate.score}%</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen size={20} className="text-purple-600 mr-2" />
                    <span className="font-semibold text-gray-900">Válido até</span>
                  </div>
                  <p className="text-gray-700">{new Date(certificate.expiryDate).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm text-gray-600 mb-1">Instituto AreLuna</p>
                    <p className="text-sm text-gray-500">Educação Corporativa</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Certificado Digital</p>
                    <p className="text-sm text-gray-500">ID: {certificate.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onDownload} 
                variant="primary" 
                size="lg"
                disabled={isExpired}
              >
                <Download size={20} className="mr-2" />
                {isExpired ? 'Certificado Expirado' : 'Baixar Certificado'}
              </Button>
              <Button 
                onClick={onShare} 
                variant="outline" 
                size="lg"
                disabled={isExpired}
              >
                <Share2 size={20} className="mr-2" />
                Compartilhar
              </Button>
              {isExpired && onRenew && (
                <Button onClick={onRenew} variant="secondary" size="lg">
                  <BookOpen size={20} className="mr-2" />
                  Renovar Certificado
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sobre este Certificado
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-sm text-gray-700">
                  Certificado digital válido e verificável
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-sm text-gray-700">
                  Reconhecido pelo Instituto AreLuna
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-sm text-gray-700">
                  Pode ser compartilhado em redes sociais
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Próximos Passos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="info">Recomendado</Badge>
                <span className="text-sm text-gray-700">
                  Continue com outras trilhas de treinamento
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success">Disponível</Badge>
                <span className="text-sm text-gray-700">
                  Acesse seu perfil para ver todos os certificados
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="warning">Importante</Badge>
                <span className="text-sm text-gray-700">
                  Mantenha este certificado em local seguro
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Componente para exibir lista de certificados
export function CertificateList({ certificates }: { certificates: CertificateData[] }) {
  return (
    <div className="space-y-4">
      {certificates.map((certificate) => (
        <Card key={certificate.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Award size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{certificate.trailName}</h3>
                  <p className="text-sm text-gray-600">Concluído em {new Date(certificate.issuedDate).toLocaleDateString('pt-BR')}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="success">{certificate.score}%</Badge>
                    <span className="text-sm text-gray-500">
                      Válido até {new Date(certificate.expiryDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Função utilitária para gerar certificado individual
export function generateIndividualCertificate(
  userId: string,
  trailId: string,
  trailName: string,
  category: string,
  score: number
): CertificateData {
  const issuedDate = new Date().toISOString();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Válido por 1 ano

  return {
    id: `cert-${userId}-${trailId}-${Date.now()}`,
    userId,
    trailId,
    trailName,
    category,
    issuedDate,
    expiryDate: expiryDate.toISOString(),
    score,
    certificateUrl: `/certificates/cert-${userId}-${trailId}-${Date.now()}.pdf`,
    status: 'valid'
  };
}

// Componente para botão de gerar certificado
interface GenerateCertificateButtonProps {
  trailId: string;
  trailName: string;
  category: string;
  score: number;
  isCompleted: boolean;
  onGenerate: (certificate: CertificateData) => void;
}

export function GenerateCertificateButton({ 
  trailId, 
  trailName, 
  category, 
  score, 
  isCompleted, 
  onGenerate 
}: GenerateCertificateButtonProps) {
  const handleGenerate = () => {
    const certificate = generateIndividualCertificate(
      'user-1', // Mock userId - substituir por userId real
      trailId,
      trailName,
      category,
      score
    );
    onGenerate(certificate);
  };

  if (!isCompleted || score < 70) {
    return (
      <Button variant="outline" disabled className="w-full">
        <Award size={16} className="mr-2" />
        {score < 70 ? 'Nota insuficiente (mín. 70%)' : 'Complete a trilha primeiro'}
      </Button>
    );
  }

  return (
    <Button onClick={handleGenerate} variant="primary" className="w-full">
      <Award size={16} className="mr-2" />
      Gerar Certificado
    </Button>
  );
}
