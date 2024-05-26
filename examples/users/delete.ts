import { GiteaClient } from "../../mod.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const users = await gitea.admin.listUsers();

users.forEach(async (user) => {
  if (user.email !== "admin@edge.ca") {
    console.log(`Deleting ${user.username} - ${user.email}`);
    await gitea.admin.deleteUser(user.username);
  }
});
