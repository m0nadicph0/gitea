import {Client} from "./client.ts";
import { EditTeamOption, Team } from "./types/organization.ts";

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

    async edit(id: number, option: EditTeamOption):Promise<Team> {
        const res = await this.client.request(
            'PATCH',
            `/api/v1/teams/${id}`,
            new Headers(),
            JSON.stringify(option),
            new URLSearchParams({})
        );

        if (res.status !== 200) {
            throw new Error(`Unexpected response status ${res.status}`);
        }

        return await res.json() as Team;
    }

    async addMember(id: number, username: string): Promise<boolean> {
        const res = await this.client.request(
            'PUT',
            `/api/v1/teams/${id}/members/${username}`,
            new Headers(),
            null,
            new URLSearchParams({})
        );

        if (res.status !== 204) {
            console.log(await res.text())
            throw new Error(`Unexpected response status ${res.status}`);
        }

        return true;
    }

}