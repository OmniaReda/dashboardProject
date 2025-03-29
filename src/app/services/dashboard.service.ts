import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = 'http://localhost:3000/locations';

  async getHeaderStatistics() {
    const data = await fetch(
      'https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Statistics/CasesStatistics'
    );
    return (await data.json()) ?? [];
  }

  async getIncoming() {
    const data = await fetch(
      'https://quilled-autumn-move.glitch.me/GraphAPI/api/Graph/GetIncoming'
    );
    return (await data.json()) ?? [];
  }

  async getOutgoing() {
    const data = await fetch(
      'https://quilled-autumn-move.glitch.me/GraphAPI/api/Graph/GetOutgoing'
    );
    return (await data.json()) ?? [];
  }

  async getInternal() {
    const data = await fetch(
      'https://quilled-autumn-move.glitch.me/GraphAPI/api/Graph/GetInternal'
    );
    return (await data.json()) ?? [];
  }
}
