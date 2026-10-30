# SITEFORCE — FINAL PAYROLL & PAYMENT ENGINE
## Product Requirements & Implementation README

> **Purpose:** Define the final payroll, advance, payment-routing, approval, ledger, and audit system for SiteForce Labour Suite.
>
> **Current scope:** Cash settlement is intentionally excluded for now. The system focuses on bank-based salary/advance payments and authorized alternate employee beneficiaries.

---

# 1. Executive Summary

SiteForce Payroll will not be a simple "monthly salary minus leave" calculator.

It will be a **flexible payroll and payment engine** that combines:

- Monthly salary
- Weekly/Sunday advances
- Emergency advances
- Other approved advances
- Unpaid-leave deductions
- Overtime
- Bonuses/incentives
- Other earnings and deductions
- Employee-specific payment routing
- Alternate employee beneficiary accounts
- Employee confirmation
- Beneficiary confirmation
- HR/Finance approval
- Bulk payroll payment batches
- Payment status tracking
- Reconciliation
- Complete employee financial ledger
- Advanced audit history

The most important design principle is:

> **The employee who owns the salary and the account/beneficiary receiving the money must always be recorded separately.**

Example:

**Employee A owns the salary → Employee C receives the payment**

The system must permanently record this relationship, confirmations, approvals, amount, payroll period, reason, payment transaction, and audit events.

---

# 2. Final Payroll Objective

For every payroll period, SiteForce must calculate:

```text
Gross Earnings
+ Overtime
+ Bonus / Incentive
+ Other Earnings
- Unpaid Leave Deduction
- Salary Advances
- Emergency Advances
- Other Approved Deductions
= Net Payable
```

The calculation must be rule-driven and configurable.

Do NOT hard-code values such as:

```text
salary = 20000
sundayAdvance = 1500
days = 26
```

Instead, these must come from employee salary structures and organization payroll rules.

---

# 3. Supported Payroll Components

## 3.1 Earnings

The system will support:

- Basic Monthly Salary
- Allowances
- Overtime
- Bonus
- Incentives
- Other Earnings

Each earning should have:

- Type
- Amount
- Effective date
- Payroll period
- Approval status
- Source/reference
- Created by
- Approved by

---

# 4. Weekly / Sunday Advance

SiteForce must support a recurring advance rule such as:

```text
Advance Type: Weekly
Day: Sunday
Amount: ₹1,500
Recovery: Monthly Payroll
Status: Active
```

The amount must be configurable.

Example:

```text
Monthly Salary = ₹20,000

Sunday Advance 1 = ₹1,500
Sunday Advance 2 = ₹1,500
Sunday Advance 3 = ₹1,500
Sunday Advance 4 = ₹1,500

Total Advance = ₹6,000

Remaining before other adjustments:
₹20,000 - ₹6,000 = ₹14,000
```

Every advance must create a separate financial ledger entry.

---

# 5. Emergency Advance

Employees may need extra money because of an emergency.

Example:

```text
Employee: Employee A
Type: Emergency Advance
Amount: ₹3,000
Reason: Emergency
Recovery: Current Payroll
```

Flow:

```text
Employee
   ↓
Advance Request
   ↓
Manager / HR Approval
   ↓
Payment
   ↓
Advance Ledger
   ↓
Payroll Recovery
```

The emergency advance must never be hidden inside salary.

It must remain a separate transaction.

---

# 6. Advance Recovery Flexibility

An advance can be recovered:

- In current payroll
- In next payroll
- Over 2 months
- Over 3 months
- By a custom installment plan

Example:

```text
Emergency Advance = ₹5,000

Month 1 = ₹2,500
Month 2 = ₹2,500
```

The system must maintain:

```text
Original Advance
Recovered Amount
Remaining Balance
Recovery Schedule
```

---

# 7. Unpaid Leave Deduction

Leave deduction must be configurable according to the organization's payroll policy.

Possible calculation basis:

- Scheduled working days
- Payroll working days
- Calendar days
- Other configured policy

