'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Square, CheckSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Question } from '@/types';

interface QuestionRendererProps {
  question: Question;
  answer?: any;
  onAnswerChange: (answer: any) => void;
  showFeedback?: boolean;
  isReadOnly?: boolean;
}

export function QuestionRenderer({
  question,
  answer,
  onAnswerChange,
  showFeedback = false,
  isReadOnly = false
}: QuestionRendererProps) {
  const [selectedAnswer, setSelectedAnswer] = useState(answer);

  useEffect(() => {
    setSelectedAnswer(answer);
  }, [answer]);

  const handleAnswerChange = (newAnswer: any) => {
    if (isReadOnly) return;
    
    setSelectedAnswer(newAnswer);
    onAnswerChange(newAnswer);
  };

  const isCorrect = (userAnswer: any) => {
    if (!showFeedback || !question.resposta_correta) return null;
    return userAnswer === question.resposta_correta;
  };

  const getOptionStyle = (option: string, isSelected: boolean) => {
    const correct = isCorrect(option);
    
    if (showFeedback && correct !== null) {
      if (correct) {
        return 'border-green-500 bg-green-50 text-green-700';
      } else if (isSelected && !correct) {
        return 'border-red-500 bg-red-50 text-red-700';
      }
    }
    
    if (isSelected) {
      return 'border-gold-500 bg-gold-50 text-gold-700';
    }
    
    return 'border-grey-300 hover:border-gold-300 hover:bg-grey-50';
  };

  const renderMultipleChoice = () => {
    const options = question.opcoes?.options || [];
    
    return (
      <div className="space-y-3">
        {options.map((option: string, index: number) => {
          const isSelected = selectedAnswer === option;
          const correct = isCorrect(option);
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerChange(option)}
              disabled={isReadOnly}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                getOptionStyle(option, isSelected)
              } ${isReadOnly ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {question.tipo === 'multiple_choice' ? (
                    isSelected ? (
                      <CheckCircle size={20} className="text-gold-500" />
                    ) : (
                      <Circle size={20} className="text-grey-400" />
                    )
                  ) : (
                    isSelected ? (
                      <CheckSquare size={20} className="text-gold-500" />
                    ) : (
                      <Square size={20} className="text-grey-400" />
                    )
                  )}
                </div>
                <span className="flex-1">{option}</span>
                {showFeedback && correct !== null && (
                  <div className="flex-shrink-0">
                    {correct ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderTrueFalse = () => {
    const options = ['Verdadeiro', 'Falso'];
    
    return (
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const correct = isCorrect(option);
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerChange(option)}
              disabled={isReadOnly}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                getOptionStyle(option, isSelected)
              } ${isReadOnly ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {isSelected ? (
                    <CheckCircle size={20} className="text-gold-500" />
                  ) : (
                    <Circle size={20} className="text-grey-400" />
                  )}
                </div>
                <span className="flex-1">{option}</span>
                {showFeedback && correct !== null && (
                  <div className="flex-shrink-0">
                    {correct ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderEssay = () => {
    return (
      <div>
        <textarea
          value={selectedAnswer || ''}
          onChange={(e) => handleAnswerChange(e.target.value)}
          disabled={isReadOnly}
          placeholder="Digite sua resposta aqui..."
          className="w-full h-32 p-3 border border-grey-300 rounded-lg resize-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
        />
        {showFeedback && question.resposta_modelo && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Resposta Modelo:</h4>
            <p className="text-sm text-blue-800">{question.resposta_modelo}</p>
          </div>
        )}
      </div>
    );
  };

  const renderFillBlank = () => {
    const blanks = question.opcoes?.blanks || [];
    
    return (
      <div className="space-y-4">
        {blanks.map((blank: any, index: number) => {
          const userAnswer = selectedAnswer?.[index] || '';
          const correct = showFeedback ? blank.correct_answer === userAnswer : null;
          
          return (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm font-medium text-grey-700">
                {blank.label}:
              </span>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                  const newAnswer = [...(selectedAnswer || [])];
                  newAnswer[index] = e.target.value;
                  handleAnswerChange(newAnswer);
                }}
                disabled={isReadOnly}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 ${
                  correct === true ? 'border-green-500 bg-green-50' :
                  correct === false ? 'border-red-500 bg-red-50' :
                  'border-grey-300'
                }`}
                placeholder="Digite sua resposta..."
              />
              {showFeedback && correct !== null && (
                <div className="flex-shrink-0">
                  {correct ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderMatching = () => {
    const items = question.opcoes?.items || [];
    const matches = question.opcoes?.matches || [];
    
    return (
      <div className="space-y-4">
        {items.map((item: any, index: number) => {
          const userMatch = selectedAnswer?.[index];
          const correctMatch = matches.find((m: any) => m.left === item);
          const correct = showFeedback ? correctMatch?.right === userMatch : null;
          
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-grey-700">
                {item}
              </div>
              <div className="flex-1">
                <select
                  value={userMatch || ''}
                  onChange={(e) => {
                    const newAnswer = [...(selectedAnswer || [])];
                    newAnswer[index] = e.target.value;
                    handleAnswerChange(newAnswer);
                  }}
                  disabled={isReadOnly}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 ${
                    correct === true ? 'border-green-500 bg-green-50' :
                    correct === false ? 'border-red-500 bg-red-50' :
                    'border-grey-300'
                  }`}
                >
                  <option value="">Selecione...</option>
                  {matches.map((match: any, matchIndex: number) => (
                    <option key={matchIndex} value={match.right}>
                      {match.right}
                    </option>
                  ))}
                </select>
              </div>
              {showFeedback && correct !== null && (
                <div className="flex-shrink-0">
                  {correct ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderOrdering = () => {
    const items = question.opcoes?.items || [];
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    
    const handleDragStart = (item: string) => {
      setDraggedItem(item);
    };
    
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };
    
    const handleDrop = (targetIndex: number) => {
      if (!draggedItem) return;
      
      const newOrder = [...(selectedAnswer || items)];
      const draggedIndex = newOrder.indexOf(draggedItem);
      
      if (draggedIndex !== -1) {
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedItem);
        handleAnswerChange(newOrder);
      }
      
      setDraggedItem(null);
    };
    
    return (
      <div className="space-y-2">
        {items.map((item: string, index: number) => {
          const currentOrder = selectedAnswer || items;
          const currentIndex = currentOrder.indexOf(item);
          
          return (
            <div
              key={item}
              draggable={!isReadOnly}
              onDragStart={() => handleDragStart(item)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className={`p-3 border-2 border-dashed rounded-lg cursor-move ${
                isReadOnly ? 'cursor-default' : 'hover:border-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold-100 text-gold-700 rounded-full flex items-center justify-center text-sm font-medium">
                  {currentIndex + 1}
                </div>
                <span>{item}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderQuestion = () => {
    switch (question.tipo) {
      case 'multiple_choice':
        return renderMultipleChoice();
      case 'true_false':
        return renderTrueFalse();
      case 'essay':
        return renderEssay();
      case 'fill_blank':
        return renderFillBlank();
      case 'matching':
        return renderMatching();
      case 'ordering':
        return renderOrdering();
      default:
        return (
          <div className="text-center py-8 text-grey-500">
            <p>Tipo de questão não suportado: {question.tipo}</p>
          </div>
        );
    }
  };

  return (
    <div>
      {renderQuestion()}
      
      {showFeedback && question.feedback && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-1">Feedback:</h4>
          <p className="text-sm text-blue-800">{question.feedback}</p>
        </div>
      )}
    </div>
  );
}
