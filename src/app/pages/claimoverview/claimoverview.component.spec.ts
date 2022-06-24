import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimoverviewComponent } from './claimoverview.component';

describe('ClaimoverviewComponent', () => {
  let component: ClaimoverviewComponent;
  let fixture: ComponentFixture<ClaimoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
