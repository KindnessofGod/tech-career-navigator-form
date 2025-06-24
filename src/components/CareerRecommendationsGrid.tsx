
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CareerRecommendation } from '@/types/assessment';

interface CareerRecommendationsGridProps {
  recommendations: CareerRecommendation[];
}

const CareerRecommendationsGrid: React.FC<CareerRecommendationsGridProps> = ({ recommendations }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
      {recommendations.map((rec, index) => (
        <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-md">
              {rec.icon}
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">{rec.title}</CardTitle>
            <CardDescription className="text-gray-600">{rec.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Key Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {rec.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Time to start:</span>
                <span className="font-semibold text-green-600">{rec.timeToStart}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CareerRecommendationsGrid;
