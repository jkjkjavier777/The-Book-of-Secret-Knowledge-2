# 📖 The Book of Secret Knowledge 2
*"Behavior before belief. Evidence before narrative. Unlock the hidden layers of the world."*

[![GitHub stars](https://img.shields.io/github/stars/trimstray/the-book-of-secret-knowledge?style=social)](https://github.com/trimstray/the-book-of-secret-knowledge/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/trimstray/the-book-of-secret-knowledge?style=social)](https://github.com/trimstray/the-book-of-secret-knowledge/network/members)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## 🌟 **Overview**
**The Book of Secret Knowledge 2** is a **behavior-governed knowledge repository** that fuses **BoundedGlitchEngine (BGE)** with **practical, copy/paste-able operations**. It prioritizes **observable behavior, reproducible measurement, and evidence-based reasoning** over speculative narratives.

This project expands on the original *Book of Secret Knowledge* with:
- **Deeper dives** into niche topics (e.g., quantum cryptography, AI/ML exploits, forgotten languages).
- **Modernized sections** (cyber warfare, decentralized tech, AI governance).
- **Interactive elements** (Jupyter notebooks, CLI tools, browser extensions).
- **Community-driven curation** (via GitHub Discussions and Pull Requests).
- **Multimedia resources** (podcasts, documentaries, ARGs).

---

## 🗂️ **Table of Contents**
1. [Core Principles](#-core-principles)
2. [Repo Layout](#-repo-layout)
3. [Quickstart](#-quickstart)
4. [BoundedGlitchEngine (BGE)](#-boundedglitchengine-bge)
5. [Secret Knowledge Playbook](#-secret-knowledge-playbook)
6. [Governance Zones](#-governance-zones)
7. [Metrics & Telemetry](#-metrics--telemetry)
8. [Experiment Protocol](#-experiment-protocol)
9. [Categories](#-categories)
   - [🔐 Security & Hacking](#-security--hacking)
   - [🐧 Linux & System Administration](#-linux--system-administration)
   - [🌐 Networking & Protocols](#-networking--protocols)
   - [💻 Programming](#-programming)
   - [🔢 Cryptography](#-cryptography)
   - [📜 History & Obscure Facts](#-history--obscure-facts)
   - [🔬 Science & Math](#-science--math)
   - [🎨 Art & Media](#-art--media)
   - [🧠 Philosophy & Esoterica](#-philosophy--esoterica)
   - [🛠️ Tools & Resources](#-tools--resources)
10. [Contributing](#-contributing)
11. [License](#-license)
12. [Stay Updated](#-stay-updated)

---

## 🎯 **Core Principles**
1. **Behavior before belief** — Policies, constraints, and measured outputs first.
2. **Evidence before narrative** — Retrieve minimal context and validate before explaining.
3. **Smallest relevant context** — Tight retrieval to reduce hallucination.
4. **Explainable reasoning** — Separate facts, assumptions, hypotheses, and conclusions.
5. **Governed creativity** — Personality is a renderer, not a truth source.

---

## 📁 **Repo Layout**
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

## 🚀 **Quickstart**
### 1. Define Your Engine Contract
Minimum interfaces (pseudo-code):
```python
class Engine:
    def process(self, user_text: str) -> str: ...

class Retrieval:
    def retrieve(self, user_text: str, history: list[dict]) -> list[dict]: ...

class Validation:
    def check(self, draft: str, evidence: list[dict]) -> str: ...
```

### 2. Run a Governed Turn
```
store(user)
retrieve(min_context)
reason(draft)
validate(grounding + safety + identity)
render(personality)
store(assistant)
```

---

## ⚙️ **BoundedGlitchEngine (BGE)**
### Pipeline
- **Identity**: Continuity and drift control.
- **Memory**: Structured conversation + long-term observations.
- **Knowledge**: Documents + indexes.
- **Retrieval**: Minimal relevant context.
- **Reasoning**: Explicit separation of claim types.
- **Validation**: Grounding + calibration + safety + governance.
- **Personality**: Tone/style bounded by identity.

### Suggested Artifacts per Turn
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

## 📜 **Secret Knowledge Playbook**
### Pattern: A Governed Snippet
```markdown
### Goal
[Describe the objective, e.g., "Rotate logs safely."]

### Evidence Required
- OS + distro
- Log path(s)
- Permissions + disk space

### Command
```bash
sudo logrotate -f /etc/logrotate.conf
```

### Validation
- Confirm expected files rotated.
- Confirm services still running.
- Record outcome + timestamp.
```

### Example Categories
- `ops/` — Process, systemd, Docker, backups.
- `security/` — Least privilege, audit checks, secret handling.
- `data/` — SQLite, pandas, jq, CSV hygiene.
- `ai-systems/` — Prompt/RAG eval, red teaming, regression suites.

---

## 🛡️ **Governance Zones**
- **Green**: Normal operation, low friction.
- **Yellow**: Ramp caution; require more evidence; reduce speculation.
- **Red**: Suppress loops/pathologies; refuse risky actions; require explicit confirmations.

**Implementation Hint**: Treat zones as a function of *signals* (repetition, low evidence, high uncertainty, safety flags).

---

## 📊 **Metrics & Telemetry**
Suggested minimal set:
- **Grounding rate**: % of claims linked to retrieved evidence.
- **Unsupported claim count** per turn.
- **Refusal/safety intervention rate**. 
- **Drift score** (embedding similarity to identity anchors).
- **Novelty vs. similarity** (for persona experiments).
- **Latency** (retrieval, generation, validation, render).

---

## 🔬 **Experiment Protocol**
Use pre-registered comparisons between personas/conditions.

**Metric**:
```
Δ = (N_A − N_B) − (S_A − S_B)
```

**Rules**:
- Blinded evals.
- Fixed prompts + seeds where possible.
- Publish thresholds before running.
- Report negative results.

---

## 🗂️ **Categories**

---

### 🔐 **Security & Hacking**
*"The art of breaking and building systems."*

#### AI & Machine Learning in Hacking
- [AI-Powered Phishing Kits](https://github.com/emadshanab/AI-Phishing) – Deepfake voice phishing.
- [LLM Exploits](https://github.com/verazuo/jailbreak_llms) – Prompt injection attacks on AI models.
- [Automated Red Teaming](https://github.com/Azure/AzureRedTeam) – AI-driven penetration testing.

#### Quantum-Resistant Cryptography
- [NIST Post-Quantum Cryptography Standards](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [Kyber & Dilithium Explained](https://github.com/post-quantum-cryptography) – Lattice-based crypto.

#### OSINT 2.0
- [Maltego Transforms](https://www.maltego.com/) – Advanced graph-based intelligence.
- [SpiderFoot HX](https://www.spiderfoot.net/) – Automated OSINT for threat hunting.
- [Dehashed API](https://www.dehashed.com/) – Breached data search engine.

---

### 🐧 **Linux & System Administration**
*"Where the magic happens."*

#### Undocumented Linux Features
- [eBPF Magic](https://ebpf.io/) – Kernel-level tracing and networking.
- [Linux Kernel Hidden Gems](https://github.com/cirosantilli/linux-kernel-module-cheat) – Bypass syscalls, kernel modules.
- [Container Escapes](https://github.com/brant-ruan/container-escape) – Docker/Kubernetes privilege escalation.

#### System Hardening
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks/) – Secure configurations for Linux/Windows.
- [Lynis](https://cisofy.com/lynis/) – Security auditing tool.
- [Firejail](https://firejail.wordpress.com/) – Sandboxing applications.

---

### 🌐 **Networking & Protocols**
*"The invisible backbone of the digital world."*

#### QUIC & HTTP/3
- [QUIC Explained](https://quicwg.org/) – The future of web transport.
- [HTTP/3 Debugging](https://github.com/quic-go/quic-go) – Tools for analyzing QUIC traffic.

#### DNS & Privacy
- [DNS-over-HTTPS (DoH) Tools](https://github.com/dnsprivacy/doh-resolver)
- [Pi-hole](https://pi-hole.net/) – Network-wide ad blocking.

#### Wireless Hacking
- [Wi-Fi 6 Exploits](https://github.com/aircrack-ng/aircrack-ng) – New vulnerabilities.
- [Bluetooth Low Energy (BLE) Attacks](https://github.com/virtualabs/btlejack)

---

### 💻 **Programming**
*"Code is poetry, but some poems are dangerous."*

#### Esoteric Languages
- [Malbolge](https://github.com/catseye/Malbolge) – The hardest programming language.
- [Brainfuck](https://github.com/tianocore/edk2/tree/master/StdLib/Bf) – Minimalist Turing tarpit.

#### Reverse Engineering AI
- [Neural Network Decompilation](https://github.com/NeuralNetworkZoo/NeuralNetworkZoo)
- [Ghidra for AI Models](https://ghidra-sre.org/) – Reverse engineering ML models.

#### Code Obfuscation
- [Obfuscator-LLVM](https://github.com/obfuscator-llvm/obfuscator)
- [JavaScript Obfuscation](https://github.com/javascript-obfuscator/javascript-obfuscator)

---

### 🔢 **Cryptography**
*"Secrets, secrets, are no fun... unless you know how to keep them."*

#### Post-Quantum Cryptography
- [NIST PQC Standards](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [Liboqs](https://github.com/open-quantum-safe/liboqs) – Quantum-resistant crypto library.

#### Homomorphic Encryption
- [Microsoft SEAL](https://github.com/microsoft/SEAL) – Encrypted computation.
- [TFHE](https://github.com/tfhe/tfhe) – Fully Homomorphic Encryption in C++.

#### Steganography 2.0
- [DeepStego](https://github.com/ShieldMnt/invisible-watermark) – AI-powered steganography.
- [OpenStego](https://www.openstego.com/) – Classic steganography tools.

---

### 📜 **History & Obscure Facts**
*"The past is a foreign country; they do things differently there."*

#### Lost Civilizations
- [Göbekli Tepe](https://en.wikipedia.org/wiki/G%C3%B6bekli_Tepe) – The world’s oldest temple.
- [The Voynich Manuscript](https://en.wikipedia.org/wiki/Voynich_manuscript) – The unsolvable medieval codex.

#### Unsolved Mysteries
- [The Tamam Shud Case](https://en.wikipedia.org/wiki/Somerton_Man) – The mystery of the "Somerton Man."
- [The Wow! Signal](https://en.wikipedia.org/wiki/Wow!_signal) – The most famous SETI signal.

#### Deepfake History
- [AI-Generated Historical Figures](https://github.com/joonspk-research/generative-models)
- [DeepNostalgia](https://www.myheritage.com/deepnostalgia) – Bringing old photos to life.

---

### 🔬 **Science & Math**
*"The universe is not only stranger than we suppose, but stranger than we can suppose."*

#### Quantum Biology
- [Photosynthesis & Quantum Entanglement](https://www.nature.com/articles/nature08811)
- [Bird Migration & Quantum Compasses](https://www.sciencedirect.com/science/article/pii/S007965651830013X)

#### Black Hole Paradoxes
- [Hawking Radiation](https://en.wikipedia.org/wiki/Hawking_radiation)
- [The Black Hole Information Paradox](https://en.wikipedia.org/wiki/Black_hole_information_paradox)

#### AI-Generated Math Proofs
- [AlphaTensor](https://deepmind.com/blog/article/alphatensor) – AI discovers new matrix multiplication algorithms.

---

### 🎨 **Art & Media**
*"Where technology meets creativity."*

#### AI-Generated Art
- [Stable Diffusion](https://github.com/CompVis/stable-diffusion) – Text-to-image generation.
- [DALL·E 2](https://openai.com/dall-e-2/) – Advanced AI art generation.

#### Deepfake Detection
- [Deepware Scanner](https://deepwarescanner.com/)
- [Microsoft Video Authenticator](https://www.microsoft.com/en-us/research/project/video-authenticator/)

#### Lost Media Recovery
- [The Lost Media Wiki](https://lostmediawiki.com/)
- [Archive.org’s "Banned" Section](https://archive.org/details/banned)

---

### 🧠 **Philosophy & Esoterica**
*"The truth is out there... but where?"*

#### Simulation Theory
- [Nick Bostrom’s Simulation Argument](https://www.simulation-argument.com/)
- [The Fermi Paradox](https://en.wikipedia.org/wiki/Fermi_paradox)

#### Psychedelic Research
- [MAPS (Multidisciplinary Association for Psychedelic Studies)](https://maps.org/)
- [The Entheogen Review](https://www.maps.org/news-letters/v07n3/07313ent.html)

#### Fringe Physics
- [Torsion Fields](https://en.wikipedia.org/wiki/Torsion_field_(physics))
- [The EM Drive](https://en.wikipedia.org/wiki/EM_drive) – Controversial "reactionless" drive.

---

### 🛠️ **Tools & Resources**
*"Because you can’t know everything... but you can know where to find it."*

#### CLI Tools
| Tool | Description |
|------|-------------|
| [ranger](https://github.com/ranger/ranger) | Terminal file manager. |
| [tmux](https://github.com/tmux/tmux) | Terminal multiplexer. |
| [fzf](https://github.com/junegunn/fzf) | Fuzzy finder for files. |

#### Browser Extensions
- [uBlock Origin](https://github.com/gorhill/uBlock) – Ad blocker.
- [Dark Reader](https://github.com/darkreader/darkreader) – Dark mode for any website.
- [Bitwarden](https://bitwarden.com/) – Open-source password manager.

#### Jupyter Notebooks
- [Secret Knowledge Notebooks](https://github.com/trimstray/the-book-of-secret-knowledge/tree/master/notebooks) – Interactive explorations of niche topics.

---

## 🤝 **Contributing**
The *Book of Secret Knowledge 2* is **open-source and community-driven**! Here’s how you can help:

1. **Fork the repo** and add your findings.
2. **Submit a Pull Request** with a clear description.
3. **Join GitHub Discussions** to suggest new topics.
4. **Report issues** or suggest improvements.

📌 **Guidelines**:
- Keep entries **obscure but verifiable**. 
- Avoid **misinformation** or **unverified claims**. 
- Credit sources where possible.
- Add playbooks/snippets with:
  - Goal
  - Required evidence
  - Steps/commands
  - Validation checks
  - Rollback plan
- Keep examples **copy/paste-able**. 
- Prefer **short sections** over long essays.

---

## 📜 **License**
This work is licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.
🔗 [View License](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## 📬 **Stay Updated**
- **GitHub**: [github.com/trimstray/the-book-of-secret-knowledge-2](https://github.com/trimstray/the-book-of-secret-knowledge-2)
- **Twitter**: [@BookOfSecretK](https://twitter.com/BookOfSecretK)
- **Reddit**: [r/SecretKnowledge](https://www.reddit.com/r/SecretKnowledge/)

---

## 🎉 **Final Words**
*"The universe is full of secrets. Some are hidden in plain sight, others require digging. This book is your shovel."*

🚀 **Happy exploring!**
*— The Curators of The Book of Secret Knowledge 2*