#!/usr/bin/env python3
import re
import math
import random
import statistics
from collections import Counter


class QuantumEvaluator:
    def __init__(self, seed=None):
        self.rng = random.Random(seed)

    def _tokenize(self, text):
        return re.findall(r"[a-zA-Z']+", text.lower())

    def _entropy(self, tokens):
        if not tokens:
            return 0.0
        counts = Counter(tokens)
        total = len(tokens)
        return -sum((c / total) * math.log2(c / total) for c in counts.values())

    def _novelty(self, tokens):
        if not tokens:
            return 0.0
        return len(set(tokens)) / len(tokens)

    def _coherence(self, text):
        sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
        if len(sentences) < 2:
            return 1.0
        lengths = [len(s.split()) for s in sentences]
        mean = statistics.mean(lengths)
        if mean == 0:
            return 0.0
        stdev = statistics.pstdev(lengths)
        return max(0.0, 1 - (stdev / mean))

    def _collapse(self, novelty, entropy, coherence):
        score = (0.4 * novelty) + (0.3 * min(entropy / 5, 1)) + (0.3 * coherence)
        jitter = self.rng.uniform(-0.03, 0.03)
        return max(0.0, min(1.0, score + jitter))

    def _strategy_label(self, score):
        if score >= 0.75:
            return "Coherent superposition (strong)"
        elif score >= 0.5:
            return "Partial collapse (moderate)"
        elif score >= 0.25:
            return "Decoherence risk (weak)"
        return "Collapsed to noise (poor)"

    def test_responses(self, responses, trials=3):
        results = {}
        for response in responses:
            tokens = self._tokenize(response)
            novelty = self._novelty(tokens)
            entropy = self._entropy(tokens)
            coherence = self._coherence(response)
            trial_results = []
            for t in range(1, trials + 1):
                score = self._collapse(novelty, entropy, coherence)
                trial_results.append({
                    "trial": t,
                    "novelty": round(novelty, 3),
                    "entropy": round(entropy, 3),
                    "coherence": round(coherence, 3),
                    "score": round(score, 3),
                    "strategy": self._strategy_label(score),
                })
            results[response] = trial_results
        return results

    def print_results(self, results, show_strategies=True):
        for response, trials in results.items():
            preview = response if len(response) <= 60 else response[:57] + "..."
            print("\n=== Response: " + repr(preview) + " ===")
            for r in trials:
                line = "  Trial " + str(r["trial"]) + ": score=" + str(r["score"])
                line += "  novelty=" + str(r["novelty"])
                line += "  entropy=" + str(r["entropy"])
                line += "  coherence=" + str(r["coherence"])
                if show_strategies:
                    line += "  -> " + r["strategy"]
                print(line)

    def print_statistics(self, responses):
        print("\n=== Aggregate Statistics ===")
        for response in responses:
            tokens = self._tokenize(response)
            print("\nResponse: " + repr(response[:60]))
            print("  Word count:      " + str(len(tokens)))
            print("  Unique words:    " + str(len(set(tokens))))
            print("  Lexical entropy: " + str(round(self._entropy(tokens), 3)) + " bits")
            print("  Novelty ratio:   " + str(round(self._novelty(tokens), 3)))
            print("  Coherence proxy: " + str(round(self._coherence(response), 3)))


if __name__ == "__main__":
    import sys
    text = sys.argv[1] if len(sys.argv) > 1 else sys.stdin.read()
    ev = QuantumEvaluator()
    res = ev.test_responses([text], trials=3)
    ev.print_results(res, show_strategies=True)
    ev.print_statistics([text])
