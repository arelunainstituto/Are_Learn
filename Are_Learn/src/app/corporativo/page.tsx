import Link from 'next/link';
import { CheckCircle, Users, BarChart3, Shield, Clock, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function CorporativoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Transforme sua Equipe com Educação de Excelência
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Plataforma completa de treinamento corporativo para empresas que buscam
              desenvolver seus colaboradores com cursos de alta qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/corporativo/contato">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                  Solicitar Demonstração
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/corporativo/planos">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Ver Planos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Por que escolher AreLuna para sua Empresa?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recursos exclusivos para gestores e empresas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hover>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  Gestão Centralizada
                </h3>
                <p className="text-gray-600">
                  Gerencie todos os colaboradores, suas licenças e progressos em um único painel.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="text-secondary-600" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  Relatórios Detalhados
                </h3>
                <p className="text-gray-600">
                  Acompanhe o progresso individual e coletivo com relatórios completos e exportáveis.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  Integração com RH
                </h3>
                <p className="text-gray-600">
                  API completa para integração com sistemas de RH e gestão de pessoas.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-orange-600" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  Trilhas Personalizadas
                </h3>
                <p className="text-gray-600">
                  Crie trilhas de aprendizado específicas para cada área ou função da empresa.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  Certificações Corporativas
                </h3>
                <p className="text-gray-600">
                  Emita certificados corporativos personalizados com a marca da sua empresa.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-pink-600" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  Suporte Dedicado
                </h3>
                <p className="text-gray-600">
                  Equipe de suporte exclusiva para empresas com atendimento prioritário.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Planos Corporativos
            </h2>
            <p className="text-gray-600">
              Escolha o plano ideal para o tamanho da sua empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card hover className="relative">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  Básico
                </h3>
                <p className="text-gray-600 mb-6">
                  Ideal para pequenas empresas
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-gray-900">
                    R$ 99
                  </span>
                  <span className="text-gray-600">/usuário/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Até 50 usuários</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Acesso a todos os cursos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Relatórios básicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Suporte por email</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Plano Profissional */}
            <Card hover className="relative border-2 border-primary-600">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  Profissional
                </h3>
                <p className="text-gray-600 mb-6">
                  Para empresas em crescimento
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-gray-900">
                    R$ 79
                  </span>
                  <span className="text-gray-600">/usuário/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Até 200 usuários</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Tudo do plano Básico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Relatórios avançados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Trilhas personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">API de integração</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Suporte prioritário</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Plano Enterprise */}
            <Card hover className="relative">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <p className="text-gray-600 mb-6">
                  Para grandes organizações
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-gray-900">
                    Custom
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Usuários ilimitados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Tudo do plano Profissional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Cursos personalizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Branding personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Gerente de conta dedicado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">SLA garantido</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Falar com Vendas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Pronto para Transformar sua Equipe?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Agende uma demonstração gratuita e veja como o AreLuna pode ajudar
            sua empresa a desenvolver talentos.
          </p>
          <Link href="/corporativo/contato">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Solicitar Demonstração
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Cases de Sucesso */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Empresas que Confiam no AreLuna
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-400">Logo {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

