
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, ArrowRight, Sparkles, Code, Palette, Shield, BarChart3, Users, MessageSquare, Smartphone, Home, Target, Video, TrendingUp, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  whatsappNumber: string;
  activities: string;
  activitiesOther: string;
  preference: string;
  project: string;
  projectOther: string;
  workFocus: string;
  workStyle: string;
  skills: string;
  skillsOther: string;
  tools: string;
  strength: string;
  techExposure: string;
  techExposureOther: string;
  motivation: string;
  motivationOther: string;
  studyHours: string;
  device: string;
  learningStyle: string;
  learningStyleOther: string;
}

interface CareerRecommendation {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  salary: string;
  courseLink: string;
  courseName: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsappNumber: '',
    activities: '',
    activitiesOther: '',
    preference: '',
    project: '',
    projectOther: '',
    workFocus: '',
    workStyle: '',
    skills: '',
    skillsOther: '',
    tools: '',
    strength: '',
    techExposure: '',
    techExposureOther: '',
    motivation: '',
    motivationOther: '',
    studyHours: '',
    device: '',
    learningStyle: '',
    learningStyleOther: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Course mapping object
  const courseMapping = {
    'Data Analytics': 'https://www.palmtechniq.com/courses/data-analytics',
    'Web Development': 'https://www.palmtechniq.com/courses/web-development',
    'Smart-home Automation': 'https://www.palmtechniq.com/courses/smart-home-automation',
    'Cybersecurity': 'https://www.palmtechniq.com/courses/cybersecurity',
    'Graphic Design': 'https://www.palmtechniq.com/courses/graphic-design',
    'UI/UX Design': 'https://www.palmtechniq.com/courses/ui-ux-designing',
    'Mobile App Development': 'https://www.palmtechniq.com/courses/mobile-app-development',
    'Digital Marketing': 'https://www.palmtechniq.com/courses/digital-marketing',
    'Video Editing': 'https://www.palmtechniq.com/courses/video-editing',
    'Project Management': 'https://www.palmtechniq.com/courses/project-management'
  };

  const questions = [
    {
      key: 'name' as keyof FormData,
      label: 'Name',
      type: 'text',
      placeholder: 'Your name',
      required: true
    },
    {
      key: 'whatsappNumber' as keyof FormData,
      label: 'WhatsApp Number',
      type: 'text',
      placeholder: 'e.g., +2349123456789',
      required: true
    },
    {
      key: 'activities' as keyof FormData,
      label: 'What activities do you enjoy most?',
      type: 'select',
      options: ['Creating visuals', 'Solving technical problems', 'Helping people', 'Organizing tasks', 'Building physical devices', 'Promoting or marketing', 'Editing videos', 'Other'],
      required: true,
      conditionalField: 'activitiesOther'
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
      label: 'What kind of tech project excites you most?',
      type: 'select',
      options: ['Creative projects (design, video)', 'Technical projects (coding, cybersecurity)', 'Management/marketing projects', 'Smart devices or IoT', 'Other'],
      required: true,
      conditionalField: 'projectOther'
    },
    {
      key: 'workFocus' as keyof FormData,
      label: 'Do you prefer working on creative designs, technical systems, or managing processes?',
      type: 'select',
      options: ['Creative designs', 'Technical systems', 'Managing processes', 'Not sure'],
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
      options: ['Communication', 'Numbers/math', 'Planning', 'Design/creativity', 'Technical troubleshooting', 'Marketing', 'Video editing', 'Other'],
      required: true,
      conditionalField: 'skillsOther'
    },
    {
      key: 'tools' as keyof FormData,
      label: 'Have you used tools like Excel, Google Sheets, design apps, or coding platforms?',
      type: 'select',
      options: ['Yes', 'No'],
      required: true
    },
    {
      key: 'strength' as keyof FormData,
      label: 'Are you good at spotting details, fixing problems, or leading teams?',
      type: 'select',
      options: ['Spotting details', 'Fixing problems', 'Leading teams', 'None of these'],
      required: true
    },
    {
      key: 'techExposure' as keyof FormData,
      label: 'Have you ever tried any tech-related activities (e.g., coding, designing, or managing projects)?',
      type: 'select',
      options: ['Yes, a little', 'No, never', 'Other'],
      required: true,
      conditionalField: 'techExposureOther'
    },
    {
      key: 'motivation' as keyof FormData,
      label: 'What motivates you to enter tech?',
      type: 'select',
      options: ['High-paying jobs', 'Creative expression', 'Solving real-world problems', 'Other'],
      required: true,
      conditionalField: 'motivationOther'
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
      label: 'What device do you use most for learning?',
      type: 'select',
      options: ['Smartphone', 'Laptop', 'Both'],
      required: true
    },
    {
      key: 'learningStyle' as keyof FormData,
      label: 'How do you learn best?',
      type: 'select',
      options: ['Videos', 'Reading', 'Hands-on projects', 'Classes', 'Other'],
      required: true,
      conditionalField: 'learningStyleOther'
    }
  ];

