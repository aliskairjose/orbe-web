import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, input, output, signal } from '@angular/core';

let nextFileUploadId = 0;
const MAX_VIDEO_DURATION_SECONDS = 30;

export type FileType = 'image' | 'video' | 'invalid';

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

    if (!input.files || input.files.length === 0) return;

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

  private getFileType(file: File): FileType {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'invalid';
  }

  getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const fileURL = URL.createObjectURL(file);
      video.src = fileURL;

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(fileURL);
        resolve(video.duration);
      };

      video.onerror = () => {
        URL.revokeObjectURL(fileURL);
        reject('Error al cargar el archivo de video.');
      };
    });
  }

  private async handleFiles(files: FileList | null): Promise<void> {
    const file = files?.item(0);
    if (!file) return;
    
    const fileType: FileType = this.getFileType(file);
    
    if (!this.isAccepted(file)) {
      this.errorMessage.set('El tipo de archivo no está permitido.');
      this.selectedFile.set(null);
      this.fileSelected.emit(null);
      return;
    }


    if (fileType === 'video') {
      const duration = await this.getVideoDuration(file);
      if (duration > MAX_VIDEO_DURATION_SECONDS) {
        this.errorMessage.set(`El video no puede exceder de los ${MAX_VIDEO_DURATION_SECONDS} segundos`);
        this.selectedFile.set(null);
        this.fileSelected.emit(null);
        return;
      }
    }

    if (fileType === 'image') {
      if (file.size > 1024 * 1024) {
        this.errorMessage.set('El archivo no puede superar 1 MB.');
        this.selectedFile.set(null);
        this.fileSelected.emit(null);
        return;
      }
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
