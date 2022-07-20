import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromRolesComponent } from './from-roles.component';

describe('FromRolesComponent', () => {
  let component: FromRolesComponent;
  let fixture: ComponentFixture<FromRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
