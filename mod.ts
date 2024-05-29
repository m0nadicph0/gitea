import { UserApi } from "./lib/user.ts";
import { Client } from "./lib/client.ts";
import { AdminApi } from "./lib/admin.ts";
import { TeamApi } from "./lib/team.ts";
import { OrgApi } from "./lib/org.ts";
import { RepositoryApi } from "./lib/repo.ts";

export class GiteaClient {
  private readonly client: Client;
  users: UserApi;
  admin: AdminApi;
  orgs: OrgApi;
  teams: TeamApi;
  repos: RepositoryApi;

  constructor(baseUrl: string, token: string) {
    this.client = new Client(baseUrl, token);
    this.users = new UserApi(this.client);
    this.admin = new AdminApi(this.client);
    this.orgs = new OrgApi(this.client);
    this.teams = new TeamApi(this.client);
    this.repos = new RepositoryApi(this.client);
  }
}
