
import { FormData, CareerRecommendation } from '@/types/assessment';
import { toast } from '@/hooks/use-toast';

export const submitFormData = async (
  data: FormData, 
  recommendations: CareerRecommendation[]
): Promise<string> => {
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

    const responseData = await response.json();
    console.log('Form data submitted successfully:', responseData);
    
    toast({
      title: "Form Submitted!",
      description: "Your career assessment has been submitted successfully.",
    });

    // Return AI response if available
    if (responseData && responseData.aiResponse) {
      return responseData.aiResponse;
    } else if (responseData && responseData.message) {
      return responseData.message;
    }
    
    return '';
  } catch (error) {
    console.error('Error submitting form:', error);
    toast({
      title: "Submission Error",
      description: "There was an error submitting your form. Please try again.",
      variant: "destructive"
    });
    return '';
  }
};
