
import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FormData, CareerRecommendation } from '@/types/assessment';
import { questions } from '@/data/questions';
import { getCareerRecommendations } from '@/utils/careerRecommendations';
import { submitFormData } from '@/utils/formSubmission';
import AssessmentForm from '@/components/AssessmentForm';
import ResultsPage from '@/components/ResultsPage';

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsappNumber: '',
    activities: '',
    preference: '',
    project: '',
    workStyle: '',
    skills: '',
    tools: '',
    problemSolving: '',
    studyHours: '',
    device: '',
    learningStyle: '',
    courseStyle: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.required && !formData[currentQuestion.key]) {
      toast({
        title: "Required Field",
        description: "Please fill in this field before continuing.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      
      // Generate recommendations
      const recs = getCareerRecommendations(formData);
      setRecommendations(recs);
      
      // Submit form data to webhook and get AI response
      const response = await submitFormData(formData, recs);
      setAiResponse(response);
      
      setIsSubmitting(false);
      setShowResults(true);
      
      toast({
        title: "Analysis Complete!",
        description: "Your personalized career recommendations are ready.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      whatsappNumber: '',
      activities: '',
      preference: '',
      project: '',
      workStyle: '',
      skills: '',
      tools: '',
      problemSolving: '',
      studyHours: '',
      device: '',
      learningStyle: '',
      courseStyle: ''
    });
    setCurrentStep(0);
    setShowResults(false);
    setRecommendations([]);
    setAiResponse('');
  };

  if (showResults) {
    return (
      <ResultsPage
        formData={formData}
        recommendations={recommendations}
        aiResponse={aiResponse}
        onReset={resetForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-4">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">AI Tech Career Guide</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Discover Your Perfect Tech Career
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answer the following questions to discover the tech career path that most suits you
          </p>
        </div>

        <AssessmentForm
          formData={formData}
          currentStep={currentStep}
          questions={questions}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default Index;
