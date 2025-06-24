
import { Question } from '@/types/assessment';

export const questions: Question[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
    required: true
  },
  {
    key: 'whatsappNumber',
    label: 'WhatsApp Number',
    type: 'text',
    placeholder: 'Enter your WhatsApp number (e.g., +1234567890)',
    required: true
  },
  {
    key: 'activities',
    label: 'What activities do you enjoy most?',
    type: 'select',
    options: ['Creating visuals', 'Solving puzzles', 'Helping people', 'Organizing things', 'Other'],
    required: true
  },
  {
    key: 'preference',
    label: 'Are you more interested in making things look good or making them work?',
    type: 'select',
    options: ['Look good', 'Work well', 'Both', 'Not sure'],
    required: true
  },
  {
    key: 'project',
    label: 'What kind of tech project excites you?',
    type: 'select',
    options: ['Data analysis', 'Apps/websites', 'Security/hacking', 'AI/chatbots', 'Other'],
    required: true
  },
  {
    key: 'workStyle',
    label: 'Do you like variety or mastering one task?',
    type: 'select',
    options: ['Variety', 'Mastery', 'Both'],
    required: true
  },
  {
    key: 'skills',
    label: 'What are you good at from past work or school?',
    type: 'select',
    options: ['Communication', 'Numbers/math', 'Planning', 'Design/creativity', 'Other'],
    required: true
  },
  {
    key: 'tools',
    label: 'Have you used tools like Excel, Google Sheets, or design apps?',
    type: 'select',
    options: ['Yes', 'No'],
    required: true
  },
  {
    key: 'problemSolving',
    label: 'Are you good at spotting details or fixing problems?',
    type: 'select',
    options: ['Details', 'Fixing problems', 'Both', 'Neither'],
    required: true
  },
  {
    key: 'studyHours',
    label: 'How many hours can you study weekly?',
    type: 'select',
    options: ['1–5', '5–10', '10–20', '20+'],
    required: true
  },
  {
    key: 'device',
    label: 'What device do you use?',
    type: 'select',
    options: ['Smartphone', 'Laptop', 'Both'],
    required: true
  },
  {
    key: 'learningStyle',
    label: 'How do you learn best?',
    type: 'select',
    options: ['Videos', 'Reading', 'Projects', 'Classes', 'Other'],
    required: true
  },
  {
    key: 'courseStyle',
    label: 'Do you prefer structured courses or self-paced?',
    type: 'select',
    options: ['Structured', 'Self-paced', 'Both'],
    required: true
  }
];
