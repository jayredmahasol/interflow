import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateScreeningEmail(applicantName: string, role: string): Promise<string> {
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `
      You are an AI recruiting assistant for a tech company.
      Write a professional yet welcoming email to an intern applicant named ${applicantName} who applied for the ${role} position.
      The purpose of the email is to invite them to complete a pre-interview screening assessment.
      
      Key points to include:
      - Thank them for their application.
      - Mention that we were impressed by their profile.
      - Explain that the next step is a brief technical screening to assess their skills.
      - Provide a placeholder link [LINK_TO_ASSESSMENT].
      - Mention the deadline is 3 days from now.
      - Keep the tone modern, encouraging, and professional.
      - Sign off as "The InternFlow Recruiting Team".
      
      Return ONLY the body of the email. Do not include subject lines or pre-text.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Error generating email content.";
  } catch (error) {
    console.error("Error generating email:", error);
    return "Dear Applicant,\n\nThank you for applying. Please complete the screening assessment at the link provided.\n\nBest,\nRecruiting Team";
  }
}

export async function generateFollowUpEmail(applicantName: string, role: string, status: string): Promise<string> {
   try {
    const model = "gemini-3-flash-preview";
    const prompt = `
      You are an AI recruiting assistant.
      Write a follow-up email to ${applicantName} regarding their ${role} application.
      Current status: ${status}.
      
      If status is 'Screening Sent', remind them to complete it.
      If status is 'Screening Completed', thank them and say we are reviewing results.
      
      Keep it brief and professional.
      Return ONLY the email body.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Error generating email content.";
  } catch (error) {
    console.error("Error generating email:", error);
    return "Dear Applicant,\n\nThis is a follow-up regarding your application.\n\nBest,\nRecruiting Team";
  }
}
