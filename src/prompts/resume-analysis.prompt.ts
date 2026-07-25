export const buildResumeAnalysisPrompt = (
  resumeText: string
): string => {
  return `
You are an experienced Technical Recruiter and ATS (Applicant Tracking System) expert.

Analyze the resume provided below.

Return ONLY valid JSON.

The JSON must exactly match this schema:

{
  "overallScore": number,
  "scores": {
    "content": number,
    "skills": number,
    "experience": number,
    "formatting": number,
    "atsCompatibility": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[]
}

Rules:

- All scores must be integers between 0 and 100.
- strengths must contain exactly 3 items.
- weaknesses must contain exactly 3 items.
- suggestions must contain exactly 3 actionable improvements.
- Return ONLY valid JSON.
- Do not wrap in markdown.
- Do not add explanations.

Resume:

${resumeText}
`;
};