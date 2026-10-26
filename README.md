 Final Navigation

The existing navigation should be expanded without destroying the existing structure.

SITEFORCE
│
├── Dashboard
│
├── Workforce
│   ├── Employees
│   ├── Add Employee
│   ├── Employee Profile
│   ├── Documents
│   ├── Skills
│   └── Training
│
├── Attendance
│   ├── Live Attendance
│   ├── Check-In
│   ├── Check-Out
│   ├── Attendance History
│   ├── Face Registration
│   └── Attendance Exceptions
│
├── Shifts
│   ├── Shift Templates
│   ├── Create Shift
│   ├── Assign Shifts
│   ├── Shift Calendar
│   ├── Employee Shift History
│   └── Overtime
│
├── Locations
│   ├── Sites
│   ├── Geofences
│   ├── Restricted Zones
│   └── Location Events
│
├── Leave
│   ├── Leave Types
│   ├── Apply Leave
│   ├── Approvals
│   ├── Leave Calendar
│   └── Leave Balance
│
├── Payroll
│   ├── Payroll Dashboard
│   ├── Salary Structures
│   ├── Advances
│   ├── Overtime
│   ├── Deductions
│   ├── Payroll Runs
│   ├── Payment Batches
│   ├── Payment Exceptions
│   ├── Reconciliation
│   └── Employee Ledger
│
├── Analytics
│   ├── Workforce Analytics
│   ├── Attendance Analytics
│   ├── Productivity
│   ├── Site Analytics
│   └── Payroll Analytics
│
├── AI Intelligence
│   ├── Anomaly Detection
│   ├── Attrition Risk
│   ├── Workforce Forecast
│   ├── Skill Gap
│   └── AI Reports
│
├── AI Copilot
│
├── Security
│   ├── Devices
│   ├── Security Events
│   ├── Access Control
│   └── Audit Logs
│
├── Users & Roles
│
├── Projects
│
├── Reports
│
└── Settings
5. SHIFT MANAGEMENT — FULL REQUIREMENT

This must be implemented as a real module.

5.1 Create Shift

Admin/authorized manager can create:

Shift Name
Shift Code
Start Time
End Time
Break Duration
Standard Working Hours
Overtime Allowed
Overtime Rule
Grace Period
Late Mark Rule
Half-Day Rule
Applicable Site
Applicable Department
Applicable Employee Type
Status

Example:

Shift:
Morning Shift

Start:
08:00 AM

End:
05:00 PM

Break:
01:00 hour

Standard Hours:
08:00

Grace Period:
15 minutes

Overtime:
Enabled
6. Shift Types

Support:

Fixed shift
Rotating shift
Flexible shift
Overnight shift
Weekly recurring shift
Custom schedule

Overnight example:

10:00 PM → 06:00 AM

The system must correctly associate checkout with the correct shift even when the shift crosses midnight.

7. Assign Shift

Admin/Manager can assign a shift to:

Individual employee
Multiple employees
Department
Site
Team

Example:

Employee A
↓
Morning Shift
↓
Site A
↓
01 Sep – 30 Sep

Assignment must include:

employee_id
shift_id
site_id
start_date
end_date
assigned_by
status
8. Shift History

Every assignment change must remain in history.

Example:

01 Sep:
Morning Shift

15 Sep:
Evening Shift

25 Sep:
Night Shift

Never overwrite historical attendance context.

9. Shift Calendar

Provide:

Day view
Week view
Month view
Employee filter
Site filter
Department filter
Shift filter

Use clear states:

Scheduled
Present
Late
Absent
Leave
Overtime
Shift Changed
10. Shift + Attendance Integration

Attendance must use the employee's assigned shift.

Employee
 ↓
Assigned Shift
 ↓
Shift Start
 ↓
Grace Period
 ↓
Face + Liveness
 ↓
GPS + Geofence
 ↓
Device Verification
 ↓
Check-In

System calculates:

On time
Late
Half day
Absent
Early checkout
Overtime
11. Employee Management

Employee profile must support:

Personal Information
Employment Information
Department
Designation
Site
Manager
Joining Date
Salary Structure
Shift
Leave Policy
Skills
Training
Face Registration
Bank Account
Payment Beneficiary Authorization
Device(s)
Attendance
Payroll
Advances
Documents
Audit History
12. FACE REGISTRATION

