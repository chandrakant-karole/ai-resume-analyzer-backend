export interface ResumeAnalysisResult {
    overallScore: number;

    scores: {
        content: number;
        skills: number;
        experience: number;
        formatting: number;
        atsCompatibility: number;
    };

    strengths: string[];

    weaknesses: string[];

    suggestions: string[];
}