Example:

```text
Monthly Salary = ₹20,000
Configured Payable Days = 26

Daily Rate = ₹20,000 / 26
```

For 2 unpaid leave days:

```text
Leave Deduction = Daily Rate × 2
```

The divisor must not be hard-coded.

Paid leave should not automatically reduce salary unless the configured payroll policy says so.

---

# 8. Final Payroll Example

Example employee:

```text
Monthly Salary       ₹20,000
Overtime              ₹2,000
Sunday Advances      -₹4,500
Emergency Advance    -₹3,000
Unpaid Leave         -₹1,538
--------------------------------
Net Payable          ₹12,962
```

The exact amount must be calculated by the payroll engine using configured rules.

---

# 9. Employee Financial Ledger

Every employee must have a complete financial ledger.

Example:

| Date | Type | Credit | Debit | Balance |
|---|---|---:|---:|---:|
| 01 Sep | Monthly Salary | ₹20,000 | — | ₹20,000 |
| 06 Sep | Sunday Advance | — | ₹1,500 | ₹18,500 |
| 13 Sep | Sunday Advance | — | ₹1,500 | ₹17,000 |
| 18 Sep | Emergency Advance | — | ₹3,000 | ₹14,000 |
| 20 Sep | Sunday Advance | — | ₹1,500 | ₹12,500 |
| 30 Sep | Final Settlement | — | ₹12,500 | ₹0 |

The ledger is the source of truth for employee-level financial history.

---

# 10. Alternate Employee Beneficiary

## Business Requirement

Employee A may request:

> "Pay my salary into Employee C's bank account."

The system must NOT simply replace Employee A's bank account with Employee C's account.

Instead:

```text
Salary Owner:
Employee A

Payment Beneficiary:
Employee C
```

These are separate records.

---

# 11. Alternate Beneficiary Request Flow

```text
Employee A
    ↓
Requests Alternate Beneficiary
    ↓
Selects Employee C
    ↓
Confirms Request
    ↓
Employee C Receives Confirmation
    ↓
Employee C Accepts
    ↓
HR / Finance Reviews
    ↓
Approval
    ↓
Payment Eligible
```

Both employee ownership and payment destination must remain visible in the transaction.

---

# 12. Employee A Confirmation

The employee must explicitly confirm:

```text
I confirm that I requested my salary/payment
to be transferred to the selected beneficiary.
```

Record:

- Employee ID
- Request ID
- Confirmation timestamp
- Authentication/confirmation method
- IP/device metadata where legally and operationally appropriate
- Request status

---

# 13. Employee C Confirmation

Because Employee C's account is being used, Employee C should also confirm.

Example:

```text
Payment Beneficiary Request

Employee A has requested payment
to your registered bank account.

Amount: ₹14,500
Payroll: September 2026

[Accept]
[Reject]
```

Record:

- Beneficiary employee
- Confirmation status
- Timestamp
- Authentication/confirmation method

---

# 14. HR / Finance Approval

Final approval should follow a maker-checker workflow.

```text
Employee Request
       ↓
Employee Confirmation
       ↓
Beneficiary Confirmation
       ↓
HR/Finance Review
       ↓
Approval
       ↓
Payment Eligible
```

The person who creates/modifies a sensitive payment instruction should not automatically be the sole approver.

---

# 15. Payment Routing

Every employee payment must have a payment route.

### Route A — Own Bank Account

```text
Employee A
   ↓
Own Bank Account
   ↓
Payment
```

### Route B — Authorized Alternate Employee

```text
Employee A
   ↓
Employee C
   ↓
Employee C's Verified Bank Account
   ↓
Payment
```

The system must show:

```text
Salary Owner: Employee A
Beneficiary: Employee C
Amount: ₹14,500
```

---

# 16. Beneficiary Verification

Before payment, the system should verify that:

- Beneficiary exists
- Beneficiary is active
- Bank account is registered/verified
- IFSC is valid where validation is supported
- Beneficiary authorization is active
- Required approvals are complete
- No conflicting/expired authorization exists

