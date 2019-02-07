import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DescriptionModalDialogComponent } from './description-modal-dialog.component';

@Component({
  selector: 'app-screen-saver-header',
  template: ''
})
class MockTestComponent {
}
@NgModule({
  declarations: [MockTestComponent],
  entryComponents: [
    MockTestComponent,
  ]
})
class TestModule {}

describe('DescriptionModalDialogComponent', () => {
  let component: DescriptionModalDialogComponent;
  let fixture: ComponentFixture<DescriptionModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, TestModule, NoopAnimationsModule],
      declarations: [ DescriptionModalDialogComponent ],
      providers: [MatDialog]
    }).overrideModule(BrowserDynamicTestingModule, {
      set : {
        entryComponents: [ MockTestComponent ]
      }
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

  it('should open', () => {
    expect(() => component.dialog.open(MockTestComponent)).not.toThrow();
  });
});
