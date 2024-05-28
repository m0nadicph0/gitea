import { Client } from "./client.ts";
import { User } from "./types/admin.ts";
import { EditTeamOption, Repository, Team } from "./types/organization.ts";

export class TeamApi {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async get(id: number): Promise<Team> {
    const res = await this.client.request(
      "GET",
      `/api/v1/teams/${id}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Team;
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/teams/${id}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return true;
  }

  async edit(id: number, option: EditTeamOption): Promise<Team> {
    const res = await this.client.request(
      "PATCH",
      `/api/v1/teams/${id}`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Team;
  }

  async addMember(id: number, username: string): Promise<boolean> {
    const res = await this.client.request(
      "PUT",
      `/api/v1/teams/${id}/members/${username}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return true;
  }

  async listMembers(id: number): Promise<User[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/teams/${id}/members`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as User[];
  }

  async getMember(id: number, username: string): Promise<User> {
    const res = await this.client.request(
      "GET",
      `/api/v1/teams/${id}/members/${username}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as User;
  }

  async removeMember(id: number, username: string): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/teams/${id}/members/${username}`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return true;
  }

  async listRepositories(id: number): Promise<Repository[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/teams/${id}/repos`,
      new Headers(),
      null,
      new URLSearchParams({}),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Repository[];
  }
}