Face registration must be a controlled enrollment process.

Employee
 ↓
Camera Permission
 ↓
Face Detection
 ↓
Capture/Enrollment
 ↓
Quality Check
 ↓
Face Embedding
 ↓
Secure Storage
 ↓
Enrollment Record

Do not store unnecessary raw images indefinitely.

Provide:

Enrollment status
Re-enrollment
Deactivation
Audit history
13. FACE CHECK-IN

Required validation:

Camera
 ↓
Face Detection
 ↓
Liveness
 ↓
Face Match
 ↓
GPS
 ↓
Geofence
 ↓
Restricted Zone Check
 ↓
Device Verification
 ↓
Shift Validation
 ↓
Attendance Record

If any required validation fails:

Attendance NOT marked
+
Reason recorded
+
Security/audit event where appropriate
14. FACE CHECK-OUT

Same validation model where configured:

Face
 ↓
Liveness
 ↓
GPS
 ↓
Geofence
 ↓
Device
 ↓
Check-Out
 ↓
Working Hours
 ↓
Overtime

Prevent:

Duplicate checkout
Checkout before valid check-in unless authorized
Impossible timestamps
Invalid shift association
15. LIVENESS

Liveness is a security layer, not just a UI animation.

It should detect presentation/replay attacks as far as technically supported.

Possible active challenge:

Look Left
Look Right
Blink
Head Movement

The exact production-grade method should be selected according to the biometric SDK/model being used.

Store:

Liveness result
Score/confidence where supported
Timestamp
Attempt ID
Failure reason
Model/version

Never claim biometric security is perfect.

16. GPS + GEOFENCING

Each work site can have:

Site Name
Latitude
Longitude
Radius
Status
Allowed Attendance

Attendance:

Employee GPS
 ↓
Distance from Site
 ↓
Inside allowed radius?

If outside:

❌ Check-in rejected
Reason:
Outside permitted geofence

Location data should be collected only when required for legitimate attendance/security operations.

17. MULTI-SITE

Support multiple locations:

Site A
Site B
Site C

Each site can have:

Employees
Managers
Shifts
Geofence
Restricted zones
Attendance rules
18. RESTRICTED ZONES

Within a site:

SITE
┌─────────────────────────┐
│                         │
│ Attendance Area         │
│                         │
│       ┌──────────┐      │
│       │ RESTRICT │      │
│       │   ZONE   │      │
│       └──────────┘      │
│                         │
└─────────────────────────┘

Restricted zone record:

name
site_id
coordinates/geometry
severity
active
allowed_roles

A configured security event can be created when an authorized location event indicates entry into a restricted zone.

Avoid unnecessary continuous employee tracking.

19. DEVICE VERIFICATION

Employee devices can be registered.

Employee
 ↓
Device Registration
 ↓
Verification
 ↓
Trusted Device

Device record:

device_id
employee_id
device_type
platform
device_label
verification_status
registered_at
last_seen_at
revoked_at

Unknown device:

⚠️ Verification Required

Admin can:

View devices
Revoke device
Approve device
Review device events
20. LEAVE MANAGEMENT

Support:

Paid Leave
Unpaid Leave
Sick/other configurable leave types
Leave balance
Leave approval
Rejection
Cancellation
Leave calendar

Workflow:

Employee
 ↓
Apply Leave
 ↓
Manager
 ↓
Approve/Reject
 ↓
Attendance Update
 ↓
Payroll Impact
21. PAYROLL — MASTER REQUIREMENT

Payroll must be a configurable engine.

Gross Earnings
+ Overtime
+ Bonus
+ Incentives
+ Other Earnings
- Unpaid Leave
- Salary Advances
- Emergency Advances
- Other Approved Deductions
= NET PAYABLE

Never hard-code:

₹20,000
₹1,500
26 days

These must come from rules/configuration.

22. SUNDAY / WEEKLY ADVANCE

Example configuration:

Advance Type:
Weekly

Day:
Sunday

Amount:
₹1,500

Recovery:
Monthly Payroll

Status:
Active

If four eligible Sunday advances are paid:

₹1,500 × 4 = ₹6,000

The system records each payment separately.

23. EMERGENCY ADVANCE

Example:

Employee A
Emergency Advance
₹3,000
Reason: Emergency

Flow:

Request
 ↓
