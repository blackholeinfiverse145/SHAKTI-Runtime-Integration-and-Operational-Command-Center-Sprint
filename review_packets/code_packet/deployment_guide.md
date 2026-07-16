# Deployment Guide

Detailed deployment instructions for the SHAKTI Command Center frontend dashboard application.

## 1. Requirements
- **Node.js**: Version `v18.0.0` or higher (tested on `v20.x`)
- **Package Manager**: `npm`
- **Supported Browsers**: Chrome, Firefox, Safari, Edge (recent versions)

## 2. Installation
To download and install package dependencies, navigate to the `shakti-command-center/` directory and execute:
```bash
npm install
```

## 3. Environment Variables
To customize API routing paths, configure a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:8009
VITE_POLLING_DISABLED=false
```
*Note*: If `VITE_API_URL` is omitted, the frontend defaults to query relative paths or fallbacks to localhost ports.

## 4. Run Backend
The backend mock servers must be running to receive live API signals.
*Platform Dependency*: The mock backend FastAPI server is maintained by the platform team and can be spun up using:
```bash
uvicorn api.main:app --port 8009 --reload
```
Ensure the API is active by checking the health endpoint: `http://localhost:8009/health`

## 5. Run Frontend
Launch the hot-reload React dev server:
```bash
npm run dev
```

## 6. Build
To compile production-ready static assets:
```bash
npm run build
```
This writes the compilation output to the `dist/` directory in the project root.

## 7. Preview
To review the production build compilation locally:
```bash
npm run preview
```

## 8. Expected URLs
- **Local Dev Server**: `http://localhost:5173/`
- **Build Preview Server**: `http://localhost:4173/`
- **Backend API Server**: `http://localhost:8009/`

## 9. Troubleshooting
*   **Vite Dev Port Conflict**: If port `5173` is in use, Vite will automatically select the next port (e.g. `5174`). Check the shell output to confirm the active address.
*   **Failed API Fetches (Red Cards)**: Ensure the backend FastAPI server is active on port `8009`. If running on a different port, align `VITE_API_URL` in the `.env` file.
*   **CORS Blockages**: Verify that the backend FastAPI middleware config permits requests from `http://localhost:5173`.
