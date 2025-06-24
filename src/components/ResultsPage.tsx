
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { FormData, CareerRecommendation } from '@/types/assessment';
import AiResponseCard from './AiResponseCard';
import CareerRecommendationsGrid from './CareerRecommendationsGrid';

interface ResultsPageProps {
  formData: FormData;
  recommendations: CareerRecommendation[];
  aiResponse: string;
  onReset: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ formData, recommendations, aiResponse, onReset }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Career Recommendations</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Perfect Matches for {formData.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your responses, here are the tech career paths that align best with your interests and skills.
          </p>
        </div>

        <AiResponseCard aiResponse={aiResponse} />
        <CareerRecommendationsGrid recommendations={recommendations} />

        <div className="text-center">
          <Button 
            onClick={onReset}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
