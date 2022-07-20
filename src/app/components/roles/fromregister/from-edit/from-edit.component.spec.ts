import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromEditComponent } from './from-edit.component';

describe('FromEditComponent', () => {
  let component: FromEditComponent;
  let fixture: ComponentFixture<FromEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
