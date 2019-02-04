import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionModalContentComponent } from './description-modal-content.component';

describe('DescriptionModalContentComponent', () => {
  let component: DescriptionModalContentComponent;
  let fixture: ComponentFixture<DescriptionModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
