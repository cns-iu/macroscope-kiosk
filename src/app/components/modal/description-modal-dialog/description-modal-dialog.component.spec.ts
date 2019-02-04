import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionModalDialogComponent } from './description-modal-dialog.component';

describe('DescriptionModalDialogComponent', () => {
  let component: DescriptionModalDialogComponent;
  let fixture: ComponentFixture<DescriptionModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