Bank account information must be protected.

Do not expose full account numbers unnecessarily.

---

# 17. Bulk Payroll Batch

SiteForce should not process every salary as an unrelated manual action.

It should create a payroll batch.

Example:

```text
September 2026 Payroll

Employees: 128

Gross Payroll: ₹25,84,000
Total Advances: ₹4,21,500
Leave Deductions: ₹1,08,200
Overtime: ₹82,400

Net Payable: ₹21,36,700

Payment Ready: 124
Exceptions: 4
```

---

# 18. Payroll Batch Lifecycle

```text
DRAFT
  ↓
CALCULATED
  ↓
REVIEW
  ↓
PENDING APPROVAL
  ↓
APPROVED
  ↓
SUBMITTED
  ↓
PROCESSING
  ↓
SUCCESS / PARTIAL / FAILED
  ↓
RECONCILED
```

Failed transactions should be individually identifiable and retryable.

Do not blindly retry the entire batch.

---

# 19. Bank / Payment Provider Integration

SiteForce should integrate with an authorized bank/payment provider for bulk salary disbursement.

The system should prepare and submit a payment batch through the provider's supported workflow.

Important:

- SiteForce must NOT store bank OTPs.
- SiteForce must NOT bypass bank authentication.
- Exact OTP behavior depends on the bank/payment provider.
- "One OTP for the entire batch" cannot be guaranteed by SiteForce itself.
- The architecture should support a single approved payroll batch so the authorized banking system can perform its required authentication and bulk processing.

---

# 20. Payment Transaction Record

Every payment must have a transaction record.

Example:

```text
Payment ID:
PAY-2026-00981

Payroll:
September 2026

Salary Owner:
Employee A

Beneficiary:
Employee C

Amount:
₹14,500

Payment Method:
Bank Transfer

Provider Reference:
<provider-reference>

Status:
SUCCESS

Processed At:
<timestamp>
```

---

# 21. Payment Exceptions

Before payment, SiteForce should identify issues.

Example:

```text
PAYMENT EXCEPTIONS

EMP-102
❌ Invalid bank details

EMP-117
❌ Account verification failed

EMP-123
⚠️ Beneficiary approval pending

EMP-128
⚠️ Duplicate/conflicting payment route
```

Only eligible employees should enter the final payment batch.

---

# 22. Duplicate / Double Payment Protection

The system must prevent accidental duplicate salary payments.

Before submitting payment:

```text
Employee
+
Payroll Period
+
Payment Type
+
Amount
+
Payment Status
```

must be checked.

The system should detect:

- Duplicate payroll
- Duplicate advance
- Duplicate payment request
- Already-paid payroll period
- Conflicting beneficiary instructions

Use idempotency/reference keys for payment-provider requests where supported.

---

# 23. Payment Status

Each transaction must support:

```text
DRAFT
PENDING_CONFIRMATION
PENDING_APPROVAL
APPROVED
READY
SUBMITTED
PROCESSING
SUCCESS
FAILED
CANCELLED
REVERSED
```

---

# 24. Audit System

Every sensitive payroll action must generate an audit event.

Examples:

```text
Employee A requested alternate beneficiary

Employee C accepted beneficiary request

HR approved beneficiary

Employee A requested ₹3,000 emergency advance

Manager approved advance

Payment submitted

Payment succeeded

Payroll recovered ₹3,000 advance
```

Audit record should include:

- Event ID
- User ID
- Action
- Entity type
- Entity ID
- Old value where appropriate
- New value where appropriate
- Timestamp
- Result
- Reason
- Relevant request/payment reference

Sensitive values must be masked.

---

# 25. Payroll Rules Engine

Payroll must be configurable.

Example settings:

```text
Salary Cycle:
Monthly

Weekly Advance:
Enabled

Advance Day:
Sunday

Advance Amount:
₹1,500

Leave Deduction:
Enabled

Leave Calculation Basis:
Configured Policy

Overtime:
Enabled

Advance Recovery:
Enabled

Approval:
Maker-Checker
```

