# 🔄 Workflow: Collective Prompt Process

## Standard Processing Pipeline

### Phase 1: Intake & Parsing (Coordinator Bot)

**Step 1.1: Receive Input**
- Capture user message
- Store timestamp and session context
- Identify input type (question, task, clarification)
- Extract any attached files or references

**Step 1.2: Parse & Understand**
- Tokenize and analyze user intent
- Identify key entities and parameters
- Detect dependencies on previous context
- Flag any ambiguities requiring clarification

**Step 1.3: Route Decision**
- Determine which Specialist bot is needed
- Check if Validator pre-review required
- Identify priority level (routine/complex/urgent)
- Prepare context package for Specialist

### Phase 2: Processing (Specialist Bot)

**Step 2.1: Context Review**
- Load conversation history
- Understand user requirements
- Identify constraints and preferences
- Plan execution approach

**Step 2.2: Core Processing**
- Execute primary task logic
- Apply domain expertise
- Generate candidate response(s)
- Document reasoning and assumptions

**Step 2.3: Quality Check (Self-Review)**
- Verify completeness and accuracy
- Check for logical consistency
- Ensure requirements met
- Identify confidence level

**Step 2.4: Prepare for Validation**
- Format output for easy review
- Highlight critical decisions
- Note any uncertainties
- Prepare supporting documentation

### Phase 3: Validation (Validator Bot)

**Step 3.1: Safety Review**
- Check for prohibited content
- Verify compliance with guardrails
- Assess harm potential
- Flag sensitive decisions

**Step 3.2: Accuracy Verification**
- Fact-check claims
- Verify technical correctness
- Check logical soundness
- Validate against domain standards

**Step 3.3: Completeness Check**
- Ensure all requirements addressed
- Verify edge cases considered
- Check for missing information
- Assess response quality

**Step 3.4: Issue Identification**
- Document specific problems found
- Prioritize issues by severity
- Suggest corrections
- Assess if output acceptable as-is

### Phase 4: Refinement (if needed)

**Step 4.1: Issue Assessment**
- Coordinator routes issues to Specialist
- Specialist reviews Validator feedback
- Determines if revision needed

**Step 4.2: Correction Loop**
- Specialist modifies response
- Addresses specific Validator concerns
- Re-submits for validation
- (Maximum 2-3 iterations)

**Step 4.3: Final Validation**
- Validator confirms issues resolved
- Performs spot-check of changes
- Approves output

### Phase 5: Synthesis & Delivery (Coordinator Bot)

**Step 5.1: Format Output**
- Structure response appropriately
- Add necessary explanations
- Include relevant context
- Format for readability

**Step 5.2: Add Metadata**
- Include confidence indicators
- Note limitations or caveats
- Provide source citations
- Document key decisions

**Step 5.3: Deliver to User**
- Present formatted response
- Offer follow-up options
- Log completion
- Store in history

## Workflow Variants

### Simple Queries (Fast Path)
```
Input → Parse → Specialist → Self-Validate → Deliver
Timeline: ~500ms
```

### Complex Requests (Full Path)
```
Input → Parse → Specialist → Validator → Refine (if needed) → Deliver
Timeline: ~2-3 seconds
```

### High-Risk Operations
```
Input → Parse → Pre-Validator Review → Specialist → Validator → Deliver
Timeline: ~3-5 seconds
```

## Decision Trees

### Specialist Route Selection
- **Writing/Creative**: Creative Specialist
- **Analysis/Research**: Analytical Specialist
- **Technical/Code**: Technical Specialist
- **Multi-domain**: Coordinator handles coordination

### Validation Bypass Conditions
- Routine clarifications
- Simple factual questions
- User explicitly waives validation
- (Note: Safety checks never bypass)

### Escalation Triggers
- Contradictory guidance needed
- Multiple valid approaches
- Significant risk/benefit tradeoff
- Novel or unprecedented situation

## Performance Targets

| Phase | Target Time | Acceptable Range |
|-------|------------|-----------------|
| Parse | 100ms | 50-200ms |
| Process | 1000ms | 500-3000ms |
| Validate | 500ms | 200-1500ms |
| Refine | 1000ms | 500-2000ms |
| Synthesize | 200ms | 100-500ms |
| **Total** | **2.8s** | **1.5-7.2s** |

## Error Handling

### Specialist Errors
1. Return error to Validator
2. Validator escalates if critical
3. Coordinator re-routes or requests clarification
4. User notified of issue

### Validator Errors
1. Specialist notified
2. Coordinator reviews discrepancy
3. Issue escalated for resolution
4. Adjustment made to validation rules

### Coordinator Errors
1. Attempt recovery with same approach
2. If fails, escalate to backup protocol
3. User offered alternative paths
4. Incident logged for review

## Continuous Improvement

- Daily: Performance metrics reviewed
- Weekly: Workflow issues analyzed
- Monthly: Process optimizations tested
- Quarterly: Major improvements deployed
