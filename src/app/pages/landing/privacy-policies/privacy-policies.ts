import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { ELegal } from '@core/enums';
import { ILegal } from '@core/interfaces/legal';
import { DomSanitizer } from '@angular/platform-browser';
import { Helper } from '@core/helpers/helper';

@Component({
  selector: 'app-privacy-policies',
  imports: [],
  templateUrl: './privacy-policies.html',
  styleUrl: './privacy-policies.css',
})
export class PrivacyPolicies {
  private readonly url = `${API_URL}/v1/legal`;

  protected resource = httpResource<ILegal[]>(() => this.url);
  private sanitizer = inject(DomSanitizer);

  transformYourHtml = computed(() => {
    if (this.resource.hasValue()) {
      const content  = this.resource.value().find(({ type }) => type === ELegal.PrivacyPolicies)!.content;
      return  this.sanitizer.bypassSecurityTrustHtml(Helper.LegalHtmlFormatCSS(content));
    }
    return '';
  });
}
