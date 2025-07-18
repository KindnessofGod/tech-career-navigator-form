import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Crown, Wand2, Sparkles, Scroll, Shield, Gem, Flame, Zap, Star, BookOpen, Swords, Map, Eye, Atom, Brush, Smartphone, Home, Users, Target, ArrowRight, MessageSquare, Video, TrendingUp, Palette, Code, BarChart3, Brain } from 'lucide-react';
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

interface CareerCrystal {
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

  // All 30 career crystals with fantasy themes
  const allCareers: CareerCrystal[] = [
    // Data Analytics - Crystal of Insight
    {
      id: 'data-analyst',
      title: 'Oracle of Data',
      description: 'Peer into the mystical realm of data to reveal hidden patterns and ancient wisdom using sacred scrolls and crystal tablets.',
      icon: <Gem className="w-8 h-8 text-blue-500" />,
      skills: ['Excel Scrolls', 'Python Runes', 'Tableau Visions', 'Ancient Statistics'],
      salary: '',
      duration: '3-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/data-analytics',
      courseName: 'Data Analytics'
    },
    {
      id: 'business-intelligence-analyst',
      title: 'Sage of Business Wisdom',
      description: 'Transform raw data into strategic prophecies, crafting mystical reports and enchanted dashboards.',
      icon: <Crown className="w-8 h-8 text-green-500" />,
      skills: ['SQL Incantations', 'Power BI Crystals', 'Ancient Business Arts', 'Vision Weaving'],
      salary: '',
      duration: '4-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/data-analytics',
      courseName: 'Data Analytics'
    },
    {
      id: 'market-research-analyst',
      title: 'Seer of Market Prophecies',
      description: 'Study the behaviors of distant kingdoms to divine future trends and trading opportunities.',
      icon: <Eye className="w-8 h-8 text-purple-500" />,
      skills: ['Market Divination', 'Statistical Prophecy', 'Survey Enchantments', 'Mind Reading'],
      salary: '',
      duration: '3-4 moons',
      courseLink: 'https://www.palmtechniq.com/courses/data-analytics',
      courseName: 'Data Analytics'
    },
    // Web Development - Arcane Web Weaving
    {
      id: 'front-end-developer',
      title: 'Weaver of Visual Spells',
      description: 'Craft enchanting user interfaces using ancient HTML scrolls, CSS potions, and JavaScript incantations.',
      icon: <Brush className="w-8 h-8 text-purple-500" />,
      skills: ['HTML Scrolls', 'CSS Potions', 'JavaScript Spells', 'React Enchantments'],
      salary: '',
      duration: '4-8 moons',
      courseLink: 'https://www.palmtechniq.com/courses/web-development',
      courseName: 'Web Development'
    },
    {
      id: 'back-end-developer',
      title: 'Keeper of Server Realms',
      description: 'Guard and manage the hidden server sanctuaries using Python serpents and Node.js spirits.',
      icon: <Swords className="w-8 h-8 text-green-500" />,
      skills: ['Python Serpents', 'Node.js Spirits', 'Database Vaults', 'API Gateways'],
      salary: '',
      duration: '6-10 moons',
      courseLink: 'https://www.palmtechniq.com/courses/web-development',
      courseName: 'Web Development'
    },
    {
      id: 'full-stack-developer',
      title: 'Master of All Realms',
      description: 'Command both the visible and hidden realms of web magic, wielding complete arcane knowledge.',
      icon: <Crown className="w-8 h-8 text-blue-500" />,
      skills: ['Universal Spells', 'Realm Mastery', 'Complete Wizardry', 'Omnipotent Coding'],
      salary: '',
      duration: '8-12 moons',
      courseLink: 'https://www.palmtechniq.com/courses/web-development',
      courseName: 'Web Development'
    },
    // Smart-home Automation - Enchanted Dwelling Magic
    {
      id: 'iot-developer',
      title: 'Enchanter of Mystical Devices',
      description: 'Breathe life into inanimate objects, creating magical home guardians and sentient household spirits.',
      icon: <Home className="w-8 h-8 text-teal-500" />,
      skills: ['Device Enchantment', 'Arduino Familiars', 'Raspberry Pi Spirits', 'Sensor Spells'],
      salary: '',
      duration: '4-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/smart-home-automation',
      courseName: 'Smart-home Automation'
    },
    {
      id: 'smart-home-technician',
      title: 'Guardian of Enchanted Dwellings',
      description: 'Install and maintain magical household spirits like temperature wraiths and illumination sprites.',
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      skills: ['Spirit Binding', 'Mystical Networks', 'Troubleshooting Curses', 'Homeowner Relations'],
      salary: '',
      duration: '2-4 moons',
      courseLink: 'https://www.palmtechniq.com/courses/smart-home-automation',
      courseName: 'Smart-home Automation'
    },
    {
      id: 'automation-consultant',
      title: 'Sage of Automated Kingdoms',
      description: 'Advise nobles on integrating magical solutions into their castles and keeps.',
      icon: <Target className="w-8 h-8 text-indigo-500" />,
      skills: ['Royal Consulting', 'Castle Design', 'Noble Relations', 'Magical Technologies'],
      salary: '',
      duration: '4-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/smart-home-automation',
      courseName: 'Smart-home Automation'
    },
    // Cybersecurity - Shield of Digital Realms
    {
      id: 'cybersecurity-analyst',
      title: 'Defender of Digital Realms',
      description: 'Protect the kingdom from dark sorcerers and malevolent spirits seeking to breach our defenses.',
      icon: <Shield className="w-8 h-8 text-red-500" />,
      skills: ['Protective Wards', 'Threat Divination', 'Firewall Barriers', 'Risk Assessment'],
      salary: '',
      duration: '6-8 moons',
      courseLink: 'https://www.palmtechniq.com/courses/cybersecurity',
      courseName: 'Cybersecurity'
    },
    {
      id: 'penetration-tester',
      title: 'White Hat Infiltrator',
      description: 'Practice benevolent dark arts to test the strength of our magical defenses.',
      icon: <Swords className="w-8 h-8 text-orange-500" />,
      skills: ['Righteous Hacking', 'Defense Testing', 'Weakness Divination', 'Battle Reports'],
      salary: '',
      duration: '6-10 moons',
      courseLink: 'https://www.palmtechniq.com/courses/cybersecurity',
      courseName: 'Cybersecurity'
    },
    {
      id: 'security-consultant',
      title: 'Grand Advisor of Protection',
      description: 'Counsel kingdoms on defensive strategies and ancient protection protocols.',
      icon: <Crown className="w-8 h-8 text-gray-500" />,
      skills: ['Strategic Defense', 'Ancient Protocols', 'Risk Prophecy', 'Policy Crafting'],
      salary: '',
      duration: '6-8 moons',
      courseLink: 'https://www.palmtechniq.com/courses/cybersecurity',
      courseName: 'Cybersecurity'
    },
    // Graphic Design - Artisan of Visual Magic
    {
      id: 'graphic-designer',
      title: 'Artisan of Visual Magic',
      description: 'Create mystical sigils and enchanted scrolls using ancient Photoshop grimoires and Illustrator spells.',
      icon: <Brush className="w-8 h-8 text-pink-500" />,
      skills: ['Photoshop Grimoires', 'Illustrator Spells', 'Sigil Crafting', 'Runic Typography'],
      salary: '',
      duration: '3-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/graphic-design',
      courseName: 'Graphic Design'
    },
    {
      id: 'brand-identity-designer',
      title: 'Forger of Kingdom Identities',
      description: 'Develop cohesive visual heraldry and mystical emblems for noble houses.',
      icon: <Star className="w-8 h-8 text-blue-600" />,
      skills: ['Heraldic Strategy', 'Emblem Forging', 'Royal Style Guides', 'Creative Mastery'],
      salary: '',
      duration: '4-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/graphic-design',
      courseName: 'Graphic Design'
    },
    {
      id: 'social-media-content-creator',
      title: 'Scribe of Digital Scrolls',
      description: 'Craft enchanted messages and visual spells for the magical communication networks.',
      icon: <Scroll className="w-8 h-8 text-green-600" />,
      skills: ['Message Enchantment', 'Visual Spellcrafting', 'Brand Consistency', 'Trend Divination'],
      salary: '',
      duration: '2-4 moons',
      courseLink: 'https://www.palmtechniq.com/courses/graphic-design',
      courseName: 'Graphic Design'
    },
    // UI/UX Design - Experience Enchanter
    {
      id: 'ui-ux-designer',
      title: 'Enchanter of User Experiences',
      description: 'Design intuitive magical interfaces that guide users through mystical journeys with ease and wonder.',
      icon: <Wand2 className="w-8 h-8 text-indigo-500" />,
      skills: ['Figma Crystals', 'Adobe XD Grimoires', 'User Mind Reading', 'Experience Weaving'],
      salary: '',
      duration: '4-7 moons',
      courseLink: 'https://www.palmtechniq.com/courses/ui-ux-designing',
      courseName: 'UI/UX Design'
    },
    {
      id: 'product-designer',
      title: 'Architect of Magical Experiences',
      description: 'Combine interface sorcery with user empathy to create complete enchanted products.',
      icon: <Gem className="w-8 h-8 text-blue-700" />,
      skills: ['Product Prophecy', 'User Research', 'Interface Mastery', 'Experience Prototyping'],
      salary: '',
      duration: '6-8 moons',
      courseLink: 'https://www.palmtechniq.com/courses/ui-ux-designing',
      courseName: 'UI/UX Design'
    },
    // Mobile App Development - Pocket Realm Creation
    {
      id: 'mobile-app-developer',
      title: 'Creator of Pocket Realms',
      description: 'Build portable magical worlds for mystical devices using Swift runes and Kotlin spells.',
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      skills: ['Swift Runes', 'Kotlin Spells', 'React Native Magic', 'Pocket Interface Design'],
      salary: '',
      duration: '6-10 moons',
      courseLink: 'https://www.palmtechniq.com/courses/mobile-app-development',
      courseName: 'Mobile App Development'
    },
    {
      id: 'app-tester',
      title: 'Guardian of App Quality',
      description: 'Test magical applications to ensure they work flawlessly in the hands of common folk.',
      icon: <Shield className="w-8 h-8 text-green-700" />,
      skills: ['Testing Rituals', 'Bug Hunting', 'User Experience', 'Quality Assurance'],
      salary: '',
      duration: '2-4 moons',
      courseLink: 'https://www.palmtechniq.com/courses/mobile-app-development',
      courseName: 'Mobile App Development'
    },
    {
      id: 'app-ui-ux-designer',
      title: 'Designer of Pocket Interfaces',
      description: 'Create intuitive magical interfaces specifically crafted for handheld mystical devices.',
      icon: <Wand2 className="w-8 h-8 text-red-600" />,
      skills: ['Pocket Design', 'Touch Interface Magic', 'App Experience Weaving', 'Mobile Sorcery'],
      salary: '',
      duration: '4-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/mobile-app-development',
      courseName: 'Mobile App Development'
    },
    // Digital Marketing - Herald of the Digital Realm
    {
      id: 'digital-marketing-specialist',
      title: 'Herald of Digital Kingdoms',
      description: 'Spread word of magical services across the digital realm using SEO enchantments and social media spells.',
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      skills: ['SEO Enchantments', 'Ad Magic', 'Social Media Spells', 'Analytics Divination'],
      salary: '',
      duration: '3-5 moons',
      courseLink: 'https://www.palmtechniq.com/courses/digital-marketing',
      courseName: 'Digital Marketing'
    },
    {
      id: 'social-media-manager',
      title: 'Keeper of Digital Realms',
      description: 'Maintain the magical presence of noble houses across the mystical social networks.',
      icon: <MessageSquare className="w-8 h-8 text-pink-600" />,
      skills: ['Social Strategy', 'Content Scrolls', 'Community Shepherding', 'Network Analytics'],
      salary: '',
      duration: '2-4 moons',
      courseLink: 'https://www.palmtechniq.com/courses/digital-marketing',
      courseName: 'Digital Marketing'
    },
    {
      id: 'content-marketer',
      title: 'Master Storyteller',
      description: 'Weave engaging tales and mystical content to enchant audiences and drive them to action.',
      icon: <BookOpen className="w-8 h-8 text-teal-600" />,
      skills: ['Story Weaving', 'SEO Magic', 'Content Strategy', 'Voice Enchantment'],
      salary: '',
      duration: '3-5 moons',
      courseLink: 'https://www.palmtechniq.com/courses/digital-marketing',
      courseName: 'Digital Marketing'
    },
    // Video Editing - Master of Moving Images
    {
      id: 'video-editor',
      title: 'Sorcerer of Moving Pictures',
      description: 'Edit mystical moving images for royal proclamations and magical social networks using ancient Adobe tools.',
      icon: <Video className="w-8 h-8 text-red-600" />,
      skills: ['Adobe Premiere Grimoires', 'Final Cut Spells', 'Motion Graphics', 'Color Alchemy'],
      salary: '',
      duration: '3-5 moons',
      courseLink: 'https://www.palmtechniq.com/courses/video-editing',
      courseName: 'Video Editing'
    },
    {
      id: 'motion-graphics-designer',
      title: 'Animator of Mystical Visions',
      description: 'Bring static images to life through powerful animation magic and visual effects.',
      icon: <Sparkles className="w-8 h-8 text-purple-700" />,
      skills: ['After Effects Sorcery', 'Motion Magic', 'Animation Spells', 'Visual Effects'],
      salary: '',
      duration: '4-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/video-editing',
      courseName: 'Video Editing'
    },
    {
      id: 'content-creator',
      title: 'Bard of Digital Realms',
      description: 'Create and perform enchanting video content for the mystical viewing crystals of the realm.',
      icon: <Star className="w-8 h-8 text-green-800" />,
      skills: ['Video Craft', 'Content Strategy', 'Social Media', 'Epic Storytelling'],
      salary: '',
      duration: '2-4 moons',
      courseLink: 'https://www.palmtechniq.com/courses/video-editing',
      courseName: 'Video Editing'
    },
    // Project Management - Quest Master
    {
      id: 'project-manager',
      title: 'Quest Master',
      description: 'Lead brave adventuring parties through complex magical projects, ensuring all reach their destination.',
      icon: <Map className="w-8 h-8 text-green-600" />,
      skills: ['Quest Planning', 'Party Leadership', 'Agile Adventures', 'Mystical Communication'],
      salary: '',
      duration: '4-6 moons',
      courseLink: 'https://www.palmtechniq.com/courses/project-management',
      courseName: 'Project Management'
    },
    {
      id: 'product-manager',
      title: 'Visionary of Magical Products',
      description: 'Guide the creation of mystical products from initial vision to triumphant launch.',
      icon: <Crown className="w-8 h-8 text-indigo-700" />,
      skills: ['Product Prophecy', 'Market Divination', 'Strategic Planning', 'Stakeholder Diplomacy'],
      salary: '',
      duration: '5-8 moons',
      courseLink: 'https://www.palmtechniq.com/courses/project-management',
      courseName: 'Project Management'
    },
    {
      id: 'scrum-master',
      title: 'Agile Ritual Master',
      description: 'Facilitate sacred development rituals and remove obstacles from the path of your fellowship.',
      icon: <Wand2 className="w-8 h-8 text-orange-700" />,
      skills: ['Scrum Rituals', 'Agile Coaching', 'Team Harmony', 'Process Enchantment'],
      salary: '',
      duration: '3-5 moons',
      courseLink: 'https://www.palmtechniq.com/courses/project-management',
      courseName: 'Project Management'
    }
  ];

