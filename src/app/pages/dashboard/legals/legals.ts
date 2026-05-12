import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Legal } from './service/legal';
import { ELegal } from '@core/enums';
import { ILegal } from '@core/interfaces/legal';

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
  imports: [FormRoot, FormField  ],
  templateUrl: './legals.html',
  styleUrl: './legals.css',
  
})
export class Legals implements OnInit {
  legals = signal<ILegal[]>([]);

  protected readonly service = inject(Legal);
  
  protected userPoliciesF = form(userPoliciesModel, {
    submission: {
      action: async (f) => {
        console.log(f().value());
        f().value()._id ? this.update(f().value()) : this.create(f().value());
      },
    },
  });
  protected advisorPoliciesF = form(advisorPoliciesModel, {
    submission: {
      action: async (f) => {
        console.log(f().value());
        f().value()._id ? this.update(f().value()) : this.create(f().value());
      },
    },
  });
  protected policiesF = form(policiesModel, {
    submission: {
      action: async (f) => {
        console.log(f().value());
        f().value()._id ? this.update(f().value()) : this.create(f().value());
      },
    },
  });
  protected faqF = form(faqModel, {
    submission: {
      action: async (f) => {
        console.log(f().value());
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
    this.service.update(form).subscribe(this.lodaData);
  }

  private lodaData(): void {
    this.service.list().subscribe((res) => {
      this.legals.set(res);

      const userPolicies = res.find(({ type }) => type === ELegal.UserPolicies);
      const advisorPolicies = res.find(({ type }) => type === ELegal.AdvisorPolicies);
      const policies = res.find(({ type }) => type === ELegal.PrivacyPolicies);
      const faq = res.find(({ type }) => type === ELegal.FAQ);

      Boolean(userPoliciesModel);
      userPoliciesModel.update((m) => ({ ...m, content: userPolicies!.content }));

      Boolean(advisorPoliciesModel) &&
        advisorPoliciesModel.update((m) => ({ ...m, content: advisorPolicies!.content }));

      Boolean(policiesModel) && policiesModel.update((m) => ({ ...m, content: policies!.content }));

      Boolean(faqModel) && faqModel.update((m) => ({ ...m, content: faq!.content }));
    });
  }
}
