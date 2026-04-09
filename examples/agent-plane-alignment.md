# Agent-plane alignment in OpenClaw

This branch carries additive examples that map the live OpenClaw runtime to the merged agent-plane contract family.

## Included example families

### Skill manifests
- `examples/skill-manifests/coding-agent.SkillManifest.example.json`
- `examples/skill-manifests/review-pr.SkillManifest.example.json`

### Execution surfaces
- `examples/execution-surfaces/coding-agent.ExecutionSurface.example.json`
- `examples/execution-surfaces/review-pr.ExecutionSurface.example.json`

## Why these examples exist

The OpenClaw runtime already expresses meaningful agent-plane semantics through `SKILL.md` files and runtime behavior:
- PTY requirements
- background session behavior
- workdir boundaries
- review-only lanes
- worktree strategy
- approval posture

These examples make that behavior legible to the merged cross-repo schema family without changing active runtime behavior.

## Current policy

These files should be treated as examples-first proving-ground artifacts unless and until the repo explicitly decides to generate or validate them mechanically.

## Open decision

Choose one:
1. keep them as stable examples, or
2. promote them to generated / validator-backed artifacts once the repo is ready.