  const questions = [
    {
      key: 'name' as keyof FormData,
      label: 'What is your name, brave seeker?',
      type: 'text',
      placeholder: 'Enter your name...',
      required: true
    },
    {
      key: 'whatsappNumber' as keyof FormData,
      label: 'What is your magical communication crystal number?',
      type: 'text',
      placeholder: 'e.g., +2349123456789',
      required: true
    },
    {
      key: 'activities' as keyof FormData,
      label: 'Which mystical activities bring you the most joy?',
      type: 'select',
      options: ['Crafting visual enchantments', 'Weaving web spells', 'Solving arcane puzzles', 'Divining data patterns', 'Creating pocket realms', 'Helping fellow adventurers', 'Organizing quests', 'Enchanting physical objects', 'Spreading word of kingdoms', 'Creating moving pictures', 'Other magical pursuits'],
      required: true,
      conditionalField: 'activitiesOther'
    },
    {
      key: 'preference' as keyof FormData,
      label: 'Do you prefer making things beautiful or making them functional?',
      type: 'select',
      options: ['Beautiful enchantments', 'Functional magic', 'Both equally', 'I seek guidance'],
      required: true
    },
    {
      key: 'project' as keyof FormData,
      label: 'What type of magical project calls to your spirit?',
      type: 'select',
      options: ['Web realm creation', 'Pocket realm development', 'Visual magic projects', 'Technical sorcery', 'Data divination', 'Quest management', 'Enchanted device creation', 'Other mystical pursuits'],
      required: true,
      conditionalField: 'projectOther'
    },
    {
      key: 'workFocus' as keyof FormData,
      label: 'Do you prefer crafting visual magic, building technical systems, or managing mystical processes?',
      type: 'select',
      options: ['Visual magic crafting', 'Technical system building', 'Process management', 'I seek guidance'],
      required: true
    },
    {
      key: 'workStyle' as keyof FormData,
      label: 'Do you prefer variety in your magical pursuits or mastering one specific art?',
      type: 'select',
      options: ['Variety in magic', 'Mastery of one art', 'Both paths appeal to me'],
      required: true
    },
    {
      key: 'skills' as keyof FormData,
      label: 'What natural talents do you possess from your past adventures?',
      type: 'select',
      options: ['Diplomatic communication', 'Numerical divination', 'Strategic planning', 'Creative enchantment', 'Technical problem-solving', 'Persuasive storytelling', 'Visual spellcrafting', 'Other hidden talents'],
      required: true,
      conditionalField: 'skillsOther'
    },
    {
      key: 'tools' as keyof FormData,
      label: 'Have you wielded magical tools like Excel scrolls, design crystals, or coding grimoires?',
      type: 'select',
      options: ['Yes, I have experience', 'No, I am new to these arts'],
      required: true
    },
    {
      key: 'strength' as keyof FormData,
      label: 'What is your greatest strength in facing challenges?',
      type: 'select',
      options: ['Spotting hidden details', 'Solving complex problems', 'Leading brave companions', 'None of these describe me'],
      required: true
    },
    {
      key: 'techExposure' as keyof FormData,
      label: 'Have you ever dabbled in the mystical arts of technology?',
      type: 'select',
      options: ['Yes, I have some knowledge', 'No, I am a complete novice', 'Other experience'],
      required: true,
      conditionalField: 'techExposureOther'
    },
    {
      key: 'motivation' as keyof FormData,
      label: 'What drives you to seek mastery in the technological arts?',
      type: 'select',
      options: ['Seeking treasure and wealth', 'Expressing creative magic', 'Solving problems that help others', 'Other noble pursuits'],
      required: true,
      conditionalField: 'motivationOther'
    },
    {
      key: 'studyHours' as keyof FormData,
      label: 'How many hours per week can you dedicate to studying the magical arts?',
      type: 'select',
      options: ['1–5 hours', '5–10 hours', '10–20 hours', '20+ hours'],
      required: true
    },
    {
      key: 'device' as keyof FormData,
      label: 'What magical device do you use most for learning?',
      type: 'select',
      options: ['Pocket crystal (smartphone)', 'Mystical codex (laptop)', 'Both equally'],
      required: true
    },
    {
      key: 'learningStyle' as keyof FormData,
      label: 'How do you best absorb mystical knowledge?',
      type: 'select',
      options: ['Watching moving pictures', 'Reading ancient texts', 'Hands-on practice', 'Guided lessons', 'Other learning methods'],
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

      const webhookUrl = 'https://kindness300mjulygetit.app.n8n.cloud/webhook/d82a32f0-54ad-425f-bc24-252661b72529';
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
        title: 'Prophecy Revealed!',
        description: 'Your destined path has been divined successfully.',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setAiResponse('Greetings, brave seeker! The ancient spirits have spoken and revealed your destined path in the mystical realm of technology.');
      setVisibleCareers(['Quest Master', 'Herald of Digital Kingdoms']);
      toast({
        title: 'Divination Interrupted',
        description: 'The mystical forces were disrupted. Please try again.',
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

      const testWebhookUrl = 'https://kindness300mjulygetit.app.n8n.cloud/webhook-test/d82a32f0-54ad-425f-bc24-252661b72529';
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
        title: 'Test Spell Successful!',
        description: 'The mystical connection has been tested successfully.',
      });
    } catch (error) {
      console.error('Error calling test webhook:', error);
      setAiResponse('Greetings, brave seeker! The ancient spirits have spoken and revealed your destined path in the mystical realm of technology.');
      setVisibleCareers(['Quest Master', 'Herald of Digital Kingdoms']);
      setShowResults(true);
      toast({
        title: 'Test Spell Failed',
        description: 'The mystical connection encountered interference.',
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
        title: "Ancient Requirement",
        description: "The spirits require this knowledge before we can proceed.",
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
        title: "Destiny Revealed!",
        description: "Your personalized path through the mystical realm awaits.",
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
      <div className="min-h-screen relative" style={{
        backgroundImage: `url(/lovable-uploads/9aefbf18-e715-441c-bf8b-2eb197955cd0.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/95"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mystical-button text-primary-foreground px-6 py-3 rounded-full mb-4">
              <Crown className="w-5 h-5" />
              <span className="font-semibold">Destiny Revealed</span>
            </div>
            <h1 className="ancient-title">
              Perfect Paths for {formData.name}
            </h1>
            <p className="sorcerer-subtitle max-w-2xl mx-auto">
              The ancient spirits have gazed into your soul and revealed the mystical career paths that align with your destiny.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              
              {/* Left Side - Sorcerer's Analysis */}
              <div className="lg:col-span-1">
                <div className="fantasy-card h-full">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-primary/20 rounded-full">
                        <Wand2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold magical-text">Sorcerer's Analysis</h2>
                        <p className="text-muted-foreground">Ancient wisdom reveals your true calling</p>
                      </div>
                    </div>
                    {aiResponse ? (
                      <div
                        className="ai-career-analysis text-foreground leading-relaxed"
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
                        <Skeleton className="h-6 w-3/4 bg-muted/50" />
                        <Skeleton className="h-4 w-full bg-muted/50" />
                        <Skeleton className="h-4 w-5/6 bg-muted/50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Career Crystals */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold magical-text mb-4">Destined Career Crystals</h2>
                  {displayedCareers.length > 0 ? (
                    displayedCareers.map((career) => (
                      <div key={career.id} className="career-crystal">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/20 rounded-full flex-shrink-0">
                            {career.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-primary mb-2">{career.title}</h3>
                            <p className="text-foreground/80 text-sm mb-3">{career.description}</p>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-foreground text-sm mb-2">Mystical Skills:</h4>
                              <div className="flex flex-wrap gap-1">
                                {career.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-3 pt-2 border-t border-border">
                              <div className="text-xs">
                                <span className="text-muted-foreground">Training Duration:</span>
                                <div className="font-semibold text-accent">{career.duration}</div>
                              </div>
                            </div>
                            
                            <Button 
                              asChild
                              className="w-full mystical-button text-primary-foreground font-semibold text-sm py-2"
                            >
                              <a href={career.courseLink} target="_blank" rel="noopener noreferrer">
                                Begin Your Journey in {career.courseName}
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-6">
                      {[1, 2, 3].map((_, index) => (
                        <Skeleton key={index} className="h-48 w-full bg-muted/50 rounded-lg" />
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
              className="mystical-button text-primary-foreground px-8 py-3 rounded-full font-semibold"
            >
              Consult the Oracle Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen relative" style={{
      backgroundImage: `url(/lovable-uploads/9aefbf18-e715-441c-bf8b-2eb197955cd0.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/95"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mystical-button text-primary-foreground px-6 py-3 rounded-full mb-4">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">The Ancient Sorcerer's Guide</span>
          </div>
          <h1 className="ancient-title">
            Enter the Fantasy World of Tech
          </h1>
          <p className="sorcerer-subtitle max-w-2xl mx-auto">
            Welcome, brave seeker! Answer the ancient questions to discover your destined path in the mystical realm of technology.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Test Spell Button */}
          <div className="mb-4 text-center">
            <Button
              onClick={testWebhook}
              disabled={isSubmitting}
              variant="outline"
              className="bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30 px-4 py-2 rounded-md font-medium"
            >
              🔮 Test the Mystical Connection
            </Button>
          </div>

          {/* Progress Enchantment */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Journey Progress</span>
              <span className="text-sm font-medium text-foreground">{currentStep + 1} of {questions.length}</span>
            </div>
            <div className="wizard-progress h-3">
              <div 
                className="wizard-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="fantasy-card" onKeyDown={handleKeyPress}>
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold magical-text mb-2">
                  {currentQuestion.label}
                </h2>
                {currentQuestion.required && (
                  <span className="text-destructive text-sm">* Required by the Ancient Spirits</span>
                )}
              </div>
              
              <div className="space-y-6">
                {currentQuestion.type === 'text' ? (
                  <div>
                    <Label htmlFor={currentQuestion.key} className="text-foreground font-medium">
                      {currentQuestion.label}
                    </Label>
                    <Input
                      id={currentQuestion.key}
                      placeholder={currentQuestion.placeholder}
                      value={formData[currentQuestion.key]}
                      onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="mt-2 spell-input"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor={currentQuestion.key} className="text-foreground font-medium">
                      Choose your response, seeker
                    </Label>
                    <Select 
                      value={formData[currentQuestion.key]} 
                      onValueChange={(value) => handleInputChange(currentQuestion.key, value)}
                    >
                      <SelectTrigger 
                        className="mt-2 spell-input"
                        onKeyDown={handleKeyPress}
                      >
                        <SelectValue placeholder="Select your destiny..." />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border shadow-lg z-50">
                        {currentQuestion.options?.map((option, index) => (
                          <SelectItem key={index} value={option} className="hover:bg-accent">
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Conditional mystical input */}
                    {currentQuestion.conditionalField && formData[currentQuestion.key] === 'Other' && (
                      <div className="mt-2">
                        <Input
                          placeholder={
                            currentQuestion.conditionalField === 'activitiesOther' ? 'Describe your mystical pursuits' :
                            currentQuestion.conditionalField === 'projectOther' ? 'Describe your dream project' :
                            currentQuestion.conditionalField === 'skillsOther' ? 'Describe your hidden talent' :
                            currentQuestion.conditionalField === 'techExposureOther' ? 'Describe your mystical experience' :
                            currentQuestion.conditionalField === 'motivationOther' ? 'Describe your noble quest' :
                            currentQuestion.conditionalField === 'learningStyleOther' ? 'Describe your learning magic' :
                            'Please reveal your secret...'
                          }
                          value={formData[currentQuestion.conditionalField as keyof FormData]}
                          onChange={(e) => handleInputChange(currentQuestion.conditionalField as keyof FormData, e.target.value)}
                          className="spell-input"
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
                    className="px-6 py-2 border-border text-muted-foreground hover:bg-accent disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="mystical-button text-primary-foreground px-6 py-2 rounded-md font-semibold flex items-center gap-2"
                  >
                    {isSubmitting ? 'Consulting the Oracle...' : (currentStep === questions.length - 1 ? 'Reveal My Destiny' : 'Continue the Quest')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground mt-4">
                  Press Enter to continue your mystical journey
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
