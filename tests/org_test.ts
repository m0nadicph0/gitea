import { describe, it } from "std/testing/bdd.ts";
import { GiteaClient } from "../mod.ts";
import { assertNotEquals } from "std/assert/assert_not_equals.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { orgObj } from "./helpers.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const orgSuite = describe("organization");

it(orgSuite, "should create an organization", async () => {
  const organization = await gitea.orgs.create(orgObj());
  assertNotEquals(organization.id, null);
  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should get list of organizations", async () => {
  const organization = await gitea.orgs.create(orgObj());
  assertNotEquals(organization.id, null);

  const organizations = await gitea.orgs.list();

  assertNotEquals(organizations, null);
  assertNotEquals(organizations.length, 0);
  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should delete an organization", async () => {
  const organization = await gitea.orgs.create(orgObj());
  assertNotEquals(organization.id, null);

  const result = await gitea.orgs.delete(organization.name);
  assertEquals(result, true);
});

it(orgSuite, "should get an organization", async () => {
  const organization = await gitea.orgs.create(orgObj());
  assertNotEquals(organization.id, null);

  const retrievedOrg = await gitea.orgs.get(organization.name);

  assertEquals(retrievedOrg.id, organization.id);
  assertEquals(retrievedOrg.name, organization.name);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should edit an organization", async () => {
  // Create a new organization
  const organization = await gitea.orgs.create(orgObj());

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
  const organization = await gitea.orgs.create(orgObj());

  assertNotEquals(organization.id, null);
  await gitea.orgs.createOrUpdateSecret(
    organization.name,
    "API_KEY",
    crypto.randomUUID().toString(),
  );

  const secrets = await gitea.orgs.listSecrets(organization.name);

  assertNotEquals(secrets, null);
  assertNotEquals(secrets.length, 0);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should create or update an organization secret", async () => {
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

  const secretKey = "TEST_SECRET";
  const secretValue = "initial_value";
  const updatedSecretValue = "updated_value";

  await gitea.orgs.createOrUpdateSecret(
    organization.name,
    secretKey,
    secretValue,
  );

  const secrets = await gitea.orgs.listSecrets(organization.name);
  const secretExist = secrets.some((secret) => secret.name === secretKey);
  assertEquals(secretExist, true);

  const result = await gitea.orgs.createOrUpdateSecret(
    organization.name,
    secretKey,
    updatedSecretValue,
  );

  assertEquals(result, true);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should delete a secret from an organization", async () => {
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

  const secretKey = "TEST_SECRET";
  const secretValue = "initial_value";

  // Create a new secret
  await gitea.orgs.createOrUpdateSecret(
    organization.name,
    secretKey,
    secretValue,
  );

  // Delete the secret
  const result = await gitea.orgs.deleteSecret(organization.name, secretKey);
  assertEquals(result, true);

  // Check if the secret exists
  const secrets = await gitea.orgs.listSecrets(organization.name);
  const secretExist = secrets.some((secret) => secret.name === secretKey);

  // It should not exist anymore
  assertEquals(secretExist, false);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should update organization avatar", async () => {
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

  const avatarData: string =
    "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM+SURBVFiFrddbiJVVFAfw38xkzWQOGllSllFG+KBUdIGosKKIbnQBQ4peood8GkoiiigIgi5gERRFEAq9dDG7kpQUQRlR4pRFYRe0sKKSJrOLznh62PvjrLPnmzPndOYPB87ea/3X+u/v23vt9fXpHEO4DOfjNJyAuejH79iBT/EOXs1zM4J5eBBjaHT4+xtrsaSXxAO4DbtrEoxhG97C6xjFLzV++7EGh3abfFh6jDHYj3gAZ0uPvQ7LcBe2F9xtOKnT5AszoSL/gbsxu4sFzMIt+CnE+RmnTkecjS2B9BVO7iJxiQXYXIhYPJVzH54Pzu9LG7BXDOKFEHdrnpuEG4LTt5g/A8krDOGjEP/e0uEQfJeN+6TNFLEQt2aR/xfH4DfNfXVkNI4EdY8XxPnYGexn9SBidYjzSDR8mSf34qiC9JTWI7WuBwGD+F6zlgzC0hB8fQ0prr6qckf0IOKhEOvyfiwPxg01hLnFeBCX9CDglfB/OTwZFB1fQ/hE6xPYUSOqGwxIG72Bjf1YlA1VuS3xXDG+UW833YRUIWFRP+bkwW78W0N4ArvC+IIekleoBAyT7u+GdEanwtWar2AfLu5RwGiOtRNeyoMJHNSG9GgQsQdn1vgMSEVrOvya44zCwyFwWQHL4G8E3724SbpDKqyTFrIep08RZxgHcowXYWUIumoa5UN4Weup2IxrcE8x38i+BxcxVgT7naTKN54n3ptGAOk1PV2TrO43gcMK/rPBfkY1+XaeOCBVxk6wUjq27QR8UHCOxV/Ztl14fVcG0msdCiA1MCNSN1wm3yp1zhHPBPtINPThs2A8rgsRFZbhZunavtTkvvFC6ZU08IOaRvWbbNyldWfPBE7U7AUauLZ0WByMa2c4+RJ8HeKvqXNaFRyuL2ztitN0uEK6N6rYG6V6MgkbNE/BAql9Xi0Vnj/xpu46oaVai1ZDuobn1DnP0vzs2q9ZJut+H+N2nIPDM38AR0ul+Q58qLnZqkXdb+qPGee2SThuckdUFprxNvbPdXB73leQvsBjuEqz8bhIeoT/tEkWRW3Cde1WXaFPuhD2ZNImrXd/iWGch1OkozVP2qRjUls/inelD9WO8B897EmFdhzbrAAAAABJRU5ErkJggg==";
  const result = await gitea.orgs.updateAvatar(organization.name, avatarData);

  assertEquals(result, true);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should delete an organization's avatar", async () => {
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

  // Set up an avatar for the organization
  const avatarData: string =
    "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM+SURBVFiFrddbiJVVFAfw38xkzWQOGllSllFG+KBUdIGosKKIbnQBQ4peood8GkoiiigIgi5gERRFEAq9dDG7kpQUQRlR4pRFYRe0sKKSJrOLznh62PvjrLPnmzPndOYPB87ea/3X+u/v23vt9fXpHEO4DOfjNJyAuejH79iBT/EOXs1zM4J5eBBjaHT4+xtrsaSXxAO4DbtrEoxhG97C6xjFLzV++7EGh3abfFh6jDHYj3gAZ0uPvQ7LcBe2F9xtOKnT5AszoSL/gbsxu4sFzMIt+CnE+RmnTkecjS2B9BVO7iJxiQXYXIhYPJVzH54Pzu9LG7BXDOKFEHdrnpuEG4LTt5g/A8krDOGjEP/e0uEQfJeN+6TNFLEQt2aR/xfH4DfNfXVkNI4EdY8XxPnYGexn9SBidYjzSDR8mSf34qiC9JTWI7WuBwGD+F6zlgzC0hB8fQ0prr6qckf0IOKhEOvyfiwPxg01hLnFeBCX9CDglfB/OTwZFB1fQ/hE6xPYUSOqGwxIG72Bjf1YlA1VuS3xXDG+UW833YRUIWFRP+bkwW78W0N4ArvC+IIekleoBAyT7u+GdEanwtWar2AfLu5RwGiOtRNeyoMJHNSG9GgQsQdn1vgMSEVrOvya44zCwyFwWQHL4G8E3724SbpDKqyTFrIep08RZxgHcowXYWUIumoa5UN4Weup2IxrcE8x38i+BxcxVgT7naTKN54n3ptGAOk1PV2TrO43gcMK/rPBfkY1+XaeOCBVxk6wUjq27QR8UHCOxV/Ztl14fVcG0msdCiA1MCNSN1wm3yp1zhHPBPtINPThs2A8rgsRFZbhZunavtTkvvFC6ZU08IOaRvWbbNyldWfPBE7U7AUauLZ0WByMa2c4+RJ8HeKvqXNaFRyuL2ztitN0uEK6N6rYG6V6MgkbNE/BAql9Xi0Vnj/xpu46oaVai1ZDuobn1DnP0vzs2q9ZJut+H+N2nIPDM38AR0ul+Q58qLnZqkXdb+qPGee2SThuckdUFprxNvbPdXB73leQvsBjuEqz8bhIeoT/tEkWRW3Cde1WXaFPuhD2ZNImrXd/iWGch1OkozVP2qRjUls/inelD9WO8B897EmFdhzbrAAAAABJRU5ErkJggg==";
  const setAvatarResult = await gitea.orgs.updateAvatar(
    organization.name,
    avatarData,
  );

  assertEquals(setAvatarResult, true);

  // Delete the avatar
  const deleteAvatarResult = await gitea.orgs.deleteAvatar(organization.name);

  assertEquals(deleteAvatarResult, true);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should list an organization's webhooks", async () => {
  const organization = await gitea.orgs.create(orgObj());

  assertNotEquals(organization.id, null);

  const webhooks = await gitea.orgs.listHooks(organization.name);

  assertNotEquals(webhooks, null);
  assertEquals(webhooks.length, 0);

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should create a hook for an organization", async () => {
  const organization = await gitea.orgs.create(orgObj());

  assertNotEquals(organization.id, null);
  const hook = await gitea.orgs.createHook(organization.name, {
    active: false,
    authorization_header: "",
    branch_filter: "main",
    config: {
      url: "http://someurl.com/hook",
      content_type: "json",
    },
    events: ["push"],
    type: "gitea",
  });

  assertNotEquals(hook, null);
  assertEquals(hook.type, "gitea");

  await gitea.orgs.delete(organization.name);
});

