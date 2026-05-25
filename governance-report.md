# agov check

| Field | Value |
| --- | --- |
| success | true |
| workspace | anarchitecture-demo-typescript-yarn-workspace |
| profile | Anarchitecture TypeScript Workspace Demo |

## Governance Check - Anarchitecture TypeScript Workspace Demo

## Health Score: 63 (Critical, D)
## Projects: 7
## Dependencies: 6
## Violations: 7

## Signal Sources:
- graph: 0
- conformance: 0
- policy: 7
- extension: 0

## Signal Types:
- ownership-gap: 7

## Signal Severity:
- info: 0
- warning: 7
- error: 0

## Exceptions:
- declared: 0
- matched: 0
- unused: 0
- active: 0
- stale: 0
- expired: 0
- suppressed policy findings: 0
- suppressed conformance findings: 0
- reactivated policy findings: 0
- reactivated conformance findings: 0

## Metrics:
- Architectural Entropy: 100/100
- Dependency Complexity: 79/100
- Domain Integrity: 100/100
- Ownership Coverage: 0/100
- Documentation Completeness: 0/100
- Layer Integrity: 100/100

## Metric Families:
- architecture: 90/100
##   measurements: Architectural Entropy (100), Dependency Complexity (79)
- boundaries: 100/100
##   measurements: Domain Integrity (100), Layer Integrity (100)
- ownership: 0/100
##   measurements: Ownership Coverage (0)
- documentation: 0/100
##   measurements: Documentation Completeness (0)

## Metric Hotspots:
- Documentation Completeness: 0/100
- Ownership Coverage: 0/100

## Project Hotspots:
- booking-api: 1 :: types=ownership-gap
- booking-application: 1 :: types=ownership-gap
- booking-domain: 1 :: types=ownership-gap
- booking-infrastructure: 1 :: types=ownership-gap
- booking-interface: 1 :: types=ownership-gap

## Explainability:
- summary: Critical health at 63. Weakest metrics are Documentation Completeness, Ownership Coverage, Dependency Complexity. Dominant issue types are ownership-gap, ownership-gap, ownership-gap.
- status reason: Score 63 is below the warning threshold (70).
- weakest metrics: Documentation Completeness (0), Ownership Coverage (0), Dependency Complexity (79)
- dominant issues: ownership-gap x1, ownership-gap x1, ownership-gap x1

## Top Issues:
- [warning] ownership-gap (policy) x1 :: ownership-presence :: projects=booking-api :: Project booking-api has no ownership metadata or CODEOWNERS mapping.
- [warning] ownership-gap (policy) x1 :: ownership-presence :: projects=booking-application :: Project booking-application has no ownership metadata or CODEOWNERS mapping.
- [warning] ownership-gap (policy) x1 :: ownership-presence :: projects=booking-domain :: Project booking-domain has no ownership metadata or CODEOWNERS mapping.
- [warning] ownership-gap (policy) x1 :: ownership-presence :: projects=booking-infrastructure :: Project booking-infrastructure has no ownership metadata or CODEOWNERS mapping.
- [warning] ownership-gap (policy) x1 :: ownership-presence :: projects=booking-interface :: Project booking-interface has no ownership metadata or CODEOWNERS mapping.
- [warning] ownership-gap (policy) x1 :: ownership-presence :: projects=customer-domain :: Project customer-domain has no ownership metadata or CODEOWNERS mapping.
- [warning] ownership-gap (policy) x1 :: ownership-presence :: projects=shared-kernel :: Project shared-kernel has no ownership metadata or CODEOWNERS mapping.

## Recommendations:
- (medium) Improve ownership coverage - Unowned projects slow down incident response and architectural decision making.