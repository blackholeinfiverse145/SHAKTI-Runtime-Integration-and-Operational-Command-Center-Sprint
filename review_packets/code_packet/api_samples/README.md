# API Samples Verification

This directory contains instructions for reviewing backend API interactions consumed by the SHAKTI Command Center dashboard.

## 1. Endpoints Consumed
The frontend dashboard initiates requests to the following endpoints on the backend API server:
- `/health`: Lightweight liveness probe.
- `/system/status`: Overall system status and component health log array.
- `/metrics`: Live execution performance metrics (requests success rate, latencies).
- `/dashboard/executive`: Summary of critical metric cards.
- `/dashboard/operations`: Load parameters and active running operations.
- `/dashboard/alerts`: Live chronological alerts logs.
- `/dashboard/runtime`: Active simulation replay session tracks.
- `/dashboard/telemetry`: Signals, trace signals, and bucket evidence logs.

## 2. Retrieving Live Responses
To view live responses, ensure the mock API server is running on `http://localhost:8009` (configured in your environment). Open a browser or api client to query any of the endpoints, for example:
- `http://localhost:8009/metrics`
- `http://localhost:8009/system/status`
- `http://localhost:8009/dashboard/operations`

## 3. How to Capture JSON Responses Using Chrome DevTools
1. Press `F12` or right-click the page and select **Inspect** to open Developer Tools.
2. Select the **Network** tab at the top.
3. Reload the dashboard (`Ctrl + R`) to force queries.
4. Set the Network filter to **Fetch/XHR**.
5. Select any of the request queries from the list (e.g. `operations`, `alerts`).
6. Click the **Preview** or **Response** sub-tabs on the right panel to capture the exact, un-fabricated JSON response payload returned by the mock server.
