# SHAKTI Operational Command Center Dashboard Architecture

**Project:** SHAKTI Runtime Integration and Operational Command Center
**Owner:** Pratik Bhuwad
**Module:** Frontend Dashboard Architecture
**Version:** 1.0

---

# 1. Purpose

The SHAKTI Operational Command Center is designed to provide a centralized operational dashboard for monitoring the national power grid. The dashboard consolidates runtime intelligence, operational alerts, forecasting insights, incident tracking, and evidence into a single interface that enables operators and executives to make informed decisions quickly.

The primary objective is to replace static reporting with a responsive operational command center that presents real-time information in a clear, structured, and actionable manner.

---

# 2. Objectives

The dashboard architecture has been designed to achieve the following objectives:

* Provide a single operational view of the entire system.
* Display critical operational information within five seconds of opening the dashboard.
* Minimize scrolling by organizing information into logical dashboard zones.
* Support real-time runtime data integration.
* Use reusable React components for maintainability and scalability.
* Support responsive layouts for different screen sizes.
* Separate presentation logic from backend runtime services.
* Enable easy integration with APIs developed by other project modules.

---

# 3. Design Principles

The dashboard follows the following architectural principles.

## 3.1 Operational First

Operationally important information must always appear before analytical information. Critical alerts, grid status, and executive metrics receive the highest visual priority.

## 3.2 Information Hierarchy

Information is organized from high-level summaries to detailed operational data.

1. Executive Summary
2. National Grid Status
3. Active Alerts
4. Operational Analysis
5. Supporting Operational Evidence

This allows users to quickly understand the current system state before investigating individual incidents.

## 3.3 Component Reusability

Every dashboard section is composed of reusable React components.

Examples include:

* Executive Metric Card
* KPI Card
* Status Card
* Map Card
* Alert Card
* Forecast Card
* Incident Card
* Timeline Card
* Replay Card

Reusable components improve consistency, maintainability, and future extensibility.

## 3.4 Runtime Driven Architecture

The dashboard does not contain business logic for forecasting, decision intelligence, or energy intelligence.

Instead, it consumes runtime APIs provided by backend services and visualizes their outputs.

This separation allows frontend and backend teams to develop independently.

## 3.5 Low Scroll Experience

The dashboard is designed as a command center rather than a traditional report.

Major operational information should be visible on a single screen whenever possible, reducing navigation time during critical events.

---

# 4. Dashboard Architecture

The dashboard is divided into multiple operational zones arranged according to information priority.

```
Header
│
├── Executive Summary
│
├── National Grid Status
│     ├── Map Card
│     └── Status Card
│
├── Live Alert Queue
│
├── Risk Heatmap
│
├── Forecast Panel
│
├── Incident Queue
│
├── Operational Timeline
│
├── System Health
│
├── Replay Status
│
└── Evidence Panel
```

Each dashboard zone is responsible for presenting a specific operational domain while remaining visually consistent with the rest of the application.

---

# 5. Information Hierarchy

The dashboard organizes information into three operational levels.

## Level 1 – Immediate Awareness

Displayed immediately after loading the dashboard.

* Executive Summary
* National Grid Status
* Critical Alerts

These sections answer the question:

> "Is the system operating normally?"

---

## Level 2 – Operational Analysis

Displayed below the executive overview.

* Risk Heatmap
* Forecast Panel
* Incident Queue

These sections help operators understand why operational conditions have changed.

---

## Level 3 – Investigation and Evidence

Displayed in the lower section of the dashboard.

* Operational Timeline
* Replay Status
* System Health
* Evidence Panel

These components support investigation and post-event analysis.

---

# 6. Runtime Integration Strategy

The frontend dashboard consumes runtime APIs exposed by backend services.

Typical runtime endpoints include:

* Executive Metrics
* Grid Status
* Alerts
* Risk Analysis
* Forecast Data
* Incident Queue
* Timeline Events
* Replay Information
* Evidence Metadata

The frontend remains independent of backend implementation details by communicating only through REST API contracts.

---

# 7. User Roles

The dashboard supports multiple user personas.

### Executive Users

Require a high-level overview of operational status, key metrics, and critical alerts.

### Grid Operators

Monitor live incidents, alerts, forecasts, and runtime system health.

### Regional Controllers

Focus on regional grid status, operational events, and localized risk information.

The interface prioritizes operational awareness while allowing deeper investigation when required.

---

# 8. Technology Stack

Frontend technologies include:

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn/ui
* CSS Grid
* React Query
* Axios
* Recharts

These technologies provide a modern, scalable, and maintainable frontend architecture.

---

# 9. Future Enhancements

The architecture has been designed to support future enhancements without major structural changes.

Potential enhancements include:

* WebSocket-based real-time updates
* Interactive GIS mapping
* Advanced filtering and search
* Multi-region operational dashboards
* User personalization
* Role-based dashboard layouts
* Historical analytics and replay visualization

---

# 10. Conclusion

The SHAKTI Operational Command Center architecture provides a scalable and modular frontend foundation for real-time operational monitoring. By emphasizing reusable components, runtime API integration, and a structured information hierarchy, the dashboard enables rapid situational awareness while remaining flexible for future system enhancements.
