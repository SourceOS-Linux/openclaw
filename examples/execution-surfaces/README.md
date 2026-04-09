# Execution Surface Examples

These files are additive examples that map live OpenClaw runtime posture to the merged `ExecutionSurface` contract family.

## Current examples

- `coding-agent.ExecutionSurface.example.json`
- `review-pr.ExecutionSurface.example.json`

## What they illustrate

### coding-agent
- PTY required
- background session capable
- sandboxed user execution
- allowlisted network posture
- protected control paths

### review-pr
- review-only execution
- named worktree strategy
- non-background lane
- protected branch guardrails
- review-lane approval profile

## Why examples first

These files are intended to mirror existing runtime behavior without changing the runtime itself.
They are a proving-ground mapping layer, not a generator output yet.

## Next step

Decide whether the repo wants to keep these as stable examples or replace them with generated / validator-backed artifacts.
