'use client';

import Link from 'next/link';
import {
    Users,
    Target,
    TrendingUp,
    Award,
    Calendar,
    FileText,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HRDashboard() {
    const stats = [
        { label: 'Total de Colaboradores', value: '142', change: '+5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Avaliações Pendentes', value: '28', change: 'Ação necessária', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Metas Atingidas (Q1)', value: '64%', change: '+12%', icon: Target, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Engajamento', value: '8.4', change: 'Estável', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const quickActions = [
        { title: 'Diretório de Pessoas', desc: 'Gerenciar colaboradores e organograma', icon: Users, href: '/hr/people', color: 'bg-blue-500' },
        { title: 'Ciclo de Desempenho', desc: 'Gerenciar avaliações e feedbacks', icon: TrendingUp, href: '/hr/performance', color: 'bg-green-500' },
        { title: 'Kudos & Reconhecimento', desc: 'Ver mural de elogios', icon: Award, href: '/hr/engagement', color: 'bg-purple-500' },
        { title: 'Agendar 1:1', desc: 'Marcar conversas de feedback', icon: Calendar, href: '/hr/1on1', color: 'bg-orange-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-brand font-bold text-gray-900">
                                Desenvolvimento Humano
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Visão geral de talentos, desempenho e cultura.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">Relatórios</Button>
                            <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Novo Ciclo de Avaliação
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className={stat.change.includes('+') ? 'text-green-600 font-medium' : 'text-gray-500'}>
                                    {stat.change}
                                </span>
                                <span className="text-gray-400 ml-2">vs. mês anterior</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Acesso Rápido</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickActions.map((action, index) => (
                            <Link
                                key={index}
                                href={action.href}
                                className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <action.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-2">
                                    {action.desc}
                                </p>
                                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Acessar <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity & Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Atividades Recentes</h2>
                            <Button variant="ghost" size="sm">Ver tudo</Button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="p-6 flex gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-900 font-medium">
                                            <span className="font-bold">Ana Silva</span> completou o curso <span className="text-blue-600">Liderança Ágil</span>
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">Há 2 horas • Desenvolvimento</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending Tasks */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Tarefas Pendentes</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { title: 'Revisar PDI de João Santos', due: 'Hoje', type: 'Urgente' },
                                { title: 'Aprovar orçamento de treinamento', due: 'Amanhã', type: 'Normal' },
                                { title: 'Feedback trimestral - Equipe Tech', due: 'Sexta', type: 'Normal' },
                            ].map((task, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${task.type === 'Urgente' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                    <div>
                                        <p className="text-gray-900 font-medium text-sm">{task.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">Vence: {task.due}</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-4">Ver todas as tarefas</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
