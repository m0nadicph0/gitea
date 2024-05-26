import { GiteaClient } from "../mod.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { assertNotEquals } from "std/assert/assert_not_equals.ts";
import { assert } from "std/assert/assert.ts";
import { describe, it } from "std/testing/bdd.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const adminSuite = describe("admin");

it(adminSuite, "should create user", async () => {
  const user = await gitea.admin.createUser({
    full_name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    password: "password123",
    login_name: "johndoe",
    must_change_password: false,
    restricted: false,
    visibility: "public",
  });

  assertNotEquals(user.id, null);
  assertEquals(user.email, "john@example.com");
  assertEquals(user.username, "johndoe");
  await gitea.admin.deleteUser(user.username);
});

it(adminSuite, "should list users", async () => {
  const user = await gitea.admin.createUser({
    username: "johndoe",
    email: "john@example.com",
    password: "s3cr3t0125",
  });

  const users = await gitea.admin.listUsers();
  assert(users.length > 1);
  await gitea.admin.deleteUser(user.username);
});

it(adminSuite, "should should delete users", async () => {
  const user = await gitea.admin.createUser({
    username: "johndoe",
    email: "john@example.com",
    password: "s3cr3t0125",
  });

  const listBefore = await gitea.admin.listUsers();
  await gitea.admin.deleteUser(user.username);
  const listAfter = await gitea.admin.listUsers();

  assert(listBefore.length > listAfter.length);
});

it(adminSuite, "should rename users", async () => {
  const user = await gitea.admin.createUser({
    email: "john@example.com",
    password: "s3cr3t0125",
    username: "johndoe",
  });

  const result = await gitea.admin.renameUser(user.username, "doejohn");
  assertEquals(result, true);
  await gitea.admin.deleteUser(user.username);
});

it(adminSuite, "should list all organizations", async () => {
  const organizations = await gitea.admin.listOrganizations();
  assert(organizations.length >= 0);
});

it(adminSuite, "should list all emails", async () => {
  const emails = await gitea.admin.listEmails();
  assert(emails.length > 0);
});

it(adminSuite, "should search all emails", async () => {
  const expectedEmail = "test@example.com";
  const user = await gitea.admin.createUser({
    email: expectedEmail,
    password: "test1234",
    username: "testuser",
  });

  const searchResults = await gitea.admin.searchEmails(expectedEmail);
  const result = searchResults.find((email) => email.email === expectedEmail);
  assertEquals(result!.email, expectedEmail);

  await gitea.admin.deleteUser(user.username);
});

it(adminSuite, "should create a hook", async () => {
  const hookUrl = "https://some-url.com/webhook-endpoint";
  const hook = await gitea.admin.createHook({
    type: "gitea",
    config: {
      url: hookUrl,
      content_type: "json",
    },
    events: ["push"],
    active: true,
    authorization_header: "",
    branch_filter: "",
  });

  assertNotEquals(hook.id, null);
  assertEquals(hook.type, "gitea");
  assertEquals(hook.active, true);

  await gitea.admin.deleteHook(hook.id);
});

it(adminSuite, "should delete a hook", async () => {
  const hook = await gitea.admin.createHook({
    type: "gitea",
    active: true,
    authorization_header: "",
    branch_filter: "",
    config: {
      url: "http://some-hook-url/hook",
      content_type: "json",
    },
    events: ["push"],
  });
  const deleted = await gitea.admin.deleteHook(hook.id);
  assertEquals(deleted, true);
});

it(adminSuite, "should get a hook", async () => {
  const hook = await gitea.admin.createHook({
    type: "gitea",
    active: true,
    authorization_header: "",
    branch_filter: "main",
    config: {
      url: "http://some-hook-url/hook",
      content_type: "json",
    },
    events: ["push"],
  });

  const fetched = await gitea.admin.getHook(hook.id);
  assertEquals(fetched.id, hook.id);
  assertEquals(fetched.type, "gitea");
  assertEquals(fetched.active, true);
  assertEquals(fetched.config.url, "http://some-hook-url/hook");
  assertEquals(fetched.config.content_type, "json");
  assertEquals(fetched.events, ["push"]);
  assertEquals(fetched.branch_filter, "main");

  await gitea.admin.deleteHook(hook.id);
});

