import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock the react-router-dom if any layout uses it
vi.mock("react-router-dom", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

// Mock the queries hook module
const mockUseExecutiveDashboard = vi.fn();
const mockUseSystemStatus = vi.fn();
const mockUseMetrics = vi.fn();
const mockUseOperationsDashboard = vi.fn();

vi.mock("@/hooks/useQueries", () => ({
  useExecutiveDashboard: () => mockUseExecutiveDashboard(),
  useSystemStatus: () => mockUseSystemStatus(),
  useMetrics: () => mockUseMetrics(),
  useOperationsDashboard: () => mockUseOperationsDashboard(),
}));

import ExecutiveLayout from "../components/dashboard/layouts/ExecutiveLayout";
import RuntimeHealthLayout from "../components/dashboard/layouts/RuntimeHealthLayout";
import WorkflowLayout from "../components/dashboard/layouts/WorkflowLayout";

describe("Layout Components Integration", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("ExecutiveLayout Component", () => {
    test("renders executive KPI values in success state", () => {
      mockUseExecutiveDashboard.mockReturnValue({
        data: {
          timestamp: "2026-07-15T16:53:18.000Z",
          kpis: {
            revenue_run_rate_usd: 1250000,
            active_contracts_count: 45,
            sla_compliance_rate: 99.85,
            system_utilization_rate: 85.4,
          },
        },
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      render(<ExecutiveLayout />);

      expect(screen.getByText("Executive Business KPIs")).toBeInTheDocument();
      expect(screen.getByText("$1,250,000")).toBeInTheDocument();
      expect(screen.getByText("45")).toBeInTheDocument();
      expect(screen.getByText("99.85%")).toBeInTheDocument();
      expect(screen.getByText("85.40%")).toBeInTheDocument();
    });

    test("renders empty fallback on empty/no KPI dataset", () => {
      mockUseExecutiveDashboard.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      render(<ExecutiveLayout />);
      expect(screen.getByText("No Runtime Data Available")).toBeInTheDocument();
    });
  });

  describe("RuntimeHealthLayout Component", () => {
    test("renders runtime health parameters and modules", () => {
      mockUseSystemStatus.mockReturnValue({
        data: {
          timestamp: "2026-07-15T16:53:18.000Z",
          components: [
            { component_id: "gate_service", status: "healthy", version: "1.0.0", uptime_seconds: 5000 },
            { component_id: "bhiv_bucket", status: "healthy", version: "1.2.0", uptime_seconds: 12000 },
          ],
        },
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      mockUseMetrics.mockReturnValue({
        data: {
          timestamp: "2026-07-15T16:53:18.000Z",
          total_requests: 1500,
          success_rate: 99.98,
          average_response_time_ms: 45.2,
        },
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      render(<RuntimeHealthLayout />);

      expect(screen.getByText("Runtime Health & Topology")).toBeInTheDocument();
      expect(screen.getByText("gate_service")).toBeInTheDocument();
      expect(screen.getByText("bhiv_bucket")).toBeInTheDocument();
      expect(screen.getByText("99.98%")).toBeInTheDocument();
      expect(screen.getByText("45.2ms")).toBeInTheDocument();
    });
  });

  describe("WorkflowLayout Component", () => {
    test("renders active operations and steps in table", () => {
      mockUseOperationsDashboard.mockReturnValue({
        data: {
          timestamp: "2026-07-15T16:53:18.000Z",
          operations: [
            {
              instruction_id: "op_01",
              status: "running",
              description: "Blueprint validation running",
              agent: "creator",
              started_at: "2026-07-15T16:50:00.000Z",
            },
          ],
        },
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      render(<WorkflowLayout />);

      expect(screen.getByText("Execution Pipelines & Linage")).toBeInTheDocument();
      expect(screen.getByText("Blueprint validation running")).toBeInTheDocument();
      expect(screen.getByText("creator")).toBeInTheDocument();
      expect(screen.getByText("op_01")).toBeInTheDocument();
    });

    test("renders empty row fallback when no workflows are returned", () => {
      mockUseOperationsDashboard.mockReturnValue({
        data: {
          timestamp: "2026-07-15T16:53:18.000Z",
          operations: [],
        },
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      render(<WorkflowLayout />);
      expect(screen.getByText("No Runtime Data Available")).toBeInTheDocument();
    });
  });
});
