import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromUsersComponent } from './from-users.component';

describe('FromUsersComponent', () => {
  let component: FromUsersComponent;
  let fixture: ComponentFixture<FromUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
