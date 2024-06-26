import { Client } from "./client.ts";
import { Repository } from "./types/organization.ts";
import {
  Branch,
  CreateBranchRepoOption,
  CreateOrUpdateSecretOption,
  CreateRepoOption,
  EditRepoOption,
} from "./types/repo.ts";

export class RepositoryApi {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async create(option: CreateRepoOption): Promise<Repository> {
    const res = await this.client.request(
      "POST",
      "/api/v1/user/repos",
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams(),
    );

    if (res.status !== 201) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Repository;
  }

  async delete(username: string, repoName: string): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/repos/${username}/${repoName}`,
      new Headers(),
      null,
      new URLSearchParams(),
    );

    if (res.status !== 204) {
      console.log(await res.text());
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return true;
  }

  async get(id: number): Promise<Repository> {
    const res = await this.client.request(
      "GET",
      `/api/v1/repositories/${id}`,
      new Headers(),
      null,
      new URLSearchParams(),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }
    return await res.json() as Repository;
  }

  async getByOwner(owner: string, repo: string): Promise<Repository> {
    const res = await this.client.request(
      "GET",
      `/api/v1/repos/${owner}/${repo}`,
      new Headers(),
      null,
      new URLSearchParams(),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }
    return await res.json() as Repository;
  }

  async update(
    owner: string,
    repo: string,
    option: EditRepoOption,
  ): Promise<Repository> {
    const res = await this.client.request(
      "PATCH",
      `/api/v1/repos/${owner}/${repo}`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams(),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Repository;
  }

  async createOrUpdateSecret(
    username: string,
    repo: string,
    secretName: string,
    option: CreateOrUpdateSecretOption,
  ): Promise<boolean> {
    const res = await this.client.request(
      "PUT",
      `/api/v1/repos/${username}/${repo}/actions/secrets/${secretName}`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams(),
    );

    if (res.status !== 204 && res.status !== 201) {
      throw new Error(`Unexpected response status ${res.status}`);
    }
    await res.text();
    return true;
  }

  async deleteSecret(
    owner: string,
    repo: string,
    secretName: string,
  ): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/repos/${owner}/${repo}/actions/secrets/${secretName}`,
      new Headers(),
      null,
      new URLSearchParams(),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }
    await res.text();
    return true;
  }

  async createBranch(
    owner: string,
    repo: string,
    option: CreateBranchRepoOption,
  ): Promise<Branch> {
    const res = await this.client.request(
      "POST",
      `/api/v1/repos/${owner}/${repo}/branches`,
      new Headers(),
      JSON.stringify(option),
      new URLSearchParams(),
    );

    if (res.status !== 201) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Branch;
  }

  async getBranch(
    username: string,
    name: string,
    branch: string,
  ): Promise<Branch> {
    const res = await this.client.request(
      "GET",
      `/api/v1/repos/${username}/${name}/branches/${branch}`,
      new Headers(),
      null,
      new URLSearchParams(),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Branch;
  }

  async listBranches(owner: string, repo: string): Promise<Branch[]> {
    const res = await this.client.request(
      "GET",
      `/api/v1/repos/${owner}/${repo}/branches`,
      new Headers(),
      null,
      new URLSearchParams(),
    );

    if (res.status !== 200) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return await res.json() as Branch[];
  }

  async deleteBranch(
    owner: string,
    repo: string,
    branch: string,
  ): Promise<boolean> {
    const res = await this.client.request(
      "DELETE",
      `/api/v1/repos/${owner}/${repo}/branches/${branch}`,
      new Headers(),
      null,
      new URLSearchParams(),
    );

    if (res.status !== 204) {
      throw new Error(`Unexpected response status ${res.status}`);
    }

    return true;
  }
}
