import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  label = input<string>('');
  acceptedFiles = input<string>('');
  singleton = input<boolean>(true);

  randomId = computed(() => `${this.label()}-${Math.random()}`);

  upload(event: any): void {
    console.log(event)
  }
}