it(orgSuite, "should get a hook of an organization", async () => {
  const org = await gitea.orgs.create(orgObj());

  assertNotEquals(org.id, null);

  const hook = await gitea.orgs.createHook(org.name, {
    active: false,
    authorization_header: "",
    branch_filter: "main",
    config: {
      url: "http://someurl.com/hook",
      content_type: "json",
    },
    events: ["push"],
    type: "gitea",
  });

  assertNotEquals(hook, null);

  const retrievedHook = await gitea.orgs.getHook(org.name, hook.id);

  assertEquals(retrievedHook.id, hook.id);

  await gitea.orgs.delete(org.name);
});

it(orgSuite, "should delete a hook of an organization", async () => {
  const org = await gitea.orgs.create(orgObj());

  assertNotEquals(org.id, null);

  const hook = await gitea.orgs.createHook(org.name, {
    active: false,
    authorization_header: "",
    branch_filter: "main",
    config: {
      url: "http://someurl.com/hook",
      content_type: "json",
    },
    events: ["push"],
    type: "gitea",
  });

  assertNotEquals(hook, null);

  const deleteHookResult = await gitea.orgs.deleteHook(org.name, hook.id);

  assertEquals(deleteHookResult, true);

  await gitea.orgs.delete(org.name);
});

it(orgSuite, "should update a hook of an organization", async () => {
  const org = await gitea.orgs.create(orgObj());

  assertNotEquals(org.id, null);

  const initialHook = await gitea.orgs.createHook(org.name, {
    active: false,
    authorization_header: "",
    branch_filter: "main",
    config: {
      url: "http://someurl.com/hook",
      content_type: "json",
    },
    events: ["push"],
    type: "gitea",
  });

  assertNotEquals(initialHook, null);

  const updatedHook = await gitea.orgs.editHook(org.name, initialHook.id, {
    active: true,
    branch_filter: "feature/*",
    config: {
      url: "http://updatedurl.com/hook",
    },
  });

  assertEquals(updatedHook.active, true);
  assertEquals(updatedHook.config.url, "http://updatedurl.com/hook");
  assertEquals(updatedHook.branch_filter, "feature/*");

  await gitea.orgs.delete(org.name);
});
