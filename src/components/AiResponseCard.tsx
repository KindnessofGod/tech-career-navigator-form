
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

interface AiResponseCardProps {
  aiResponse: string;
}

const AiResponseCard: React.FC<AiResponseCardProps> = ({ aiResponse }) => {
  if (!aiResponse) return null;

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-md">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">AI Career Insights</CardTitle>
          <CardDescription className="text-gray-600">Personalized analysis based on your responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {aiResponse}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiResponseCard;
