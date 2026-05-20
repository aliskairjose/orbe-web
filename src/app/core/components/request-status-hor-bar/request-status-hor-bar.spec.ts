import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusHorBar } from './request-status-hor-bar';

describe('RequestStatusHorBar', () => {
  let component: RequestStatusHorBar;
  let fixture: ComponentFixture<RequestStatusHorBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestStatusHorBar],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestStatusHorBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