it(adminSuite, "should update a hook", async () => {
  const hook = await gitea.admin.createHook({
    type: "gitea",
    active: true,
    authorization_header: "",
    branch_filter: "main",
    config: {
      url: "http://some-hook-url/hook",
      content_type: "json",
    },
    events: ["push"],
  });

  const updated = await gitea.admin.updateHook(hook.id, {
    active: false,
  });

  assertEquals(updated.active, false);

  await gitea.admin.deleteHook(hook.id);
});

it(adminSuite, "should list cron tasks", async () => {
  const tasks = await gitea.admin.listCronTasks();

  assert(
    tasks.length >= 0,
    "Tasks array length should be greater than or equal to zero",
  );

  for (const task of tasks) {
    assert(typeof task.name === "string");
    assert(typeof task.next === "string");
    assert(typeof task.prev === "string");
  }
});

it(adminSuite, "should run cron task", async () => {
  const result = await gitea.admin.runCronTask("repo_health_check");
  assertEquals(result, true);
});

it(adminSuite, "should add public key on behalf of a user", async () => {
  const user = await gitea.admin.createUser({
    email: "barbara@oracle.com",
    full_name: "Barbara Gordon",
    login_name: "barbara",
    must_change_password: false,
    password: "s3cr3t28475639!!",
    restricted: false,
    username: "barbara",
    visibility: "public",
  });

  const testKey =
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINj3B5SczNqZBqyfaPqbJvGQqtK4egFJrV4JtqvAERDi user@example.com";
  const key = await gitea.admin.addPublicKeyToUser(user.username, {
    key: testKey,
    read_only: false,
    title: "personal",
  });

  assertEquals(key.key, testKey);
  await gitea.admin.deleteUser(user.username);
});

it(adminSuite, "should delete a user's public key", async () => {
  // creating a new user
  const user = await gitea.admin.createUser({
    email: "robert@siemens.com",
    full_name: "Robert Baratheon",
    login_name: "robert",
    must_change_password: false,
    password: "s3cr3t987659",
    restricted: false,
    username: "robert",
    visibility: "public",
  });

  // creating a new key for the user
  const publicKey = await gitea.admin.addPublicKeyToUser(user.username, {
    key:
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINp76zym5ruLodJ5qqU4Z0StivOmHf4GCMzPRb8wkUsC user@example.com",
    read_only: false,
    title: "office",
  });

  const deleted = await gitea.admin.deletePublicKeyFromUser(
    user.username,
    publicKey.id,
  );
  assertEquals(deleted, true);

  await gitea.admin.deleteUser(user.username);
});

it(adminSuite, "should create an organization for a user", async () => {
  const user = await gitea.admin.createUser({
    email: "bruce@banners.eu",
    full_name: "Bruce Banner",
    login_name: "bruceb",
    must_change_password: false,
    password: "s3cr3t987659",
    restricted: false,
    username: "bruceb",
    visibility: "public",
  });

  const orgInfo = {
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-yarn.org",
    full_name: "Quantum Yarn",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-yarn",
    visibility: "public",
    website: "https://quantum-yarn.org",
  };
  const organization = await gitea.admin.addOrgToUser(user.username, orgInfo);

  assertEquals(organization.username, orgInfo.username);
  assertEquals(organization.full_name, orgInfo.full_name);
  assertEquals(organization.description, orgInfo.description);
  assertEquals(organization.website, orgInfo.website);
  assertEquals(organization.location, orgInfo.location);

  await gitea.orgs.delete(orgInfo.username);
  await gitea.admin.deleteUser(user.username);
});
