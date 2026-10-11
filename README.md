# CorrectionApp · assessment helper

React frontend and Express/Mongoose backend for course correction criteria, score workflows, and archive/file processing.

**Repository role:** Canonical full-stack project. This repository is part of Doddie Prawarjito’s project collection. Third-party libraries, templates, company content, and academic attribution retain their original ownership. Career claims and project completeness are presented separately from source scaffolds.

## Relationship to other repositories

CorrectionApp_backend. The backend is included in this repository; the standalone backend is an older subset. Archive processing must be reviewed for path traversal, resource limits, and handling untrusted files before remote use.

## Local setup

Node.js and npm; restore the locked dependencies where present. Legacy projects may require the documented original Node version and dependency compatibility work.

```powershell
npm --prefix backend install
npm --prefix frontend install
node scripts/start-demo.mjs
```

Use synthetic records and your own service configuration. An interface or controller existing in source does not imply every workflow has been tested.

## Presentation

[Case study](docs/CASE_STUDY.md) · [Runtime and validation](docs/RUNTIME.md) · [Publication checklist](docs/PUBLICATION.md). 
