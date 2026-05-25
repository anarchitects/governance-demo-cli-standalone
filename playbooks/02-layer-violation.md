# Playbook 02 — Layer Violation

## Purpose

This playbook demonstrates that the governance profile detects an invalid dependency between architectural layers.

It intentionally introduces a dependency from the domain layer to the infrastructure layer.

## What this playbook demonstrates

- The code can still represent a plausible dependency.
- The canonical governance model can describe architectural drift.
- `agov check` detects invalid layer dependencies.
- The `layer-boundary` rule fails when a lower-level domain layer depends on infrastructure.

## Baseline assumption

The clean baseline should already pass:

```bash
yarn governance:check
```

## Introduce the violation

Open:

```txt
governance.workspace.yaml
```

Add this dependency at the end of the `dependencies` section:

```yaml
  - source: booking-domain
    target: booking-infrastructure
    type: static
```

This represents:

```txt
domain -> infrastructure
```

That is intentionally invalid.

## Run the check

```bash
yarn governance:check
```

## Expected result

The check should fail with an error-level `layer-boundary` violation.

Expected message shape:

```txt
Layer violation: booking-domain (domain) depends on booking-infrastructure (infrastructure).
```

## Why this is a violation

The domain layer should not depend on infrastructure.

Infrastructure may depend on domain abstractions, but domain should not know about repositories, persistence, adapters, frameworks, or infrastructure implementations.

Allowed direction:

```txt
infrastructure -> domain
```

Forbidden direction:

```txt
domain -> infrastructure
```

## Fix the violation

Remove this dependency again from `governance.workspace.yaml`:

```yaml
  - source: booking-domain
    target: booking-infrastructure
    type: static
```

Run the check again:

```bash
yarn governance:check
```

## Expected result after the fix

The check should pass again without error-level violations.

## Architectural lesson

The governance model makes an architectural principle executable:

```txt
The domain model must remain independent from infrastructure implementation details.
```
