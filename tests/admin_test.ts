import {GiteaClient} from "../mod.ts";
import {assertEquals} from "std/assert/assert_equals.ts";
import {assertNotEquals} from "std/assert/assert_not_equals.ts";
import {assert} from "std/assert/assert.ts";
import {describe, it} from "std/testing/bdd.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const admin = describe("admin");


it(admin, 'should create user', async () => {
    const user = await gitea.admin.createUser({
        full_name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
        password: "password123",
        login_name: "johndoe",
        must_change_password: false,
        restricted: false,
        visibility: "public"
    })

    assertNotEquals(user.id, null);
    assertEquals(user.email, "john@example.com");
    assertEquals(user.username, "johndoe");
    await gitea.admin.deleteUser(user.username);
});

it(admin, 'should list users', async () => {
    const user = await gitea.admin.createUser({
        username: "johndoe",
        email: "john@example.com",
        password: "s3cr3t0125"
    });

    const users = await gitea.admin.listUsers();
    assert(users.length > 1);
    await gitea.admin.deleteUser(user.username);
});

it(admin, 'should should delete users', async () => {
    const user = await gitea.admin.createUser({
        username: "johndoe",
        email: "john@example.com",
        password: "s3cr3t0125"
    });

    const listBefore = await gitea.admin.listUsers();
    await gitea.admin.deleteUser(user.username);
    const listAfter = await gitea.admin.listUsers();

    assert(listBefore.length > listAfter.length);
});

it(admin, 'should rename users', async () => {
    const user = await gitea.admin.createUser({
        email: "john@example.com",
        password: "s3cr3t0125",
        username: "johndoe"
    });

    const result = await gitea.admin.renameUser(user.username, "doejohn");
    assertEquals(result, true);
    await gitea.admin.deleteUser(user.username);
});

