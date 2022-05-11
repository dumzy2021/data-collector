import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCasesComponent } from './create-cases.component';

describe('CreateCasesComponent', () => {
  let component: CreateCasesComponent;
  let fixture: ComponentFixture<CreateCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
