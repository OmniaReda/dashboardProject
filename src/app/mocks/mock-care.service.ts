import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  /**
   * Get mock dashboard header data in case API fails
   */
  getMockDashboardHeaderData(): Observable<any> {
    const mockData = {
      Result: {
        CasesCount: 350,
        AgreedCasesCount: 275,
        CasesOnTime: 0.75,
        CasesDelayed: 0.25,
        CompletedCasesCount: 220,
        CasesCountByMonth: [
          { Key: 'يناير', Value: 30 },
          { Key: 'فبراير', Value: 35 },
          { Key: 'مارس', Value: 28 },
          { Key: 'أبريل', Value: 42 },
          { Key: 'مايو', Value: 38 },
          { Key: 'يونيو', Value: 45 },
          { Key: 'يوليو', Value: 52 },
          { Key: 'أغسطس', Value: 48 },
          { Key: 'سبتمبر', Value: 32 },
          { Key: 'أكتوبر', Value: 40 },
          { Key: 'نوفمبر', Value: 35 },
          { Key: 'ديسمبر', Value: 25 },
        ],
        AgreedCasesCountByMonth: [
          { Key: 'يناير', Value: 24 },
          { Key: 'فبراير', Value: 28 },
          { Key: 'مارس', Value: 22 },
          { Key: 'أبريل', Value: 35 },
          { Key: 'مايو', Value: 30 },
          { Key: 'يونيو', Value: 38 },
          { Key: 'يوليو', Value: 42 },
          { Key: 'أغسطس', Value: 40 },
          { Key: 'سبتمبر', Value: 26 },
          { Key: 'أكتوبر', Value: 32 },
          { Key: 'نوفمبر', Value: 28 },
          { Key: 'ديسمبر', Value: 20 },
        ],
      },
    };

    return of(mockData);
  }

  /**
   * Get mock request types data in case API fails
   */
  getMockRequestTypesData(): Observable<any> {
    const mockData = {
      Result: {
        DataReports: [
          { Label: 'ضائقة', Data: 50 },
          { Label: 'غارم محبوس', Data: 65 },
          { Label: 'غارم', Data: 45 },
          { Label: 'مساعدة شهرية لكبار السن', Data: 45 },
        ],
      },
    };

    return of(mockData);
  }

  /**
   * Get mock popup details data in case dialog data is missing
   */
  getMockPopupDetailsData(): any {
    return {
      popupDetails: {
        title: 'ضائقة',
        subTitle: 'انواع طلبات الضائقة',
        total: '205',
        progressBars: [
          {
            title: 'مساعدة الزواج',
            count: 50,
            p1: { color: '#012D6A', count: '33' },
            p2: { color: '#7d91b1', count: '27' },
          },
          {
            title: 'مساعدة مسكن',
            count: 19,
            p1: { color: '#85BBD7', count: '33' },
            p2: { color: '#85BBD7', count: '27' },
          },
          {
            title: 'مصاريف العلاج',
            count: 1,
            p1: { color: '#d6d6d4', count: '33' },
            p2: { color: '#e5e6e8', count: '27' },
          },
          {
            title: ' مساعدات الدراسة',
            count: 30,
            p1: { color: '#b86139', count: '33' },
            p2: { color: '#d5ab97', count: '27' },
          },
          {
            title: ' مشاريع الاسرة المنتجة',
            count: 25,
            p1: { color: '#bda15e', count: '33' },
            p2: { color: '#d9ccab', count: '27' },
          },
          {
            title: 'مساعدات المقطوعة',
            count: 25,
            p1: { color: '#545452', count: '33' },
            p2: { color: '#a4a6a5', count: '27' },
          },
        ],
      },
      chartOptions: {
        type: 'doughnut',
        data: {
          labels: [''],
          datasets: [
            {
              label: 'عدد الحالات',
              data: [50, 30, 19, 25, 1, 25],
              backgroundColor: [
                '#012D6A',
                '#BB6038',
                '#85BBD8',
                '#C0A25D',
                '#D6D6D6',
                '#545453',
              ],
              borderColor: [
                '#012D6A',
                '#BB6038',
                '#85BBD8',
                '#C0A25D',
                '#D6D6D6',
                '#545453',
              ],
              hoverBackgroundColor: [
                '#012D6A',
                '#BB6038',
                '#85BBD8',
                '#C0A25D',
                '#D6D6D6',
                '#545453',
              ],
              hoverBorderColor: [
                '#012D6A',
                '#BB6038',
                '#85BBD8',
                '#C0A25D',
                '#D6D6D6',
                '#545453',
              ],
              hoverBorderWidth: 16,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            datalabels: {
              color: '#fff',
              formatter: (value: number, ctx: any) => value,
              font: {
                weight: 'bold',
                size:
                  window.innerWidth < 526
                    ? 12
                    : window.innerWidth < 990
                    ? 16
                    : 20,
              },
              textAlign: 'center',
            },
          },
        },
      },
    };
  }
}
