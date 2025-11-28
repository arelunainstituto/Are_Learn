'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllUsers, getInstrutores, getAdmins } from '@/scripts/migrate-colaboradores';

interface User {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  cidade: string;
  pais: string;
  role: 'admin' | 'instrutor' | 'colaborador' | 'aluno';
  is_instrutor: boolean;
  is_admin: boolean;
  avatar?: string;
  bio?: string;
  especialidade?: string;
  total_cursos?: number;
  total_alunos?: number;
  created_at: string;
}

interface UsersContextType {
  users: User[];
  instrutores: User[];
  admins: User[];
  colaboradores: User[];
  isLoading: boolean;
  error: string | null;
  getUserById: (id: string) => User | undefined;
  getUsersByDepartment: (department: string) => User[];
  getUsersByRole: (role: string) => User[];
}

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [instrutores, setInstrutores] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [colaboradores, setColaboradores] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const allUsers = getAllUsers();
      const instrutoresData = getInstrutores();
      const adminsData = getAdmins();
      const colaboradoresData = allUsers.filter(user => 
        !user.is_instrutor && !user.is_admin
      );

      setUsers(allUsers);
      setInstrutores(instrutoresData);
      setAdmins(adminsData);
      setColaboradores(colaboradoresData);
      setIsLoading(false);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      setError('Erro ao carregar dados dos usuários');
      setIsLoading(false);
    }
  }, []);

  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  const getUsersByDepartment = (department: string): User[] => {
    return users.filter(user => user.departamento === department);
  };

  const getUsersByRole = (role: string): User[] => {
    return users.filter(user => user.role === role);
  };

  const contextValue: UsersContextType = {
    users,
    instrutores,
    admins,
    colaboradores,
    isLoading,
    error,
    getUserById,
    getUsersByDepartment,
    getUsersByRole
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers deve ser usado dentro de um UsersProvider');
  }
  return context;
}
