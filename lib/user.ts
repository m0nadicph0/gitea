import { Client } from "./client.ts";

export class User {
  private readonly client: Client;
  id?: number;
  username?: string;
  visibility?: string;
  email?: string;

  constructor(client: Client) {
    this.client = client;
  }
}
