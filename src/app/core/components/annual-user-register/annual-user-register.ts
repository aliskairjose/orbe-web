import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { required } from '@angular/forms/signals';
import { MONTHS } from '@core/constants';
interface MonthlyStats {
  month: string;
  chat: number; // Porcentaje
  calls: number; // Porcentaje
}

interface Response {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-annual-user-register',
  imports: [],
  templateUrl: './annual-user-register.html',
  styleUrl: './annual-user-register.css',
})
export class AnnualUserRegister {
  private readonly months = MONTHS;
 
  protected resource = httpResource<Response[]>(
    () => `${API_URL}/v1/users/summary/monthly-register/2026`,
  );

  stats = computed(() => {
    if (this.resource.hasValue()) {
      const user = this.resource.value().find(({ name }) => name === 'User')?.data || [];
      const advisor = this.resource.value().find(({ name }) => name === 'Advisor')?.data || [];

      return this.months.map((m, i) => ({
        month: m,
        user: user[i],
        advisor: advisor[i],
      }));
    }
    return null;
  });
}
