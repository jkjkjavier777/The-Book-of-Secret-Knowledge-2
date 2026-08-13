"""
Chaos Lab: Quantum-flavored PRNG playground.

All randomness here comes from Python's `random` module (Mersenne Twister),
NOT real quantum hardware. The "quantum" framing is just a theme for the
experiments; the underlying number generator is a classical PRNG, which is
exactly what makes it useful to test.

Run modes:
    python chaos_lab.py                # interactive menu, run one or many experiments
    python chaos_lab.py --all          # batch-run every experiment once
    python chaos_lab.py --prng-test N  # run PRNG statistical tests with N samples
"""

import argparse
import math
import random
import numpy as np


# ---------- Experiments ----------

def schrodinger_cat_trials(trials=5):
    return [random.choice(["alive", "dead"]) for _ in range(trials)]


def quantum_superposition(alpha=1 / np.sqrt(2), beta=1 / np.sqrt(2)):
    state = np.array([alpha, beta])
    return np.abs(state) ** 2


def entangled_trials(trials=5):
    return [random.choice(["00", "11"]) for _ in range(trials)]


G = 6.67430e-11
C = 3e8


def schwarzschild_radius(mass):
    return 2 * G * mass / C ** 2


def forms_black_hole(mass, radius):
    return radius <= schwarzschild_radius(mass)


class Qubit:
    def __init__(self, alpha, beta):
        norm = np.sqrt(abs(alpha) ** 2 + abs(beta) ** 2)
        self.alpha, self.beta = alpha / norm, beta / norm

    def measure(self):
        prob_zero = abs(self.alpha) ** 2
        outcome = random.choices([0, 1], weights=[prob_zero, 1 - prob_zero])[0]
        self.alpha, self.beta = (1, 0) if outcome == 0 else (0, 1)
        return outcome


def measurement_trials(trials=5):
    q = Qubit(1, 1)
    return [q.measure() for _ in range(trials)]


def quantum_rng(n=10):
    return [random.getrandbits(1) for _ in range(n)]


H = (1 / np.sqrt(2)) * np.array([[1, 1], [1, -1]])
X = np.array([[0, 1], [1, 0]])


def circuit_demo():
    state = np.array([1, 0])
    state = np.dot(H, state)
    state = np.dot(X, state)
    return state


def bounded_glitch(trials=5):
    return [max(min(random.uniform(-1, 1), 0.7), -0.7) for _ in range(trials)]


RESPONSES = ["Yes", "No", "Maybe", "Glitch"]
WEIGHTS = [0.4, 0.3, 0.2, 0.1]


def collapse_trials(trials=5):
    return [random.choices(RESPONSES, WEIGHTS)[0] for _ in range(trials)]


EXPERIMENTS = {
    "1": ("Schrodinger's Cat", lambda: schrodinger_cat_trials()),
    "2": ("Superposition probabilities", lambda: quantum_superposition()),
    "3": ("Entanglement", lambda: entangled_trials()),
    "4": ("Black Hole (Sun mass, r=7e8m)", lambda: forms_black_hole(1.989e30, 7e8)),
    "5": ("Measurement collapse", lambda: measurement_trials()),
    "6": ("Quantum RNG bits", lambda: quantum_rng()),
    "7": ("Circuit demo (H then X)", lambda: circuit_demo()),
    "8": ("Chaos Lab bounded glitch", lambda: bounded_glitch()),
    "9": ("Chatbot collapse", lambda: collapse_trials()),
}


# ---------- PRNG statistical tests ----------
# These test random.getrandbits / random.random, i.e. the actual PRNG
# (Mersenne Twister in CPython), independent of the quantum theming above.

def frequency_test(n=10000):
    """Bit-balance test: fraction of 1-bits should be close to 0.5."""
    bits = [random.getrandbits(1) for _ in range(n)]
    ones = sum(bits)
    return {
        "n": n,
        "ones": ones,
        "zeros": n - ones,
        "fraction_ones": ones / n,
        "deviation_from_0.5": abs(ones / n - 0.5),
    }


