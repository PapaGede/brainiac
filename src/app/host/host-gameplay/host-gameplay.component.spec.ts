import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostGameplayComponent } from './host-gameplay.component';

describe('HostGameplayComponent', () => {
  let component: HostGameplayComponent;
  let fixture: ComponentFixture<HostGameplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostGameplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostGameplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
