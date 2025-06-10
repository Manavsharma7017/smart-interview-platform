import { apiClient } from "./api";
import type { Question } from "../types/types";
export const userQuestionService = {
    async getAllUserQuestions(): Promise<Question[]> {
        const response = await apiClient.get('/questions/find/all');
        const rawQuestions = response.data.questions;
        const questions: Question[] = rawQuestions.map((q: any) => ({
            id: q.ID,
            text: q.Text,
            difficulty: q.Difficulty,
            domain_id: q.DomainID,
         
            created_at: q.CreatedAt,
            updated_at: q.UpdatedAt
        }));
        return questions;
    },
    async getQuestionByfilter(fileter: {difficulty?:string|null,domainID?:number|null}): Promise<Question[]> {
        const response = await apiClient.get(`/questions`,{
            params: {
                difficulty: fileter.difficulty,
                domain_id: fileter.domainID
            }
        });
        const rawQuestions = response.data.questions;
        const questions: Question[] = rawQuestions.map((q: any) => ({
            id: q.ID,
            text: q.Text,
            difficulty: q.Difficulty,
            domain_id: q.DomainID,
            domains: q.Domains,
            created_at: q.CreatedAt,
            updated_at: q.UpdatedAt
        }));
        return questions;
    },
    async getQuestionById(id: string): Promise<Question> {
        const response = await apiClient.get(`/questions/${id}`);
        const q = response.data.question;
        const question: Question = {
            id: q.ID,
            text: q.Text,
            difficulty: q.Difficulty,
            domain_id: q.DomainID,
           domains: { id: q.Domain.ID,
            name: q.Domain.Name,
            description: q.Domain.Description},
            created_at: q.CreatedAt,
        };
        return question;
    }
};