def chi_square_uniformity_test(n=10000, buckets=10):
    """Chi-square goodness-of-fit for random.random() over `buckets` bins.
    Low chi-square (roughly <= buckets-1, i.e. df) is consistent with uniformity.
    """
    counts = [0] * buckets
    for _ in range(n):
        idx = int(random.random() * buckets)
        idx = min(idx, buckets - 1)
        counts[idx] += 1
    expected = n / buckets
    chi_sq = sum((c - expected) ** 2 / expected for c in counts)
    return {
        "n": n,
        "buckets": buckets,
        "counts": counts,
        "chi_square": chi_sq,
        "degrees_of_freedom": buckets - 1,
        "rule_of_thumb": f"expect chi_square roughly <= {buckets - 1 + 3*math.sqrt(2*(buckets-1)):.1f} at ~99% CI",
    }


def runs_test(n=10000):
    """Runs test on a random bitstream: counts consecutive-equal-value runs.
    Compares observed run count to the expected count for a random sequence.
    """
    bits = [random.getrandbits(1) for _ in range(n)]
    runs = 1
    for i in range(1, n):
        if bits[i] != bits[i - 1]:
            runs += 1
    ones = sum(bits)
    zeros = n - ones
    if ones == 0 or zeros == 0:
        expected_runs = 0
        std_runs = 0
    else:
        expected_runs = (2 * ones * zeros) / n + 1
        std_runs = math.sqrt(
            (2 * ones * zeros * (2 * ones * zeros - n))
            / (n ** 2 * (n - 1))
        )
    z = (runs - expected_runs) / std_runs if std_runs else float("nan")
    return {
        "n": n,
        "observed_runs": runs,
        "expected_runs": expected_runs,
        "z_score": z,
        "verdict": "OK (|z|<2 is typical for a good PRNG)" if abs(z) < 2 else "flagged (|z|>=2)",
    }


def run_prng_tests(n=10000):
    print(f"\n=== PRNG Statistical Tests (n={n}) ===")
    print("Frequency (bit-balance) test:", frequency_test(n))
    print("Chi-square uniformity test:", chi_square_uniformity_test(n))
    print("Runs test:", runs_test(n))


# ---------- Batch / interactive runners ----------

def run_all():
    print("=== Chaos Lab: Batch Run (all experiments) ===")
    for key, (name, fn) in EXPERIMENTS.items():
        print(f"{key}. {name}: {fn()}")


def interactive():
    print("=== Chaos Lab ===")
    for key, (name, _) in EXPERIMENTS.items():
        print(f"{key}. {name}")
    print("A. Run ALL experiments")
    print("T. Run PRNG statistical tests")
    print("Q. Quit")

    while True:
        choice = input("\nChoose an option (comma-separated for multiple, e.g. 1,3,7): ").strip()
        if choice.lower() == "q":
            break
        if choice.lower() == "a":
            run_all()
            continue
        if choice.lower() == "t":
            n = input("Sample size for PRNG tests [10000]: ").strip()
            n = int(n) if n else 10000
            run_prng_tests(n)
            continue

        picks = [c.strip() for c in choice.split(",")]
        for p in picks:
            if p in EXPERIMENTS:
                name, fn = EXPERIMENTS[p]
                print(f"{p}. {name}: {fn()}")
            else:
                print(f"Skipping unknown option: {p}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Chaos Lab quantum-flavored PRNG playground")
    parser.add_argument("--all", action="store_true", help="run every experiment once")
    parser.add_argument("--prng-test", type=int, metavar="N", help="run PRNG statistical tests with N samples")
    args = parser.parse_args()

    if args.all:
        run_all()
    elif args.prng_test:
        run_prng_tests(args.prng_test)
    else:
        interactive()

