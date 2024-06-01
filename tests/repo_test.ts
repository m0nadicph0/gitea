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

it(teamSuite, "should get a repository by owner and repo name", async () => {
  // First create a repository to test with
  const createdResponse = await gitea.repos.create({
    auto_init: false,
    default_branch: "main",
    description: "repo for retrieval by owner and repo name",
    name: "ownerRepoTest",
    private: false,
    template: false,
    trust_model: "default",
  });

  // Get the repository by owner username and repo name
  const response = await gitea.repos.getByOwner(
    createdResponse.owner.username,
    createdResponse.name,
  );

  // Assert that the retrieved repo name matches the one created
  assertEquals(response.name, "ownerRepoTest");
  // Assert that the retrieved repo description matches the one created
  assertEquals(
    response.description,
    "repo for retrieval by owner and repo name",
  );

  // Cleanup: delete the repository created for this test
  await gitea.repos.delete(
    createdResponse.owner.username,
    createdResponse.name,
  );
});

it(teamSuite, "should delete a repository by owner and repo name", async () => {
    const repository = await gitea.repos.create({
        auto_init: false,
        default_branch: "main",
        description: "repo for deletion test",
        name: "deleteRepoTest",
        private: false,
        template: false,
        trust_model: "default",
    });

    const result = await gitea.repos.delete(
        repository.owner.username,
        repository.name,
    );

    assertEquals(result, true);
});