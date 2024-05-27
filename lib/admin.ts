import { Client } from "./client.ts";
import {
  CreateHookRequest,
  CreateKeyOption,
  CreateOrgOption,
  CreateUserRequest,
  Cron,
  EmailListItem,
  Hook,
  Organization,
  OrganizationListItem,
  PublicKey,
  UpdateHookRequest,
  User,
} from "./types/admin.ts";

export class Admin {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async createUser(opt: CreateUserRequest): Promise<User> {
    const res = await this.client.request(
      "POST",
      "/api/v1/admin/users",
      new Headers(),
      JSON.stringify(opt),
      new URLSearchParams({}),
    );

    switch (res.status.valueOf()) {
      case 201: {
        return await res.json() as User;
      }
      default: {
        const errorResponse = await res.json();
        throw new Error(
          `Unexpected response status ${res.status}: ${errorResponse.message}`,
        );
      }
    }
  }

  async deleteUser(username: string): Promise<void> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/admin/users/${username}`,
      new Headers(),
      new Uint8Array(),
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }
  }

  async listUsers(): Promise<User[]> {
    const res = await this.client.request(
      "GET",
      "/api/v1/admin/users",
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as User[];
  }

  async renameUser(username: string, newUserName: string): Promise<boolean> {
    const res = await this.client.request(
      "POST",
      `/api/v1/admin/users/${username}/rename`,
      new Headers(),
      JSON.stringify({ new_username: newUserName }),
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      console.log(res);
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }
    await res.text();
    return true;
  }

  async listOrganizations(): Promise<OrganizationListItem[]> {
    const res = await this.client.request(
      "GET",
      "/api/v1/admin/orgs",
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as OrganizationListItem[];
  }

  async listEmails(): Promise<EmailListItem[]> {
    const res = await this.client.request(
      "GET",
      "/api/v1/admin/emails",
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as EmailListItem[];
  }

  async searchEmails(query: string): Promise<EmailListItem[]> {
    const res = await this.client.request(
      "GET",
      "/api/v1/admin/emails/search",
      new Headers(),
      null,
      new URLSearchParams({
        "q": query,
      }),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as EmailListItem[];
  }

  async createHook(opt: CreateHookRequest): Promise<Hook> {
    const res = await this.client.request(
      "POST",
      "/api/v1/admin/hooks",
      new Headers(),
      JSON.stringify(opt),
      new URLSearchParams({}),
    );

    if (res.status !== 201) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as Hook;
  }

  async deleteHook(id: number): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/admin/hooks/${id}`,
      new Headers(),
      new Uint8Array(),
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }
    return true;
  }

  async listSystemHooks(): Promise<Hook[]> {
    const res = await this.client.request(
      "GET",
      "/api/v1/admin/hooks",
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as Hook[];
  }

  async getHook(id: number): Promise<Hook> {
    const res = await this.client.request(
      "GET",
      `/api/v1/admin/hooks/${id}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as Hook;
  }

  async updateHook(id: number, opt: UpdateHookRequest): Promise<Hook> {
    const res = await this.client.request(
      "PATCH",
      `/api/v1/admin/hooks/${id}`,
      new Headers(),
      JSON.stringify(opt),
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as Hook;
  }

  async listCronTasks(page: number = 0, limit: number = 0): Promise<Cron[]> {
    const res = await this.client.request(
      "GET",
      "/api/v1/admin/cron",
      new Headers(),
      null,
      new URLSearchParams({
        "page": page.toString(),
        "limit": limit.toString(),
      }),
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as Cron[];
  }

  async runCronTask(name: string): Promise<boolean> {
    const res = await this.client.request(
      "POST",
      `/api/v1/admin/cron/${name}`,
      new Headers(),
      new Uint8Array(),
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return true;
  }

  async addPublicKeyToUser(
    username: string,
    opt: CreateKeyOption,
  ): Promise<PublicKey> {
    const res = await this.client.request(
      "POST",
      `/api/v1/admin/users/${username}/keys`,
      new Headers(),
      JSON.stringify(opt),
      new URLSearchParams({}),
    );

    if (res.status !== 201) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as PublicKey;
  }

  async deletePublicKeyFromUser(
    username: string,
    keyId: number,
  ): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/admin/users/${username}/keys/${keyId}`,
      new Headers(),
      new Uint8Array(),
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }
    return true;
  }

  async addOrgToUser(
    username: string,
    option: CreateOrgOption,
  ): Promise<Organization> {
    const res = await this.client.request(
      "POST",
      `/api/v1/admin/users/${username}/orgs`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 201) {
      const errorResponse = await res.json();
      throw new Error(
        `Unexpected response status ${res.status}: ${errorResponse.message}`,
      );
    }

    return await res.json() as Organization;
  }
}
