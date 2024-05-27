## TODOs

## activitypub

- [ ] `GET /activitypub/user-id/{user-id}` Returns the Person actor for a user
- [ ] `POST /activitypub/user-id/{user-id}/inbox` Send to the inbox

## admin

- [x] `GET /admin/cron` List cron tasks
- [x] `POST /admin/cron/{task}` Run cron task
- [x] `GET /admin/emails` List all emails
- [x] `GET /admin/emails/search` Search all emails
- [x] `GET /admin/hooks` List system's webhooks
- [x] `POST /admin/hooks` Create a hook
- [x] `GET /admin/hooks/{id}` Get a hook
- [x] `DELETE /admin/hooks/{id}` Delete a hook
- [x] `PATCH /admin/hooks/{id}` Update a hook
- [x] `GET /admin/orgs` List all organizations
- [x] `GET /admin/users` Search users according filter conditions
- [x] `POST /admin/users` Create a user
- [x] `DELETE /admin/users/{username}` Delete a user
- [ ] `PATCH /admin/users/{username}` Edit an existing user
- [x] `POST /admin/users/{username}/keys` Add a public key on behalf of a user
- [x] `DELETE /admin/users/{username}/keys/{id}` Delete a user's public key
- [x] `POST /admin/users/{username}/orgs` Create an organization
- [x] `POST /admin/users/{username}/rename` Rename a user
- [ ] `GET /admin/unadopted` List un-adopted repositories
- [ ] `POST /admin/unadopted/{owner}/{repo}` Adopt un-adopted files as a
      repository
- [ ] `DELETE /admin/unadopted/{owner}/{repo}` Delete un-adopted files

## miscellaneous

- [ ] `GET /gitignore/templates` Returns a list of all gitignore templates
- [ ] `GET /gitignore/templates/{name}` Returns information about a gitignore
      template
- [ ] `GET /label/templates` Returns a list of all label templates
- [ ] `GET /label/templates/{name}` Returns all labels in a template
- [ ] `GET /licenses` Returns a list of all license templates
- [ ] `GET /licenses/{name}` Returns information about a license template
- [ ] `POST /markdown` Render a markdown document as HTML
- [ ] `POST /markdown/raw` Render raw markdown as HTML
- [ ] `POST /markup` Render a markup document as HTML
- [ ] `GET /nodeinfo` Returns the nodeinfo of the Gitea application
- [ ] `GET /signing-key.gpg` Get default signing-key.gpg
- [ ] `GET /version` Returns the version of the Gitea application

## notifications

- [ ] `GET /notifications` List users's notification threads
- [ ] `PUT /notifications` Mark notification threads as read, pinned or unread
- [ ] `GET /notifications/new` Check if unread notifications exist
- [ ] `GET /notifications/threads/{id}` Get notification thread by ID
- [ ] `PATCH /notifications/threads/{id}` Mark notification thread as read by ID
- [ ] `GET /repos/{owner}/{repo}/notifications` List users's notification
      threads on a specific repo
- [ ] `PUT /repos/{owner}/{repo}/notifications` Mark notification threads as
      read, pinned or unread on a specific repo

## organization

- [x] `GET /orgs` Get list of organizations
- [x] `POST /orgs` Create an organization
- [x] `GET /orgs/{org}` Get an organization
- [x] `DELETE /orgs/{org}` Delete an organization
- [x] `PATCH /orgs/{org}` Edit an organization
- [x] `GET /orgs/{org}/actions/secrets` List an organization's actions secrets
- [x] `PUT /orgs/{org}/actions/secrets/{secretname}` Create or Update a secret
      value in an organization
- [x] `DELETE /orgs/{org}/actions/secrets/{secretname}` Delete a secret in an
      organization