Manager/HR Approval
 ↓
Payment
 ↓
Advance Ledger
 ↓
Payroll Recovery

Emergency advance must never be silently merged into salary.

24. ADVANCE RECOVERY

Support:

Current Payroll
Next Payroll
2 Installments
3 Installments
Custom Installments

Maintain:

Original Amount
Recovered Amount
Outstanding Balance
Recovery Schedule
25. ALTERNATE EMPLOYEE BENEFICIARY

Core business rule:

Salary Owner ≠ Payment Beneficiary

Example:

Employee A owns salary
Employee C receives payment

Do NOT overwrite Employee A's bank account with Employee C's account.

26. BENEFICIARY AUTHORIZATION

Flow:

Employee A requests
 ↓
Select Employee C
 ↓
Employee A confirms
 ↓
Employee C confirms
 ↓
HR/Finance approves
 ↓
Beneficiary becomes eligible

Record:

request_id
salary_owner
beneficiary
reason
amount/period where applicable
employee_confirmation
beneficiary_confirmation
approval
timestamps
status
valid_from
valid_until

Allow revocation/expiry and preserve historical records.

27. EMPLOYEE FINANCIAL LEDGER

Every financial event becomes a ledger entry.

Examples:

Salary
Sunday Advance
Emergency Advance
Overtime
Bonus
Leave Deduction
Other Deduction
Final Payroll Payment
Advance Recovery

The ledger must allow HR to answer:

What happened to this employee's money?

without manually searching multiple screens.

28. BULK PAYROLL PAYMENT

Create a payroll run:

Draft
 ↓
Calculate
 ↓
Validate
 ↓
Exceptions
 ↓
Review
 ↓
Approval
 ↓
Payment Batch
 ↓
Bank/Provider
 ↓
Processing
 ↓
Success/Failure
 ↓
Reconciliation

The system must support bulk payment batches through an authorized banking/payment-provider integration.

OTP rule

SiteForce must NOT:

Store bank OTPs
Bypass bank authentication
Pretend that it can guarantee one OTP

The exact authentication/OTP flow belongs to the bank/payment provider.

SiteForce should submit one approved payment batch where the provider supports bulk processing.

29. PAYMENT EXCEPTIONS

Before submission:

Invalid bank details
Account verification failed
Beneficiary not confirmed
Approval pending
Duplicate payment
Conflicting beneficiary
Missing required information

Only eligible transactions enter the final batch.

30. DUPLICATE PAYMENT PROTECTION

Check:

Employee
Payroll Period
Payment Type
Payment Reference
Status

Prevent:

Duplicate payroll
Duplicate advance
Duplicate beneficiary payment
Repeated submission after timeout

Use idempotency keys/reference IDs where the provider supports them.

31. PAYMENT RECONCILIATION

After provider/bank processing:

Submitted Amount
vs
Provider Result
vs
SiteForce Transaction

Each transaction becomes:

SUCCESS
FAILED
PENDING
REVERSED

Failed payments should be retryable individually where supported.

32. RBAC

Minimum roles:

Super Admin

Full system access.

HR
Employees
Leave
Payroll
Reports
Finance
Payroll
Advances
Payments
Reconciliation
Reports
Manager
Team
Attendance
Shifts
Leave Approval
Performance
Employee
Own Profile
Own Attendance
Own Leave
Own Payroll
Own Advances
Own Beneficiary Requests

Permissions must be enforced server-side.

33. ADVANCED AUDIT

Every sensitive action must create an immutable-style audit record.

Examples:

Employee created
Employee updated
Salary changed
Bank account changed
Beneficiary requested
Beneficiary accepted
Beneficiary rejected
Advance requested
Advance approved
Payroll generated
Payroll modified
Payroll approved
Payment submitted
Payment succeeded
Payment failed
Role changed
Device registered
Device revoked
Geofence changed
Restricted zone changed
AI report generated

Audit fields:

event_id
actor_user_id
action
entity_type
entity_id
old_value where appropriate
new_value where appropriate
reason
timestamp
result
request/payment reference

Sensitive values must be masked.

34. ANALYTICS

Dashboard metrics:

Total Employees
Present Today
Absent Today
Late Today
On Leave
Active Sites
Active Shifts
Overtime Hours
Payroll Cost
Advance Outstanding
Attendance Rate

