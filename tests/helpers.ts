export function orgObj() {
  return {
    description: "A community for quantum computing enthusiasts.",
    email: "contact@quantum-leap.org",
    full_name: "Quantum Leap",
    location: "San Francisco, CA",
    repo_admin_change_team_access: true,
    username: "quantum-leap",
    visibility: "public",
    website: "https://quantum-leap.org",
  };
}

export function teamObj() {
  return {
    name: "list-members-test",
    description: "Team for listing members test",
    permission: "read",
    units: ["repo.code", "repo.issues"],
    can_create_org_repo: false,
    includes_all_repositories: false,
  };
}
