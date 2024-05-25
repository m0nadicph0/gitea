export interface CreateUserRequest {
  email: string;
  full_name?: string;
  login_name?: string;
  must_change_password?: boolean;
  password: string;
  restricted?: boolean;
  username: string;
  visibility?: string;
}

export interface CreateUserResponse {
  id: number;
  login: string;
  login_name: string;
  full_name: string;
  email: string;
  avatar_url: string;
  language: string;
  is_admin: boolean;
  last_login: string;
  created: string;
  restricted: boolean;
  active: boolean;
  prohibit_login: boolean;
  location: string;
  website: string;
  description: string;
  visibility: string;
  followers_count: number;
  following_count: number;
  starred_repos_count: number;
  username: string;
}

export interface UserListItem {
  id: number;
  login: string;
  login_name: string;
  full_name: string;
  email: string;
  avatar_url: string;
  language: string;
  is_admin: boolean;
  last_login: string;
  created: string;
  restricted: boolean;
  active: boolean;
  prohibit_login: boolean;
  location: string;
  website: string;
  description: string;
  visibility: string;
  followers_count: number;
  following_count: number;
  starred_repos_count: number;
  username: string;
}

export interface OrganizationListItem {
  id: number;
  name: string;
  full_name: string;
  email: string;
  avatar_url: string;
  description: string;
  website: string;
  location: string;
  visibility: string;
  repo_admin_change_team_access: boolean;
  username: string;
}

export interface EmailListItem {
  email: string;
  verified: boolean;
  primary: boolean;
  user_id: number;
  username: string;
}

export interface CreateHookRequest {
  active: boolean;
  authorization_header: string;
  branch_filter: string;
  config: Record<string, number|string>;
  events: string[];
  type: string;
}

export interface CreateHookResponse {
  active: boolean;
  authorization_header: string;
  branch_filter: string;
  config: Record<string | number | symbol, never>;
  created_at: string;
  events: string[];
  id: number;
  type: string;
  updated_at: string;
}

export interface HookListItem {
  id: number;
  type: string;
  branch_filter: string;
  config: {
    content_type: string;
    url: string;
  };
  events: string[];
  authorization_header: string;
  active: boolean;
  updated_at: string;
  created_at: string;
}