Charts:

Attendance trend
Absence trend
Overtime trend
Payroll trend
Site comparison
Department comparison
Shift utilization
35. ML ANOMALY DETECTION

Build a data pipeline from authorized historical workforce data.

Possible signals:

Unusual check-in time
Unusual check-out time
Repeated location anomalies
Unusual attendance pattern
Unusual overtime
Repeated failed biometric attempts
Unexpected device changes

Possible models:

Isolation Forest
Local Outlier Factor
statistical thresholds
clustering

Output:

Anomaly Score
Severity
Detected Pattern
Explanation
Related Event

Do not automatically punish or terminate employees based only on an ML score.

36. ATTRITION PREDICTION

Use authorized workforce signals such as:

Tenure
Attendance trends
Leave trends
Overtime
Performance trends
Training activity
Workload indicators

Output:

Low
Medium
High

Also show contributing signals.

Example:

Risk: Medium

Signals:
Increasing absence
High overtime
Declining performance trend

This is decision support, not an automatic employment decision.

37. WORKFORCE FORECASTING

Inputs:

Historical workforce
Attendance
Leave
Projects
Shift requirements
Workload
Seasonality where applicable

Output:

Required Workforce
Available Workforce
Projected Shortage
Projected Surplus

Example:

Next Week

Required: 420
Available: 385
Shortage: 35

Forecasts should show the period and model/data basis.

38. SKILL GAP AI

Employee:

Skills:
Java
React
SQL

Project requirement:

Java
React
SQL
Spring Boot
AWS

AI output:

Missing:
Spring Boot

Needs Improvement:
AWS

Strong:
Java
React
SQL

Then recommend training.

39. GEMINI WORKFORCE COPILOT

Copilot must only access data the logged-in user is authorized to access.

Example questions:

How many employees were absent today?

Which site has the highest absenteeism?

Who worked overtime this week?

How much advance has Employee A taken?

What is the projected workforce requirement next month?

Which skills are missing for Project Alpha?

Generate this month's workforce report.

Architecture:

User
 ↓
Authentication
 ↓
RBAC
 ↓
Authorized Data Retrieval
 ↓
Context Preparation
 ↓
Gemini
 ↓
Response

Never allow the model to bypass application authorization.

40. AI REPORT GENERATION

Button:

Generate AI Report

Possible report:

Monthly Workforce Report

Employees
Attendance
Absenteeism
Overtime
Payroll
Advances
Anomalies
Forecast
Skill Gaps

AI Summary
Key Observations
Recommended Actions

Reports should clearly distinguish:

factual system data
calculated metrics
AI-generated interpretation
41. SETTINGS — MUST BE FULLY FUNCTIONAL

The current Settings page contains:

Company Information
Attendance Rules
Working Hours
Notifications
Theme
User Preferences
Security
Backup

These must become real persisted settings.

42. COMPANY INFORMATION

Fields:

Company Name
Registration Number
Contact Email
Contact Phone
Registered Address
Logo
Default Currency

Used by:

Reports
Payslips
Notifications
Documents
43. ATTENDANCE RULES

Settings:

Geo-fenced Check-in
Biometric Verification
Manual Entry
Late Mark After
Half-Day Threshold
Early Checkout Rule
Multiple Check-in Policy
Multiple Checkout Policy

Changes must affect attendance logic.

Example:

Late Mark After = 15 minutes

must actually change late calculation.

44. WORKING HOURS / SHIFT SETTINGS

Current Settings page includes:

Shift Start
Shift End
Standard Hours / Day
Overtime Rate

These should integrate with the dedicated Shift Management module.

Global defaults can exist, but employee/site/shift-specific rules should override them when configured.

45. NOTIFICATIONS

Support:

Daily Attendance Summary
Absence Alerts
Payroll Reminders
SMS Notifications
Leave Notifications
Advance Approval Notifications
Payment Failure Alerts
Security Alerts

Notification preferences should be persisted per user/organization.

46. THEME

Existing:

Light
Dark
System

Persist selection.

Do not break the current UI theme.

47. USER PREFERENCES

Current settings:

Language
Time Zone
Currency
Date Format

These must actually affect:

displayed dates
displayed currency
timestamps
localization where implemented

Default timezone:

Asia/Kolkata
48. SECURITY SETTINGS

Current settings:

