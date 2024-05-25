import { User } from "./lib/user.ts";
import { Client } from "./lib/client.ts";
import { Admin } from "./lib/admin.ts";

export class GiteaClient {
  private readonly client: Client;
  users: User;
  admin: Admin;

  constructor(baseUrl: string, token: string) {
    this.client = new Client(baseUrl, token);
    this.users = new User(this.client);
    this.admin = new Admin(this.client);
  }
}
