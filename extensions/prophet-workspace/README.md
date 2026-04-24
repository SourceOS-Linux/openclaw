# Prophet Workspace plugin

This plugin is the narrow-waist integration point between OpenClaw as the local-first runtime shell and Prophet as the workspace, policy, provenance, and connected-app control plane.

## Current scope

This initial skeleton is intentionally small.

It provides:
- a plugin manifest and extension entrypoint
- a status gateway method for smoke testing
- a top-level CLI surface for future operator flows
- a reserved config surface for Prophet endpoint/auth metadata

It does **not** yet:
- mutate Prophet workspace state
- append receipts/carriers
- evaluate membrane policy decisions
- resolve connected-app grants

Those behaviors will be added in the next phases behind the hook points documented in `docs/integrations/prophet-workspace-boundary.md`.

## Intended next hooks

- `emitCarrier(event)`
- `evaluateMembraneDecision(request)`
- `appendLedgerEvent(entry)`
- `resolveConnectedAppGrant(scope)`

## Why a plugin

OpenClaw already has an extension model for gateway RPC, agent tools, CLI commands, background services, and hooks. Prophet integration should harmonize with that model rather than inventing a parallel runtime boundary.
