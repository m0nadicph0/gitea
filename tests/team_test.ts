import { describe, it } from "std/testing/bdd.ts";
import { GiteaClient } from "../mod.ts";
import { assertNotEquals } from "std/assert/assert_not_equals.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { orgObj } from "./helpers.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const teamSuite = describe("team");


it(teamSuite, "GET /teams/{id} Should get a team", async () => {
    const organization = await gitea.orgs.create(orgObj());
    assertNotEquals(organization.id, null);
    const team = await gitea.orgs.createTeam(organization.name, {
        name: "development",
        description: "Development team",
        permission: "read",
        units: ["repo.code", "repo.issues"],
        can_create_org_repo: false,
        includes_all_repositories: false,
    });
    assertNotEquals(team, null);

    // Use the gitea client to fetch the team data
    const fetchedTeam = await gitea.teams.get(team.id);

    assertNotEquals(fetchedTeam, null);

    assertEquals(fetchedTeam.id, team.id);
    assertEquals(fetchedTeam.name, team.name);
    await gitea.orgs.delete(organization.name);
});