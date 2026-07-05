import type { IStaticMethods } from "flyonui/flyonui";
import { Editor } from 'ngx-editor';

declare global {
  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable;
    Dropzone;
    Raty;

    // FlyonUI
    HSStaticMethods: IStaticMethods;
  }
}

export { };
