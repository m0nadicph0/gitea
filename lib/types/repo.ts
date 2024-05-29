
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