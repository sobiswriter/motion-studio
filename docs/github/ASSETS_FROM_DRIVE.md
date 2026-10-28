# Missing media: request it from the user’s Drive

A fresh GitHub clone intentionally lacks the large local asset library. No Drive folder URL or sharing permission has been supplied. Ask the user for the required files or folder link; do not guess one. Never upload or publish their Drive library as part of setup.

## Restore by task

| Need | Expected local paths |
| --- | --- |
| Original music | assets/music/ (original filenames; see music catalog SHA256 values) |
| Motion references | assets/Reference Vid/ (stable REF IDs; reference catalog/studies retain original hashes) |
| Product originals | assets/Products/realme-buds-air8/ |
| Sound recordings | assets/sfx/, including its local manifests and recordings |
| Render-ready production media | src/projects/<id>/assets/ and public/projects/<id>/ |
| Completed exports | out/ (optional for authoring; needed when revising an existing export by stream copy) |
| Audio tools/models/runtime | Follow docs/SOUND_TOOLS.md; install from official sources or request the user’s saved runtime. Do not blindly copy machine-specific virtual environments. |

Use EXTERNAL_ASSETS.json for exact locally inventoried paths and sizes. Preserve PNG alpha, original filenames and folder structure. Prefer each project’s preparation/source manifest and recorded SHA256 for integrity. Inventory sizes alone are not integrity checks. Ask only for the assets needed for the selected task. If they are unavailable, report the precise blocked path; documentation and source inspection can continue.

## Safe GitHub handoff

Review git status and git diff before staging. Include all intended documentation and the newly unignored evidence images. Check the staged file sizes and for secrets/private local paths. Existing recovery refs/history may contain earlier media: this readiness check covers current working-tree candidates, not all Git history. Never prune, garbage-collect or rewrite recovery history to make a push smaller without a separate approved recovery plan. No commit or push was performed.
