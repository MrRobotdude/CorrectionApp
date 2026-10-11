# Runtime record

Prepared 2026-10-11. Source structure and repository relationships were inspected. Automated build/runtime checks are recorded here as they complete; **a rewritten README is not a passing build or end-to-end test**.

Manifest paths:

- backend/package.json
- frontend/package.json
- package.json

The backend is included in this repository; the standalone backend is an older subset. Archive processing must be reviewed for path traversal, resource limits, and handling untrusted files before remote use.

Final checks: backend syntax and React production demo build passed. MongoDB 8.0 on a dedicated loopback port connected successfully. Synthetic criteria create/read/delete passed; browser save/delete also passed. Legacy filesystem and execution endpoints return HTTP 403 unless explicitly enabled for trusted local use. Institutional authentication and archive/program correction are not certified. Run scripts/verify-demo.ps1 against the local backend to repeat the disposable CRUD check.
