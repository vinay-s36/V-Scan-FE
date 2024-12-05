# Web Vulnerability Scanner - Frontend

This is the React-based frontend for the Web Vulnerability Scanner. It allows users to input a URL, initiate a scan, and view the results (including vulnerabilities and downloadable reports).

## Features
- Enter a target URL for scanning.
- Display the scanning status, vulnerabilities, and a link to download the report.
- Real-time updates of scanning progress.

## Prerequisites
- **Node.js** (v16 or later)
- **npm** or **yarn** (for package management)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/vinay-s36/V-Scan-FE.git
cd V-Scan-FE
```

### 2. Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```

### 3. Configure the API Endpoint
Ensure the API endpoint for the backend is correctly set in the Axios calls within the code (`http://localhost:8080` by default). 

If your backend runs on a different host/port, update the endpoint in:
```javascript
axios.post("http://localhost:8080/scan", { ... });
```

### 4. Start the Development Server
Run the React development server:
```bash
npm run dev
```
