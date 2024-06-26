import { Client } from "./client.ts";
import {
  CreateHookRequest,
  CreateOrgOption,
  EditOrgOption,
  Hook,
  Organization,
  UpdateHookRequest,
  User,
} from "./types/admin.ts";
import {
  CreateLabelOption,
  CreateOrUpdateSecretOption,
  CreateTeamOption,
  EditLabelOption,
  Label,
  Secret,
  Team,
} from "./types/organization.ts";

export class OrgApi {
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

  async updateAvatar(orgName: string, data: string): Promise<boolean> {
    const res = await this.client.request(
      "POST",
      `/api/v1/orgs/${orgName}/avatar`,
      new Headers(),
      JSON.stringify({
        image: data,
      }),
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    await res.text();
    return true;
  }

  async deleteAvatar(orgName: string): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/orgs/${orgName}/avatar`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    await res.text();
    return true;
  }

  async listHooks(orgName: string): Promise<Hook[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${orgName}/hooks`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Hook[];
  }

  async createHook(orgName: string, arg1: CreateHookRequest): Promise<Hook> {
    const res = await this.client.request(
      "POST",
      `/api/v1/orgs/${orgName}/hooks`,
      new Headers(),
      JSON.stringify(arg1),
      new URLSearchParams({}),
    );

    if (res.status !== 201) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Hook;
  }

  async getHook(orgName: string, id: number): Promise<Hook> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${orgName}/hooks/${id}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Hook;
  }

  async deleteHook(name: string, id: number): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/orgs/${name}/hooks/${id}`,
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

  async editHook(
    name: string,
    id: number,
    option: UpdateHookRequest,
  ): Promise<Hook> {
    const res = await this.client.request(
      "PATCH",
      `/api/v1/orgs/${name}/hooks/${id}`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }
    return await res.json() as Hook;
  }

  async listLabels(orgName: string): Promise<Label[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${orgName}/labels`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Label[];
  }

  async createLabel(
    orgName: string,
    option: CreateLabelOption,
  ): Promise<Label> {
    const res = await this.client.request(
      "POST",
      `/api/v1/orgs/${orgName}/labels`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 201) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Label;
  }

  async getLabel(orgName: string, id: number): Promise<Label> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${orgName}/labels/${id}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Label;
  }

  async deleteLabel(orgName: string, id: number): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/orgs/${orgName}/labels/${id}`,
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

  async editLabel(
    orgName: string,
    id: number,
    option: EditLabelOption,
  ): Promise<Label> {
    const res = await this.client.request(
      "PATCH",
      `/api/v1/orgs/${orgName}/labels/${id}`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Label;
  }

  async listMembers(orgName: string): Promise<User[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${orgName}/members`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as User[];
  }

  async checkMembership(orgName: string, userName: string): Promise<boolean> {
    const res = await this.client.request(
      "GET",
      `/api/v1/orgs/${orgName}/members/${userName}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );
    await res.text();

    if (res.status === 204) {
      return true;
    } else if (res.status === 404) {
      return false;
    } else {
      throw new Error(`Unexpected response status ${res.status}`);
    }
  }

  async createTeam(orgName: string, option: CreateTeamOption): Promise<Team> {
    const res = await this.client.request(
      "POST",
      `/api/v1/orgs/${orgName}/teams`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 201) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Team;
  }
}
