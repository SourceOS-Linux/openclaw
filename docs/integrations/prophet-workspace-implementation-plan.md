# Prophet workspace plugin — phased implementation plan

## Phase 0 — boundary only

Land docs that define:
- what OpenClaw owns
- what Prophet owns
- which hooks form the narrow waist
- which actions are the first receipt points

No runtime behavior changes in this phase.

## Phase 1 — skeleton plugin

Create a minimal plugin skeleton under a dedicated integration path, for example:

- `extensions/prophet-workspace/README.md`
- `extensions/prophet-workspace/index.ts`
- `extensions/prophet-workspace/hooks/`
- `extensions/prophet-workspace/schemas/`

Expected outputs:
- plugin loads cleanly
- no-op hook registrations are possible
- no existing channels or tools are disturbed

## Phase 2 — read-mostly context path

Implement a first read-mostly path that can:
- collect local context
- prepare a structured request to Prophet-side membrane/policy services
- render a returned decision or receipt in the local runtime

This phase should avoid committed workspace mutations.

## Phase 3 — first mutation path

Choose one narrow mutation path and route it through the plugin boundary.
Recommended examples:
- draft a mail reply
- create a calendar event
- post a message to a connected workspace channel

Requirements:
- explicit membrane decision
- carrier/receipt emission
- visible user-facing receipt output
- no fallback silent mutation path

## Phase 4 — connected-app grant resolution

Add grant resolution so the runtime can ask Prophet whether a connected app and action scope are available before attempting the action.

This phase should surface:
- granted
- denied
- needs confirmation
- missing grant

as distinct user-visible states.

## Review constraints

Every phase should stay small enough to review in isolation.
The first implementation should prefer:
- hooks over deep runtime surgery
- receipts over opaque success paths
- one action path over broad integration

## Out of scope for this plan

- full command registry unification
- full cross-agent delegation inside this repo
- replacement of OpenClaw channel abstractions
- replacement of Prophet standards or bootstrap glue
