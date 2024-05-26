import { Client } from "./client.ts";
import { CreateOrgOption, EditOrgOption, Organization } from "./types/admin.ts";
import { CreateOrUpdateSecretOption, Secret } from "./types/organization.ts";

export class Org {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async create(option: CreateOrgOption): Promise<Organization> {
    const res = await this.client.request(
      "POST",
      `/api/v1/orgs`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 201) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Organization;
  }

  async list(): Promise<Organization[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Organization[];
  }

  async delete(name: string): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/orgs/${name}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return true;
  }

  async get(name: string): Promise<Organization> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${name}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Organization;
  }

  async edit(name: string, option: EditOrgOption): Promise<Organization> {
    const res = await this.client.request(
      "PATCH",
      `/api/v1/orgs/${name}`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Organization;
  }

  async createOrUpdateSecret(
    orgName: string,
    secretName: string,
    data: string,
  ): Promise<boolean> {
    const option: CreateOrUpdateSecretOption = {
      data,
    };
    const res = await this.client.request(
      "PUT",
      `/api/v1/orgs/${orgName}/actions/secrets/${secretName}`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 201 && res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    await res.text();
    return true;
  }

  async listSecrets(orgName: string): Promise<Secret[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${orgName}/actions/secrets`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Secret[];
  }

  async deleteSecret(orgName: string, secretName: string): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/orgs/${orgName}/actions/secrets/${secretName}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return true;
  }
}
