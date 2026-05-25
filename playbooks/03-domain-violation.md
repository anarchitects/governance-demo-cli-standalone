# Playbook 03 — Domain Violation

## Purpose

This playbook demonstrates that the governance profile detects an invalid dependency between bounded contexts or business domains.

It intentionally introduces a dependency from the booking domain to the customer domain.

## What this playbook demonstrates

- Cross-domain dependencies are not automatically acceptable.
- Allowed domain dependencies must be explicit.
- `agov check` detects dependencies that violate the configured domain policy.
- The `domain-boundary` rule fails when a project depends on a non-allowed target domain.

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
    target: customer-domain
    type: static
```

This represents:

```txt
booking domain -> customer domain
```

That is intentionally invalid in this demo.

## Run the check

```bash
yarn governance:check
```

## Expected result

The check should fail with an error-level `domain-boundary` violation.

Expected message shape:

```txt
Project booking-domain in domain booking depends on customer-domain in domain customer.
```

## Why this is a violation

The demo profile allows:

```txt
booking -> shared
customer -> shared
shared -> no outgoing domain dependencies
```

It does not allow:

```txt
booking -> customer
```

This reflects a common DDD governance rule:

```txt
A domain should not reach directly into another domain unless that dependency is explicit and intentional.
```

## Fix the violation

Remove this dependency again from `governance.workspace.yaml`:

```yaml
  - source: booking-domain
    target: customer-domain
    type: static
```

Run the check again:

```bash
yarn governance:check
```

## Expected result after the fix

The check should pass again without error-level violations.

## Architectural lesson

The governance model makes bounded-context policy executable:

```txt
Cross-domain dependencies must be intentional, explicit, and governed.
```
