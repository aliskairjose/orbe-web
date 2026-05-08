import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusPieChart } from './user-status-pie-chart';

describe('UserStatusPieChart', () => {
  let component: UserStatusPieChart;
  let fixture: ComponentFixture<UserStatusPieChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatusPieChart],
    }).compileComponents();

    fixture = TestBed.createComponent(UserStatusPieChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
