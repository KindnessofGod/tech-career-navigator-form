
export interface FormData {
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

export interface CareerRecommendation {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  timeToStart: string;
}

export interface Question {
  key: keyof FormData;
  label: string;
  type: 'text' | 'select';
  placeholder?: string;
  options?: string[];
  required: boolean;
}
