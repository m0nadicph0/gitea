import { describe, it } from "std/testing/bdd.ts";
import { GiteaClient } from "../mod.ts";
import { assertNotEquals } from "std/assert/assert_not_equals.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { orgObj, teamObj } from "./helpers.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const teamSuite = describe("team");

it(teamSuite, "Should get a team", async () => {
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

it(teamSuite, "Should delete a team", async () => {
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

it(teamSuite, "Should edit a team", async () => {
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
    description: "Edited team description",
  });

  assertEquals(updatedTeam.name, "edited-team");
  assertEquals(updatedTeam.description, "Edited team description");

  await gitea.orgs.delete(organization.name);
});

it(teamSuite, "Should add a team member", async () => {
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
    username: "brucebanner",
  });

  // Assuming gitea.teams.addMember invokes the PUT /teams/{id}/members/{username} endpoint
  const result = await gitea.teams.addMember(team.id, user.username);

  // Assuming that the function returns the added member's username
  assertEquals(result, true);

  await gitea.orgs.delete(organization.name);
  await gitea.admin.deleteUser(user.username);
});

it(teamSuite, "Should list a team's members", async () => {
  const organization = await gitea.orgs.create(orgObj());
  assertNotEquals(organization.id, null);

  const team = await gitea.orgs.createTeam(organization.name, teamObj());
  assertNotEquals(team, null);

  const user = await gitea.admin.createUser({
    email: "sample@shield.us",
    password: "YourTestPassword",
    username: "YourTestUserName",
  });

  await gitea.teams.addMember(team.id, user.username);

  const teamMembers = await gitea.teams.listMembers(team.id);

  assertNotEquals(teamMembers, null);
  assertEquals(
    teamMembers.some((member) => member.username === user.username),
    true,
  );

  await gitea.orgs.delete(organization.name);
  await gitea.admin.deleteUser(user.username);
});

it(teamSuite, "Should get a specific team member", async () => {
  const organization = await gitea.orgs.create(orgObj());
  assertNotEquals(organization.id, null);

  const team = await gitea.orgs.createTeam(organization.name, teamObj());
  assertNotEquals(team, null);

  const user = await gitea.admin.createUser({
    email: "specific@shield.us",
    password: "SpecificUserPassword",
    username: "SpecificUserName",
  });

  await gitea.teams.addMember(team.id, user.username);

  const teamMember = await gitea.teams.getMember(team.id, user.username);

  assertNotEquals(teamMember, null);
  assertEquals(teamMember.username, user.username);

  await gitea.orgs.delete(organization.name);
  await gitea.admin.deleteUser(user.username);
});

it(teamSuite, "Should remove a team member", async () => {
  const organization = await gitea.orgs.create(orgObj());
  assertNotEquals(organization.id, null);

  const team = await gitea.orgs.createTeam(organization.name, teamObj());
  assertNotEquals(team, null);

  const user = await gitea.admin.createUser({
    email: "remove@shield.us",
    password: "RemoveUserPassword",
    username: "RemoveUserName",
  });

  await gitea.teams.addMember(team.id, user.username);

  const result = await gitea.teams.removeMember(team.id, user.username); // Assuming gitea.teams.removeMember invokes the DELETE /teams/{id}/members/{username} endpoint

  // Assert that the removed member's username is returned upon successful deletion
  assertEquals(result, true);

  // Now validate that the user has indeed been removed
  const teamMembers = await gitea.teams.listMembers(team.id);

  assertEquals(
    teamMembers.some((member) => member.username === user.username),
    false,
  );

  await gitea.orgs.delete(organization.name);
  await gitea.admin.deleteUser(user.username);
});
