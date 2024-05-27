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