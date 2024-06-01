import { describe, it } from "std/testing/bdd.ts";
import { GiteaClient } from "../mod.ts";
import { assertEquals } from "std/assert/assert_equals.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const teamSuite = describe("repo");

it(teamSuite, "should create a repository", async () => {
  const response = await gitea.repos.create({
    auto_init: false,
    default_branch: "main",
    description: "my repo description",
    name: "myrepo",
    private: false,
    template: false,
    trust_model: "default",
  });

  assertEquals(response.name, "myrepo");
  assertEquals(response.description, "my repo description");

  await gitea.repos.delete(response.owner.username, response.name);
});

it(teamSuite, "should get a repository by id", async () => {
  const createdResponse = await gitea.repos.create({
    auto_init: false,
    default_branch: "main",
    description: "repo for retrieval test",
    name: "testrepo",
    private: false,
    template: false,
    trust_model: "default",
  });

  const response = await gitea.repos.get(createdResponse.id);

  assertEquals(response.name, "testrepo");
  assertEquals(response.description, "repo for retrieval test");

  await gitea.repos.delete(response.owner.username, response.name);
});
