import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, ArrowRight, Sparkles, Code, Palette, Shield, BarChart3, Users, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  whatsappNumber: string;
  activities: string;
  preference: string;
  project: string;
  workStyle: string;
  skills: string;
  tools: string;
  problemSolving: string;
  studyHours: string;
  device: string;
  learningStyle: string;
  courseStyle: string;
}

interface CareerRecommendation {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  timeToStart: string;
}

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
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      key: 'name' as keyof FormData,
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true
    },
    {
      key: 'whatsappNumber' as keyof FormData,
      label: 'WhatsApp Number',
      type: 'text',
      placeholder: 'Enter your WhatsApp number (e.g., +1234567890)',
      required: true
    },
    {
      key: 'activities' as keyof FormData,
      label: 'What activities do you enjoy most?',
      type: 'select',
      options: ['Creating visuals', 'Solving puzzles', 'Helping people', 'Organizing things', 'Other'],
      required: true
    },
    {
      key: 'preference' as keyof FormData,
      label: 'Are you more interested in making things look good or making them work?',
      type: 'select',
      options: ['Look good', 'Work well', 'Both', 'Not sure'],
      required: true
    },
    {
      key: 'project' as keyof FormData,
      label: 'What kind of tech project excites you?',
      type: 'select',
      options: ['Data analysis', 'Apps/websites', 'Security/hacking', 'AI/chatbots', 'Other'],
      required: true
    },
    {
      key: 'workStyle' as keyof FormData,
      label: 'Do you like variety or mastering one task?',
      type: 'select',
      options: ['Variety', 'Mastery', 'Both'],
      required: true
    },
    {
      key: 'skills' as keyof FormData,
      label: 'What are you good at from past work or school?',
      type: 'select',
      options: ['Communication', 'Numbers/math', 'Planning', 'Design/creativity', 'Other'],
      required: true
    },
    {
      key: 'tools' as keyof FormData,
      label: 'Have you used tools like Excel, Google Sheets, or design apps?',
      type: 'select',
      options: ['Yes', 'No'],
      required: true
    },
    {
      key: 'problemSolving' as keyof FormData,
      label: 'Are you good at spotting details or fixing problems?',
      type: 'select',
      options: ['Details', 'Fixing problems', 'Both', 'Neither'],
      required: true
    },
    {
      key: 'studyHours' as keyof FormData,
      label: 'How many hours can you study weekly?',
      type: 'select',
      options: ['1–5', '5–10', '10–20', '20+'],
      required: true
    },
    {
      key: 'device' as keyof FormData,
      label: 'What device do you use?',
      type: 'select',
      options: ['Smartphone', 'Laptop', 'Both'],
      required: true
    },
    {
      key: 'learningStyle' as keyof FormData,
      label: 'How do you learn best?',
      type: 'select',
      options: ['Videos', 'Reading', 'Projects', 'Classes', 'Other'],
      required: true
    },
    {
      key: 'courseStyle' as keyof FormData,
      label: 'Do you prefer structured courses or self-paced?',
      type: 'select',
      options: ['Structured', 'Self-paced', 'Both'],
      required: true
    }
  ];

  const getCareerRecommendations = (data: FormData): CareerRecommendation[] => {
    const recommendations: CareerRecommendation[] = [];

    // Frontend Development
    if ((data.activities === 'Creating visuals' || data.skills === 'Design/creativity') && 
        (data.preference === 'Look good' || data.preference === 'Both') && 
        data.project === 'Apps/websites') {
      recommendations.push({
        title: 'Frontend Developer',
        description: 'Create beautiful, interactive user interfaces for websites and applications.',
        icon: <Palette className="w-8 h-8 text-blue-500" />,
        skills: ['HTML/CSS', 'JavaScript', 'React', 'Design'],
        timeToStart: '3-6 months'
      });
    }

    // Data Analysis
    if ((data.activities === 'Solving puzzles' || data.skills === 'Numbers/math') && 
        data.project === 'Data analysis' && data.problemSolving === 'Details') {
      recommendations.push({
        title: 'Data Analyst',
        description: 'Turn data into insights that drive business decisions.',
        icon: <BarChart3 className="w-8 h-8 text-green-500" />,
        skills: ['SQL', 'Python', 'Excel', 'Statistics'],
        timeToStart: '2-4 months'
      });
    }

    // Cybersecurity
    if (data.project === 'Security/hacking' && data.problemSolving === 'Fixing problems') {
      recommendations.push({
        title: 'Cybersecurity Specialist',
        description: 'Protect systems and data from digital threats.',
        icon: <Shield className="w-8 h-8 text-red-500" />,
        skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment'],
        timeToStart: '4-8 months'
      });
    }

    // Backend Development
    if ((data.preference === 'Work well' || data.preference === 'Both') && 
        data.activities === 'Solving puzzles' && data.project === 'Apps/websites') {
      recommendations.push({
        title: 'Backend Developer',
        description: 'Build the server-side logic that powers applications.',
        icon: <Code className="w-8 h-8 text-purple-500" />,
        skills: ['Python/Java', 'Databases', 'APIs', 'Cloud'],
        timeToStart: '4-6 months'
      });
    }

    // Product Management
    if (data.activities === 'Helping people' && data.skills === 'Communication' && 
        data.workStyle === 'Variety') {
      recommendations.push({
        title: 'Product Manager',
        description: 'Bridge technical teams and business needs to create successful products.',
        icon: <Users className="w-8 h-8 text-orange-500" />,
        skills: ['Strategy', 'Communication', 'Analytics', 'User Research'],
        timeToStart: '2-3 months'
      });
    }

    // AI/ML Engineer
    if (data.project === 'AI/chatbots' && data.skills === 'Numbers/math') {
      recommendations.push({
        title: 'AI/ML Engineer',
        description: 'Build intelligent systems that can learn and make decisions.',
        icon: <Brain className="w-8 h-8 text-indigo-500" />,
        skills: ['Python', 'Machine Learning', 'Statistics', 'Neural Networks'],
        timeToStart: '6-12 months'
      });
    }

    // Default recommendation if no specific matches
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Full-Stack Developer',
        description: 'Work on both frontend and backend to build complete applications.',
        icon: <Code className="w-8 h-8 text-blue-500" />,
        skills: ['HTML/CSS', 'JavaScript', 'Backend Languages', 'Databases'],
        timeToStart: '6-9 months'
      });
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const submitFormData = async (data: FormData, recommendations: CareerRecommendation[]) => {
    setIsSubmitting(true);
    try {
      const payload = {
        userId: data.whatsappNumber,
        formData: data,
        recommendations: recommendations.map(rec => ({
          title: rec.title,
          description: rec.description,
          skills: rec.skills,
          timeToStart: rec.timeToStart
        })),
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('https://kindness300m2.app.n8n.cloud/webhook-test/89f54f8b-21dd-42d0-a1a0-09a2e9ca28e0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

      const result = await response.text();
      console.log('Webhook response:', result);
      
      // Set the AI response from the webhook
      setAiResponse(result);

      console.log('Form data submitted successfully');
      toast({
        title: "Form Submitted!",
        description: "Your career assessment has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Set a default AI response in case of error
      setAiResponse("Thank you for completing the assessment! Based on your responses, we've generated personalized career recommendations for you.");
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      // Generate recommendations
      const recs = getCareerRecommendations(formData);
      setRecommendations(recs);
      
      // Submit form data to webhook
      await submitFormData(formData, recs);
      
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

          {/* AI Response Section */}
          {aiResponse && (
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">AI Career Analysis</CardTitle>
                      <CardDescription className="text-gray-600">Personalized insights based on your responses</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {aiResponse}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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

          <div className="text-center">
            <Button 
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Take Assessment Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

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
                    onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
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
                    onValueChange={(value) => handleInputChange(currentQuestion.key, value)}
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
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
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
      </div>
    </div>
  );
};

export default Index;
