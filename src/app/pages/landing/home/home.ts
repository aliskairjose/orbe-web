import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { IAdvisor } from '@core/interfaces';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    private readonly url = `${API_URL}/v1/`;
    protected readonly top = httpResource<IAdvisor[]>(()=>`${this.url}dashboard/top-rated-advisors`);
  
}
