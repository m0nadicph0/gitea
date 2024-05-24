import {Client} from "./client.ts";
import {CreateUserRequest, CreateUserResponse, UserListItem} from "./types/user.ts";


export class Admin {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async createUser(opt: CreateUserRequest): Promise<CreateUserResponse> {
        const res = await this.client.request(
            "POST",
            "/api/v1/admin/users",
            new Headers(),
            JSON.stringify(opt),
            new URLSearchParams({}),
        );

        switch (res.status.valueOf()) {
            case 201: {
                return await res.json() as CreateUserResponse;
            }
            default: {
                const errorResponse = await res.json();
                throw new Error(`Unexpected response status ${res.status}: ${errorResponse.message}`);
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
        )

        if (res.status !== 204) {
            console.log(await res.text());
            throw new Error(`Unexpected response status ${res.status}`);
        }
    }

    async listUsers(): Promise<UserListItem[]> {
        const res = await this.client.request(
            "GET",
            "/api/v1/admin/users",
            new Headers(),
            null,
            new URLSearchParams({}),
        )

        if (res.status !== 200) {
            const errorResponse = await res.json();
            throw new Error(`Unexpected response status ${res.status}: ${errorResponse.message}`);
        }

        return await res.json() as UserListItem[];
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
            console.log(res)
            const errorResponse = await res.json();
            throw new Error(`Unexpected response status ${res.status}: ${errorResponse.message}`);
        }
        await res.text();
        return true;
    }

}