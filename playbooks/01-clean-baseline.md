# Playbook 01 — Clean Baseline

## Purpose

This playbook validates the baseline state of the standalone governance demo.

It proves that `@anarchitects/governance-cli` can evaluate a canonical Governance workspace document without Nx.

## What this playbook demonstrates

- The repository builds successfully.
- The standalone `agov` CLI runs outside Nx.
- `governance.workspace.yaml` is accepted as a canonical workspace document.
- `governance.profile.json` is accepted as a standalone profile.
- The current architecture has no error-level governance violations.

## Prerequisites

Run this playbook from the repository root.

Expected files:

```txt
package.json
tsconfig.json
tsconfig.base.json
governance.workspace.yaml
governance.profile.json
apps/booking-api
packages/booking-domain
packages/booking-application
packages/booking-interface
packages/booking-infrastructure
packages/customer-domain
packages/shared-kernel
```

## Steps

Install dependencies:

```bash
yarn install
```

Build the TypeScript workspace:

```bash
yarn build
```

Run the governance check:

```bash
yarn governance:check
```

Optionally generate a Markdown report:

```bash
yarn governance:report
```

## Expected result

The governance check should complete without error-level violations.

The report should describe the workspace, the evaluated policies, the resulting metrics, and the governance health status.

## Architectural baseline

The expected dependency direction is:

```txt
booking-api -> booking-interface
booking-interface -> booking-application
booking-application -> booking-domain
booking-infrastructure -> booking-domain
booking-domain -> shared-kernel
customer-domain -> shared-kernel
```

The important design intent is:

```txt
interface/application/infrastructure may depend inward
domain must remain independent from infrastructure and interface details
domains may only depend on explicitly allowed domains
```

## Interpretation

If this playbook succeeds, the demo has a clean baseline.

That baseline becomes the comparison point for the violation playbooks.