Different employees may have different salary structures and policies.

---

# 26. Payroll Approval Dashboard

Finance/HR should see:

```text
Payroll Period: September 2026

Employees: 128
Calculated: 128
Exceptions: 4
Approved: 0
Ready: 124

[View Payroll]
[Resolve Exceptions]
[Submit for Approval]
```

Approver:

```text
Payroll Review

Gross: ₹25,84,000
Deductions: ₹5,29,700
Net: ₹21,36,700

[Approve]
[Reject]
[Request Changes]
```

---

# 27. Employee Payroll View

Employee should see only their authorized information:

```text
September 2026

Gross Salary       ₹20,000
Overtime            ₹2,000
Sunday Advances    -₹4,500
Emergency Advance  -₹3,000
Leave Deduction    -₹1,538
--------------------------------
Net Payable        ₹12,962
```

And:

```text
Payment Status:
PAID

Paid To:
Authorized Beneficiary

Beneficiary:
Employee C

Transaction:
PAY-2026-00981
```

Sensitive bank information must be masked.

---

# 28. Payroll Reports

Reports should include:

### Monthly Payroll Report

- Employee
- Salary
- Earnings
- Advances
- Leave deductions
- Overtime
- Other deductions
- Net payable
- Payment status

### Advance Report

- Employee
- Advance type
- Amount
- Date
- Approval
- Recovery
- Outstanding balance

### Payment Routing Report

- Salary owner
- Beneficiary
- Amount
- Authorization
- Approval
- Payment status

### Payment Exception Report

- Failed payments
- Missing verification
- Pending approvals
- Duplicate/conflict warnings

---

# 29. Final Database Model

Recommended core tables:

```text
employees
salary_structures
payroll_rules
payroll_runs
payroll_items

employee_bank_accounts
payment_beneficiaries
beneficiary_requests

salary_advances
advance_recoveries

leave_records
overtime_records
bonus_records
deduction_records

payment_batches
payment_transactions

audit_logs
approval_requests
notifications
```

Relationships:

```text
EMPLOYEE
   │
   ├── SALARY STRUCTURE
   ├── BANK ACCOUNT
   ├── BENEFICIARY REQUESTS
   ├── ADVANCES
   ├── LEAVE
   ├── OVERTIME
   └── PAYROLL ITEMS
                 │
                 ↓
            PAYROLL RUN
                 │
                 ↓
          PAYMENT BATCH
                 │
                 ↓
       PAYMENT TRANSACTION
                 │
                 ↓
            AUDIT LOG
```

---

# 30. Recommended Core Entities

## Employee Bank Account

```text
id
employee_id
bank_name
account_number_encrypted
ifsc
account_holder_name
verification_status
is_primary
created_at
updated_at
```

## Payment Beneficiary

```text
id
employee_id
beneficiary_employee_id
authorization_status
consent_status
verification_status
valid_from
valid_until
created_at
updated_at
```

## Beneficiary Request

```text
id
salary_owner_employee_id
beneficiary_employee_id
payroll_period
reason
requested_amount
employee_confirmation
beneficiary_confirmation
hr_approval
status
created_at
approved_at
```

## Salary Advance

```text
id
employee_id
advance_type
amount
reason
requested_at
approved_at
paid_at
recovery_method
recovery_start_period
remaining_balance
status
```

## Payment Transaction

```text
id
payroll_item_id
salary_owner_employee_id
beneficiary_employee_id
amount
payment_batch_id
provider_reference
status
failure_reason
submitted_at
processed_at
reconciled_at
```

---

# 31. Security Requirements

The payroll system handles highly sensitive financial information.

Implement:

- RBAC
- Least-privilege access
- Encryption for sensitive bank data
- Masked bank account display
- MFA for sensitive actions
- Maker-checker approval
- Audit logging
- Idempotent payment requests
- Secure secrets management
- No OTP storage
- No raw bank credentials in frontend
- Server-side authorization
- Rate limiting
- Session security
- Payment webhook verification
- Reconciliation
- Backup and recovery

