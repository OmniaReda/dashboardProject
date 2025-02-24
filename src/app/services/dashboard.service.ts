import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = 'http://localhost:3000/locations';

  async getHeaderStatistics() {
    const data = await fetch('https://bc288e91-0c6b-46a3-be5f-d11533efe491.mock.pstmn.io/api-gateway-odoo/api/Statistics/HeaderStatistics');
    return await data.json() ?? [];
  }

  async getIncoming() {
    const data = await fetch('https://bc288e91-0c6b-46a3-be5f-d11533efe491.mock.pstmn.io/GraphAPI/api/Graph/GetIncoming');
    return await data.json() ?? [];
  }

  async getOutgoing() {
    const data = await fetch('https://bc288e91-0c6b-46a3-be5f-d11533efe491.mock.pstmn.io/GraphAPI/api/Graph/GetOutgoing');
    return await data.json() ?? [];
  }

  async getInternal() {
    const data = await fetch('https://bc288e91-0c6b-46a3-be5f-d11533efe491.mock.pstmn.io/GraphAPI/api/Graph/GetInternal');
    return await data.json() ?? [];
  }

  
}