Two-factor authentication
SSO
Session timeout
Password expiry

Implement:

MFA/2FA
session expiration
secure password policy
role-aware access
login event logging
failed-login protection

SSO should be treated as an integration feature and only enabled after provider configuration.

49. BACKUP

Current settings include:

Automatic Daily Backup
Backup Frequency
Retention Period
Last Backup

These must reflect the real backend backup strategy.

Possible frequencies:

Hourly
Daily
Weekly

Retention:

30 days
90 days
1 year

Do not present a fake "last backup" timestamp.

If actual automated backup infrastructure is not connected yet, show:

Not configured

instead of pretending a backup happened.

50. DATA MODEL — MASTER

Recommended core tables/entities:

users
roles
permissions
user_roles
role_permissions

employees
employee_documents
employee_skills
training_records

sites
geofences
restricted_zones
location_events

devices
device_verifications

face_enrollments
biometric_events
liveness_events

shift_templates
shift_assignments
shift_changes
shift_attendance

attendance
attendance_events

leave_types
leave_balances
leave_requests

salary_structures
payroll_rules
payroll_runs
payroll_items

salary_advances
advance_recoveries

overtime_records
bonus_records
deduction_records

employee_bank_accounts
payment_beneficiaries
beneficiary_requests

payment_batches
payment_transactions
payment_reconciliation

financial_ledger

projects
tasks
performance_records

audit_logs
approval_requests
notifications

ml_predictions
anomaly_events
workforce_forecasts
skill_gap_results

ai_reports
ai_conversations

workspace_settings
attendance_settings
notification_settings
security_settings
backup_settings
51. KEY RELATIONSHIPS
EMPLOYEE
 │
 ├── SHIFT ASSIGNMENTS
 ├── ATTENDANCE
 ├── LEAVE
 ├── OVERTIME
 ├── SALARY
 ├── ADVANCES
 ├── BANK ACCOUNTS
 ├── BENEFICIARY REQUESTS
 ├── DEVICES
 ├── FACE ENROLLMENT
 ├── SKILLS
 └── PAYROLL
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
 RECONCILIATION
        │
        ↓
 AUDIT
52. API STRUCTURE

Example backend API groups:

/api/auth
/api/users
/api/roles
/api/employees
/api/shifts
/api/shift-assignments
/api/attendance
/api/biometric
/api/liveness
/api/locations
/api/geofences
/api/restricted-zones
/api/devices
/api/leave
/api/payroll
/api/advances
/api/overtime
/api/beneficiaries
/api/payment-batches
/api/payments
/api/reconciliation
/api/reports
/api/analytics
/api/ml/anomalies
/api/ml/attrition
/api/ml/forecast
/api/ai/skill-gap
/api/ai/copilot
/api/ai/reports
/api/audit
/api/settings
/api/notifications
53. BACKEND SECURITY RULE

Every protected endpoint must perform:

Authenticate
 ↓
Identify User
 ↓
Check Role
 ↓
Check Permission
 ↓
Check Resource Ownership/Scope
 ↓
Validate Input
 ↓
Execute
 ↓
Audit Sensitive Action

Never trust:

employee_id
role
salary
amount
beneficiary

sent from the browser without server-side validation.

54. FINANCIAL SECURITY

Bank information is sensitive.

Implement:

Encryption for sensitive account information
Masked account numbers
Server-only secrets
No bank credentials in frontend
No OTP storage
MFA for sensitive operations
Maker-checker approvals
Audit trail
Duplicate-payment protection
Provider webhook verification
Reconciliation
55. PAYMENT PRINCIPLE

The system must maintain these separately:

SALARY OWNER
      ≠
PAYMENT BENEFICIARY
      ≠
PAYMENT TRANSACTION

Example:

Salary Owner:
Employee A

Beneficiary:
Employee C

Transaction:
PAY-2026-00981

Amount:
₹14,500

Status:
SUCCESS
56. ADVANCE PRINCIPLE

Never alter salary just because an advance was paid.

Instead:

Salary = Earning

Advance = Separate Financial Event

Recovery = Separate Deduction/Event

This makes the system auditable.

57. PAYROLL CALCULATION EXAMPLE
Monthly Salary            ₹20,000
Overtime                   +₹2,000
Sunday Advances            -₹4,500
Emergency Advance          -₹3,000
Unpaid Leave               -₹X
Bonus                      +₹X
Other Deductions           -₹X
----------------------------------
NET PAYABLE                 ₹X

