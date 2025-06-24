
import { FormData, CareerRecommendation } from '@/types/assessment';
import { Code, Palette, Shield, BarChart3, Users, Brain } from 'lucide-react';

export const getCareerRecommendations = (data: FormData): CareerRecommendation[] => {
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
