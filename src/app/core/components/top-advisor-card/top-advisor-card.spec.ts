import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAdvisorCard } from './top-advisor-card';

describe('TopAdvisorCard', () => {
  let component: TopAdvisorCard;
  let fixture: ComponentFixture<TopAdvisorCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAdvisorCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TopAdvisorCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
