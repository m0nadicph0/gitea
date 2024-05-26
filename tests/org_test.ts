import { describe, it } from "std/testing/bdd.ts";
import { GiteaClient } from "../mod.ts";
import { assertNotEquals } from "std/assert/assert_not_equals.ts";
import { assertEquals } from "std/assert/assert_equals.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const orgSuite = describe("organization");

it(orgSuite, "should create an organization", async () => {
  const organization = await gitea.orgs.create({
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-leap.org",
    full_name: "Quantum Leap",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-leap",
    visibility: "public",
    website: "https://quantum-leap.org",
  });
  assertNotEquals(organization.id, null);
  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should get list of organizations", async () => {
  const organization = await gitea.orgs.create({
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-leap.org",
    full_name: "Quantum Leap",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-leap",
    visibility: "public",
    website: "https://quantum-leap.org",
  });
  assertNotEquals(organization.id, null);

  const organizations = await gitea.orgs.list();

  assertNotEquals(organizations, null);
  assertNotEquals(organizations.length, 0);
  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should delete an organization", async () => {
  const organization = await gitea.orgs.create({
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-leap.org",
    full_name: "Quantum Leap",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-leap",
    visibility: "public",
    website: "https://quantum-leap.org",
  });
  assertNotEquals(organization.id, null);

  const result = await gitea.orgs.delete(organization.name);
  assertEquals(result, true);
});

it(orgSuite, "should get an organization", async () => {
  const organization = await gitea.orgs.create({
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-leap.org",
    full_name: "Quantum Leap",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-leap",
    visibility: "public",
    website: "https://quantum-leap.org",
  });
  assertNotEquals(organization.id, null);

  const retrievedOrg = await gitea.orgs.get(organization.name);

  assertEquals(retrievedOrg.id, organization.id);
  assertEquals(retrievedOrg.name, organization.name);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should edit an organization", async () => {
  // Create a new organization
  const organization = await gitea.orgs.create({
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-leap.org",
    full_name: "Quantum Leap",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-leap",
    visibility: "public",
    website: "https://quantum-leap.org",
  });

  assertNotEquals(organization.id, null);

  // Edit the organization
  const updatedOrganization = await gitea.orgs.edit(organization.name, {
    description: "A community for advanced quantum computing enthusiasts.",
    visibility: "private",
  });

  assertEquals(
    updatedOrganization.description,
    "A community for advanced quantum computing enthusiasts.",
  );
  assertEquals(updatedOrganization.visibility, "private");

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should list an organizations secrets", async () => {
  // Create a new organization
  const organization = await gitea.orgs.create({
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-leap.org",
    full_name: "Quantum Leap",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-leap",
    visibility: "public",
    website: "https://quantum-leap.org",
  });

  assertNotEquals(organization.id, null);
  await gitea.orgs.createSecret(
    organization.name,
    "API_KEY",
    crypto.randomUUID().toString(),
  );

  const secrets = await gitea.orgs.listSecrets(organization.name);

  assertNotEquals(secrets, null);
  assertNotEquals(secrets.length, 0);

  await gitea.orgs.delete(organization.name);
});
