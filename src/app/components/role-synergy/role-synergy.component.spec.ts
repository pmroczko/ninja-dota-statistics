import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSynergyComponent } from './role-synergy.component';

describe('RoleSynergyComponent', () => {
  let component: RoleSynergyComponent;
  let fixture: ComponentFixture<RoleSynergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSynergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSynergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