- [x] `POST /orgs/{org}/avatar` Update Avatar
- [x] `DELETE /orgs/{org}/avatar` Delete Avatar
- [x] `GET /orgs/{org}/hooks` List an organization's webhooks
- [x] `POST /orgs/{org}/hooks` Create a hook
- [x] `GET /orgs/{org}/hooks/{id}` Get a hook
- [x] `DELETE /orgs/{org}/hooks/{id}` Delete a hook
- [x] `PATCH /orgs/{org}/hooks/{id}` Update a hook
- [ ] `GET /orgs/{org}/labels` List an organization's labels
- [ ] `POST /orgs/{org}/labels` Create a label for an organization
- [ ] `GET /orgs/{org}/labels/{id}` Get a single label
- [ ] `DELETE /orgs/{org}/labels/{id}` Delete a label
- [ ] `PATCH /orgs/{org}/labels/{id}` Update a label
- [ ] `GET /orgs/{org}/members` List an organization's members
- [ ] `GET /orgs/{org}/members/{username}` Check if a user is a member of an
      organization
- [ ] `DELETE /orgs/{org}/members/{username}` Remove a member from an
      organization
- [ ] `GET /orgs/{org}/public_members` List an organization's public members
- [ ] `GET /orgs/{org}/public_members/{username}` Check if a user is a public
      member of an organization
- [ ] `PUT /orgs/{org}/public_members/{username}` Publicize a user's membership
- [ ] `DELETE /orgs/{org}/public_members/{username}` Conceal a user's membership
- [ ] `GET /orgs/{org}/repos` List an organization's repos
- [ ] `POST /orgs/{org}/repos` Create a repository in an organization
- [ ] `GET /orgs/{org}/teams` List an organization's teams
- [ ] `POST /orgs/{org}/teams` Create a team
- [ ] `GET /orgs/{org}/teams/search` Search for teams within an organization
- [ ] `GET /teams/{id}` Get a team
- [ ] `DELETE /teams/{id}` Delete a team
- [ ] `PATCH /teams/{id}` Edit a team
- [ ] `GET /teams/{id}/activities/feeds` List a team's activity feeds
- [ ] `GET /teams/{id}/members` List a team's members
- [ ] `GET /teams/{id}/members/{username}` List a particular member of team
- [ ] `PUT /teams/{id}/members/{username}` Add a team member
- [ ] `DELETE /teams/{id}/members/{username}` Remove a team member
- [ ] `GET /teams/{id}/repos` List a team's repos
- [ ] `GET /teams/{id}/repos/{org}/{repo}` List a particular repo of team
- [ ] `PUT /teams/{id}/repos/{org}/{repo}` Add a repository to a team
- [ ] `DELETE /teams/{id}/repos/{org}/{repo}` Remove a repository from a team
- [ ] `GET /user/orgs` List the current user's organizations
- [ ] `GET /users/{username}/orgs` List a user's organizations
- [ ] `GET /users/{username}/orgs/{org}/permissions` Get user permissions in
      organization
- [ ] `GET /orgs/{org}/activities/feeds` List an organization's activity feeds

## package

- [ ] `GET /packages/{owner}` Gets all packages of an owner
- [ ] `GET /packages/{owner}/{type}/{name}/{version}` Gets a package
- [ ] `DELETE /packages/{owner}/{type}/{name}/{version}` Delete a package
- [ ] `GET /packages/{owner}/{type}/{name}/{version}/files` Gets all files of a
      package

## issue

- [ ] `GET /repos/issues/search` Search for issues across the repositories that
      the user has access to
- [ ] `GET /repos/{owner}/{repo}/issues` List a repository's issues
- [ ] `POST /repos/{owner}/{repo}/issues` Create an issue. If using deadline
      only the date will be taken into account, and time of day ignored.
- [ ] `GET /repos/{owner}/{repo}/issues/comments` List all comments in a
      repository
- [ ] `GET /repos/{owner}/{repo}/issues/comments/{id}` Get a comment
- [ ] `DELETE /repos/{owner}/{repo}/issues/comments/{id}` Delete a comment
- [ ] `PATCH /repos/{owner}/{repo}/issues/comments/{id}` Edit a comment
- [ ] `GET /repos/{owner}/{repo}/issues/comments/{id}/assets` List comment's
      attachments
