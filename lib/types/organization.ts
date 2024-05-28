import { TeamApi } from "../team.ts";
import { User } from "./admin.ts";

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

export interface RepoTransfer {
  doer: User;
  recipient: User;
  teams: Team[];
}

export interface Permission {
  admin: boolean;
  pull: boolean;
  push: boolean;
}

export interface InternalTracker {
  allow_only_contributors_to_track_time: boolean;
  enable_issue_dependencies: boolean;
  enable_time_tracker: boolean;
}

export interface ExternalTracker {
  external_tracker_format: string;
  external_tracker_regexp_pattern: string;
  external_tracker_style: string;
  external_tracker_url: string;
}

export interface ExternalWiki {
  external_wiki_url: string;
}

export interface Repository {
  allow_merge_commits: boolean;
  allow_rebase: boolean;
  allow_rebase_explicit: boolean;
  allow_rebase_update: boolean;
  allow_squash_merge: boolean;
  archived: boolean;
  archived_at: string;
  avatar_url: string;
  clone_url: string;
  created_at: string;
  default_allow_maintainer_edit: boolean;
  default_branch: string;
  default_delete_branch_after_merge: boolean;
  default_merge_style: string;
  description: string;
  empty: boolean;
  external_tracker: ExternalTracker;
  external_wiki: ExternalWiki;
  fork: boolean;
  forks_count: number;
  full_name: string;
  has_actions: boolean;
  has_issues: boolean;
  has_packages: boolean;
  has_projects: boolean;
  has_pull_requests: boolean;
  has_releases: boolean;
  has_wiki: boolean;
  html_url: string;
  id: number;
  ignore_whitespace_conflicts: boolean;
  internal: boolean;
  internal_tracker: InternalTracker;
  language: string;
  languages_url: string;
  link: string;
  mirror: boolean;
  mirror_interval: string;
  mirror_updated: string;
  name: string;
  open_issues_count: number;
  open_pr_counter: number;
  original_url: string;
  owner: User;
  parent: string;
  permissions: Permission;
  private: boolean;
  release_counter: number;
  repo_transfer: RepoTransfer;
  size: number;
  ssh_url: string;
  stars_count: number;
  template: boolean;
  updated_at: string;
  url: string;
  watchers_count: number;
  website: string;
}
