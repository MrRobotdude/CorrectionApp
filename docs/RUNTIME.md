# Runtime record

Prepared 2026-10-11. Source structure and repository relationships were inspected. Automated build/runtime checks are recorded here as they complete; **a rewritten README is not a passing build or end-to-end test**.

Manifest paths:

- backend/package.json
- frontend/package.json
- package.json

The backend is included in this repository; the standalone backend is an older subset. Archive processing must be reviewed for path traversal, resource limits, and handling untrusted files before remote use.
