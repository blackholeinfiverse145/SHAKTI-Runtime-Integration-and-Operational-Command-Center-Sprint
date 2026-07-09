# SHAKTI Operational Command Center Component Inventory

**Project:** SHAKTI Runtime Integration and Operational Command Center
**Owner:** Pratik Bhuwad
**Module:** Component Inventory
**Version:** 1.0

---

# 1. Purpose

This document defines all reusable frontend components used in the SHAKTI Operational Command Center.

The goal of the component inventory is to establish a consistent, modular, and reusable UI architecture. Each component has a clearly defined responsibility, expected data source, loading behavior, and error handling strategy.

The dashboard is designed using reusable React components to improve maintainability, scalability, and consistency across the application.

---

# 2. Component Classification

The dashboard is divided into the following component categories:

### Layout Components

* Header
* Dashboard Layout
* Dashboard Grid

### Dashboard Components

* Executive Metric Card
* KPI Card
* Status Card
* Map Card
* Alert Card
* Forecast Card
* Incident Card
* Timeline Card
* Replay Card
* Evidence Card

### Shared UI Components

* Button
* Card
* Badge
* Tooltip
* Skeleton Loader
* Separator

---

# 3. Component Specifications

---

## 3.1 Header

### Purpose

Provides application branding and global navigation.

### Responsibilities

* Display application title
* Display current date and time
* Display logged-in user
* Global actions

### Runtime Data

* User Information
* Current Time

### States

* Default
* Loading
* Error

---

## 3.2 Executive Metric Card

### Purpose

Display high-level operational metrics for executives.

### Example Metrics

* Active Incidents
* Critical Alerts
* Grid Availability
* System Health Score

### Props

* title
* value
* trend
* icon
* status

### Runtime Endpoint

`/api/executive-metrics`

### States

* Loading
* Success
* Error

---

## 3.3 KPI Card

### Purpose

Display a single operational KPI.

### Props

* title
* value
* unit
* trend
* icon

### Runtime Endpoint

`/api/kpis`

### States

* Loading
* Success
* Error

---

## 3.4 Status Card

### Purpose

Display current operational health.

### Example Information

* Online
* Offline
* Warning
* Degraded

### Props

* title
* status
* description

### Runtime Endpoint

`/api/system-health`

### States

* Loading
* Success
* Error

---

## 3.5 Map Card

### Purpose

Display geographic operational information.

### Example Information

* National Grid
* Regional Status
* Risk Heatmap

### Props

* mapData
* markers
* regions
* riskLevels

### Runtime Endpoint

`/api/grid-map`

### States

* Loading
* Success
* Error

---

## 3.6 Alert Card

### Purpose

Display real-time operational alerts.

### Props

* severity
* message
* timestamp
* source

### Runtime Endpoint

`/api/alerts`

### States

* Loading
* Success
* Error

---

## 3.7 Forecast Card

### Purpose

Display predictive operational information.

### Example Information

* Demand Forecast
* Load Prediction
* Renewable Generation

### Props

* title
* forecastValue
* confidence

### Runtime Endpoint

`/api/forecast`

### States

* Loading
* Success
* Error

---

## 3.8 Incident Card

### Purpose

Display active operational incidents.

### Props

* incidentId
* severity
* location
* status
* assignedOperator

### Runtime Endpoint

`/api/incidents`

### States

* Loading
* Success
* Error

---

## 3.9 Timeline Card

### Purpose

Display chronological operational events.

### Props

* timestamp
* event
* source

### Runtime Endpoint

`/api/timeline`

### States

* Loading
* Success
* Error

---

## 3.10 Replay Card

### Purpose

Display replay execution status.

### Props

* replayId
* progress
* duration
* status

### Runtime Endpoint

`/api/replay`

### States

* Loading
* Success
* Error

---

## 3.11 Evidence Card

### Purpose

Display supporting evidence for operational decisions.

### Example Information

* Evidence Source
* Confidence Score
* Timestamp
* Related Incident

### Props

* source
* confidence
* timestamp
* description

### Runtime Endpoint

`/api/evidence`

### States

* Loading
* Success
* Error

---

# 4. Shared UI Components

The following shared UI components will be reused throughout the application.

| Component | Purpose                |
| --------- | ---------------------- |
| Button    | User actions           |
| Card      | Base container         |
| Badge     | Status indicators      |
| Tooltip   | Additional information |
| Skeleton  | Loading placeholders   |
| Separator | Visual grouping        |

These components will be implemented using **shadcn/ui** and customized where necessary.

---

# 5. Component Communication

Components remain independent and communicate through props.

```text
Dashboard
│
├── Executive Metric Card
├── KPI Card
├── Status Card
├── Map Card
├── Alert Card
├── Forecast Card
├── Incident Card
├── Timeline Card
├── Replay Card
└── Evidence Card
```

All runtime data is fetched at the page level and passed down to child components.

---

# 6. State Management Strategy

Each component supports three primary UI states:

### Loading

Display Skeleton Loader while data is being fetched.

### Success

Render runtime data.

### Error

Display a user-friendly error message with an option to retry where appropriate.

This consistent approach provides a predictable user experience across the dashboard.

---

# 7. Reusability Guidelines

To maintain a scalable frontend architecture:

* Each component should have a single responsibility.
* Components should remain independent of backend business logic.
* Data should be passed through typed props.
* Components should avoid direct API calls unless specifically designed as container components.
* Styling should follow the shared design system.
* Components should be reusable across multiple dashboard sections.

---

# 8. Future Enhancements

The component library is designed to support future capabilities, including:

* Interactive GIS maps
* Drag-and-drop dashboard customization
* Theme switching (Light/Dark)
* Role-based component visibility
* Real-time WebSocket updates
* Advanced filtering and search
* Accessibility improvements (WCAG)

---

# 9. Conclusion

The SHAKTI Component Inventory establishes a reusable and maintainable frontend architecture based on modular React components. By defining each component's purpose, runtime dependency, state management, and communication model before implementation, the project reduces development complexity and ensures consistency across the Operational Command Center.
