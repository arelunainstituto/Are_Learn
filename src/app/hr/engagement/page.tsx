'use client';

import { useState } from 'react';
import { Heart, MessageCircle, ThumbsUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

const KUDOS = [
    {
        id: 1,
        from: 'Ana Silva',
        to: 'Carlos Santos',
        message: 'Parabéns pela entrega do projeto Alpha! A qualidade do código ficou excelente.',
        category: 'Excelência Técnica',
        likes: 12,
        comments: 3,
        time: '2h atrás'
    },
    {
        id: 2,
        from: 'Beatriz Costa',
        to: 'Daniel Oliveira',
        message: 'Obrigada por me ajudar com o design system. Fez toda a diferença no meu fluxo de trabalho.',
        category: 'Trabalho em Equipe',
        likes: 8,
        comments: 1,
        time: '4h atrás'
    },
    {
        id: 3,
        from: 'Eduarda Lima',
        to: 'Toda a Equipe',
        message: 'Incrível ver o engajamento de todos no workshop de ontem. Vocês são demais!',
        category: 'Cultura',
        likes: 24,
        comments: 5,
        time: '1d atrás'
    },
];

export default function EngagementPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-brand font-bold text-gray-900">
                                Engajamento & Cultura
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Reconheça conquistas e acompanhe o clima organizacional.
                            </p>
                        </div>
                        <Button variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white">
                            Enviar Kudos
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed - Kudos */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500 fill-current" /> Mural de Reconhecimento
                    </h2>

                    {/* New Post Input */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                        <Avatar name="Eu" />
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Reconheça o trabalho de um colega..."
                                className="w-full bg-gray-50 border-0 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-shadow"
                            />
                            <div className="flex justify-end mt-2">
                                <Button size="sm" variant="ghost" className="text-gray-500 hover:text-purple-600">
                                    <Send className="w-4 h-4 mr-2" /> Enviar
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Feed */}
                    {KUDOS.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Avatar name={post.from} />
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            <span className="font-bold">{post.from}</span> reconheceu <span className="font-bold">{post.to}</span>
                                        </p>
                                        <p className="text-xs text-gray-500">{post.time}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                                    {post.category}
                                </span>
                            </div>

                            <p className="text-gray-800 mb-4 leading-relaxed">
                                {post.message}
                            </p>

                            <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium group">
                                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    {post.likes} Curtidas
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-sm font-medium">
                                    <MessageCircle className="w-4 h-4" />
                                    {post.comments} Comentários
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar - Pulse Survey */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Pulse Check Semanal</h3>
                        <p className="text-purple-100 text-sm mb-6">
                            Como você está se sentindo em relação à sua carga de trabalho esta semana?
                        </p>

                        <div className="flex justify-between gap-2 mb-6">
                            {['😫', '😕', '😐', '🙂', '🤩'].map((emoji, i) => (
                                <button
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-2xl transition-all hover:scale-110"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>

                        <p className="text-xs text-purple-200 text-center">
                            Sua resposta é anônima
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Top Reconhecidos (Mês)</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Ana Silva', count: 15 },
                                { name: 'Carlos Santos', count: 12 },
                                { name: 'Eduarda Lima', count: 10 },
                            ].map((person, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 font-bold w-4">{i + 1}</span>
                                        <Avatar name={person.name} className="w-8 h-8 text-xs" />
                                        <span className="text-sm font-medium text-gray-700">{person.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-purple-600">{person.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
