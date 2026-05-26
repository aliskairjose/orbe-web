import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { ILegal } from '@core/interfaces/legal';
import { DomSanitizer } from '@angular/platform-browser';
import { Helper } from '@core/helpers/helper';
import { ELegal } from '@core/enums';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  private readonly url = `${API_URL}/v1/legal`;

  protected resource = httpResource<ILegal[]>(() => this.url);
  private sanitizer = inject(DomSanitizer);

  transformYourHtml = computed(() => {
    if (this.resource.hasValue()) {
      const content = this.resource
        .value()
        .find(({ type }) => type === ELegal.FAQ)!.content;
      return this.sanitizer.bypassSecurityTrustHtml(Helper.LegalHtmlFormatCSS(content));
    }
    return '';
  });
}
