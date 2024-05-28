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


it(teamSuite, "DELETE /teams/{id} Should delete a team", async () => {
    const organization = await gitea.orgs.create(orgObj());
    assertNotEquals(organization.id, null);

    const team = await gitea.orgs.createTeam(organization.name, {
        name: "deletion-test",
        description: "Deletion test team",
        permission: "read",
        units: ["repo.code", "repo.issues"],
        can_create_org_repo: false,
        includes_all_repositories: false,
    });

    assertNotEquals(team, null);

    const result = await gitea.teams.delete(team.id);

    assertEquals(result, true);

    await gitea.orgs.delete(organization.name);
});


it(teamSuite, "PATCH /teams/{id} Should edit a team", async () => {
    const organization = await gitea.orgs.create(orgObj());
    assertNotEquals(organization.id, null);

    const team = await gitea.orgs.createTeam(organization.name, {
        name: "edit-test",
        description: "Team for edit test",
        permission: "read",
        units: ["repo.code", "repo.issues"],
        can_create_org_repo: false,
        includes_all_repositories: false,
    });
    assertNotEquals(team, null);

    const updatedTeam = await gitea.teams.edit(team.id, {
        name: "edited-team",
        description: "Edited team description"
    });

    assertEquals(updatedTeam.name, "edited-team");
    assertEquals(updatedTeam.description, "Edited team description");

    await gitea.orgs.delete(organization.name);
});


it(teamSuite, "PUT /teams/{id}/members/{username} Should add a team member", async () => {
    const organization = await gitea.orgs.create(orgObj());
    assertNotEquals(organization.id, null);

    const team = await gitea.orgs.createTeam(organization.name, {
        name: "team-member-addition",
        description: "Team for adding a member",
        permission: "read",
        units: ["repo.code", "repo.issues"],
        can_create_org_repo: false,
        includes_all_repositories: false,
    });
    assertNotEquals(team, null);

    const user = await gitea.admin.createUser({
      email: "bruce@shield.us",
      password: "s3cr3t052234",
      username: "brucebanner"
    });


    // Assuming gitea.teams.addMember invokes the PUT /teams/{id}/members/{username} endpoint
    const result = await gitea.teams.addMember(team.id, user.username);

    // Assuming that the function returns the added member's username
    assertEquals(result, true);

    await gitea.orgs.delete(organization.name);
    await gitea.admin.deleteUser(user.username);
});