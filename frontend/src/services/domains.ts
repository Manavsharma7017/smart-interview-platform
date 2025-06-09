import { apiClient } from './api';
import type { Domain } from '../types/types';

export const domainService = {
  async getAllDomains(): Promise<Domain[]> {
    const response = await apiClient.get('/admin/domain/getall');
   const rawDomains = response.data.domains;
    const domains: Domain[] = rawDomains.map((d: any) => ({
      id: d.ID,
      name: d.Name,
      description: d.Description,
      // Add other fields if needed, e.g. questions: d.Questions
    }));
    return domains;
  },

  async createDomain(domain: Omit<Domain, 'id'>): Promise<Domain> {
    const response = await apiClient.post('/admin/domain/create', domain);
    return response.data;
  },

  async updateDomain(id: number, domain: Partial<Domain>): Promise<Domain> {
    const response = await apiClient.put(`/admin/domain/update/${id}`, domain);
    return response.data;
  },
  async deleteDomain(id: number): Promise<void> {
    await apiClient.delete(`/admin/domain/delete/${id}`);
    }
};