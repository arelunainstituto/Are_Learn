'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: 'course' | 'program' | 'meeting' | 'deadline';
}

interface CalendarBlockProps {
  config?: {
    title?: string;
    show_events?: boolean;
    show_calendar?: boolean;
    max_events?: number;
  };
}

export function CalendarBlock({ config = {} }: CalendarBlockProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - substituir por dados reais
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Aula: Implantodontia Básica',
      date: '2024-01-15',
      time: '14:00',
      location: 'Sala Virtual',
      type: 'course'
    },
    {
      id: '2',
      title: 'Prazo: Entrega do Projeto',
      date: '2024-01-20',
      time: '23:59',
      type: 'deadline'
    },
    {
      id: '3',
      title: 'Reunião: Mentoria',
      date: '2024-01-18',
      time: '16:00',
      location: 'Online',
      type: 'meeting'
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'program': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'course': return 'Aula';
      case 'program': return 'Programa';
      case 'meeting': return 'Reunião';
      case 'deadline': return 'Prazo';
      default: return 'Evento';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, config.max_events || 5);

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-grey-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gold-500" />
          <h3 className="font-medium text-grey-900">
            {config.title || 'Calendário'}
          </h3>
        </div>
        <Button size="sm" variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-50">
          <Plus size={14} className="mr-1" />
          Adicionar
        </Button>
      </div>

      {config.show_events && (
        <div className="space-y-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-grey-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-gold-600">
                      {formatDate(event.date)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-grey-900 truncate">
                      {event.title}
                    </h4>
                    <Badge variant="secondary" className={getEventTypeColor(event.type)}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-grey-600">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Calendar size={32} className="text-grey-400 mx-auto mb-2" />
              <p className="text-grey-600 text-sm">Nenhum evento próximo</p>
            </div>
          )}
        </div>
      )}

      {config.show_calendar && (
        <div className="mt-4">
          <div className="text-center py-4">
            <p className="text-sm text-grey-600">
              Visualização do calendário será implementada aqui
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
