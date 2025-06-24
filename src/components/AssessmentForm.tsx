
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { FormData, Question } from '@/types/assessment';

interface AssessmentFormProps {
  formData: FormData;
  currentStep: number;
  questions: Question[];
  isSubmitting: boolean;
  onInputChange: (key: keyof FormData, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({
  formData,
  currentStep,
  questions,
  isSubmitting,
  onInputChange,
  onNext,
  onPrevious
}) => {
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{currentStep + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {currentQuestion.label}
          </CardTitle>
          {currentQuestion.required && (
            <span className="text-red-500 text-sm">* Required</span>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQuestion.type === 'text' ? (
            <div>
              <Label htmlFor={currentQuestion.key} className="text-gray-700 font-medium">
                {currentQuestion.label}
              </Label>
              <Input
                id={currentQuestion.key}
                placeholder={currentQuestion.placeholder}
                value={formData[currentQuestion.key]}
                onChange={(e) => onInputChange(currentQuestion.key, e.target.value)}
                className="mt-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor={currentQuestion.key} className="text-gray-700 font-medium">
                Select an option
              </Label>
              <Select 
                value={formData[currentQuestion.key]} 
                onValueChange={(value) => onInputChange(currentQuestion.key, value)}
              >
                <SelectTrigger className="mt-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Choose an option..." />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {currentQuestion.options?.map((option, index) => (
                    <SelectItem key={index} value={option} className="hover:bg-blue-50">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              onClick={onPrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              onClick={onNext}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-md font-semibold transition-all duration-300 flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : (currentStep === questions.length - 1 ? 'Get Results' : 'Next')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentForm;
