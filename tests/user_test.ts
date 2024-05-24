import {GiteaClient} from "../mod.ts";
import {assertEquals} from "std/assert/assert_equals.ts";
import {assertNotEquals} from "std/assert/assert_not_equals.ts";
import {assert} from "std/assert/assert.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

Deno.test("test create user", async () => {
    const user = await gitea.users.create({
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
    await user.delete();
});

Deno.test("test list users", async () => {
    const user = await gitea.users.create({
        username: "johndoe",
        email: "john@example.com",
        password: "s3cr3t0125"
    });

    const users = await gitea.users.list();
    assert(users.length > 1);
    await user.delete();
});

Deno.test("test delete user", async () => {
    const user = await gitea.users.create({
        username: "johndoe",
        email: "john@example.com",
        password: "s3cr3t0125"
    });

    const listBefore = await gitea.users.list();
    await user.delete();
    const listAfter = await gitea.users.list();

    assert(listBefore.length > listAfter.length);
});

Deno.test("test rename user", async () => {
    const user = await gitea.users.create({
      email: "john@example.com",
      password: "s3cr3t0125",
      username: "johndoe"
    });

    await user.rename("doejohn");
    assertEquals(user.username, "doejohn");
    await user.delete();
});