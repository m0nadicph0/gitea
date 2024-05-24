import { User } from "./lib/user.ts";
import {Client} from "./lib/client.ts";

export class GiteaClient {

    private readonly client: Client;
    users: User;

    constructor(baseUrl: string, token: string) {
        this.client = new Client(baseUrl, token);
        this.users = new User(this.client);
    }
}