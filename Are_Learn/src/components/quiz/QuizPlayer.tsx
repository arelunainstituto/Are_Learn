'use client';

import { useState, useEffect, useCallback } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Quiz, Question, QuizAttempt } from '@/types';

interface QuizPlayerProps {
  quiz: Quiz;
  questions: Question[];
  attempt?: QuizAttempt;
  onAnswer: (questionId: string, answer: any) => void;
  onSubmit: (answers: Record<string, any>) => void;
  onSaveProgress: (answers: Record<string, any>) => void;
  onFlagQuestion: (questionId: string) => void;
}

interface QuestionState {
  questionId: string;
  answer: any;
  isFlagged: boolean;
  timeSpent: number;
}

export function QuizPlayer({
  quiz,
  questions,
  attempt,
  onAnswer,
  onSubmit,
  onSaveProgress,
  onFlagQuestion
}: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentState = questionStates[currentQuestion.id] || {
    questionId: currentQuestion.id,
    answer: null,
    isFlagged: false,
    timeSpent: 0
  };

  // Timer
  useEffect(() => {
    if (!quiz.tempo_limite || !attempt) return;

    const startTime = new Date(attempt.started_at).getTime();
    const timeLimitMs = quiz.tempo_limite * 60 * 1000;
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, timeLimitMs - elapsed);

    setTimeRemaining(Math.floor(remaining / 1000));

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          // Auto-submit quando tempo acabar
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz.tempo_limite, attempt]);

  // Auto-save progress
  useEffect(() => {
    const autoSave = setInterval(() => {
      const answers = Object.fromEntries(
        Object.entries(questionStates).map(([id, state]) => [id, state.answer])
      );
      onSaveProgress(answers);
    }, 30000); // Auto-save a cada 30 segundos

    return () => clearInterval(autoSave);
  }, [questionStates, onSaveProgress]);

  const handleAnswerChange = useCallback((answer: any) => {
    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        answer,
        timeSpent: (prev[currentQuestion.id]?.timeSpent || 0) + 1
      }
    }));

    onAnswer(currentQuestion.id, answer);
  }, [currentQuestion.id, onAnswer]);

  const handleFlagToggle = useCallback(() => {
    const newFlagged = !currentState.isFlagged;
    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isFlagged: newFlagged
      }
    }));

    onFlagQuestion(currentQuestion.id);
  }, [currentQuestion.id, currentState.isFlagged, onFlagQuestion]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const answers = Object.fromEntries(
        Object.entries(questionStates).map(([id, state]) => [id, state.answer])
      );
      await onSubmit(answers);
    } catch (error) {
      console.error('Erro ao submeter quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const getAnsweredCount = () => {
    return Object.values(questionStates).filter(state => state.answer !== null).length;
  };

  const getFlaggedCount = () => {
    return Object.values(questionStates).filter(state => state.isFlagged).length;
  };

  if (showReview) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-grey-900">Revisão do Quiz</h2>
            <Button
              variant="outline"
              onClick={() => setShowReview(false)}
            >
              Voltar ao Quiz
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-grey-50 rounded-lg">
              <div className="text-2xl font-bold text-grey-900">{questions.length}</div>
              <div className="text-sm text-grey-600">Total de Questões</div>
            </div>
            <div className="text-center p-4 bg-grey-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getAnsweredCount()}</div>
              <div className="text-sm text-grey-600">Respondidas</div>
            </div>
            <div className="text-center p-4 bg-grey-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{getFlaggedCount()}</div>
              <div className="text-sm text-grey-600">Marcadas</div>
            </div>
            <div className="text-center p-4 bg-grey-50 rounded-lg">
              <div className="text-2xl font-bold text-grey-600">
                {questions.length - getAnsweredCount()}
              </div>
              <div className="text-sm text-grey-600">Não Respondidas</div>
            </div>
          </div>

          <div className="space-y-2">
            {questions.map((question, index) => {
              const state = questionStates[question.id];
              const isAnswered = state?.answer !== null;
              const isFlagged = state?.isFlagged || false;

              return (
                <div
                  key={question.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                    currentQuestionIndex === index ? 'bg-gold-50 border-2 border-gold-500' :
                    isAnswered ? 'bg-green-50 border border-green-200' :
                    isFlagged ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-grey-50 border border-grey-200'
                  }`}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    setShowReview(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentQuestionIndex === index ? 'bg-gold-500 text-white' :
                      isAnswered ? 'bg-green-500 text-white' :
                      isFlagged ? 'bg-yellow-500 text-white' :
                      'bg-grey-300 text-grey-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-grey-900">
                      Questão {index + 1}
                    </span>
                    {isFlagged && <Flag size={16} className="text-yellow-500" />}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isAnswered && <CheckCircle size={16} className="text-green-500" />}
                    {!isAnswered && <XCircle size={16} className="text-grey-400" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={() => setShowReview(false)}
            >
              Continuar Quiz
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {isSubmitting ? 'Submetendo...' : 'Finalizar Quiz'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-grey-900">{quiz.titulo}</h1>
            {quiz.descricao && (
              <p className="text-grey-600 mt-1">{quiz.descricao}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {timeRemaining !== null && (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-grey-100 text-grey-700'
              }`}>
                <Clock size={16} />
                <span className="font-mono font-medium">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={() => setShowReview(true)}
              className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
            >
              Revisar
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-grey-700">
              Questão {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="text-sm text-grey-600">
              {getAnsweredCount()} respondidas
            </span>
          </div>
          <ProgressBar value={getProgressPercentage()} />
        </div>

        {/* Instructions */}
        {quiz.instrucoes && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">{quiz.instrucoes}</p>
          </div>
        )}
      </div>

      {/* Question */}
      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-grey-600">
              Questão {currentQuestionIndex + 1}
            </span>
            <Badge variant="secondary" className="bg-glossy-100 text-glossy-800">
              {currentQuestion.dificuldade}
            </Badge>
            <Badge variant="info" className="bg-blue-100 text-blue-800">
              {currentQuestion.pontos} pontos
            </Badge>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleFlagToggle}
            className={`${
              currentState.isFlagged 
                ? 'bg-yellow-100 text-yellow-700 border-yellow-300' 
                : 'border-grey-300 text-grey-700'
            }`}
          >
            <Flag size={14} className="mr-1" />
            {currentState.isFlagged ? 'Marcada' : 'Marcar'}
          </Button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-grey-900 mb-4">
            {currentQuestion.enunciado}
          </h3>

          {/* Question Renderer será implementado separadamente */}
          <div className="text-center py-8 text-grey-500">
            <p>Question Renderer será implementado aqui</p>
            <p className="text-sm">Tipo: {currentQuestion.tipo}</p>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Anterior
          </Button>
          
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            Próxima
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => onSaveProgress(
              Object.fromEntries(
                Object.entries(questionStates).map(([id, state]) => [id, state.answer])
              )
            )}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <RotateCcw size={16} className="mr-1" />
            Salvar Progresso
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            {isSubmitting ? 'Submetendo...' : 'Finalizar Quiz'}
          </Button>
        </div>
      </div>
    </div>
  );
}
