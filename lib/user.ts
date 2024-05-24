import {CreateUserRequest, CreateUserResponse, UserListItem} from "./types/user.ts";
import {Client} from "./client.ts";

export class User {

    private readonly client: Client;
    id?: number;
    username?: string;
    visibility?: string;
    email?: string;

    constructor(client: Client) {
        this.client = client;
    }


    async create(opt: CreateUserRequest): Promise<User> {
        const res = await this.client.request(
            "POST",
            "/api/v1/admin/users",
            new Headers(),
            JSON.stringify(opt),
            new URLSearchParams({}),
        );

        switch (res.status.valueOf()) {
            case 201: {
                const data = await res.json() as CreateUserResponse;
                const user = new User(this.client);
                user.id = data.id;
                user.username = data.username;
                user.email = data.email;
                user.visibility = data.visibility;
                return user;
            }
            default: {
                const errorResponse = await res.json();
                throw new Error(`Unexpected response status ${res.status}: ${errorResponse.message}`);
            }
        }
    }

    async delete(): Promise<void> {
        if (this.username === undefined) {
            throw new Error("User not created");
        }

        const res = await this.client.request(
            "DELETE",
            `/api/v1/admin/users/${this.username}`,
            new Headers(),
            new Uint8Array(),
            new URLSearchParams({}),
        )

        if (res.status !== 204) {
            console.log(await res.text());
            throw new Error(`Unexpected response status ${res.status}`);
        }

        this.id = undefined;
        this.username = undefined;
        this.visibility = undefined;
        this.email = undefined;
    }

    async list(): Promise<User[]> {
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

        const data = await res.json() as UserListItem[];

        return data.map((item) => {
            const user = new User(this.client);
            user.id = item.id;
            user.username = item.username;
            user.email = item.email;
            user.visibility = item.visibility;
            return user;
        });
    }

}