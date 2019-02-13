import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

// Copied from: https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b
// FIXME: place in a more reusable place

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  /**
   * Creates an instance of safe pipe.
   * @param sanitizer Angular's DomSanitizer
   */
  constructor(protected sanitizer: DomSanitizer) { }


  /**
   * Sanitized the given value for binding
   * @param value The value that needs to be trusted
   * @param type Sanitization type, this could be html,style,script,url and resourceUrl
   * @returns  Returns the sanitized valye for given sanitization type
   */
  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