- [ ] `POST /repos/{owner}/{repo}/issues/comments/{id}/assets` Create a comment
      attachment
- [ ] `GET /repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}`
      Get a comment attachment
- [ ] `DELETE /repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}`
      Delete a comment attachment
- [ ] `PATCH /repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}`
      Edit a comment attachment
- [ ] `GET /repos/{owner}/{repo}/issues/comments/{id}/reactions` Get a list of
      reactions from a comment of an issue
- [ ] `POST /repos/{owner}/{repo}/issues/comments/{id}/reactions` Add a reaction
      to a comment of an issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/comments/{id}/reactions` Remove a
      reaction from a comment of an issue
- [ ] `GET /repos/{owner}/{repo}/issues/{index}` Get an issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}` Delete an issue
- [ ] `PATCH /repos/{owner}/{repo}/issues/{index}` Edit an issue. If using
      deadline only the date will be taken into account, and time of day
      ignored.
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/assets` List issue's attachments
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/assets` Create an issue
      attachment
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}` Get an
      issue attachment
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}`
      Delete an issue attachment
- [ ] `PATCH /repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}` Edit
      an issue attachment
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/blocks` List issues that are
      blocked by this issue
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/blocks` Block the issue given
      in the body by the issue in path
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/blocks` Unblock the issue
      given in the body by the issue in path
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/comments` List all comments on
      an issue
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/comments` Add a comment to an
      issue
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/deadline` Set an issue
      deadline. If set to null, the deadline is deleted. If using deadline only
      the date will be taken into account, and time of day ignored.
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/dependencies` List an issue's
      dependencies, i.e all issues that block this issue.
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/dependencies` Make the issue in
      the url depend on the issue in the form.
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/dependencies` Remove an issue
      dependency
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/labels` Get an issue's labels
- [ ] `PUT /repos/{owner}/{repo}/issues/{index}/labels` Replace an issue's
      labels
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/labels` Add a label to an issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/labels` Remove all labels
      from an issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/labels/{id}` Remove a label
      from an issue
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/pin` Pin an Issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/pin` Unpin an Issue
- [ ] `PATCH /repos/{owner}/{repo}/issues/{index}/pin/{position}` Moves the Pin
      to the given Position
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/reactions` Get a list reactions
      of an issue
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/reactions` Add a reaction to an
      issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/reactions` Remove a reaction
      from an issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/stopwatch/delete` Delete an
      issue's existing stopwatch.
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/stopwatch/start` Start
      stopwatch on an issue.
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/stopwatch/stop` Stop an issue's
      existing stopwatch.
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/subscriptions` Get users who
      subscribed on an issue.
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/subscriptions/check` Check if
      user is subscribed to an issue
- [ ] `PUT /repos/{owner}/{repo}/issues/{index}/subscriptions/{user}` Subscribe
      user to issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/subscriptions/{user}`
      Unsubscribe user from issue
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/timeline` List all comments and
      events on an issue
- [ ] `GET /repos/{owner}/{repo}/issues/{index}/times` List an issue's tracked
      times
- [ ] `POST /repos/{owner}/{repo}/issues/{index}/times` Add tracked time to a
      issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/times` Reset a tracked time
      of an issue
- [ ] `DELETE /repos/{owner}/{repo}/issues/{index}/times/{id}` Delete specific
      tracked time
- [ ] `GET /repos/{owner}/{repo}/labels` Get all of a repository's labels
- [ ] `POST /repos/{owner}/{repo}/labels` Create a label
- [ ] `GET /repos/{owner}/{repo}/labels/{id}` Get a single label
- [ ] `DELETE /repos/{owner}/{repo}/labels/{id}` Delete a label
- [ ] `PATCH /repos/{owner}/{repo}/labels/{id}` Update a label
- [ ] `GET /repos/{owner}/{repo}/milestones` Get all of a repository's opened
      milestones
