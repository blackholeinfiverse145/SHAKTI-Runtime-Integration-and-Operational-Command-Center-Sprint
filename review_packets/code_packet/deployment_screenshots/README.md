# Deployment Screenshots

This document describes the suggested screenshots reviewers can capture during installation, bundling, and local launch to verify the deployment cycle.

## Suggested Deployment Captures

Reviewers validating the environment can capture the following states:

1.  **Dependency Installation**:
    *   *Action*: Execute `npm install` in the terminal.
    *   *Capture*: Screenshot the console showing successful package resolution and audit logs with zero critical warnings.
2.  **Development Server Launch**:
    *   *Action*: Execute `npm run dev` in the terminal.
    *   *Capture*: Screenshot the console showing Vite local server initialization on port `5173`.
3.  **Production Compilation Bundle**:
    *   *Action*: Execute `npm run build` in the terminal.
    *   *Capture*: Screenshot the terminal build logging, verifying successful asset generation in the output `dist/` directory.
4.  **Static Preview Server**:
    *   *Action*: Execute `npm run preview` in the terminal.
    *   *Capture*: Screenshot the console showing preview local server launch on port `4173`.
