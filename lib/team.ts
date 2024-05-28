import {Client} from "./client.ts";
import { Team } from "./types/organization.ts";

export class TeamApi {
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }


    async get(id: number): Promise<Team> {
        const res = await this.client.request(
            'GET',
            `/api/v1/teams/${id}`,
            new Headers(),
            null,
            new URLSearchParams({})
        );

        if (res.status !== 200) {
            throw new Error(`Unexpected response status ${res.status}`);
        }

        return await res.json() as Team;
    }

    async delete(id: number):Promise<boolean> {
        const res = await this.client.request(
            'DELETE',
            `/api/v1/teams/${id}`,
            new Headers(),
            null,
            new URLSearchParams({})
        );

        if (res.status !== 204) {
            throw new Error(`Unexpected response status ${res.status}`);
        }

        return true;
    }

}