import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain, ArrowRight, Sparkles, Code, Palette, Shield, BarChart3, Users, MessageSquare, Smartphone, Home, Target, Video, TrendingUp, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import sanitizeHtml from 'sanitize-html';

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

interface CareerCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  salary: string;
  duration: string;
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
  const [aiResponse, setAiResponse] = useState<string>('');
  const [visibleCareers, setVisibleCareers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // All 30 career cards
  const allCareers: CareerCard[] = [
    // Data Analytics
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      description: 'Analyzes datasets to uncover trends and insights, using tools like Excel, Tableau, or Python.',
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      skills: ['Excel', 'Python', 'Tableau', 'Statistics'],
      salary: '',
      duration: '3-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/data-analytics',
      courseName: 'Data Analytics'
    },
    {
      id: 'business-intelligence-analyst',
      title: 'Business Intelligence Analyst',
      description: 'Transforms data into actionable business strategies, creating reports and dashboards.',
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      skills: ['SQL', 'Power BI', 'Business Analysis', 'Data Visualization'],
      salary: '',
      duration: '4-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/data-analytics',
      courseName: 'Data Analytics'
    },
    {
      id: 'market-research-analyst',
      title: 'Market Research Analyst',
      description: 'Studies consumer behavior to inform marketing strategies, using data to predict trends.',
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      skills: ['Market Research', 'Statistics', 'Survey Design', 'Consumer Psychology'],
      salary: '',
      duration: '3-4 months',
      courseLink: 'https://www.palmtechniq.com/courses/data-analytics',
      courseName: 'Data Analytics'
    },
    // Web Development
    {
      id: 'front-end-developer',
      title: 'Front-End Developer',
      description: 'Builds user-facing website elements using HTML, CSS, and JavaScript.',
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      salary: '',
      duration: '4-8 months',
      courseLink: 'https://www.palmtechniq.com/courses/web-development',
      courseName: 'Web Development'
    },
    {
      id: 'back-end-developer',
      title: 'Back-End Developer',
      description: 'Manages server-side logic and databases using Python or Node.js.',
      icon: <Code className="w-8 h-8 text-green-500" />,
      skills: ['Python', 'Node.js', 'Databases', 'APIs'],
      salary: '',
      duration: '6-10 months',
      courseLink: 'https://www.palmtechniq.com/courses/web-development',
      courseName: 'Web Development'
    },
    {
      id: 'full-stack-developer',
      title: 'Full-Stack Developer',
      description: 'Handles both front-end and back-end, creating complete web apps.',
      icon: <Code className="w-8 h-8 text-blue-500" />,
      skills: ['HTML/CSS', 'JavaScript', 'Backend Languages', 'Databases'],
      salary: '',
      duration: '8-12 months',
      courseLink: 'https://www.palmtechniq.com/courses/web-development',
      courseName: 'Web Development'
    },
    // Smart-home Automation
    {
      id: 'iot-developer',
      title: 'IoT Developer',
      description: 'Designs and programs smart devices like home security systems using IoT platforms.',
      icon: <Home className="w-8 h-8 text-teal-500" />,
      skills: ['IoT Platforms', 'Arduino', 'Raspberry Pi', 'Sensors'],
      salary: '',
      duration: '4-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/smart-home-automation',
      courseName: 'Smart-home Automation'
    },
    {
      id: 'smart-home-technician',
      title: 'Smart Home Technician',
      description: 'Installs and maintains smart devices like thermostats or lighting systems.',
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      skills: ['Device Installation', 'Network Setup', 'Troubleshooting', 'Customer Service'],
      salary: '',
      duration: '2-4 months',
      courseLink: 'https://www.palmtechniq.com/courses/smart-home-automation',
      courseName: 'Smart-home Automation'
    },
    {
      id: 'automation-consultant',
      title: 'Automation Consultant',
      description: 'Advises clients on integrating smart solutions for homes or offices.',
      icon: <Target className="w-8 h-8 text-indigo-500" />,
      skills: ['Consulting', 'System Design', 'Client Management', 'Smart Technologies'],
      salary: '',
      duration: '4-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/smart-home-automation',
      courseName: 'Smart-home Automation'
    },
    // Cybersecurity
    {
      id: 'cybersecurity-analyst',
      title: 'Cybersecurity Analyst',
      description: 'Protects systems from threats by identifying vulnerabilities.',
      icon: <Shield className="w-8 h-8 text-red-500" />,
      skills: ['Network Security', 'Threat Analysis', 'Firewalls', 'Risk Assessment'],
      salary: '',
      duration: '6-8 months',
      courseLink: 'https://www.palmtechniq.com/courses/cybersecurity',
      courseName: 'Cybersecurity'
    },
    {
      id: 'penetration-tester',
      title: 'Penetration Tester',
      description: 'Simulates cyberattacks to test system security.',
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      skills: ['Ethical Hacking', 'Security Testing', 'Vulnerability Assessment', 'Reporting'],
      salary: '',
      duration: '6-10 months',
      courseLink: 'https://www.palmtechniq.com/courses/cybersecurity',
      courseName: 'Cybersecurity'
    },
    {
      id: 'security-consultant',
      title: 'Security Consultant',
      description: 'Advises organizations on security strategies and compliance.',
      icon: <Shield className="w-8 h-8 text-gray-500" />,
      skills: ['Security Strategy', 'Compliance', 'Risk Management', 'Policy Development'],
      salary: '',
      duration: '6-8 months',
      courseLink: 'https://www.palmtechniq.com/courses/cybersecurity',
      courseName: 'Cybersecurity'
    },
    // Graphic Design
    {
      id: 'graphic-designer',
      title: 'Graphic Designer',
      description: 'Creates visuals like logos and marketing materials using Adobe Photoshop or Illustrator.',
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      skills: ['Photoshop', 'Illustrator', 'Brand Design', 'Typography'],
      salary: '',
      duration: '3-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/graphic-design',
      courseName: 'Graphic Design'
    },
    {
      id: 'brand-identity-designer',
      title: 'Brand Identity Designer',
      description: 'Develops cohesive visual branding for companies.',
      icon: <Palette className="w-8 h-8 text-blue-600" />,
      skills: ['Brand Strategy', 'Logo Design', 'Style Guides', 'Creative Direction'],
      salary: '',
      duration: '4-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/graphic-design',
      courseName: 'Graphic Design'
    },
    {
      id: 'social-media-content-creator',
      title: 'Social Media Content Creator',
      description: 'Designs graphics for social media campaigns.',
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
      skills: ['Social Media Design', 'Content Creation', 'Brand Consistency', 'Trend Analysis'],
      salary: '',
      duration: '2-4 months',
      courseLink: 'https://www.palmtechniq.com/courses/graphic-design',
      courseName: 'Graphic Design'
    },
    // UI/UX Design
    {
      id: 'ui-ux-designer',
      title: 'UI/UX Designer',
      description: 'Designs visually appealing interfaces and focuses on user experience, combining visual design with user research and prototyping.',
      icon: <Smartphone className="w-8 h-8 text-indigo-500" />,
      skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
      salary: '',
      duration: '4-7 months',
      courseLink: 'https://www.palmtechniq.com/courses/ui-ux-designing',
      courseName: 'UI/UX Design'
    },
    {
      id: 'product-designer',
      title: 'Product Designer',
      description: 'Combines UI/UX to design end-to-end digital products.',
      icon: <Target className="w-8 h-8 text-blue-700" />,
      skills: ['Product Strategy', 'User Research', 'Interface Design', 'Prototyping'],
      salary: '',
      duration: '6-8 months',
      courseLink: 'https://www.palmtechniq.com/courses/ui-ux-designing',
      courseName: 'UI/UX Design'
    },
    // Mobile App Development
    {
      id: 'mobile-app-developer',
      title: 'Mobile App Developer',
      description: 'Builds apps for iOS or Android using Swift or Kotlin.',
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      skills: ['Swift', 'Kotlin', 'React Native', 'Mobile UI'],
      salary: '',
      duration: '6-10 months',
      courseLink: 'https://www.palmtechniq.com/courses/mobile-app-development',
      courseName: 'Mobile App Development'
    },
    {
      id: 'app-tester',
      title: 'App Tester',
      description: 'Tests mobile apps for functionality and user experience.',
      icon: <Shield className="w-8 h-8 text-green-700" />,
      skills: ['Testing Methodologies', 'Bug Reporting', 'User Experience', 'Quality Assurance'],
      salary: '',
      duration: '2-4 months',
      courseLink: 'https://www.palmtechniq.com/courses/mobile-app-development',
      courseName: 'Mobile App Development'
    },
    {
      id: 'app-ui-ux-designer',
      title: 'App UI/UX Designer',
      description: 'Designs intuitive interfaces for mobile apps.',
      icon: <Palette className="w-8 h-8 text-red-600" />,
      skills: ['Mobile Design', 'User Interface', 'App Prototyping', 'User Experience'],
      salary: '',
      duration: '4-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/mobile-app-development',
      courseName: 'Mobile App Development'
    },
    // Digital Marketing
    {
      id: 'digital-marketing-specialist',
      title: 'Digital Marketing Specialist',
      description: 'Runs online campaigns using SEO, social media, or Google Ads.',
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      salary: '',
      duration: '3-5 months',
      courseLink: 'https://www.palmtechniq.com/courses/digital-marketing',
      courseName: 'Digital Marketing'
    },
    {
      id: 'social-media-manager',
      title: 'Social Media Manager',
      description: 'Manages brand presence on platforms like Instagram or X.',
      icon: <MessageSquare className="w-8 h-8 text-pink-600" />,
      skills: ['Social Media Strategy', 'Content Planning', 'Community Management', 'Analytics'],
      salary: '',
      duration: '2-4 months',
      courseLink: 'https://www.palmtechniq.com/courses/digital-marketing',
      courseName: 'Digital Marketing'
    },
    {
      id: 'content-marketer',
      title: 'Content Marketer',
      description: 'Creates engaging content like blogs or videos to drive traffic.',
      icon: <Video className="w-8 h-8 text-teal-600" />,
      skills: ['Content Creation', 'SEO Writing', 'Content Strategy', 'Brand Voice'],
      salary: '',
      duration: '3-5 months',
      courseLink: 'https://www.palmtechniq.com/courses/digital-marketing',
      courseName: 'Digital Marketing'
    },
    // Video Editing
    {
      id: 'video-editor',
      title: 'Video Editor',
      description: 'Edits videos for ads, social media, or films using Adobe Premiere or Final Cut Pro.',
      icon: <Video className="w-8 h-8 text-red-600" />,
      skills: ['Adobe Premiere', 'Final Cut Pro', 'Motion Graphics', 'Color Grading'],
      salary: '',
      duration: '3-5 months',
      courseLink: 'https://www.palmtechniq.com/courses/video-editing',
      courseName: 'Video Editing'
    },
    {
      id: 'motion-graphics-designer',
      title: 'Motion Graphics Designer',
      description: 'Creates animated visuals for videos or ads.',
      icon: <Video className="w-8 h-8 text-purple-700" />,
      skills: ['After Effects', 'Motion Design', 'Animation', 'Visual Effects'],
      salary: '',
      duration: '4-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/video-editing',
      courseName: 'Video Editing'
    },
    {
      id: 'content-creator',
      title: 'Content Creator',
      description: 'Produces and edits video content for YouTube or TikTok.',
      icon: <Video className="w-8 h-8 text-green-800" />,
      skills: ['Video Production', 'Content Strategy', 'Social Media', 'Storytelling'],
      salary: '',
      duration: '2-4 months',
      courseLink: 'https://www.palmtechniq.com/courses/video-editing',
      courseName: 'Video Editing'
    },
    // Project Management
    {
      id: 'project-manager',
      title: 'Project Manager',
      description: 'Oversees tech projects, coordinating teams and timelines.',
      icon: <Users className="w-8 h-8 text-green-600" />,
      skills: ['Project Planning', 'Team Leadership', 'Agile', 'Communication'],
      salary: '',
      duration: '4-6 months',
      courseLink: 'https://www.palmtechniq.com/courses/project-management',
      courseName: 'Project Management'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      description: 'Guides product development from ideation to launch.',
      icon: <Target className="w-8 h-8 text-indigo-700" />,
      skills: ['Product Strategy', 'Market Research', 'Roadmap Planning', 'Stakeholder Management'],
      salary: '',
      duration: '5-8 months',
      courseLink: 'https://www.palmtechniq.com/courses/project-management',
      courseName: 'Project Management'
    },
    {
      id: 'scrum-master',
      title: 'Scrum Master',
      description: 'Facilitates agile development processes and removes team blockers.',
      icon: <Users className="w-8 h-8 text-orange-700" />,
      skills: ['Scrum Framework', 'Agile Coaching', 'Team Facilitation', 'Process Improvement'],
      salary: '',
      duration: '3-5 months',
      courseLink: 'https://www.palmtechniq.com/courses/project-management',
      courseName: 'Project Management'
    }
  ];

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
      options: ['Creating visuals and designs', 'Building websites and web apps', 'Solving technical problems', 'Analyzing data and trends', 'Building mobile apps', 'Helping people', 'Organizing tasks', 'Building physical devices', 'Promoting or marketing', 'Editing videos', 'Other'],
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
      options: ['Web design and development projects', 'Mobile app development', 'Creative projects (graphic design, video)', 'Technical projects (coding, cybersecurity)', 'Data analysis and insights', 'Management/marketing projects', 'Smart devices or IoT', 'Other'],
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

  const parseWebhookResponse = async (response: Response) => {
    try {
      const result = await response.json();
      console.log('Raw JSON response:', JSON.stringify(result, null, 2));
      
      if (result.recommendation && Array.isArray(result.careers) && result.careers.length > 0) {
        const { recommendation, careers } = result;
        console.log('Parsed data:', { recommendation, careers });
        return { recommendation, careers };
      }
      throw new Error('Invalid response structure: Missing or invalid recommendation or careers');
    } catch (error) {
      console.error('Error parsing webhook response:', error);
      throw error;
    }
  };

  const submitFormData = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        userId: data.whatsappNumber,
        formData: data,
        submittedAt: new Date().toISOString(),
      };
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));

      const webhookUrl = 'https://kindness300mjuly.app.n8n.cloud/webhook/89f54f8b-21dd-42d0-a1a0-09a2e9ca28e0';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('Webhook response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const { recommendation, careers } = await parseWebhookResponse(response);
      console.log('Setting state:', { recommendation, careers });
      setAiResponse(recommendation);
      setVisibleCareers(careers);

      toast({
        title: 'Form Submitted!',
        description: 'Your career assessment has been submitted successfully.',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setAiResponse('Thank you for completing the assessment! Based on your responses, we have generated personalized career recommendations for you.');
      setVisibleCareers(['Project Manager', 'Digital Marketing Specialist']);
      toast({
        title: 'Submission Error',
        description: 'There was an error submitting your form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testWebhook = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        userId: formData.whatsappNumber || '+2349123456789',
        formData: formData,
        submittedAt: new Date().toISOString(),
      };
      console.log('Testing webhook with payload:', JSON.stringify(payload, null, 2));

      const testWebhookUrl = 'https://kindness300mjuly.app.n8n.cloud/webhook-test/89f54f8b-21dd-42d0-a1a0-09a2e9ca28e0';
      const response = await fetch(testWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('Test webhook response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const { recommendation, careers } = await parseWebhookResponse(response);
      console.log('Test webhook - Setting state:', { recommendation, careers });
      setAiResponse(recommendation);
      setVisibleCareers(careers);
      setShowResults(true);

      toast({
        title: 'Test Webhook Success!',
        description: 'Test webhook called successfully.',
      });
    } catch (error) {
      console.error('Error calling test webhook:', error);
      setAiResponse('Thank you for completing the assessment! Based on your responses, we have generated personalized career recommendations for you.');
      setVisibleCareers(['Project Manager', 'Digital Marketing Specialist']);
      setShowResults(true);
      toast({
        title: 'Test Webhook Error',
        description: 'There was an error calling the test webhook.',
        variant: 'destructive',
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
      await submitFormData(formData);
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
    setAiResponse('');
    setVisibleCareers([]);
  };

  const normalizeString = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');

  const displayedCareers = useMemo(() => {
    console.log('Visible careers:', visibleCareers);
    const result = allCareers.filter(career =>
      visibleCareers.some(visibleCareer => normalizeString(visibleCareer) === normalizeString(career.title))
    );
    console.log('Displayed careers:', result.map(c => c.title));
    return result;
  }, [visibleCareers]);

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
                    {aiResponse ? (
                      <div
                        className="ai-career-analysis text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(aiResponse, {
                            allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'span', 'a', 'br', 'ul', 'ol', 'li', 'em', 'strong', 'div', 'pre', 'code', 'blockquote', 'hr', 'table', 'thead', 'tbody', 'tr', 'td', 'th'],
                            allowedAttributes: {
                              '*': ['style', 'class'],
                              a: ['href', 'target', 'rel'],
                              img: ['src', 'alt', 'width', 'height'],
                              table: ['border', 'cellpadding', 'cellspacing'],
                              td: ['colspan', 'rowspan'],
                              th: ['colspan', 'rowspan']
                            },
                            allowedSchemes: ['http', 'https', 'mailto'],
                            allowedStyles: {
                              '*': {
                                 'color': [/.*/],
                                 'background-color': [/.*/],
                                 'font-size': [/.*/],
                                 'font-weight': [/.*/],
                                 'font-family': [/.*/],
                                 'text-align': [/.*/],
                                 'line-height': [/.*/],
                                 'margin': [/.*/],
                                 'margin-top': [/.*/],
                                 'margin-bottom': [/.*/],
                                 'margin-left': [/.*/],
                                 'margin-right': [/.*/],
                                 'padding': [/.*/],
                                 'padding-top': [/.*/],
                                 'padding-bottom': [/.*/],
                                 'padding-left': [/.*/],
                                 'padding-right': [/.*/],
                                 'border': [/.*/],
                                 'border-top': [/.*/],
                                 'border-bottom': [/.*/],
                                 'border-left': [/.*/],
                                 'border-right': [/.*/],
                                 'text-decoration': [/.*/],
                                 'text-transform': [/.*/],
                                 'display': [/.*/],
                                 'width': [/.*/],
                                 'height': [/.*/],
                                 'max-width': [/.*/],
                                 'min-height': [/.*/],
                                 'list-style': [/.*/],
                                 'list-style-type': [/.*/],
                                 'white-space': [/.*/],
                                 'word-wrap': [/.*/],
                                 'overflow-wrap': [/.*/]
                              }
                            }
                          }),
                        }}
                      />
                    ) : (
                      <div className="space-y-4">
                        <Skeleton className="h-6 w-3/4 bg-gray-200/50" />
                        <Skeleton className="h-4 w-full bg-gray-200/50" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200/50" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Career Path Cards */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Career Paths</h2>
                  {displayedCareers.length > 0 ? (
                    displayedCareers.map((career) => (
                      <Card key={career.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-md flex-shrink-0">
                              {career.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-blue-800 mb-2">{career.title}</h3>
                              <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                              
                              <div className="mb-3">
                                <h4 className="font-semibold text-gray-700 text-sm mb-2">Key Skills:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {career.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                               <div className="mb-3 pt-2 border-t border-gray-200">
                                <div className="text-xs">
                                  <span className="text-gray-600">Duration:</span>
                                  <div className="font-semibold text-blue-600">{career.duration}</div>
                                </div>
                              </div>
                              
                              <Button 
                                asChild
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold text-sm py-2"
                              >
                                <a href={career.courseLink} target="_blank" rel="noopener noreferrer">
                                  Enroll in {career.courseName}
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="space-y-6">
                      {[1, 2, 3].map((_, index) => (
                        <Skeleton key={index} className="h-48 w-full bg-gray-200/50 rounded-lg" />
                      ))}
                    </div>
                  )}
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
            {/* Test Button */}
            <div className="mb-4 text-center">
              <Button
                onClick={testWebhook}
                disabled={isSubmitting}
                variant="outline"
                className="bg-red-100 border-red-300 text-red-700 hover:bg-red-200 px-4 py-2 rounded-md font-medium"
              >
                🧪 Test Webhook
              </Button>
            </div>

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
