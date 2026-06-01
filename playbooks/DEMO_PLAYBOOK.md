# Governance Demo Playbook — Standalone CLI

This playbook demonstrates the standalone `agov` CLI using an explicit canonical Governance workspace document.

It is aligned with the current Governance package split in `anarchitects/anarchitecture-community`:

- `@anarchitects/governance-core` `^0.0.4`
- `@anarchitects/governance-cli` `^0.1.0`

The purpose of this repository is to show the lowest-friction CLI flow: no adapter package, no project discovery, no host-specific runtime. The workspace model is supplied explicitly through `governance.workspace.yaml` and assessed with `governance.profile.json`.

## Demo narrative

Use this repo to explain the Governance Core/CLI separation:

1. `governance.workspace.yaml` is the canonical workspace inventory.
2. `governance.profile.json` is the policy profile.
3. `agov` is the standalone runtime host.
4. The CLI delegates deterministic assessment, metrics, violations, recommendations, and signals to Governance Core.
5. The same Core contracts can later be fed by concrete adapters instead of a hand-written workspace document.

## 0. Align package versions

Update the CLI package before running the demo:

```bash
yarn up @anarchitects/governance-cli@^0.1.0
```

Expected `devDependencies` intent:

```json
{
  "@anarchitects/governance-cli": "^0.1.0",
  "typescript": "~5.9.2"
}
```

## 1. Install and build

```bash
yarn install
yarn build
```

The build step validates the TypeScript demo workspace itself. Governance assessment is separate and uses the canonical workspace document.

## 2. Validate the profile

```bash
agov profile validate --profile governance.profile.json --format table
```

Talking points:

- This validates the policy input only.
- It does not inspect the workspace.
- It is the fastest way to show that the rule/profile contract is valid before running a full assessment.

## 3. Validate the workspace document

```bash
agov workspace validate --workspace governance.workspace.yaml --format table
```

Talking points:

- This validates the canonical workspace inventory.
- The demo has seven projects: `booking-api`, `booking-interface`, `booking-application`, `booking-domain`, `booking-infrastructure`, `customer-domain`, and `shared-kernel`.
- Dependencies are declared manually in the workspace file.

## 4. Inspect the workspace inventory

```bash
agov inspect --workspace governance.workspace.yaml --format table
```

Optional filtered views:

```bash
agov inspect --workspace governance.workspace.yaml --domain booking --format table
agov inspect --workspace governance.workspace.yaml --layer domain --format table
agov inspect --workspace governance.workspace.yaml --project booking-domain --format json
```

Talking points:

- `inspect` is an inventory command, not a gate.
- It is useful for explaining what Governance Core sees before policy evaluation.

## 5. Inspect dependencies

```bash
agov dependencies --workspace governance.workspace.yaml --format table
```

Optional filtered views:

```bash
agov dependencies --workspace governance.workspace.yaml --source booking-application --format table
agov dependencies --workspace governance.workspace.yaml --target shared-kernel --format table
agov dependencies --workspace governance.workspace.yaml --type static --format json
```

Talking points:

- The standalone demo makes dependencies explicit.
- This is useful for teaching the canonical dependency model before moving to adapter-driven discovery.

## 6. Run a full assessment

```bash
agov assess --workspace governance.workspace.yaml --profile governance.profile.json --format table
```

Talking points:

- `assess` is the main human-facing assessment orchestration command.
- It evaluates the workspace against the profile and produces assessment artifacts.
- Use this before `check` when presenting interactively.

## 7. Show metrics, violations, recommendations, and signals

```bash
agov metrics --workspace governance.workspace.yaml --profile governance.profile.json --format table
agov violations --workspace governance.workspace.yaml --profile governance.profile.json --format table
agov recommendations --workspace governance.workspace.yaml --profile governance.profile.json --format table
agov signals --workspace governance.workspace.yaml --profile governance.profile.json --format table
```

Useful filters:

```bash
agov metrics --workspace governance.workspace.yaml --profile governance.profile.json --weakest --format table
agov violations --workspace governance.workspace.yaml --profile governance.profile.json --severity error --format table
agov recommendations --workspace governance.workspace.yaml --profile governance.profile.json --priority high --format table
agov signals --workspace governance.workspace.yaml --profile governance.profile.json --severity error --format table
```

Talking points:

- `metrics` gives quantitative assessment slices.
- `violations` gives actionable policy failures.
- `recommendations` gives remediation guidance.
- `signals` gives normalized governance evidence that can be consumed by other hosts later.

## 8. Run the CI gate

```bash
yarn governance:check
```

Or directly:

```bash
agov check --workspace governance.workspace.yaml --profile governance.profile.json
```

Talking points:

- `check` is the gate command.
- It is suitable for CI because it can fail the process based on governance failures.
- Keep `assess` for exploration and `check` for release gates.

## 9. Generate reports

Human-readable Markdown report:

```bash
agov assess \
  --workspace governance.workspace.yaml \
  --profile governance.profile.json \
  --format markdown \
  --output governance-report.md
```

Automation JSON:

```bash
agov assess \
  --workspace governance.workspace.yaml \
  --profile governance.profile.json \
  --format json \
  --output governance-assessment.json
```

Recommended npm scripts:

```json
{
  "governance:profile": "agov profile validate --profile governance.profile.json --format table",
  "governance:workspace": "agov workspace validate --workspace governance.workspace.yaml --format table",
  "governance:inspect": "agov inspect --workspace governance.workspace.yaml --format table",
  "governance:dependencies": "agov dependencies --workspace governance.workspace.yaml --format table",
  "governance:assess": "agov assess --workspace governance.workspace.yaml --profile governance.profile.json --format table",
  "governance:check": "agov check --workspace governance.workspace.yaml --profile governance.profile.json",
  "governance:report": "agov assess --workspace governance.workspace.yaml --profile governance.profile.json --format markdown --output governance-report.md",
  "governance:json": "agov assess --workspace governance.workspace.yaml --profile governance.profile.json --format json --output governance-assessment.json"
}
```

## 10. Optional failure demo

To demonstrate governance gating, temporarily introduce an invalid dependency in `governance.workspace.yaml`, for example a `domain` layer project depending on an `interface` layer project, then rerun:

```bash
agov violations --workspace governance.workspace.yaml --profile governance.profile.json --format table
agov check --workspace governance.workspace.yaml --profile governance.profile.json
```

Revert the invalid dependency after the demo.

## Positioning

Use this repo as Demo 1:

- Best for explaining the canonical Governance model.
- Best for explaining CLI commands and output formats.
- Best for CI gate positioning.
- Not intended to demonstrate discovery. Use `governance-demo-cli-typescript-adapter` for adapter-driven discovery.
