import { Organization } from "../../lib/types/organization.ts";


async function createOrganization(organization: Organization): Promise<Organization> {
    const token = Deno.env.get("TOKEN");
    const url = `http://localhost:3000/api/v1/orgs?token=${token}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        },
        body: JSON.stringify(organization)
    })

    return await response.json() as Organization;
}

const orgs: Organization[] = [
    {
        "description": "A community for quantum computing enthusiasts.",
        "email": "contact@quantum-leap.org",
        "full_name": "Quantum Leap",
        "location": "San Francisco, CA",
        "repo_admin_change_team_access": true,
        "username": "quantum-leap",
        "visibility": "public",
        "website": "https://quantum-leap.org"
    },
    {
        "description": "Connecting coders through innovative projects.",
        "email": "support@code-nexus.dev",
        "full_name": "Code Nexus",
        "location": "New York, NY",
        "repo_admin_change_team_access": true,
        "username": "code-nexus",
        "visibility": "public",
        "website": "https://code-nexus.dev"
    },
    {
        "description": "Exploring the future of technology.",
        "email": "info@tech-horizon.io",
        "full_name": "Tech Horizon",
        "location": "Austin, TX",
        "repo_admin_change_team_access": true,
        "username": "tech-horizon",
        "visibility": "public",
        "website": "https://tech-horizon.io"
    },
    {
        "description": "Forging the path in cyber innovations.",
        "email": "admin@cyberforge.net",
        "full_name": "Cyber Forge",
        "location": "Seattle, WA",
        "repo_admin_change_team_access": true,
        "username": "cyberforge",
        "visibility": "public",
        "website": "https://cyberforge.net"
    },
    {
        "description": "Nanotechnology projects and research.",
        "email": "contact@nano-matrix.tech",
        "full_name": "Nano Matrix",
        "location": "Palo Alto, CA",
        "repo_admin_change_team_access": true,
        "username": "nano-matrix",
        "visibility": "public",
        "website": "https://nano-matrix.tech"
    },
    {
        "description": "Streaming data solutions for the modern age.",
        "email": "info@byte-stream.org",
        "full_name": "Byte Stream",
        "location": "Boston, MA",
        "repo_admin_change_team_access": true,
        "username": "byte-stream",
        "visibility": "public",
        "website": "https://byte-stream.org"
    },
    {
        "description": "Innovations in artificial intelligence.",
        "email": "team@ai-lab.io",
        "full_name": "AI Lab",
        "location": "Los Angeles, CA",
        "repo_admin_change_team_access": true,
        "username": "ai-lab",
        "visibility": "public",
        "website": "https://ai-lab.io"
    },
    {
        "description": "Synergizing deep learning and AI.",
        "email": "contact@deep-synergy.com",
        "full_name": "Deep Synergy",
        "location": "Chicago, IL",
        "repo_admin_change_team_access": true,
        "username": "deep-synergy",
        "visibility": "public",
        "website": "https://deep-synergy.com"
    },
    {
        "description": "Wizards of cloud computing.",
        "email": "support@cloud-wizards.net",
        "full_name": "Cloud Wizards",
        "location": "Denver, CO",
        "repo_admin_change_team_access": true,
        "username": "cloud-wizards",
        "visibility": "public",
        "website": "https://cloud-wizards.net"
    },
    {
        "description": "Broadening the spectrum of data analysis.",
        "email": "admin@data-spectrum.org",
        "full_name": "Data Spectrum",
        "location": "Houston, TX",
        "repo_admin_change_team_access": true,
        "username": "data-spectrum",
        "visibility": "public",
        "website": "https://data-spectrum.org"
    },
    {
        "description": "Catalysts for development and innovation.",
        "email": "info@dev-catalyst.dev",
        "full_name": "Dev Catalyst",
        "location": "Atlanta, GA",
        "repo_admin_change_team_access": true,
        "username": "dev-catalyst",
        "visibility": "public",
        "website": "https://dev-catalyst.dev"
    },
    {
        "description": "Nodes of logic and computation.",
        "email": "contact@logic-node.com",
        "full_name": "Logic Node",
        "location": "Portland, OR",
        "repo_admin_change_team_access": true,
        "username": "logic-node",
        "visibility": "public",
        "website": "https://logic-node.com"
    },
    {
        "description": "Coders specializing in quantum technologies.",
        "email": "team@quantum-coders.io",
        "full_name": "Quantum Coders",
        "location": "San Diego, CA",
        "repo_admin_change_team_access": true,
        "username": "quantum-coders",
        "visibility": "public",
        "website": "https://quantum-coders.io"
    },
    {
        "description": "Crafting bytes for the future.",
        "email": "support@bytecraft.dev",
        "full_name": "Bytecraft",
        "location": "Salt Lake City, UT",
        "repo_admin_change_team_access": true,
        "username": "bytecraft",
        "visibility": "public",
        "website": "https://bytecraft.dev"
    },
    {
        "description": "Fusion of networking and innovation.",
        "email": "admin@net-fusion.tech",
        "full_name": "Net Fusion",
        "location": "Dallas, TX",
        "repo_admin_change_team_access": true,
        "username": "net-fusion",
        "visibility": "public",
        "website": "https://net-fusion.tech"
    },
    {
        "description": "Building a robust dev ecosystem.",
        "email": "info@dev-ecosystem.org",
        "full_name": "Dev Ecosystem",
        "location": "Philadelphia, PA",
        "repo_admin_change_team_access": true,
        "username": "dev-ecosystem",
        "visibility": "public",
        "website": "https://dev-ecosystem.org"
    },
    {
        "description": "Gigantic leaps in tech innovation.",
        "email": "contact@giga-labs.net",
        "full_name": "Giga Labs",
        "location": "Miami, FL",
        "repo_admin_change_team_access": true,
        "username": "giga-labs",
        "visibility": "public",
        "website": "https://giga-labs.net"
    },
    {
        "description": "A haven for AI research and development.",
        "email": "team@ai-haven.org",
        "full_name": "AI Haven",
        "location": "Phoenix, AZ",
        "repo_admin_change_team_access": true,
        "username": "ai-haven",
        "visibility": "public",
        "website": "https://ai-haven.org"
    },
    {
        "description": "Innovative solutions for the matrix.",
        "email": "support@matrix-inno.tech",
        "full_name": "Matrix Inno",
        "location": "Las Vegas, NV",
        "repo_admin_change_team_access": true,
        "username": "matrix-inno",
        "visibility": "public",
        "website": "https://matrix-inno.tech"
    },
    {
        "description": "Innovating the world of code.",
        "email": "admin@code-innovate.dev",
        "full_name": "Code Innovate",
        "location": "San Jose, CA",
        "repo_admin_change_team_access": true,
        "username": "code-innovate",
        "visibility": "public",
        "website": "https://code-innovate.dev"
    }
];

orgs.forEach(async (org) => {
    const response = await createOrganization(org);
    console.log(response);
})


