import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamerGameplayComponent } from './gamer-gameplay.component';

describe('GamerNameComponent', () => {
  let component: GamerGameplayComponent;
  let fixture: ComponentFixture<GamerGameplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamerGameplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamerGameplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
