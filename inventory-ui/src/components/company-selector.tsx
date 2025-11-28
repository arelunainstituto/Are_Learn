'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Phone, Mail } from 'lucide-react';
import { apiClient } from '@/lib/api';

interface Company {
  id: string;
  name: string;
  code: string;
  taxId: string;
  address: string;
  phone?: string;
  email?: string;
  legalNature?: string;
  socialCapital?: number;
  socialObject?: string;
  management?: string;
  iban?: string;
  contributoryStatus?: string;
  shareholdings?: string;
  isActive: boolean;
}

interface CompanySelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  showDetails?: boolean;
  className?: string;
}

export function CompanySelector({ 
  value, 
  onValueChange, 
  placeholder = "Selecione uma empresa",
  showDetails = false,
  className 
}: CompanySelectorProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const tenantId = 'cmgsa8nz2000414ohapm9c0mx'; // Hardcoded for now

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (value && companies.length > 0) {
      const company = companies.find(c => c.id === value);
      setSelectedCompany(company || null);
    }
  }, [value, companies]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getCompanies(tenantId, { isActive: true });
      setCompanies(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (newValue: string) => {
    const company = companies.find(c => c.id === newValue);
    setSelectedCompany(company || null);
    onValueChange?.(newValue);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger className={className}>
          <SelectValue placeholder="Carregando empresas..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <div className="space-y-4">
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">{company.name}</div>
                  <div className="text-sm text-gray-500">
                    {company.code} • NIPC: {company.taxId}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showDetails && selectedCompany && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{selectedCompany.name}</h3>
            <Badge variant={selectedCompany.isActive ? "default" : "secondary"}>
              {selectedCompany.isActive ? "Ativa" : "Inativa"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="font-medium">NIPC:</span>
                <span>{selectedCompany.taxId}</span>
              </div>
              
              {selectedCompany.address && (
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-medium">Morada:</span>
                    <div className="text-gray-600">{selectedCompany.address}</div>
                  </div>
                </div>
              )}
              
              {selectedCompany.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Telefone:</span>
                  <span>{selectedCompany.phone}</span>
                </div>
              )}
              
              {selectedCompany.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <span>{selectedCompany.email}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              {selectedCompany.legalNature && (
                <div>
                  <span className="font-medium">Natureza Jurídica:</span>
                  <div className="text-gray-600">{selectedCompany.legalNature}</div>
                </div>
              )}
              
              {selectedCompany.socialCapital && (
                <div>
                  <span className="font-medium">Capital Social:</span>
                  <div className="text-gray-600">{formatCurrency(selectedCompany.socialCapital)}</div>
                </div>
              )}
              
              {selectedCompany.management && (
                <div>
                  <span className="font-medium">Gerência:</span>
                  <div className="text-gray-600">{selectedCompany.management}</div>
                </div>
              )}
              
              {selectedCompany.iban && (
                <div>
                  <span className="font-medium">IBAN:</span>
                  <div className="text-gray-600 font-mono text-xs">{selectedCompany.iban}</div>
                </div>
              )}
            </div>
          </div>
          
          {selectedCompany.socialObject && (
            <div>
              <span className="font-medium">Objeto Social:</span>
              <div className="text-gray-600 text-sm mt-1">{selectedCompany.socialObject}</div>
            </div>
          )}
          
          {selectedCompany.contributoryStatus && (
            <div>
              <span className="font-medium">Situação Contributiva:</span>
              <div className="text-gray-600">{selectedCompany.contributoryStatus}</div>
            </div>
          )}
          
          {selectedCompany.shareholdings && (
            <div>
              <span className="font-medium">Participações Societárias:</span>
              <div className="text-gray-600">{selectedCompany.shareholdings}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}