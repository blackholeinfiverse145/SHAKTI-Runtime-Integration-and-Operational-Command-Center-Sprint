# SHAKTI Operational Command Center Dashboard Zoning

**Project:** SHAKTI Runtime Integration and Operational Command Center
**Owner:** Pratik Bhuwad
**Module:** Dashboard Zoning
**Version:** 1.0

---

# 1. Purpose

This document defines the physical layout of the SHAKTI Operational Command Center dashboard.

Dashboard zoning establishes how operational information is organized on the screen, ensuring that users can quickly understand system status, identify critical events, and navigate operational data with minimal cognitive effort.

The zoning strategy follows an "importance-first" approach where critical information occupies the highest visual priority.

---

# 2. Dashboard Design Goals

The dashboard layout has been designed to satisfy the following goals:

* Display critical information within five seconds.
* Minimize scrolling during operational monitoring.
* Group related operational information together.
* Maintain consistent spacing and alignment.
* Support responsive layouts for different screen sizes.
* Enable future expansion without redesigning the dashboard.

---

# 3. Dashboard Grid Structure

The dashboard uses a CSS Grid layout.

The layout is divided into horizontal operational zones.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                          │
└──────────────────────────────────────────────────────────────────────────────┘

┌────────────┬────────────┬────────────┬────────────┐
│ KPI Card 1 │ KPI Card 2 │ KPI Card 3 │ KPI Card 4 │
└────────────┴────────────┴────────────┴────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│ National Grid Status         │ Live Alert Queue            │
└──────────────────────────────┴──────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│ Risk Heatmap                 │ Forecast Panel              │
└──────────────────────────────┴──────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│ Incident Queue               │ Operational Timeline         │
└──────────────────────────────┴──────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│ System Health                │ Replay Status               │
└──────────────────────────────┴──────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     Evidence Panel                           │
└──────────────────────────────────────────────────────────────┘
```

The dashboard is designed to keep the highest-priority information within the user's initial viewport.

---

# 4. Dashboard Zones

## Zone 1 — Header

Purpose:

* Display application branding.
* Display current date and time.
* Display logged-in user information.
* Provide global navigation and actions.

Priority:

Highest

---

## Zone 2 — Executive Summary

Purpose:

Provide an immediate overview of national operational status.

Components:

* Executive Metric Card
* KPI Card

Information:

* Active Incidents
* Grid Availability
* Critical Alerts
* System Health Score

Priority:

Highest

---

## Zone 3 — National Grid Status

Purpose:

Provide a visual overview of the national power grid.

Components:

* Map Card
* Status Card

Information:

* Regional Status
* Grid Connectivity
* Operational State

Priority:

High

---

## Zone 4 — Live Alert Queue

Purpose:

Display operational alerts in real time.

Components:

* Alert Card

Information:

* Alert Severity
* Alert Time
* Alert Description
* Alert Source

Priority:

High

---

## Zone 5 — Risk Heatmap

Purpose:

Visualize geographic operational risks.

Components:

* Map Card

Information:

* Risk Level
* Region
* Threat Classification

Priority:

High

---

## Zone 6 — Forecast Panel

Purpose:

Display predictive operational insights.

Components:

* Forecast Card

Information:

* Load Forecast
* Demand Prediction
* Renewable Forecast

Priority:

Medium

---

## Zone 7 — Incident Queue

Purpose:

Display active operational incidents.

Components:

* Incident Card

Information:

* Incident ID
* Severity
* Assigned Region
* Current Status

Priority:

Medium

---

## Zone 8 — Operational Timeline

Purpose:

Display chronological operational events.

Components:

* Timeline Card

Information:

* Event History
* Operator Actions
* System Events

Priority:

Medium

---

## Zone 9 — System Health

Purpose:

Display runtime service availability.

Components:

* Status Card

Information:

* API Status
* Runtime Health
* Service Availability

Priority:

Medium

---

## Zone 10 — Replay Status

Purpose:

Display historical replay execution status.

Components:

* Replay Card

Information:

* Replay Progress
* Replay Duration
* Replay State

Priority:

Low

---

## Zone 11 — Evidence Panel

Purpose:

Display evidence and provenance supporting operational decisions.

Components:

* Evidence Card

Information:

* Source
* Confidence
* Timestamp
* Supporting Evidence

Priority:

Low

---

# 5. Visual Hierarchy

The dashboard follows three levels of visual importance.

### Level 1 — Immediate Awareness

* Header
* Executive Summary
* National Grid Status
* Live Alert Queue

---

### Level 2 — Operational Analysis

* Risk Heatmap
* Forecast Panel
* Incident Queue

---

### Level 3 — Investigation

* Timeline
* Replay Status
* System Health
* Evidence Panel

---

# 6. Responsive Layout Strategy

## Desktop (≥1440px)

* Full CSS Grid
* Two-column operational layout
* Four KPI cards in a single row

---

## Laptop (1024–1439px)

* Two-column layout
* KPI cards wrap into two rows if necessary

---

## Tablet (768–1023px)

* Single-column layout for operational panels
* KPI cards displayed in two columns

---

## Mobile (<768px)

* Single-column layout
* All dashboard sections stacked vertically
* Navigation simplified for touch interaction

---

# 7. Component Mapping

| Dashboard Zone       | Primary Component     |
| -------------------- | --------------------- |
| Header               | Header                |
| Executive Summary    | Executive Metric Card |
| Executive Summary    | KPI Card              |
| National Grid Status | Map Card              |
| National Grid Status | Status Card           |
| Live Alert Queue     | Alert Card            |
| Risk Heatmap         | Map Card              |
| Forecast Panel       | Forecast Card         |
| Incident Queue       | Incident Card         |
| Operational Timeline | Timeline Card         |
| System Health        | Status Card           |
| Replay Status        | Replay Card           |
| Evidence Panel       | Evidence Card         |

---

# 8. Conclusion

The dashboard zoning strategy organizes operational information according to business priority and user workflow. By separating the interface into clearly defined operational zones, the dashboard provides rapid situational awareness, efficient navigation, and a scalable structure that supports future enhancements while maintaining a consistent user experience.
