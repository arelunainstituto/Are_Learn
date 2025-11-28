'use client';

import { useState } from 'react';
import { Target, CheckCircle, Clock, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export default function PerformancePage() {
    const [activeTab, setActiveTab] = useState('reviews');

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-brand font-bold text-gray-900">
                                Gestão de Desempenho
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Acompanhe avaliações, metas e feedbacks.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">Histórico</Button>
                            <Button variant="primary" className="bg-green-600 hover:bg-green-700 text-white">
                                Nova Meta (OKR)
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 mt-8 border-b border-gray-100">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Avaliações
                            {activeTab === 'reviews' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('goals')}
                            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'goals' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Metas & OKRs
                            {activeTab === 'goals' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('feedback')}
                            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'feedback' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Feedbacks
                            {activeTab === 'feedback' && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {activeTab === 'reviews' && (
                    <div className="space-y-8">
                        {/* Active Cycle */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-2">
                                        EM ANDAMENTO
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-900">Ciclo Q1 2024 - Avaliação de Desempenho</h2>
                                    <p className="text-gray-500 text-sm mt-1">Prazo: 30 de Março de 2024</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">Progresso Geral</p>
                                    <p className="text-2xl font-bold text-green-600">35%</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Autoavaliação</h3>
                                            <p className="text-sm text-gray-500">Sua análise sobre seu desempenho</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">Continuar</Button>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                            <Star className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Avaliação do Gestor</h3>
                                            <p className="text-sm text-gray-500">Aguardando submissão</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400 flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> Pendente
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Team Reviews (Manager View) */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Minha Equipe</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'Carlos Santos', role: 'Senior Developer', status: 'Pendente', progress: 0 },
                                    { name: 'Beatriz Costa', role: 'UX Designer', status: 'Em andamento', progress: 60 },
                                    { name: 'Daniel Oliveira', role: 'Tech Lead', status: 'Concluído', progress: 100 },
                                ].map((member, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={member.name} />
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                                                <p className="text-xs text-gray-500">{member.role}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${member.progress === 100 ? 'bg-green-100 text-green-800' :
                                                    member.progress > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>
                                                {member.status}
                                            </span>
                                            {member.status !== 'Concluído' && (
                                                <Button variant="ghost" size="sm" className="mt-1 h-6 text-xs text-blue-600 hover:text-blue-700 p-0">
                                                    Avaliar
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'goals' && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Metas e OKRs</h3>
                        <p className="text-gray-500 max-w-md mx-auto mt-2">
                            Defina e acompanhe seus objetivos trimestrais. Conecte seu trabalho aos objetivos da empresa.
                        </p>
                        <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
                            Criar Primeira Meta
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
