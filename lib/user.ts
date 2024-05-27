import { Client } from "./client.ts";

export class UserApi {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
