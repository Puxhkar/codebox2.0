# Inventory Demand Forecasting Tool
> A purely client-side predictive analytics tool using exponential smoothing to forecast inventory demand from CSV datasets natively in the browser.

---

## 1. Problem Statement
**Problem Title:** Unpredictable Inventory Demand & Stockouts
**Problem Description:** Retailers and small business owners struggle to accurately predict product demand based on historical data. This leads to either overstocking (tying up capital and warehouse space) or understocking (missing out on sales and losing customer trust).
**Target Users:** Retail managers, inventory planners, e-commerce store owners, and small-medium businesses.
**Existing Gaps:** Existing forecasting solutions are often overly complex, require expensive backend infrastructure, mandate sharing private sales data with third parties, and are incredibly slow to generate insights.

## 2. Problem Understanding & Approach
**Root Cause Analysis:** Volatile market trends and failure to mathematically account for seasonality and base trends in an integrated, accessible manner.
**Solution Strategy:** Build a lightning-fast, offline-first web application that runs statistical time-series forecasting (Holt's Double Exponential Smoothing) directly on the client side, giving users immediate feedback and dynamic restocking recommendations without leaving their browser.

## 3. Proposed Solution
**Solution Overview:** A seamless web dashboard where users can drag and drop their historical sales CSV data to instantly visualize trends, automatically decompose seasonality, and predict future demand up to a customizable horizon.
**Core Idea:** Empower small businesses with enterprise-level statistical forecasting models running locally in their browser, ensuring 100% data privacy and zero latency.
**Key Features:** 
- Drag-and-drop CSV Parsing
- Holt's Method Forecasting Engine
- Additive Time-Series Seasonality Decomposition
- Dynamic UI to tune parameters (Alpha, Beta, Horizon, Lead Time)
- Automated Inventory Metrics (Reorder Point, Safety Stock)

## 4. System Architecture
**High-Level Flow:**
1. User uploads CSV data.
2. Data processed into React State.
3. Forecasting Engine (`forecasting.js`) computes trends and seasonality.
4. UI metrics and Recharts render visualizations dynamically.

**User → Frontend → Backend → Model → Database → Response**
> *Note: For maximum speed and privacy, this application is fully decentralized.*
User → React Frontend → Forecasting Engine (Client-side JS Model) → Recharts Visualization (Response)

**Architecture Description:** 
Our architecture removes the need for traditional backend servers. The React frontend handles application state, triggers the built-in JavaScript statistical engine to perform complex mathematical computations, and instantly plots the outcomes.
**Architecture Diagram:**
*(Add system architecture diagram image here)*

## 5. Database Design
**ER Diagram:**
*(Add ER diagram image here)*

**ER Diagram Description:**
To guarantee speed and protect proprietary sales data, the system relies on an **In-Memory Client-Side State Mechanism** rather than a traditional relational database. Data is parsed via PapaParse from flat files into structured JSON objects temporarily held in React's virtual DOM memory.

## 6. Dataset Selected
**Dataset Name:** Sample Retail Demand Data
**Source:** Custom generated hackathon samples (`advanced_retail_demand.csv`, `sample_demand.csv`)
**Data Type:** Time-Series CSV
**Selection Reason:** They contain standardized, real-world examples of dates alongside highly variable demand quantities.
**Preprocessing Steps:** 
1. Parsed dynamically using PapaParse.
2. Checked and sorted chronologically.
3. Extracted into uniform `{ date, value }` data structures.

## 7. Model Selected
**Model Name:** Holt's Double Exponential Smoothing (with Additive Seasonality Decomposition)
**Selection Reasoning:** Holt's method excels at handling time-series data with prominent trends. Unlike Deep Learning models that require immense computational power, Holt's Method is extremely efficient, lightweight, and perfect to formulate dynamically in a web environment.
**Alternatives Considered:** ARIMA (too computationally heavy for pure browser JS), Simple Moving Average (too basic, completely ignores growth/decay trends).
**Evaluation Metrics:** Standard Deviation of in-sample errors, and the calculation of 95% Confidence Intervals for upper and lower bounds.

## 8. Technology Stack
- **Frontend:** React, Vite, Recharts, Lucide-React
- **Backend:** N/A (Serverless / Offline-first approach)
- **ML/AI:** Custom JavaScript Statistical Implementation
- **Database:** In-Memory App State
- **Deployment:** Render / Vercel / Netlify configured

## 9. API Documentation & Testing
*Because our application is completely offline-first, we eliminated traditional network API endpoints to reduce latency. Instead, our "API" consists of the internal Data Science functions handling the modeling.*

**API Endpoints List (Internal Engine Functions)**
**Endpoint 1: `holtsMethod(values, alpha, beta, horizon)`**
- Calculates the level, trend, and smooths historical data out into future `horizon` days.
**Endpoint 2: `decompose(values, period)`**
- Extracts and isolates the trend, seasonal changes, and residuals based on the data array.
**Endpoint 3: `calculateRestocking(forecast, stdDev, leadTime)`**
- Generates actionable metrics including Safety Stock and Reorder Points (ROP) based on variability.

**API Testing Screenshots:**
*(Add Postman / Thunder Client / Console screenshots here)*

## 10. Module-wise Development & Deliverables
- **Checkpoint 1: Research & Planning**
  - **Deliverables:** Finalized the decision to use mathematically solid statistical models over heavier AI approaches to achieve instant client-side rendering.
- **Checkpoint 2: Core Engine Development (Backend Equivalent)**
  - **Deliverables:** Built `lib/forecasting.js` to execute Exponential Smoothing algorithms without python dependencies.
- **Checkpoint 3: Frontend Development**
  - **Deliverables:** Set up React/Vite, crafted the dark-mode aesthetic dashboard, and engineered drag-and-drop CSV handling.
- **Checkpoint 4: Model Training / Logic Binding**
  - **Deliverables:** Created dynamic variable sliders (Alpha, Beta, Lead time) that instantly retrain and recalculate the models.
- **Checkpoint 5: Model Integration**
  - **Deliverables:** Tied the statistical outputs from the engine directly to Recharts for beautiful data visualization.
- **Checkpoint 6: Deployment**
  - **Deliverables:** Optimized build scripts, finalized layout responsiveness, ready for live hosting.

## 11. End-to-End Workflow
1. User lands on the aesthetically pleasing, minimal dashboard.
2. User uploads a historical sales CSV (e.g., `advanced_retail_demand.csv`).
3. Application instantly maps columns and normalizes the data array.
4. User leverages interactive sliders to alter the forecast horizon, level smoothing, and lead times.
5. The application computes recommendations (Safety Stock, Daily Demand) in real-time, displaying them clearly via interactive charts.

## 12. Demo & Video
**Live Demo Link:** *[Insert Link Here]*
**Demo Video Link:** *[Insert Link Here]*
**GitHub Repository:** *[Insert Link Here]*

## 13. Hackathon Deliverables Summary
We successfully built a blazingly fast, highly intuitive demand forecasting engine that operates completely in the browser. We accomplished mathematical modeling, comprehensive interactive charting, and dynamic inventory management metrics all while delivering a stunning dark-theme UI.

## 14. Team Roles & Responsibilities
| Member Name | Role | Responsibilities |
| :--- | :--- | :--- |
| **[Member 1 Name]** | Frontend & UI/UX Engineer | Built the React dashboard, implemented Recharts visualizations, styled the intuitive user interface, and managed overall UX. |
| **[Member 2 Name]** | Data Scientist & Logic | Acted as the core algorithm developer. Built Holt's Exponential Smoothing engine and Seasonality Decomposition entirely in JS. |
| **[Member 3 Name]** | Integration & Architecture | Managed CSV parsing edge-cases, connected the state management with the forecasting tools, and handled documentation and optimization. |

## 15. Future Scope & Scalability
**Short-Term:** 
- Implement algorithmic Auto-Tuning to find the optimal Alpha/Beta variables automatically instead of relying purely on user adjustment.
- Export forecast capabilities directly back to a downloadable CSV.
**Long-Term:** 
- Incorporate external APIs to connect directly with Shopify or WooCommerce stores to fetch real-time sales data.
- Potentially integrate an optional Python FastAPI backend for serving more complex models like ARIMA or Prophet.

## 16. Known Limitations
- The current engine uses purely Additive Decomposition, assuming consistent seasonality magnitude over time, which might shift in extreme scenarios.
- The model requires clean, consistent chronological dates to operate flawlessly and has no extreme-anomaly detection yet.
- Parameters must currently be tuned manually via provided sliders for the absolute "best" fit.

## 17. Impact
This tool radically reduces stockouts and minimizes overstock expenditures for small businesses. By bringing enterprise-level retail analytics directly to their web browser, business owners can derive completely private, free, and instant insights, making their inventory operations far more resilient and profitable.
