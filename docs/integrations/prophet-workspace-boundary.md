# Prophet workspace integration boundary

## Purpose

This document defines the boundary between OpenClaw as the local-first runtime shell and Prophet as the workspace/policy/provenance plane.

OpenClaw should remain the local-first interaction and agent runtime. Prophet should remain the canonical truth, policy, provenance, and connected-app control plane.

## Responsibilities

### OpenClaw owns
- local-first agent runtime
- gateway protocol and workstation interaction surfaces
- plugins, channels, memory, hooks, and user-facing agent UX
- local operator workflows and doctor checks
- orchestration of agent actions inside the runtime shell

### Prophet owns
- canonical workspace and platform objects
- policy and membrane evaluation
- carrier/receipt production rules
- append-only ledger semantics and provenance
- connected-app grants and capability decisions
- permission-aware projections and search surfaces

## Enforcement rule

OpenClaw may gather context, reason locally, and propose actions.
Any mutation of canonical workspace or platform state must pass through Prophet policy and produce a receipt/carrier.

## Narrow waist for the first implementation

The first integration should expose a thin plugin boundary with these hook classes:

1. `emitCarrier(event)`
2. `evaluateMembraneDecision(request)`
3. `appendLedgerEvent(entry)`
4. `resolveConnectedAppGrant(scope)`

These are intentionally narrow. The OpenClaw plugin must not become a second policy engine or a second workspace model.

## Candidate plugin shape

A first design pass can live under a dedicated workspace integration plugin, for example:

- `extensions/prophet-workspace/`
- `extensions/prophet-workspace/README.md`
- `extensions/prophet-workspace/hooks/`
- `extensions/prophet-workspace/schemas/`

The first implementation can stay read-mostly except where an explicit membrane decision grants a mutation.

## Immediate receipt points

The first useful receipt points inside OpenClaw are:

- message send / post-back actions
- workspace-connected file/document actions
- connected-app actions (mail draft, calendar create, etc.)
- dangerous browser/tool operations that cross from local reasoning into committed state

## Non-goals

This boundary does **not** attempt to:
- replace OpenClaw's runtime shell with Prophet
- replace Prophet's truth/policy plane with OpenClaw
- define all future agent protocols in this repo

Those broader standards belong in `SocioProphet/socioprophet-agent-standards`.

## Related upstream coordination

See the standards-side coordination artifact:
- `SocioProphet/socioprophet-agent-standards` → repo placement map and OpenClaw ↔ Prophet boundary guidance

## Next implementation steps

1. Add the plugin skeleton and README.
2. Add receipt/membrane hook interfaces without changing existing runtime behavior.
3. Route one narrow action through the hook path and surface the receipt to the user.
4. Keep the first mutation path small and reviewable.
