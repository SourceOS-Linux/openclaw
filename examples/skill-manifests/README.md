# Skill Manifest Examples

These files are additive examples that map live OpenClaw skill/runtime surfaces onto the emerging `SkillManifest` contract family in `SourceOS-Linux/sourceos-spec`.

They are **examples first**, not generated sources of truth.

## Why these exist

OpenClaw already encodes important runtime law in `SKILL.md` files:
- PTY requirements
- `workdir` boundaries
- background session tracking
- worktree review lanes
- review-only / no-push guardrails
- local artifact persistence such as `.local/review.md`

The examples make those runtime semantics legible to the cross-repo contract work without changing active runtime behavior.

## Current examples

- `coding-agent.SkillManifest.example.json`
- `review-pr.SkillManifest.example.json`

## Follow-up

Once `SkillManifest` stabilizes upstream, these should either:
1. become generated manifests derived from canonical skill metadata, or
2. remain human-readable examples with validator-backed conformance checks.