The payroll engine must calculate this dynamically.

58. UI REQUIREMENTS

The existing SiteForce visual identity should remain the base.

New UI must be consistent with existing:

Sidebar
Header
Cards
Tables
Modals
Forms
Charts
Status badges
Dark/light theme

Do not create unrelated visual styles for individual modules.

59. UX REQUIREMENTS

Every major action should have:

Loading State
Success State
Error State
Validation Message
Empty State
Permission State
Confirmation Modal where needed

Examples:

No employees found
No shifts assigned
No payroll exceptions
No pending approvals
No anomaly detected
No payment transactions
60. NOTIFICATION EVENTS

Generate notifications for:

Leave submitted
Leave approved
Leave rejected
Shift assigned
Shift changed
Advance requested
Advance approved
Advance rejected
Beneficiary request
Beneficiary confirmation
Payroll ready
Payroll approved
Payment success
Payment failure
Security alert
Device approval
Anomaly detected
AI report ready
61. IMPLEMENTATION ORDER

Do NOT build everything at once.

Phase 1 — Existing Project Stabilization
Inspect existing routes/components
Identify current APIs
Identify current database
Preserve working UI
Remove mock-only dependencies where needed
Establish clean environment variables
Establish API error handling
Phase 2 — Authentication + RBAC
Users
Roles
Permissions
Sessions
MFA
Server-side authorization
Audit login events
Phase 3 — Employee + Shift Management
Employee CRUD
Shift templates
Create shift
Assign shift
Shift calendar
Shift history
Shift changes
Phase 4 — Attendance
Face enrollment
Face recognition
Liveness
Check-in
Check-out
GPS
Geofence
Device verification
Attendance exceptions
Phase 5 — Locations & Security
Sites
Geofences
Restricted zones
Location events
Devices
Security events
Phase 6 — Leave
Leave types
Balances
Requests
Approval
Attendance integration
Payroll integration
Phase 7 — Payroll Foundation
Salary structures
Payroll rules
Payroll runs
Payroll calculation
Ledger
Phase 8 — Advances
Sunday/weekly advances
Emergency advances
Approval
Payment record
Recovery schedules
Outstanding balances
Phase 9 — Payment Routing
Employee bank accounts
Alternate beneficiaries
Employee confirmation
Beneficiary confirmation
HR/Finance approval
Beneficiary history
Phase 10 — Bulk Payment
Payroll batches
Validation
Exceptions
Provider integration
Status
Retry
Reconciliation
Phase 11 — Analytics
Workforce analytics
Attendance analytics
Payroll analytics
Site analytics
Overtime analytics
Phase 12 — ML
Data pipeline
Anomaly detection
Attrition-risk model
Workforce forecasting
Skill-gap analysis
Phase 13 — Gemini
Authorized data retrieval
Copilot
AI reports
Explainable responses
Conversation history where appropriate
Phase 14 — Settings

Make every existing Settings control functional and connected to real configuration.

Phase 15 — Testing + Production Hardening
Unit tests
Integration tests
E2E tests
Security testing
Permission testing
Payment idempotency testing
Failure/retry testing
Backup/restore testing
Performance testing
Production deployment
62. TEST SCENARIOS — MUST PASS
Employee
Create employee
Edit employee
Deactivate employee
View employee history
Shift
Create shift
Assign shift
Change shift
Remove assignment
Overnight shift
Overtime
Attendance
Valid face + valid liveness + valid GPS = SUCCESS
Wrong face = FAIL
Spoof/liveness failure = FAIL
Outside geofence = FAIL
Untrusted device = FAIL/verification
Duplicate check-in = BLOCK
Duplicate checkout = BLOCK
Leave
Apply leave
Approve
Reject
Cancel
Payroll deduction
Payroll
Salary
Sunday advances
Emergency advance
Unpaid leave
Overtime
Bonus
Other deductions
Final net payable
Beneficiary
Employee A requests Employee C
A confirms
C accepts
HR approves
Payment eligible

Also:

C rejects
→ Payment not eligible
Payment
Batch created
Exceptions detected
Approved
Submitted
Success
Failure
Retry
Reconciliation
Security
Unauthorized role
→ API rejects request

