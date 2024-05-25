import { Organization } from "../../lib/types/organization.ts";

async function listOrganizations(): Promise<Organization[]> {
  const token = Deno.env.get("TOKEN");
  const url = `http://localhost:3000/api/v1/orgs?access_token=${token}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch organizations: status=${response.status}`);
  }

  return await response.json() as Organization[];
}

const orgs = await listOrganizations();

orgs.forEach((org) => {
  console.log(`${org.full_name} - ${org.username}`);
});
