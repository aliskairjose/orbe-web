import type { HSOverlay, IStaticMethods } from "flyonui/flyonui";
import { Editor } from 'ngx-editor';

declare global {
  interface Window {
    // Optional third-party libraries
    _;

    // FlyonUI
    HSStaticMethods: IStaticMethods;
    HSOverlay: typeof HSOverlay;
  }
}

export { };