Not merely:

Button hidden
63. PRODUCTION-QUALITY RULES

Do not use:

Hard-coded salary calculations
Hard-coded permissions
Fake success messages
Fake backup timestamps
Fake payment success
Frontend-only authorization
Plain-text secrets
Stored OTPs
Unmasked bank details
Untracked salary changes
Untracked beneficiary changes
Permanent raw biometric data without a valid need
Unnecessary continuous location tracking
64. SUCCESS CRITERIA

SiteForce is considered complete only when an authorized administrator can perform the following end-to-end:

Create Employee
       ↓
Create Shift
       ↓
Assign Shift
       ↓
Register Face
       ↓
Register/Verify Device
       ↓
Configure Site + Geofence
       ↓
Employee Checks In
       ↓
Face + Liveness + GPS + Geofence + Device
       ↓
Employee Works
       ↓
Leave / Overtime / Advances
       ↓
Employee Checks Out
       ↓
Payroll Calculation
       ↓
Employee A requests Employee C as beneficiary
       ↓
A confirms
       ↓
C confirms
       ↓
HR/Finance approves
       ↓
Payroll Batch
       ↓
Validation
       ↓
Payment Provider
       ↓
Payment Result
       ↓
Reconciliation
       ↓
Financial Ledger
       ↓
Audit Log
       ↓
Reports / Analytics / AI
65. FINAL PRODUCT
SITEFORCE
AI-Powered Workforce Management, Attendance, Payroll & Business Intelligence Platform

The final system combines:

WORKFORCE
+
SHIFTS
+
BIOMETRICS
+
LIVENESS
+
GPS
+
GEOFENCING
+
RESTRICTED ZONES
+
DEVICES
+
LEAVE
+
PAYROLL
+
ADVANCES
+
PAYMENT ROUTING
+
RBAC
+
AUDIT
+
ANALYTICS
+
MACHINE LEARNING
+
GEMINI AI
66. Golden Architecture
                    SITEFORCE
                        │
       ┌────────────────┼────────────────┐
       │                │                │
   WORKFORCE        ATTENDANCE        PAYROLL
       │                │                │
 Employees           Face             Salary
 Shifts              Liveness         Advances
 Skills              GPS              Leave
 Training            Geofence         Overtime
 Projects            Device           Bonus
       │                │                │
       └────────────────┼────────────────┘
                        ↓
                  DATA PLATFORM
                        │
              ┌─────────┼─────────┐
              │         │         │
             SQL       ML        AI
              │         │         │
              │      Anomaly     Gemini
              │      Attrition   Copilot
              │      Forecast    Reports
              │      Skill Gap
              │
              ↓
         PAYMENT ENGINE
              │
        ┌─────┴─────┐
        │           │
     OWN BANK   BENEFICIARY
        │           │
        └─────┬─────┘
              ↓
       PAYMENT BATCH
              ↓
       BANK/PROVIDER
              ↓
       RECONCILIATION
              ↓
           AUDIT
67. Final Payroll Rule

Payroll Calculation, Payment Routing, Payment Execution, Reconciliation, and Audit are separate concerns.

This allows SiteForce to remain flexible when payroll rules change.

68. Final Scope Note
Included now
Bank-based payments
Alternate employee beneficiary
Employee confirmation
Beneficiary confirmation
HR/Finance approval
Salary advances
Weekly/Sunday advances
Emergency advances
Payroll recovery
Bulk payment architecture
Reconciliation
Audit
Excluded for current version
Cash settlement
Cash collection
Physical cash reconciliation

These can be introduced later as another payment method without redesigning the payroll calculation engine.

69. Delivery Standard

Every feature should be delivered as:

Database
+
Backend API
+
Business Logic
+
Frontend UI
+
Validation
+
Permissions
+
Audit
+
Error Handling
+
Testing

A feature is not complete if only its UI exists.

70. Final Instruction for Implementation

When modifying the existing SiteForce project:

First inspect the existing implementation.
Reuse existing components and styling.
Do not delete working features unnecessarily.
Add database models/migrations before dependent UI.
Add backend APIs and authorization.
Connect frontend to real APIs.
Add validation and error states.
Add audit events for sensitive operations.
Test the full workflow.
Only then mark the feature complete.

Target: A genuinely functional SiteForce product, not a static prototype.