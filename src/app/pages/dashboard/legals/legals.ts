import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Legal } from './service/legal';
import { ELegal } from '@core/enums';
import { ILegal } from '@core/interfaces/legal';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { httpResource } from '@angular/common/http';

interface FormData {
  _id: string;
  content: string;
  type: string;
}

const userPoliciesModel = signal<FormData>({
  _id: '',
  content: '',
  type: ELegal.UserPolicies,
});
const advisorPoliciesModel = signal<FormData>({
  _id: '',
  content: '',
  type: ELegal.AdvisorPolicies,
});
const policiesModel = signal<FormData>({
  _id: '',
  content: '',
  type: ELegal.PrivacyPolicies,
});
const faqModel = signal<FormData>({
  _id: '',
  content: '',
  type: ELegal.FAQ,
});

@Component({
  selector: 'app-legals',
  imports: [FormRoot, FormField, EditorComponent],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' }],
  templateUrl: './legals.html',
  styleUrl: './legals.css',
})
export class Legals implements OnInit {
  legals = signal<ILegal[]>([]);

  protected readonly init: EditorComponent['init'] = {
    menubar: false,
    plugins: 'advlist autolink lists link image table code help wordcount',
    base_url: '/tinymce', // Root for resources
    suffix: '.min',
    toolbar:
      'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | outdent indent | help',
  };

  protected readonly service = inject(Legal);

  protected userPoliciesF = form(userPoliciesModel, {
    submission: {
      action: async (f) => {
        f().value()._id ? this.update(f().value()) : this.create(f().value());
      },
    },
  });
  protected advisorPoliciesF = form(advisorPoliciesModel, {
    submission: {
      action: async (f) => {
        f().value()._id ? this.update(f().value()) : this.create(f().value());
      },
    },
  });
  protected policiesF = form(policiesModel, {
    submission: {
      action: async (f) => {
        f().value()._id ? this.update(f().value()) : this.create(f().value());
      },
    },
  });
  protected faqF = form(faqModel, {
    submission: {
      action: async (f) => {
        f().value()._id ? this.update(f().value()) : this.create(f().value());
      },
    },
  });

  ngOnInit(): void {
    this.lodaData();
  }

  private create(form: any): void {
    this.service.create(form).subscribe(this.lodaData);
  }

  private update(form: any): void {
    this.service.update(form._id, form.content).subscribe(this.lodaData);
  }

  private lodaData(): void {
    this.service.list().subscribe((res) => {
      this.legals.set(res);

      const userPolicies = res.find(({ type }) => type === ELegal.UserPolicies);
      const advisorPolicies = res.find(({ type }) => type === ELegal.AdvisorPolicies);
      const policies = res.find(({ type }) => type === ELegal.PrivacyPolicies);
      const faq = res.find(({ type }) => type === ELegal.FAQ);

      Boolean(userPoliciesModel);
      userPoliciesModel.update((m) => ({
        ...m,
        _id: userPolicies!._id,
        content: userPolicies!.content,
      }));

      Boolean(advisorPoliciesModel) &&
        advisorPoliciesModel.update((m) => ({
          ...m,
          _id: advisorPolicies!._id,
          content: advisorPolicies!.content,
        }));

      Boolean(policiesModel) &&
        policiesModel.update((m) => ({ ...m, _id: policies!._id, content: policies!.content }));

      Boolean(faqModel) && faqModel.update((m) => ({ ...m, _id: faq!._id, content: faq!.content }));
    });
  }
}
