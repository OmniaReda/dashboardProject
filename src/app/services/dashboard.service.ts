import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // private baseUrl = 'https://quilled-autumn-move.glitch.me';
  private baseUrl = environment.baseUrl;

  async getHeaderStatistics() {
    const data = await fetch(
      `${this.baseUrl}/api-gateway-odoo/api/Statistics/CasesStatistics`
    );
    return (await data.json()) ?? [];
  }

  async getIncoming() {
    const data = await fetch(`${this.baseUrl}/GraphAPI/api/Graph/GetIncoming`);
    return (await data.json()) ?? [];
  }

  async getOutgoing() {
    const data = await fetch(`${this.baseUrl}/GraphAPI/api/Graph/GetOutgoing`);
    return (await data.json()) ?? [];
  }

  async getInternal() {
    const data = await fetch(`${this.baseUrl}/GraphAPI/api/Graph/GetInternal`);
    return (await data.json()) ?? [];
  }
}
