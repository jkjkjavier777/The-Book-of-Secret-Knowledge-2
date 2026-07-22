# Book of Secret Knowledge 2

> *Behavior before belief. Evidence before narrative.*
> 

> A repo-style field guide that fuses **BoundedGlitchEngine** (behavioral governance) with **The Book of Secret Knowledge** (practical, copy/paste-able ops).
> 

---

## Table of Contents

- What this is
- Core principles
- Repo layout
- Quickstart
- BoundedGlitchEngine (BGE)
- Secret Knowledge Playbook
- Governance zones
- Metrics & telemetry
- Experiment protocol
- Contributing
- License

---

## What this is

**Book of Secret Knowledge 2** is a *behavior-governed* knowledge repo pattern:

- The **“Book”** part: curated commands, checklists, templates, and references.
- The **“Engine”** part: a repeatable pipeline (identity → memory → retrieval → reasoning → validation → personality) that forces claims to stay grounded.

This project is intentionally **about observable behavior and reproducible measurement**, not claims about internal cognition.

---

## Core principles

1. **Behavior before belief** — policies, constraints, and measured outputs first.
2. **Evidence before narrative** — retrieve minimal context + validate before you explain.
3. **Smallest relevant context** — retrieval should be tight to reduce hallucination.
4. **Explainable reasoning** — separate facts / assumptions / hypotheses / conclusions.
5. **Governed creativity** — personality is a renderer, not a truth source.

---

## Repo layout

```
Book-of-Secret-Knowledge-2/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── governance.md
│   ├── research-protocol.md
│   └── telemetry.md
├── engine/
│   ├── identity/
│   ├── memory/
│   ├── retrieval/
│   ├── reasoning/
│   ├── validation/
│   └── personality/
├── playbooks/
│   ├── ops/
│   ├── security/
│   ├── data/
│   └── ai-systems/
├── snippets/
│   ├── bash/
│   ├── python/
│   └── json/
├── experiments/
├── logs/
└── LICENSE
```

---

## Quickstart

### 1) Define your engine contract

Minimum interfaces (pseudo):

```python
class Engine:
    def process(self, user_text: str) -> str: ...

class Retrieval:
    def retrieve(self, user_text: str, history: list[dict]) -> list[dict]: ...

class Validation:
    def check(self, draft: str, evidence: list[dict]) -> str: ...
```

### 2) Run a governed turn

```
store(user)
retrieve(min_context)
reason(draft)
validate(grounding + safety + identity)
render(personality)
store(assistant)
```

---

## BoundedGlitchEngine (BGE)

### Pipeline

- **Identity**: continuity + drift control
- **Memory**: structured conversation + long-term observations
- **Knowledge**: documents + indexes
- **Retrieval**: minimal relevant context
- **Reasoning**: explicit separation of claim types
- **Validation**: grounding + calibration + safety + governance
- **Personality**: tone/style bounded by identity

### Suggested artifacts per turn

```json
{
  "turn_id": "uuid",
  "user": {"text": "..."},
  "retrieval": {"items": [{"id": "...", "source": "...", "quote": "..."}]},
  "draft": {"text": "..."},
  "validation": {"passed": true, "flags": [], "unsupported_claims": []},
  "final": {"text": "..."},
  "telemetry": {"latency_ms": 0, "confidence": 0.0}
}
```

---

## Secret Knowledge Playbook

Curate “do-this-now” primitives, but **wrap them with evidence + validation**.

### Pattern: a governed snippet

```markdown
### Goal
Rotate logs safely.

### Evidence required
- OS + distro
- log path(s)
- permissions + disk space

### Command
```

sudo logrotate -f /etc/logrotate.conf

```

### Validation
- confirm expected files rotated
- confirm services still running
- record outcome + timestamp
```

### Example categories to build

- `ops/` — process, systemd, docker, backups
- `security/` — least privilege, audit checks, secret handling
- `data/` — sqlite, pandas, jq, csv hygiene
- `ai-systems/` — prompt/rag eval, red teaming, regression suites

---

## Governance zones

- **Green**: normal operation, low friction.
- **Yellow**: ramp caution; require more evidence; reduce speculation.
- **Red**: suppress loops/pathologies; refuse risky actions; require explicit confirmations.

Implementation hint: treat zones as a function of *signals* (repetition, low evidence, high uncertainty, safety flags).

---

## Metrics & telemetry

Suggested minimal set:

- **Grounding rate**: % of claims linked to retrieved evidence
- **Unsupported claim count** per turn
- **Refusal / safety intervention rate**
- **Drift score** (embedding similarity to identity anchors)
- **Novelty vs similarity** (for persona experiments)
- **Latency** (retrieval, generation, validation, render)

---

## Experiment protocol

Use pre-registered comparisons between personas/conditions.

Metric:

```
Δ = (N_A − N_B) − (S_A − S_B)
```

Rules:

- blinded evals
- fixed prompts + seeds where possible
- publish thresholds before running
- report negative results

---

## Contributing

- Add a playbook/snippet with:
    - goal
    - required evidence
    - steps/commands
    - validation checks
    - rollback plan
- Keep examples copy/paste-able.
- Prefer short sections over long essays.

---

## License

Pick a license that matches how you want others to reuse the playbooks + engine code (MIT/Apache-2.0 are common defaults).