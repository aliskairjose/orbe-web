
export class AppConfig {
  static baseUrl = (slug: string): string => `${API_URL}/v1/${slug}`;
}