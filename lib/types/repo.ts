export interface CreateRepoOption {
  auto_init: boolean;
  default_branch: string;
  description: string;
  gitignores?: string;
  issue_labels?: string;
  license?: string;
  name: string;
  private: boolean;
  readme?: string;
  template: boolean;
  trust_model: string;
}

export interface EditRepoOption {
  allow_manual_merge?: boolean;
  allow_merge_commits?: boolean;
  allow_rebase?: boolean;
  allow_rebase_explicit?: boolean;
  allow_rebase_update?: boolean;
  allow_squash_merge?: boolean;
  archived?: boolean;
  autodetect_manual_merge?: boolean;
  default_allow_maintainer_edit?: boolean;
  default_branch?: string;
  default_delete_branch_after_merge?: boolean;
  default_merge_style?: string;
  description?: string;
  enable_prune?: boolean;
  external_tracker?: {
    external_tracker_format?: string;
    external_tracker_regexp_pattern?: string;
    external_tracker_style?: string;
    external_tracker_url?: string;
  };
  external_wiki?: {
    external_wiki_url?: string;
  };
  has_actions?: boolean;
  has_issues?: boolean;
  has_packages?: boolean;
  has_projects?: boolean;
  has_pull_requests?: boolean;
  has_releases?: boolean;
  has_wiki?: boolean;
  ignore_whitespace_conflicts?: boolean;
  internal_tracker?: {
    allow_only_contributors_to_track_time?: boolean;
    enable_issue_dependencies?: boolean;
    enable_time_tracker?: boolean;
  };
  mirror_interval?: string;
  name?: string;
  private?: boolean;
  template?: boolean;
  website?: string;
}

export interface CreateOrUpdateSecretOption {
  data: string;
}
