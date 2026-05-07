import { Component } from '@angular/core';
import { UsersCircularChart, MonthlyChart } from '../../../common/components';

@Component({
  selector: 'app-home',
  imports: [UsersCircularChart, MonthlyChart],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
