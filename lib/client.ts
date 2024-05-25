export class Client {
  private readonly baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async request(
    method: string,
    path: string,
    headers: Headers,
    body: Uint8Array | string | null,
    query: URLSearchParams,
  ): Promise<Response> {
    query.set("token", this.token);
    const url = `${this.baseUrl}${path}?${query.toString()}`;
    headers.set("Authorization", this.token);
    headers.set("Content-Type", "application/json");
    return await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });
  }
}