- [ ] `POST /repos/{owner}/{repo}/milestones` Create a milestone
- [ ] `GET /repos/{owner}/{repo}/milestones/{id}` Get a milestone
- [ ] `DELETE /repos/{owner}/{repo}/milestones/{id}` Delete a milestone
- [ ] `PATCH /repos/{owner}/{repo}/milestones/{id}` Update a milestone

## repository

- [ ] `POST /repos/migrate` Migrate a remote git repository
- [ ] `GET /repos/search` Search for repositories
- [ ] `GET /repos/{owner}/{repo}` Get a repository
- [ ] `DELETE /repos/{owner}/{repo}` Delete a repository
- [ ] `PATCH /repos/{owner}/{repo}` Edit a repository's properties. Only fields
      that are set will be changed.
- [ ] `PUT /repos/{owner}/{repo}/actions/secrets/{secretname}` Create or Update
      a secret value in a repository
- [ ] `DELETE /repos/{owner}/{repo}/actions/secrets/{secretname}` Delete a
      secret in a repository
- [ ] `GET /repos/{owner}/{repo}/activities/feeds` List a repository's activity
      feeds
- [ ] `GET /repos/{owner}/{repo}/archive/{archive}` Get an archive of a
      repository
- [ ] `GET /repos/{owner}/{repo}/assignees` Return all users that have write
      access and can be assigned to issues
- [ ] `POST /repos/{owner}/{repo}/avatar` Update avatar
- [ ] `DELETE /repos/{owner}/{repo}/avatar` Delete avatar
- [ ] `GET /repos/{owner}/{repo}/branch_protections` List branch protections for
      a repository
- [ ] `POST /repos/{owner}/{repo}/branch_protections` Create a branch
      protections for a repository
- [ ] `GET /repos/{owner}/{repo}/branch_protections/{name}` Get a specific
      branch protection for the repository
- [ ] `DELETE /repos/{owner}/{repo}/branch_protections/{name}` Delete a specific
      branch protection for the repository
- [ ] `PATCH /repos/{owner}/{repo}/branch_protections/{name}` Edit a branch
      protections for a repository. Only fields that are set will be changed
- [ ] `GET /repos/{owner}/{repo}/branches` List a repository's branches
- [ ] `POST /repos/{owner}/{repo}/branches` Create a branch
- [ ] `GET /repos/{owner}/{repo}/branches/{branch}` Retrieve a specific branch
      from a repository, including its effective branch protection
- [ ] `DELETE /repos/{owner}/{repo}/branches/{branch}` Delete a specific branch
      from a repository
- [ ] `GET /repos/{owner}/{repo}/collaborators` List a repository's
      collaborators
- [ ] `GET /repos/{owner}/{repo}/collaborators/{collaborator}` Check if a user
      is a collaborator of a repository
- [ ] `PUT /repos/{owner}/{repo}/collaborators/{collaborator}` Add a
      collaborator to a repository
- [ ] `DELETE /repos/{owner}/{repo}/collaborators/{collaborator}` Delete a
      collaborator from a repository
- [ ] `GET /repos/{owner}/{repo}/collaborators/{collaborator}/permission` Get
      repository permissions for a user
- [ ] `GET /repos/{owner}/{repo}/commits` Get a list of all commits from a
      repository
- [ ] `GET /repos/{owner}/{repo}/commits/{ref}/status` Get a commits combined
      status, by branch/tag/commit reference
- [ ] `GET /repos/{owner}/{repo}/commits/{ref}/statuses` Get a commits statuses,
      by branch/tag/commit reference
- [ ] `GET /repos/{owner}/{repo}/contents` Gets the metadata of all the entries
      of the root dir
- [ ] `POST /repos/{owner}/{repo}/contents` Modify multiple files in a
      repository
- [ ] `GET /repos/{owner}/{repo}/contents/{filepath}` Gets the metadata and
      contents (if a file) of an entry in a repository, or a list of entries if
      a dir
- [ ] `PUT /repos/{owner}/{repo}/contents/{filepath}` Update a file in a
      repository
- [ ] `POST /repos/{owner}/{repo}/contents/{filepath}` Create a file in a
      repository