  const getCareerRecommendations = (data: FormData): CareerRecommendation[] => {
    const recommendations: CareerRecommendation[] = [];

    // Data Analytics paths
    if ((data.skills === 'Numbers/math' || data.activities === 'Solving technical problems') && 
        data.strength === 'Spotting details') {
      recommendations.push({
        title: 'Data Analyst',
        description: 'Analyzes datasets to uncover trends and insights, using tools like Excel, Tableau, or Python.',
        icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
        skills: ['Excel', 'Python', 'Tableau', 'Statistics'],
        salary: '₦3-6M/year',
        courseLink: courseMapping['Data Analytics'],
        courseName: 'Data Analytics'
      });
    }

    // Web Development paths
    if ((data.project === 'Technical projects (coding, cybersecurity)' || data.workFocus === 'Technical systems') && 
        data.preference === 'Work well') {
      recommendations.push({
        title: 'Back-End Developer',
        description: 'Manages server-side logic and databases using Python or Node.js.',
        icon: <Code className="w-8 h-8 text-green-500" />,
        skills: ['Python', 'Node.js', 'Databases', 'APIs'],
        salary: '₦4-8M/year',
        courseLink: courseMapping['Web Development'],
        courseName: 'Web Development'
      });
    }

    if ((data.workFocus === 'Creative designs' || data.preference === 'Look good') && 
        data.activities === 'Creating visuals') {
      recommendations.push({
        title: 'Front-End Developer',
        description: 'Builds user-facing website elements using HTML, CSS, and JavaScript.',
        icon: <Palette className="w-8 h-8 text-purple-500" />,
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        salary: '₦4-8M/year',
        courseLink: courseMapping['Web Development'],
        courseName: 'Web Development'
      });
    }

    // Cybersecurity paths
    if (data.project === 'Technical projects (coding, cybersecurity)' && 
        data.strength === 'Fixing problems') {
      recommendations.push({
        title: 'Cybersecurity Analyst',
        description: 'Protects systems from threats by identifying vulnerabilities.',
        icon: <Shield className="w-8 h-8 text-red-500" />,
        skills: ['Network Security', 'Threat Analysis', 'Firewalls'],
        salary: '₦5-10M/year',
        courseLink: courseMapping['Cybersecurity'],
        courseName: 'Cybersecurity'
      });
    }

    // Graphic Design paths
    if ((data.activities === 'Creating visuals' || data.skills === 'Design/creativity') && 
        data.workFocus === 'Creative designs') {
      recommendations.push({
        title: 'Graphic Designer',
        description: 'Creates visuals like logos and marketing materials using Adobe Photoshop or Illustrator.',
        icon: <Palette className="w-8 h-8 text-pink-500" />,
        skills: ['Photoshop', 'Illustrator', 'Brand Design', 'Typography'],
        salary: '₦2-5M/year',
        courseLink: courseMapping['Graphic Design'],
        courseName: 'Graphic Design'
      });
    }

    // UI/UX Design paths
    if (data.workFocus === 'Creative designs' && data.preference === 'Both') {
      recommendations.push({
        title: 'UI/UX Designer',
        description: 'Designs visually appealing and user-friendly app or website interfaces.',
        icon: <Smartphone className="w-8 h-8 text-indigo-500" />,
        skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
        salary: '₦4-7M/year',
        courseLink: courseMapping['UI/UX Design'],
        courseName: 'UI/UX Design'
      });
    }

    // Mobile App Development paths
    if (data.project === 'Technical projects (coding, cybersecurity)' && 
        data.device === 'Smartphone') {
      recommendations.push({
        title: 'Mobile App Developer',
        description: 'Builds apps for iOS or Android using Swift or Kotlin.',
        icon: <Smartphone className="w-8 h-8 text-blue-600" />,
        skills: ['Swift', 'Kotlin', 'React Native', 'Mobile UI'],
        salary: '₦5-9M/year',
        courseLink: courseMapping['Mobile App Development'],
        courseName: 'Mobile App Development'
      });
    }

    // Digital Marketing paths
    if ((data.activities === 'Promoting or marketing' || data.skills === 'Marketing') && 
        data.workFocus === 'Managing processes') {
      recommendations.push({
        title: 'Digital Marketing Specialist',
        description: 'Runs online campaigns using SEO, social media, or Google Ads.',
        icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
        skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
        salary: '₦3-6M/year',
        courseLink: courseMapping['Digital Marketing'],
        courseName: 'Digital Marketing'
      });
    }

    // Video Editing paths
    if ((data.activities === 'Editing videos' || data.skills === 'Video editing') && 
        data.workFocus === 'Creative designs') {
      recommendations.push({
        title: 'Video Editor',
        description: 'Edits videos for ads, social media, or films using Adobe Premiere or Final Cut Pro.',
        icon: <Video className="w-8 h-8 text-red-600" />,
        skills: ['Adobe Premiere', 'Final Cut Pro', 'Motion Graphics', 'Color Grading'],
        salary: '₦2-5M/year',
        courseLink: courseMapping['Video Editing'],
        courseName: 'Video Editing'
      });
    }

    // Project Management paths
    if ((data.skills === 'Planning' || data.strength === 'Leading teams') && 
        data.workStyle === 'Variety') {
      recommendations.push({
        title: 'Project Manager',
        description: 'Oversees tech projects, coordinating teams and timelines.',
        icon: <Users className="w-8 h-8 text-green-600" />,
        skills: ['Project Planning', 'Team Leadership', 'Agile', 'Communication'],
        salary: '₦5-10M/year',
        courseLink: courseMapping['Project Management'],
        courseName: 'Project Management'
      });
    }

    // Smart-home Automation paths
    if (data.activities === 'Building physical devices' || data.project === 'Smart devices or IoT') {
      recommendations.push({
        title: 'IoT Developer',
        description: 'Designs and programs smart devices like home security systems using IoT platforms.',
        icon: <Home className="w-8 h-8 text-teal-500" />,
        skills: ['IoT Platforms', 'Arduino', 'Raspberry Pi', 'Sensors'],
        salary: '₦4-7M/year',
        courseLink: courseMapping['Smart-home Automation'],
        courseName: 'Smart-home Automation'
      });
    }

    // Ensure at least 2 recommendations
    if (recommendations.length < 2) {
      if (recommendations.length === 0) {
        recommendations.push(
          {
            title: 'Full-Stack Developer',
            description: 'Handles both front-end and back-end, creating complete web apps.',
            icon: <Code className="w-8 h-8 text-blue-500" />,
            skills: ['HTML/CSS', 'JavaScript', 'Backend Languages', 'Databases'],
            salary: '₦6-12M/year',
            courseLink: courseMapping['Web Development'],
            courseName: 'Web Development'
          },
          {
            title: 'Digital Marketing Specialist',
            description: 'Runs online campaigns using SEO, social media, or Google Ads.',
            icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
            skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
            salary: '₦3-6M/year',
            courseLink: courseMapping['Digital Marketing'],
            courseName: 'Digital Marketing'
          }
        );
      } else {
        recommendations.push({
          title: 'UI/UX Designer',
          description: 'Designs visually appealing and user-friendly app or website interfaces.',
          icon: <Smartphone className="w-8 h-8 text-indigo-500" />,
          skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
          salary: '₦4-7M/year',
          courseLink: courseMapping['UI/UX Design'],
          courseName: 'UI/UX Design'
        });
      }
    }

    return recommendations.slice(0, 3);
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
          salary: rec.salary
        })),
        submittedAt: new Date().toISOString()
      };

      // Submit to both webhooks
      const webhookUrls = [
        'https://kindness300mjuly.app.n8n.cloud/webhook/89f54f8b-21dd-42d0-a1a0-09a2e9ca28e0',
        'https://kindness300mjuly.app.n8n.cloud/webhook-test/89f54f8b-21dd-42d0-a1a0-09a2e9ca28e0'
      ];

      const submissions = webhookUrls.map(url => 
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
      );

      const responses = await Promise.allSettled(submissions);
      
      // Use the first successful response for AI response
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].status === 'fulfilled') {
          const response = (responses[i] as PromiseFulfilledResult<Response>).value;
          if (response.ok) {
            const result = await response.text();
            console.log(`Webhook ${i + 1} response:`, result);
            
            try {
              const jsonResponse = JSON.parse(result);
              if (jsonResponse.recommendation) {
                setAiResponse(jsonResponse.recommendation);
              } else {
                setAiResponse(result);
              }
            } catch (parseError) {
              setAiResponse(result);
            }
            break;
          }
        }
      }

      console.log('Form data submitted successfully');
      toast({
        title: "Form Submitted!",
        description: "Your career assessment has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      e.preventDefault();
      handleNext();
    }
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
      const recs = getCareerRecommendations(formData);
      setRecommendations(recs);
      
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
      activitiesOther: '',
      preference: '',
      project: '',
      projectOther: '',
      workFocus: '',
      workStyle: '',
      skills: '',
      skillsOther: '',
      tools: '',
      strength: '',
      techExposure: '',
      techExposureOther: '',
      motivation: '',
      motivationOther: '',
      studyHours: '',
      device: '',
      learningStyle: '',
      learningStyleOther: ''
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

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              
              {/* Left Side - AI Response Section */}
              <div className="lg:col-span-1">
                {aiResponse && (
                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg h-full">
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
                      <div 
                        className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: aiResponse }}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Side - Career Path Cards */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Career Paths</h2>
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-md flex-shrink-0">
                            {rec.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{rec.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-700 text-sm mb-2">Key Skills:</h4>
                              <div className="flex flex-wrap gap-1">
                                {rec.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-3 pt-2 border-t border-gray-200">
                              <span className="text-xs text-gray-600">Average salary:</span>
                              <span className="font-semibold text-green-600 text-sm">{rec.salary}</span>
                            </div>
                            
                            <Button 
                              asChild
                              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold text-sm py-2"
                            >
                              <a href={rec.courseLink} target="_blank" rel="noopener noreferrer">
                                Enroll in {rec.courseName}
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
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

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg" onKeyDown={handleKeyPress}>
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
                    onKeyDown={handleKeyPress}
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
                    <SelectTrigger 
                      className="mt-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      onKeyDown={handleKeyPress}
                    >
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
                  
                  {/* Conditional "Other" input */}
                  {currentQuestion.conditionalField && formData[currentQuestion.key] === 'Other' && (
                    <div className="mt-2">
                      <Input
                        placeholder={
                          currentQuestion.conditionalField === 'activitiesOther' ? 'Describe what you enjoy' :
                          currentQuestion.conditionalField === 'projectOther' ? 'Describe the project' :
                          currentQuestion.conditionalField === 'skillsOther' ? 'Describe your skill' :
                          currentQuestion.conditionalField === 'techExposureOther' ? 'Describe your tech experience' :
                          currentQuestion.conditionalField === 'motivationOther' ? 'Describe your motivation' :
                          currentQuestion.conditionalField === 'learningStyleOther' ? 'Describe how you learn' :
                          'Please specify'
                        }
                        value={formData[currentQuestion.conditionalField as keyof FormData]}
                        onChange={(e) => handleInputChange(currentQuestion.conditionalField as keyof FormData, e.target.value)}
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
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
                  {isSubmitting ? 'Submitting...' : (currentStep === questions.length - 1 ? 'Discover My Tech Path' : 'Next')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                Press Enter to continue
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
