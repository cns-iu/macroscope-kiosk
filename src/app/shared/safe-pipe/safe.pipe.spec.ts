import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { findKey } from 'lodash';

import { SafePipe } from './safe.pipe';

describe('SanitiseHtmlPipe', () => {
  const fakeSanitizer: Partial<DomSanitizer> = {
    bypassSecurityTrustHtml: () => undefined,
    bypassSecurityTrustStyle: () => undefined,
    bypassSecurityTrustScript: () => undefined,
    bypassSecurityTrustUrl: () => undefined,
    bypassSecurityTrustResourceUrl: () => undefined,
  };
  const safeValue = 'safe-value';
  let pipe: SafePipe;

  function transform(type: string, unsafe: string): { spy: jasmine.Spy, safe: string } {
    const methodRegex = new RegExp('bypassSecurityTrust' + type, 'i');
    const methodName = findKey(fakeSanitizer, (_, key) => methodRegex.test(key));
    const spy = spyOn(fakeSanitizer, methodName as any).and.returnValue(safeValue);
    const safe = pipe.transform(unsafe, type) as string;
    return { spy, safe };
  }

  function transformAndTest(type: string, unsafe: string): void {
    const { spy, safe } = transform(type, unsafe);
    expect(spy).toHaveBeenCalled();
    expect(safe).toEqual(safeValue);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  beforeEach(() => {
    pipe = new SafePipe(fakeSanitizer as DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should get the trusted HTML', () => {
    transformAndTest('html', '<html><img src=x onerror=alert(img) /></html>');
  });

  it('should get the trusted CSS', () => {
    transformAndTest('style', '* { fill: blue }');
  });

  it('should get the trusted script', () => {
    transformAndTest('script', '<script>alert()</script>');
  });

  it('should get the trusted url', () => {
    transformAndTest('url', 'https://fake.stuff');
  });

  it('should get the trusted resource url', () => {
    transformAndTest('resourceUrl', 'https://fake.stuff');
  });

  it('should throw errors on unknown types', () => {
    expect(() => pipe.transform('a value', 'unknown-type')).toThrow();
  });
});

