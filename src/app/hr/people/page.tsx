'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

// Mock Data
const EMPLOYEES = [
    { id: 1, name: 'Ana Silva', role: 'Product Manager', dept: 'Produto', email: 'ana.silva@areluna.com', location: 'São Paulo', status: 'Active' },
    { id: 2, name: 'Carlos Santos', role: 'Senior Developer', dept: 'Engenharia', email: 'carlos.santos@areluna.com', location: 'Remoto', status: 'Active' },
    { id: 3, name: 'Beatriz Costa', role: 'UX Designer', dept: 'Design', email: 'beatriz.costa@areluna.com', location: 'Rio de Janeiro', status: 'On Leave' },
    { id: 4, name: 'Daniel Oliveira', role: 'Tech Lead', dept: 'Engenharia', email: 'daniel.oliveira@areluna.com', location: 'São Paulo', status: 'Active' },
    { id: 5, name: 'Eduarda Lima', role: 'HR Specialist', dept: 'Recursos Humanos', email: 'eduarda.lima@areluna.com', location: 'São Paulo', status: 'Active' },
    { id: 6, name: 'Fernando Souza', role: 'Sales Executive', dept: 'Vendas', email: 'fernando.souza@areluna.com', location: 'Curitiba', status: 'Active' },
];

export default function PeopleDirectory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('Todos');

    const filteredEmployees = EMPLOYEES.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = departmentFilter === 'Todos' || emp.dept === departmentFilter;
        return matchesSearch && matchesDept;
    });

    const departments = ['Todos', ...Array.from(new Set(EMPLOYEES.map(e => e.dept)))];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-brand font-bold text-gray-900">
                                Diretório de Pessoas
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Gerencie colaboradores e visualize a estrutura organizacional.
                            </p>
                        </div>
                        <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Adicionar Colaborador
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou cargo..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            {departments.map(dept => (
                                <button
                                    key={dept}
                                    onClick={() => setDepartmentFilter(dept)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${departmentFilter === dept
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Employee Grid */}
            <div className="container-custom py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map((employee) => (
                        <div key={employee.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <Avatar name={employee.name} className="w-12 h-12 text-lg" />
                                    <div>
                                        <h3 className="font-bold text-gray-900">{employee.name}</h3>
                                        <p className="text-sm text-blue-600 font-medium">{employee.role}</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    {employee.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                    {employee.email}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {employee.status === 'Active' ? 'Ativo' : 'Ausente'}
                                </span>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    Ver Perfil
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
