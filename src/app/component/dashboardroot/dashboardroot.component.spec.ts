import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardrootComponent } from './dashboardroot.component';

describe('DashboardrootComponent', () => {
  let component: DashboardrootComponent;
  let fixture: ComponentFixture<DashboardrootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardrootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardrootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
