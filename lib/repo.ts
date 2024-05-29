import {Client} from "./client.ts";
import {Repository} from "./types/organization.ts";
import { CreateRepoOption } from "./types/repo.ts";

export class RepositoryApi {
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async create(option: CreateRepoOption): Promise<Repository> {
        const res = await this.client.request(
            'POST',
            '/api/v1/user/repos',
            new Headers(),
            JSON.stringify(option),
            new URLSearchParams()
        );

        if (res.status !== 201) {
            console.log(await res.text())
            throw new Error(`Unexpected response status ${res.status}`);
        }

        return await res.json() as Repository;
    }

    async delete(username: string, repoName: string): Promise<boolean> {
        const res = await this.client.request(
            'DELETE',
            `/api/v1/repos/${username}/${repoName}`,
            new Headers(),
            null,
            new URLSearchParams()
        );

        if (res.status !== 204) {
            console.log(await res.text())
            throw new Error(`Unexpected response status ${res.status}`);
        }

        return true;
    }

}