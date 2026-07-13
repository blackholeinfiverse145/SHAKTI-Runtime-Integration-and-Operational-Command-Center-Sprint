# Dashboard Capability Documentation

## The `DashboardProvider` Model
The dashboard is no longer a static hardcoded grid. It is a configuration-driven capability.

### Configuration Schema
Located in `src/components/dashboard/DashboardProvider.tsx`, the system uses a Context Provider to distribute a JSON-based configuration object describing the layout of the dashboard.

```typescript
export interface DashboardConfig {
  zones: {
    executiveSummary: ZoneConfig;
    operationsGrid: ZoneConfig;
    liveAlerts: ZoneConfig;
    riskHeatmap: ZoneConfig;
    telemetry: ZoneConfig;
    incidentQueue: ZoneConfig;
    operationalTimeline: ZoneConfig;
    systemHealth: ZoneConfig;
    runtimeSessions: ZoneConfig;
    evidencePanel: ZoneConfig;
  };
}

export interface ZoneConfig {
  visible: boolean;
  colSpan: string;
}
```

### Extending the Capability
To create a new view (e.g., a "Security Only" dashboard vs an "Executive Only" dashboard), you do not write new pages.
Instead, you pass a `config` prop to `DashboardLayout`:

```tsx
<DashboardLayout config={{
  zones: {
    executiveSummary: { visible: true, colSpan: "col-span-12" },
    operationsGrid: { visible: false, colSpan: "col-span-12" }
  }
}}>
  <Dashboard />
</DashboardLayout>
```

The deep-merge utility in `DashboardProvider` automatically resolves your overrides against the default configuration, allowing you to hide/show and resize layouts dynamically.
