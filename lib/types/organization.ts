export interface Organization {
  description: string;
  email: string;
  full_name: string;
  location: string;
  repo_admin_change_team_access: boolean;
  username: string;
  visibility: string;
  website: string;
}

export interface CreateOrUpdateSecretOption {
  data: string;
}

export interface Secret {
  name: string;
  created_at: string;
}

export interface Label {
  id: number;
  name: string;
  exclusive: boolean;
  is_archived: boolean;
  color: string;
  description: string;
  url: string;
}

export interface CreateLabelOption {
  name: string;
  color: string;
  description?: string;
  exclusive?: boolean;
  is_archived?: boolean;
}

export interface EditLabelOption {
  name?: string;
  description?: string;
  exclusive?: boolean;
  is_archived?: boolean;
  color?: string;
}

export interface CreateTeamOption {
  can_create_org_repo: boolean;
  description: string;
  includes_all_repositories: boolean;
  name: string;
  permission: string;
  units: string[];
  units_map?: Record<string, string>;
}

export interface EditTeamOption {
  can_create_org_repo?: boolean;
  description?: string;
  includes_all_repositories?: boolean;
  name?: string;
  permission?: string;
  units?: string[];
  units_map?: Record<string, string>;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  organization: Organization;
  includes_all_repositories: boolean;
  permission: string;
  units: string[];
  units_map: Record<string, string>;
  can_create_org_repo: boolean;
}
