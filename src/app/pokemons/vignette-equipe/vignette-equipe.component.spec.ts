import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VignetteEquipeComponent } from './vignette-equipe.component';

describe('VignetteEquipeComponent', () => {
  let component: VignetteEquipeComponent;
  let fixture: ComponentFixture<VignetteEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VignetteEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VignetteEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
