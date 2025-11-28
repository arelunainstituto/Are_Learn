'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanySelector } from '@/components/company-selector';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Mail,
  Save,
  RefreshCw,
  AlertTriangle,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

const mockSettings = {
  general: {
    companyId: '',
    companyEmail: 'admin@areluna.pt',
    companyPhone: '+351 21 123 4567',
    timezone: 'Europe/Lisbon',
    language: 'pt-PT',
    currency: 'EUR',
    dateFormat: 'dd/MM/yyyy'
  },
  notifications: {
    emailNotifications: true,
    lowStockAlerts: true,
    orderNotifications: true,
    systemUpdates: false,
    marketingEmails: false,
    lowStockThreshold: 10
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: false
  },
  inventory: {
    autoReorder: true,
    reorderPoint: 20,
    defaultWarehouse: 'WH001',
    trackSerialNumbers: true,
    enableBarcodes: true,
    stockValuation: 'FIFO'
  },
  appearance: {
    theme: 'light',
    primaryColor: '#3B82F6',
    compactMode: false,
    showGridLines: true,
    itemsPerPage: 25
  },
  integrations: {
    saftExport: true,
    apiAccess: true,
    webhooks: false,
    backupFrequency: 'daily',
    dataRetention: 365
  }
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleCompanyChange = (companyId: string) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        companyId
      }
    }));
    setHasChanges(true);
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: Settings },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'inventory', label: 'Inventário', icon: Database },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'integrations', label: 'Integrações', icon: Globe }
  ];

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const resetSettings = () => {
    setSettings(mockSettings);
    setHasChanges(false);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company">Empresa</Label>
        <CompanySelector
          value={settings.general.companyId}
          onValueChange={handleCompanyChange}
          placeholder="Selecione a empresa do Grupo AreLuna"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyEmail">Email da Empresa</Label>
          <Input
            id="companyEmail"
            type="email"
            value={settings.general.companyEmail}
            onChange={(e) => updateSetting('general', 'companyEmail', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyPhone">Telefone da Empresa</Label>
          <Input
            id="companyPhone"
            type="tel"
            value={settings.general.companyPhone}
            onChange={(e) => updateSetting('general', 'companyPhone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Fuso Horário</Label>
          <Select
            value={settings.general.timezone}
            onValueChange={(value) => updateSetting('general', 'timezone', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Europe/Lisbon">Europa/Lisboa</SelectItem>
              <SelectItem value="Europe/London">Europa/Londres</SelectItem>
              <SelectItem value="America/New_York">América/Nova York</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Select
            value={settings.general.language}
            onValueChange={(value) => updateSetting('general', 'language', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-PT">Português</SelectItem>
              <SelectItem value="en-US">English</SelectItem>
              <SelectItem value="es-ES">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Moeda</Label>
          <Select
            value={settings.general.currency}
            onValueChange={(value) => updateSetting('general', 'currency', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">Euro (€)</SelectItem>
              <SelectItem value="USD">Dólar ($)</SelectItem>
              <SelectItem value="GBP">Libra (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateFormat">Formato de Data</Label>
          <Select
            value={settings.general.dateFormat}
            onValueChange={(value) => updateSetting('general', 'dateFormat', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dd/MM/yyyy">DD/MM/AAAA</SelectItem>
              <SelectItem value="MM/dd/yyyy">MM/DD/AAAA</SelectItem>
              <SelectItem value="yyyy-MM-dd">AAAA-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notificações por Email</Label>
            <p className="text-sm text-muted-foreground">
              Receber notificações importantes por email
            </p>
          </div>
          <Checkbox
            checked={settings.notifications.emailNotifications}
            onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Alertas de Stock Baixo</Label>
            <p className="text-sm text-muted-foreground">
              Notificar quando o stock estiver abaixo do limite
            </p>
          </div>
          <Checkbox
            checked={settings.notifications.lowStockAlerts}
            onCheckedChange={(checked) => updateSetting('notifications', 'lowStockAlerts', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notificações de Encomendas</Label>
            <p className="text-sm text-muted-foreground">
              Notificar sobre novas encomendas e atualizações
            </p>
          </div>
          <Checkbox
            checked={settings.notifications.orderNotifications}
            onCheckedChange={(checked) => updateSetting('notifications', 'orderNotifications', checked)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lowStockThreshold">Limite de Stock Baixo</Label>
          <Input
            id="lowStockThreshold"
            type="number"
            value={settings.notifications.lowStockThreshold}
            onChange={(e) => updateSetting('notifications', 'lowStockThreshold', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Configurações em desenvolvimento...</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
          <p className="text-muted-foreground">
            Gerir as configurações da aplicação e preferências do sistema
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Alterações não guardadas
            </Badge>
          )}
          <Button
            variant="outline"
            onClick={resetSettings}
            disabled={!hasChanges}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Repor
          </Button>
          <Button
            onClick={saveSettings}
            disabled={!hasChanges || saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'A guardar...' : 'Guardar'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Navegação</CardTitle>
            <CardDescription>
              Selecione a categoria de configurações
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-none hover:bg-gray-50 ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const currentTab = tabs.find(tab => tab.id === activeTab);
                  const Icon = currentTab?.icon || Settings;
                  return (
                    <>
                      <Icon className="h-5 w-5" />
                      {currentTab?.label}
                    </>
                  );
                })()}
              </CardTitle>
              <CardDescription>
                {activeTab === 'general' && 'Configurações gerais da aplicação'}
                {activeTab === 'notifications' && 'Gerir notificações e alertas'}
                {activeTab === 'security' && 'Configurações de segurança e acesso'}
                {activeTab === 'inventory' && 'Configurações do módulo de inventário'}
                {activeTab === 'appearance' && 'Personalizar a aparência da aplicação'}
                {activeTab === 'integrations' && 'Configurar integrações externas'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}