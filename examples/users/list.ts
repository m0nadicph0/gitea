import {GiteaClient} from "../../mod.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!)

const users = await gitea.users.list();

users.forEach(async (user) => {
    if (user.email !== 'admin@edge.ca') {
        console.log(`Deleting ${user.username} - ${user.email}`);
        await user.delete();
    }
});