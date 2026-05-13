import type { IStaticMethods } from "flyonui/flyonui";
import { Editor } from 'ngx-editor';

declare const ENV: string
declare const API_URL: string
declare const API_SOCKET: string
declare const APP_VERSION: string
declare global {
  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable;
    Dropzone;

    // FlyonUI
    HSStaticMethods: IStaticMethods;
    // Editor: typeof Editor;
  }
}

export {};  