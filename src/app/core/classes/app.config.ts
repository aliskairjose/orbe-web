
export class AppConfig {
  static baseUrl = (slug: string): string => `${API_URL}/${slug}`;
}