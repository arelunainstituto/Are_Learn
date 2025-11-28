'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Award, 
  Download, 
  Calendar, 
  Clock, 
  ChevronLeft,
  Filter,
  Search,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getAllTrails, getTrailsByCategory } from '@/lib/corporate-training';

// Mock data para certificados
const mockCertificates = [
  {
    id: 'cert-1',
    userId: 'user-1',
    trailId: 'etica-conduta',
    trailName: 'Ética e Conduta',
    category: 'corporativo',
    issuedDate: '2024-01-15',
    expiryDate: '2025-01-15',
    score: 85,
    certificateUrl: '/certificates/cert-1.pdf',
    status: 'valid'
  },
  {
    id: 'cert-2',
    userId: 'user-1',
    trailId: 'seguranca-paciente',
    trailName: 'Segurança do Paciente',
    category: 'clinico',
    issuedDate: '2024-01-20',
    expiryDate: '2025-01-20',
    score: 92,
    certificateUrl: '/certificates/cert-2.pdf',
    status: 'valid'
  },
  {
    id: 'cert-3',
    userId: 'user-1',
    trailId: 'comunicacao-interna',
    trailName: 'Comunicação Interna',
    category: 'corporativo',
    issuedDate: '2023-12-10',
    expiryDate: '2024-12-10',
    score: 78,
    certificateUrl: '/certificates/cert-3.pdf',
    status: 'expired'
  }
];

const categoryConfig = {
  'todos': { label: 'Todos', color: 'bg-gray-100 text-gray-700' },
  'clinico': { label: 'Clínicos', color: 'bg-red-100 text-red-700' },
  'corporativo': { label: 'Corporativos', color: 'bg-blue-100 text-blue-700' },
  'tecnologia': { label: 'Tecnologia', color: 'bg-cyan-100 text-cyan-700' },
  'onboarding': { label: 'Onboarding', color: 'bg-purple-100 text-purple-700' },
  'soft-skills': { label: 'Soft Skills', color: 'bg-green-100 text-green-700' }
};

export default function CertificadosPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar certificados
  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesCategory = selectedCategory === 'todos' || cert.category === selectedCategory;
    const matchesSearch = cert.trailName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const validCertificates = filteredCertificates.filter(cert => cert.status === 'valid');
  const expiredCertificates = filteredCertificates.filter(cert => cert.status === 'expired');
  const expiringSoon = validCertificates.filter(cert => {
    const expiryDate = new Date(cert.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  });

  const handleDownload = (certificateId: string) => {
    // Simular download
    console.log(`Downloading certificate: ${certificateId}`);
    // Em implementação real, faria o download do arquivo
  };

  const handleDownloadAll = () => {
    // Simular download de todos os certificados
    console.log('Downloading all certificates');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/treinamento-corporativo" className="flex items-center text-gold-100 hover:text-white transition-colors">
              <ChevronLeft size={20} className="mr-2" />
              Voltar ao Treinamento
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <Award size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-brand font-bold mb-2">
                Meus Certificados
              </h1>
              <p className="text-gold-100 text-lg">
                Visualize e gerencie todos os seus certificados de conclusão
              </p>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">{validCertificates.length}</div>
              <div className="text-gold-100 text-sm">Certificados Válidos</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">{expiredCertificates.length}</div>
              <div className="text-gold-100 text-sm">Expirados</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">{expiringSoon.length}</div>
              <div className="text-gold-100 text-sm">Expirando em 30 dias</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold">{filteredCertificates.length}</div>
              <div className="text-gold-100 text-sm">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por trilha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro por categoria */}
            <div className="flex gap-2">
              {Object.entries(categoryConfig).map(([category, config]) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  className={selectedCategory === category ? 'bg-gold-500 hover:bg-gold-600' : ''}
                >
                  {config.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Alertas */}
        {expiringSoon.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">
                  Certificados Expirando em Breve
                </h3>
                <p className="text-yellow-700 text-sm">
                  Você tem {expiringSoon.length} certificado(s) que expiram nos próximos 30 dias. 
                  Considere fazer a reciclagem para renovar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ações em Lote */}
        {filteredCertificates.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              Mostrando {filteredCertificates.length} certificado(s)
            </div>
            <Button 
              onClick={handleDownloadAll}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Baixar Todos
            </Button>
          </div>
        )}

        {/* Lista de Certificados */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-12">
            <Award size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum certificado encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'todos' 
                ? 'Tente ajustar os filtros de busca.'
                : 'Complete algumas trilhas para obter seus primeiros certificados.'
              }
            </p>
            <Link href="/treinamento-corporativo">
              <Button variant="primary">
                Explorar Trilhas
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => {
              const isExpired = certificate.status === 'expired';
              const expiryDate = new Date(certificate.expiryDate);
              const today = new Date();
              const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;

              return (
                <Card key={certificate.id} className={`${isExpired ? 'opacity-75' : ''}`}>
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gold-100 rounded-full p-2">
                          <Award size={20} className="text-gold-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {certificate.trailName}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${categoryConfig[certificate.category as keyof typeof categoryConfig]?.color || 'bg-gray-100 text-gray-700'}`}
                          >
                            {categoryConfig[certificate.category as keyof typeof categoryConfig]?.label || certificate.category}
                          </Badge>
                        </div>
                      </div>
                      
                      {isExpired ? (
                        <Badge variant="destructive" className="text-xs">
                          Expirado
                        </Badge>
                      ) : isExpiringSoon ? (
                        <Badge variant="warning" className="text-xs">
                          Expira em {daysUntilExpiry} dias
                        </Badge>
                      ) : (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle size={12} className="mr-1" />
                          Válido
                        </Badge>
                      )}
                    </div>

                    {/* Detalhes */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Emitido em: {new Date(certificate.issuedDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>Expira em: {new Date(certificate.expiryDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText size={16} />
                        <span>Nota: {certificate.score}%</span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDownload(certificate.id)}
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        disabled={isExpired}
                      >
                        <Download size={16} className="mr-2" />
                        Baixar
                      </Button>
                      {isExpired && (
                        <Link href={`/treinamento-corporativo/${certificate.trailId}`}>
                          <Button variant="outline" size="sm">
                            Renovar
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Informações sobre Certificados */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">
            Sobre os Certificados
          </h3>
          <div className="text-blue-800 text-sm space-y-2">
            <p>• Certificados são emitidos automaticamente ao completar uma trilha com nota mínima de 70%</p>
            <p>• Certificados têm validade de 1 ano e podem ser renovados através da reciclagem</p>
            <p>• Certificados expirados podem ser renovados completando novamente a trilha</p>
            <p>• Todos os certificados são armazenados digitalmente e podem ser baixados a qualquer momento</p>
          </div>
        </div>
      </div>
    </div>
  );
}
