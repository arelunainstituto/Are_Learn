'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Award,
  RotateCcw
} from 'lucide-react';
import { type QuizQuestion } from '@/lib/corporate-training';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  onClose: () => void;
}

export function QuizComponent({ questions, onComplete, onClose }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsSubmitted(true);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = questions.filter((q, index) => 
      selectedAnswers[index] === q.correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    onComplete(score, questions.length);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIsSubmitted(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excelente! Você demonstrou domínio do conteúdo.';
    if (score >= 60) return 'Bom trabalho! Continue estudando para melhorar ainda mais.';
    return 'Que tal revisar o conteúdo e tentar novamente?';
  };

  if (showResults) {
    const correctAnswers = questions.filter((q, index) => 
      selectedAnswers[index] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className={`text-6xl mb-4 ${getScoreColor(score)}`}>
                {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
              </div>
              <h2 className="text-3xl font-brand font-bold text-gray-900 mb-2">
                Avaliação Concluída!
              </h2>
              <div className={`text-4xl font-bold mb-4 ${getScoreColor(score)}`}>
                {score}%
              </div>
              <p className="text-lg text-gray-600 mb-6">
                {getScoreMessage(score)}
              </p>
            </div>

            {/* Resumo das Respostas */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Resumo das Respostas
              </h3>
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle size={20} className="text-green-500 mt-1" />
                      ) : (
                        <XCircle size={20} className="text-red-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </div>
                        <div className="space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded text-sm ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'bg-red-100 text-red-800 border border-red-200'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              {option}
                              {optionIndex === question.correctAnswer && (
                                <span className="ml-2 text-green-600 font-medium">✓ Resposta Correta</span>
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <span className="ml-2 text-red-600 font-medium">✗ Sua Resposta</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                          <strong>Explicação:</strong> {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleRestart}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw size={18} className="mr-2" />
                Refazer Avaliação
              </Button>
              <Button
                onClick={onClose}
                variant="primary"
                className="flex-1"
              >
                <Award size={18} className="mr-2" />
                Finalizar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-brand font-bold text-gray-900">
                Avaliação Final
              </h2>
              <p className="text-gray-600">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </p>
            </div>
            <Badge variant="info">
              {Math.round(progress)}% concluído
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar value={progress} />
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft size={18} className="mr-2" />
              Anterior
            </Button>

            <div className="flex items-center gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : selectedAnswers[index] !== undefined
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={isLastQuestion ? handleSubmit : handleNext}
              variant="primary"
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
            >
              {isLastQuestion ? (
                <>
                  <Award size={18} className="mr-2" />
                  Finalizar
                </>
              ) : (
                <>
                  Próxima
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
