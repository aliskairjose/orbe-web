import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, input, output, signal } from '@angular/core';

let nextFileUploadId = 0;

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUpload {
  private readonly document = inject(DOCUMENT);

  label = input<string>('');
  acceptedFiles = input<string>('');
  singleton = input<boolean>(true);
  fileSelected = output<File | null>();

  protected readonly fileInputId = `file-upload-${nextFileUploadId++}`;
  protected readonly selectedFile = signal<File | null>(null);
  protected readonly errorMessage = signal('');
  protected readonly isDragging = signal(false);
  protected readonly fileSize = computed(() => {
    const file = this.selectedFile();
    return file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '';
  });

  upload(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.handleFiles(input.files);
    input.value = '';
  }

  protected handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    this.handleFiles(event.dataTransfer?.files ?? null);
  }

  protected removeFile(): void {
    this.selectedFile.set(null);
    this.errorMessage.set('');
    this.fileSelected.emit(null);
  }

  protected reloadFile(): void {
    this.removeFile();
    this.document.getElementById(this.fileInputId)?.click();
  }

  private handleFiles(files: FileList | null): void {
    const file = files?.item(0);
    if (!file) return;

    if (file.size > 1024 * 1024) {
      this.errorMessage.set('El archivo no puede superar 1 MB.');
      this.selectedFile.set(null);
      this.fileSelected.emit(null);
      return;
    }

    if (!this.isAccepted(file)) {
      this.errorMessage.set('El tipo de archivo no está permitido.');
      this.selectedFile.set(null);
      this.fileSelected.emit(null);
      return;
    }

    this.errorMessage.set('');
    this.selectedFile.set(file);
    this.fileSelected.emit(file);
  }

  private isAccepted(file: File): boolean {
    const accepted = this.acceptedFiles().split(',').map((value) => value.trim().toLowerCase()).filter(Boolean);
    if (accepted.length === 0) return true;

    const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
    return accepted.some((value) =>
      value === file.type.toLowerCase() || value === extension ||
      (value.endsWith('/*') && file.type.startsWith(value.slice(0, -1))),
    );
  }
}
