import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';

import { ContainerLogoComponent } from './container-logo.component';

describe('ContainerLogoComponent', () => {
  let component: ContainerLogoComponent;
  let fixture: ComponentFixture<ContainerLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerLogoComponent ],
      imports: [MatDialogModule],
      providers: [MatDialog]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
