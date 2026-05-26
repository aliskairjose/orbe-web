export class Helper {
  static LegalHtmlFormatCSS(content: string): string {
    content = content.replace('<h4', "<h4 class='text-3xl font-medium mb-3'");
    content = content.replaceAll('<h6>', "<h6 class='text-xl font-medium my-3'>");
    content = content.replaceAll('<p>', "<p class='mb-1'>");
    content = content.replaceAll(
      '<ul style="list-style-type: disc;">',
      "<ul class='list-inside list-disc ms-4'>",
    );

    return content;
  }
}
