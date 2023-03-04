import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptoSangreComponent } from './apto-sangre.component';

describe('AptoSangreComponent', () => {
  let component: AptoSangreComponent;
  let fixture: ComponentFixture<AptoSangreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AptoSangreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AptoSangreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
