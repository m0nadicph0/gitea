import { GiteaClient } from "../../mod.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const orgs = await gitea.orgs.list();

orgs.forEach(async (org) => {
  console.log(`Deleting organization: ${org.username}`);
  await gitea.orgs.delete(org.username);
});