- [ ] `DELETE /repos/{owner}/{repo}/contents/{filepath}` Delete a file in a
      repository
- [ ] `POST /repos/{owner}/{repo}/diffpatch` Apply diff patch to repository
- [ ] `GET /repos/{owner}/{repo}/editorconfig/{filepath}` Get the EditorConfig
      definitions of a file in a repository
- [ ] `GET /repos/{owner}/{repo}/forks` List a repository's forks
- [ ] `POST /repos/{owner}/{repo}/forks` Fork a repository
- [ ] `GET /repos/{owner}/{repo}/git/blobs/{sha}` Gets the blob of a repository.
- [ ] `GET /repos/{owner}/{repo}/git/commits/{sha}` Get a single commit from a
      repository
- [ ] `GET /repos/{owner}/{repo}/git/commits/{sha}.{diffType}` Get a commits
      diff or patch
- [ ] `GET /repos/{owner}/{repo}/git/notes/{sha}` Get a note corresponding to a
      single commit from a repository
- [ ] `GET /repos/{owner}/{repo}/git/refs` Get specified ref or filtered
      repository's refs
- [ ] `GET /repos/{owner}/{repo}/git/refs/{ref}` Get specified ref or filtered
      repository's refs
- [ ] `GET /repos/{owner}/{repo}/git/tags/{sha}` Gets the tag object of an
      annotated tag (not lightweight tags)
- [ ] `GET /repos/{owner}/{repo}/git/trees/{sha}` Gets the tree of a repository.
- [ ] `GET /repos/{owner}/{repo}/hooks` List the hooks in a repository
- [ ] `POST /repos/{owner}/{repo}/hooks` Create a hook
- [ ] `GET /repos/{owner}/{repo}/hooks/git` List the Git hooks in a repository
- [ ] `GET /repos/{owner}/{repo}/hooks/git/{id}` Get a Git hook
- [ ] `DELETE /repos/{owner}/{repo}/hooks/git/{id}` Delete a Git hook in a
      repository
- [ ] `PATCH /repos/{owner}/{repo}/hooks/git/{id}` Edit a Git hook in a
      repository
- [ ] `GET /repos/{owner}/{repo}/hooks/{id}` Get a hook
- [ ] `DELETE /repos/{owner}/{repo}/hooks/{id}` Delete a hook in a repository
- [ ] `PATCH /repos/{owner}/{repo}/hooks/{id}` Edit a hook in a repository
- [ ] `POST /repos/{owner}/{repo}/hooks/{id}/tests` Test a push webhook
- [ ] `GET /repos/{owner}/{repo}/issue_config` Returns the issue config for a
      repo
- [ ] `GET /repos/{owner}/{repo}/issue_config/validate` Returns the validation
      information for a issue config
- [ ] `GET /repos/{owner}/{repo}/issue_templates` Get available issue templates
      for a repository
- [ ] `GET /repos/{owner}/{repo}/issues/pinned` List a repo's pinned issues
- [ ] `GET /repos/{owner}/{repo}/keys` List a repository's keys
- [ ] `POST /repos/{owner}/{repo}/keys` Add a key to a repository
- [ ] `GET /repos/{owner}/{repo}/keys/{id}` Get a repository's key by id
- [ ] `DELETE /repos/{owner}/{repo}/keys/{id}` Delete a key from a repository
- [ ] `GET /repos/{owner}/{repo}/languages` Get languages and number of bytes of
      code written
- [ ] `GET /repos/{owner}/{repo}/media/{filepath}` Get a file, or it's LFS
      object from a repository
- [ ] `POST /repos/{owner}/{repo}/mirror-sync` Sync a mirrored repository
- [ ] `GET /repos/{owner}/{repo}/new_pin_allowed` Returns if new Issue Pins are
      allowed
