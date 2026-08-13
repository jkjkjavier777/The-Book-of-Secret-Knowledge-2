#!/bin/bash
# Quantum Quality Over Quantity Test Wrapper

# Usage:
#   echo "Bot reply here" | ./quantum_test.sh
#   ./quantum_test.sh "Bot reply here"

PYTHON_SCRIPT="quantum_evaluator.py"

# Collect input either from argument or stdin
if [ $# -gt 0 ]; then
  RESPONSE="$*"
else
  RESPONSE=$(cat)
fi

# Run evaluator in demo mode with custom response
python3 - <<EOF
from quantum_evaluator import QuantumEvaluator

evaluator = QuantumEvaluator()
results = evaluator.test_responses(["$RESPONSE"], trials=3)
evaluator.print_results(results, show_strategies=True)
evaluator.print_statistics(["$RESPONSE"])
EOF