Never rely only on frontend permission checks.

---

# 32. Final End-to-End Example

Employee A:

```text
Monthly Salary = ₹20,000
```

During month:

```text
Sunday Advance        ₹1,500
Sunday Advance        ₹1,500
Sunday Advance        ₹1,500

Emergency Advance     ₹3,000
```

Employee A requests:

```text
Pay salary to Employee C's account
```

System records:

```text
Employee A Confirmation ✓
Employee C Confirmation ✓
HR Approval             ✓
```

At payroll:

```text
Salary                 ₹20,000
Overtime                +₹2,000
Sunday Advances         -₹4,500
Emergency Advance       -₹3,000
Unpaid Leave             -₹X
--------------------------------
Net Payable              ₹X
```

Then:

```text
Salary Owner:
Employee A

Beneficiary:
Employee C

Payment:
₹X

Payroll Batch:
September 2026

Status:
Approved → Submitted → Success

Audit:
Complete
```

---

# 33. Implementation Phases

## Phase 1 — Payroll Foundation

- Salary structures
- Payroll rules
- Payroll periods
- Payroll calculation engine
- Payroll items
- Employee financial ledger

## Phase 2 — Advances

- Weekly/Sunday advance
- Emergency advance
- Other advances
- Approval workflow
- Recovery schedules
- Outstanding balances

## Phase 3 — Leave + Overtime

- Leave integration
- Unpaid leave deduction
- Overtime calculation
- Bonuses/incentives
- Other deductions

## Phase 4 — Payment Routing

- Employee bank accounts
- Alternate employee beneficiaries
- Employee confirmation
- Beneficiary confirmation
- HR/Finance approval
- Beneficiary history

## Phase 5 — Payment Batches

- Bulk payroll batch
- Payment validation
- Exceptions
- Submission
- Status tracking
- Failed payment retry
- Reconciliation

## Phase 6 — Security

- RBAC
- MFA
- Encryption
- Audit logs
- Duplicate-payment prevention
- Idempotency
- Secure webhooks
- Sensitive-data masking

## Phase 7 — Reports & Dashboard

- Payroll dashboard
- Employee ledger
- Advance reports
- Payment reports
- Exception reports
- Export functionality

---

# 34. Final Product Definition

After implementation, SiteForce Payroll should be able to answer:

### "How much does this employee actually need to receive?"

The system calculates it.

### "How much advance has this employee already taken?"

The ledger answers it.

### "Why was ₹3,000 paid?"

The advance record answers it.

### "Why is Employee C receiving Employee A's salary?"

The beneficiary request and confirmations answer it.

### "Did Employee A authorize this?"

Confirmation record answers it.

### "Did Employee C agree?"

Beneficiary confirmation answers it.

### "Who approved it?"

Approval record answers it.

### "Was the payment actually successful?"

Payment transaction + reconciliation answers it.

### "Who changed anything?"

Audit log answers it.

---

# 35. Golden Rule

> **Payroll Calculation, Payment Routing, Payment Execution, and Audit must be four separate concerns.**

```text
WORK DATA
   ↓
PAYROLL ENGINE
   ↓
FINANCIAL LEDGER
   ↓
PAYMENT ROUTING
   ↓
APPROVAL
   ↓
BANK / PAYMENT PROVIDER
   ↓
TRANSACTION
   ↓
RECONCILIATION
   ↓
AUDIT
```

This architecture gives SiteForce the flexibility to handle normal salary, recurring advances, emergency advances, unpaid leave, overtime, alternate employee bank beneficiaries, bulk payment, and future payroll rules without rewriting the entire system.

---

# 36. Out of Scope for Current Version

The following is intentionally excluded from this payroll implementation:

- Cash settlement
- Cash collection workflows
- Physical cash reconciliation

These can be added as a separate payment method in a future version without changing the core payroll engine.
