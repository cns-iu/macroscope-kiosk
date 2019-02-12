import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { SafePipe } from './safe.pipe';

fdescribe('SanitiseHtmlPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ BrowserModule ]
    });
  });

  it('should create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('should get the trusted HTML', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const unsafe = '<html><img src=x onerror=alert(img) /></html>';
    const safeValue = pipe.transform(unsafe, 'html');
    expect(safeValue).toEqual(jasmine.any(Object));
  }));

  it('should get the trusted CSS', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const unsafe = '<html><img src=x onerror=alert(img) /></html>';
    const safeValue = pipe.transform(unsafe, 'style');
    expect(safeValue).toEqual(jasmine.any(Object));
  }));

  it('should get the trusted HTML', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const unsafe = '<html><img src=x onerror=alert(img) /></html>';
    const safeValue = pipe.transform(unsafe, 'script');
    expect(safeValue).toEqual(jasmine.any(Object));
  }));

  it('should get the trusted HTML', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const unsafe = '<html><img src=x onerror=alert(img) /></html>';
    const safeValue = pipe.transform(unsafe, 'url');
    expect(safeValue).toEqual(jasmine.any(Object));
  }));

  it('should get the trusted HTML', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const unsafe = '<html><img src=x onerror=alert(img) /></html>';
    const safeValue = pipe.transform(unsafe, 'resourceUrl');
    expect(safeValue).toEqual(jasmine.any(Object));
  }));
});