- [ ] `GET /repos/{owner}/{repo}/pulls` List a repo's pull requests
- [ ] `POST /repos/{owner}/{repo}/pulls` Create a pull request
- [ ] `GET /repos/{owner}/{repo}/pulls/pinned` List a repo's pinned pull
      requests
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}` Get a pull request
- [ ] `PATCH /repos/{owner}/{repo}/pulls/{index}` Update a pull request. If
      using deadline only the date will be taken into account, and time of day
      ignored.
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}.{diffType}` Get a pull request
      diff or patch
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}/commits` Get commits for a pull
      request
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}/files` Get changed files for a
      pull request
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}/merge` Check if a pull request
      has been merged
- [ ] `POST /repos/{owner}/{repo}/pulls/{index}/merge` Merge a pull request
- [ ] `DELETE /repos/{owner}/{repo}/pulls/{index}/merge` Cancel the scheduled
      auto merge for the given pull request
- [ ] `POST /repos/{owner}/{repo}/pulls/{index}/requested_reviewers` create
      review requests for a pull request
- [ ] `DELETE /repos/{owner}/{repo}/pulls/{index}/requested_reviewers` cancel
      review requests for a pull request
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}/reviews` List all reviews for a
      pull request
- [ ] `POST /repos/{owner}/{repo}/pulls/{index}/reviews` Create a review to a
      pull request
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}/reviews/{id}` Get a specific
      review for a pull request
- [ ] `POST /repos/{owner}/{repo}/pulls/{index}/reviews/{id}` Submit a pending
      review to a pull request
- [ ] `DELETE /repos/{owner}/{repo}/pulls/{index}/reviews/{id}` Delete a
      specific review from a pull request
- [ ] `GET /repos/{owner}/{repo}/pulls/{index}/reviews/{id}/comments` Get a
      specific review for a pull request
- [ ] `POST /repos/{owner}/{repo}/pulls/{index}/reviews/{id}/dismissals` Dismiss
      a review for a pull request
- [ ] `POST /repos/{owner}/{repo}/pulls/{index}/reviews/{id}/undismissals`
      Cancel to dismiss a review for a pull request
- [ ] `POST /repos/{owner}/{repo}/pulls/{index}/update` Merge PR's baseBranch
      into headBranch
- [ ] `GET /repos/{owner}/{repo}/push_mirrors` Get all push mirrors of the
      repository
- [ ] `POST /repos/{owner}/{repo}/push_mirrors` add a push mirror to the
      repository
- [ ] `POST /repos/{owner}/{repo}/push_mirrors-sync` Sync all push mirrored
      repository
- [ ] `GET /repos/{owner}/{repo}/push_mirrors/{name}` Get push mirror of the
      repository by remoteName
- [ ] `DELETE /repos/{owner}/{repo}/push_mirrors/{name}` deletes a push mirror
      from a repository by remoteName
- [ ] `GET /repos/{owner}/{repo}/raw/{filepath}` Get a file from a repository
- [ ] `GET /repos/{owner}/{repo}/releases` List a repo's releases
- [ ] `POST /repos/{owner}/{repo}/releases` Create a release
- [ ] `GET /repos/{owner}/{repo}/releases/latest` Gets the most recent
      non-prerelease, non-draft release of a repository, sorted by created_at
- [ ] `GET /repos/{owner}/{repo}/releases/tags/{tag}` Get a release by tag name
- [ ] `DELETE /repos/{owner}/{repo}/releases/tags/{tag}` Delete a release by tag
      name
- [ ] `GET /repos/{owner}/{repo}/releases/{id}` Get a release
- [ ] `DELETE /repos/{owner}/{repo}/releases/{id}` Delete a release
- [ ] `PATCH /repos/{owner}/{repo}/releases/{id}` Update a release
- [ ] `GET /repos/{owner}/{repo}/releases/{id}/assets` List release's
      attachments
- [ ] `POST /repos/{owner}/{repo}/releases/{id}/assets` Create a release
      attachment
- [ ] `GET /repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}` Get a
      release attachment
- [ ] `DELETE /repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}` Delete
      a release attachment
- [ ] `PATCH /repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}` Edit a
      release attachment
- [ ] `GET /repos/{owner}/{repo}/reviewers` Return all users that can be
      requested to review in this repo
- [ ] `GET /repos/{owner}/{repo}/signing-key.gpg` Get signing-key.gpg for given
      repository
- [ ] `GET /repos/{owner}/{repo}/stargazers` List a repo's stargazers
- [ ] `GET /repos/{owner}/{repo}/statuses/{sha}` Get a commits statuses
- [ ] `POST /repos/{owner}/{repo}/statuses/{sha}` Create a commit status
- [ ] `GET /repos/{owner}/{repo}/subscribers` List a repo's watchers
- [ ] `GET /repos/{owner}/{repo}/subscription` Check if the current user is
      watching a repo
- [ ] `PUT /repos/{owner}/{repo}/subscription` Watch a repo
- [ ] `DELETE /repos/{owner}/{repo}/subscription` Unwatch a repo
- [ ] `GET /repos/{owner}/{repo}/tags` List a repository's tags
- [ ] `POST /repos/{owner}/{repo}/tags` Create a new git tag in a repository
- [ ] `GET /repos/{owner}/{repo}/tags/{tag}` Get the tag of a repository by tag
      name
- [ ] `DELETE /repos/{owner}/{repo}/tags/{tag}` Delete a repository's tag by
      name
- [ ] `GET /repos/{owner}/{repo}/teams` List a repository's teams
- [ ] `GET /repos/{owner}/{repo}/teams/{team}` Check if a team is assigned to a
      repository
- [ ] `PUT /repos/{owner}/{repo}/teams/{team}` Add a team to a repository
- [ ] `DELETE /repos/{owner}/{repo}/teams/{team}` Delete a team from a
      repository
- [ ] `GET /repos/{owner}/{repo}/times` List a repo's tracked times
- [ ] `GET /repos/{owner}/{repo}/times/{user}` List a user's tracked times in a
      repo
- [ ] `GET /repos/{owner}/{repo}/topics` Get list of topics that a repository
      has
- [ ] `PUT /repos/{owner}/{repo}/topics` Replace list of topics for a repository
- [ ] `PUT /repos/{owner}/{repo}/topics/{topic}` Add a topic to a repository
- [ ] `DELETE /repos/{owner}/{repo}/topics/{topic}` Delete a topic from a
      repository
- [ ] `POST /repos/{owner}/{repo}/transfer` Transfer a repo ownership
- [ ] `POST /repos/{owner}/{repo}/transfer/accept` Accept a repo transfer
- [ ] `POST /repos/{owner}/{repo}/transfer/reject` Reject a repo transfer
- [ ] `POST /repos/{owner}/{repo}/wiki/new` Create a wiki page
- [ ] `GET /repos/{owner}/{repo}/wiki/page/{pageName}` Get a wiki page
- [ ] `DELETE /repos/{owner}/{repo}/wiki/page/{pageName}` Delete a wiki page
- [ ] `PATCH /repos/{owner}/{repo}/wiki/page/{pageName}` Edit a wiki page
- [ ] `GET /repos/{owner}/{repo}/wiki/pages` Get all wiki pages
- [ ] `GET /repos/{owner}/{repo}/wiki/revisions/{pageName}` Get revisions of a
      wiki page
- [ ] `POST /repos/{template_owner}/{template_repo}/generate` Create a
      repository using a template
- [ ] `GET /repositories/{id}` Get a repository by id
- [ ] `GET /topics/search search` topics via keyword
- [ ] `POST /user/repos` Create a repository

## settings

- [ ] `GET /settings/api` Get instance's global settings for api
- [ ] `GET /settings/attachment` Get instance's global settings for Attachment
- [ ] `GET /settings/repository` Get instance's global settings for repositories
- [ ] `GET /settings/ui` Get instance's global settings for ui

## user

- [ ] `GET /user` Get the authenticated user
- [ ] `PUT /user/actions/secrets/{secretname}` Create or Update a secret value
      in a user scope
- [ ] `DELETE /user/actions/secrets/{secretname}` Delete a secret in a user
      scope
- [ ] `GET /user/applications/oauth2` List the authenticated user's oauth2
      applications
- [ ] `POST /user/applications/oauth2 creates a new` OAuth2 application
- [ ] `GET /user/applications/oauth2/{id} get an` OAuth2 Application
- [ ] `DELETE /user/applications/oauth2/{id} delete an` OAuth2 Application
- [ ] `PATCH /user/applications/oauth2/{id} update an` OAuth2 Application, this
      includes regenerating the client secret
- [ ] `POST /user/avatar` Update Avatar
- [ ] `DELETE /user/avatar` Delete Avatar
- [ ] `GET /user/emails` List the authenticated user's email addresses
- [ ] `POST /user/emails` Add email addresses
- [ ] `DELETE /user/emails` Delete email addresses
- [ ] `GET /user/followers` List the authenticated user's followers
- [ ] `GET /user/following` List the users that the authenticated user is
      following
- [ ] `GET /user/following/{username}` Check whether a user is followed by the
      authenticated user
- [ ] `PUT /user/following/{username}` Follow a user
- [ ] `DELETE /user/following/{username}` Unfollow a user
- [ ] `GET /user/gpg_key_token` Get a Token to verify
- [ ] `POST /user/gpg_key_verify` Verify a GPG key
- [ ] `GET /user/gpg_keys` List the authenticated user's GPG keys
- [ ] `POST /user/gpg_keys` Create a GPG key
- [ ] `GET /user/gpg_keys/{id}` Get a GPG key
- [ ] `DELETE /user/gpg_keys/{id}` Remove a GPG key
- [ ] `GET /user/hooks` List the authenticated user's webhooks
- [ ] `POST /user/hooks` Create a hook
- [ ] `GET /user/hooks/{id}` Get a hook
- [ ] `DELETE /user/hooks/{id}` Delete a hook
- [ ] `PATCH /user/hooks/{id}` Update a hook
- [ ] `GET /user/keys` List the authenticated user's public keys
- [ ] `POST /user/keys` Create a public key
- [ ] `GET /user/keys/{id}` Get a public key
- [ ] `DELETE /user/keys/{id}` Delete a public key
- [ ] `GET /user/repos` List the repos that the authenticated user owns
- [ ] `POST /user/repos` Create a repository
- [ ] `GET /user/settings` Get user settings
- [ ] `PATCH /user/settings` Update user settings
- [ ] `GET /user/starred` The repos that the authenticated user has starred
- [ ] `GET /user/starred/{owner}/{repo}` Whether the authenticated is starring
      the repo
- [ ] `PUT /user/starred/{owner}/{repo}` Star the given repo
- [ ] `DELETE /user/starred/{owner}/{repo}` Unstar the given repo
- [ ] `GET /user/stopwatches` Get list of all existing stopwatches
- [ ] `GET /user/subscriptions` List repositories watched by the authenticated
      user
- [ ] `GET /user/teams` List all the teams a user belongs to
- [ ] `GET /user/times` List the current user's tracked times
- [ ] `GET /users/search` Search for users
- [ ] `GET /users/{username}` Get a user
- [ ] `GET /users/{username}/activities/feeds` List a user's activity feeds
- [ ] `GET /users/{username}/followers` List the given user's followers
- [ ] `GET /users/{username}/following` List the users that the given user is
      following
- [ ] `GET /users/{username}/following/{target}` Check if one user is following
      another user
- [ ] `GET /users/{username}/gpg_keys` List the given user's GPG keys
- [ ] `GET /users/{username}/heatmap` Get a user's heatmap
- [ ] `GET /users/{username}/keys` List the given user's public keys
- [ ] `GET /users/{username}/repos` List the repos owned by the given user
- [ ] `GET /users/{username}/starred` The repos that the given user has starred
- [ ] `GET /users/{username}/subscriptions` List the repositories watched by a
      user
- [ ] `GET /users/{username}/tokens` List the authenticated user's access tokens
- [ ] `POST /users/{username}/tokens` Create an access token
- [ ] `DELETE /users/{username}/tokens/{token}` delete an access token
