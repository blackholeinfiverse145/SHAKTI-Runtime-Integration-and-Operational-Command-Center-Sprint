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
          summary: [
            { metric: "active_contracts_count", value: "77", trend: "up", status: "operational" },
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
          events_processed: 50000,
        },
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      render(<ExecutiveLayout />);

      expect(screen.getByText("Executive Summary")).toBeInTheDocument();
      expect(screen.getByText("active contracts count")).toBeInTheDocument();
      expect(screen.getByText("77")).toBeInTheDocument();
      expect(screen.getByText("100.0")).toBeInTheDocument();
    });

    test("renders empty fallback on empty/no KPI dataset", () => {
      mockUseExecutiveDashboard.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      mockUseMetrics.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      });

      render(<ExecutiveLayout />);
      expect(screen.getAllByText("No Runtime Data Available")[0]).toBeInTheDocument();
    });
  });

  describe("RuntimeHealthLayout Component", () => {
    test("renders runtime health parameters and modules", () => {
      mockUseSystemStatus.mockReturnValue({
        data: {
          timestamp: "2026-07-15T16:53:18.000Z",
          components: [
            { name: "gate_service", status: "operational", response_time_ms: 45, details: "healthy" },
            { name: "bhiv_bucket", status: "operational", response_time_ms: 120, details: "healthy" },
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

      expect(screen.getByText("Runtime Health")).toBeInTheDocument();
      expect(screen.getByText("gate_service")).toBeInTheDocument();
      expect(screen.getByText("bhiv_bucket")).toBeInTheDocument();
      expect(screen.getByText("99.98%")).toBeInTheDocument();
      expect(screen.getAllByText("45ms")[0]).toBeInTheDocument();
    });
  });

  describe("WorkflowLayout Component", () => {
    test("renders active operations and steps in table", () => {
      mockUseOperationsDashboard.mockReturnValue({
        data: {
          timestamp: "2026-07-15T16:53:18.000Z",
          operations: [
            {
              id: "op_01",
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

      expect(screen.getByText("Active Workflows")).toBeInTheDocument();
      expect(screen.getByText("Blueprint validation running")).toBeInTheDocument();
      expect(screen.getByText("creator")).toBeInTheDocument();
      expect(screen.getByText("#op_01")).toBeInTheDocument();
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
