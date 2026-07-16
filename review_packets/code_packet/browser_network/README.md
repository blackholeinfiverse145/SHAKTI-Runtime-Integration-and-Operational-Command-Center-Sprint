# Browser Network Verification

This document describes how to verify successful API network requests from the browser client during review testing.

## 1. Verifying Successful API Requests
Reviewers can monitor live network streams directly inside modern browser client inspector panels. To verify that requests are resolving cleanly:
1. Open the browser (e.g. Chrome, Edge, Firefox) and navigate to the dashboard at `http://localhost:5173/`.
2. Press `F12` to open Developer Tools, and navigate to the **Network** tab.
3. Filter requests by selecting **Fetch/XHR**.
4. Confirm that the dashboard successfully queries endpoints every polling interval (5 seconds / 10 seconds / 15 seconds).

## 2. Required Endpoints & Expected HTTP Statuses
The dashboard relies on these requests. Each query must resolve with an expected HTTP status code of `200 OK`:

| Endpoint Query | Expected Status | Polling Frequency |
|---|---|---|
| `/health` | `200 OK` | Every 10 seconds |
| `/system/status` | `200 OK` | Every 5 seconds |
| `/metrics` | `200 OK` | Every 10 seconds |
| `/dashboard/executive` | `200 OK` | Every 15 seconds |
| `/dashboard/operations` | `200 OK` | Every 5 seconds |
| `/dashboard/alerts` | `200 OK` | Every 5 seconds |
| `/dashboard/runtime` | `200 OK` | Every 5 seconds |
| `/dashboard/telemetry` | `200 OK` | Every 10 seconds |

## 3. How to Capture the Network Tab
1. Open the **Network** tab in DevTools and confirm the list is logging fetches.
2. Select the gear icon in the DevTools menu and enable **Show request URLs** or click on any query row to open headers.
3. Verify that the **Status** column shows `200` in green.
4. Take a screenshot of the DevTools panel including the request list to record complete validation proof.
