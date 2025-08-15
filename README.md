# Portfolio-Tracker
Full-stack web application to track investment portfolios across multiple asset types, with real-time stock data and interactive portfolio insights.

![GitHub last commit](https://img.shields.io/github/last-commit/087narain/Portfolio-Tracker)
![GitHub repo size](https://img.shields.io/github/repo-size/087narain/Portfolio-Tracker)

![Backend](https://img.shields.io/badge/Backend-SpringBoot-blue)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Auth](https://img.shields.io/badge/Auth-JWT-green)
![API](https://img.shields.io/badge/API-REST-blue)

### 🚀 Technologies Used

![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![AlphaVantage](https://img.shields.io/badge/AlphaVantage-FF9900?style=for-the-badge)

## Images:
! [Stock Viewer] (./images/stock.jpg)

## Features:
- **Portfolio Management**
  - Create, read, update, and delete portfolios.
  - Supports multiple asset types: Stocks, Bonds, ETFs, Crypto, Mutual Funds.
  - Each portfolio can hold thousands of assets using a dynamic `List<Asset>` structure.
- **Asset Management**
  - Add, edit, or remove assets within a portfolio.
  - Display key information for each asset (ticker, quantity, purchase price, type, date).
  - Visualised asset breakdown by type and value.
- **Real-Time Data**
  - Integrated AlphaVantage API to fetch 7 fields per stock (Open, High, Low, Price, Volume, Previous Close, Change Percent).
  - Average response time: ~500ms per request.
- **User Management**
  - JWT authentication protects login, portfolio access, and asset operations (15 endpoints in total).
  - User can update profile or delete account securely.
- **Frontend UI**
  - Responsive, mobile-friendly design using Tailwind CSS.
  - 14 reusable React components, including forms, portfolio summary, asset list, and stock viewer.
  - Dark mode toggle and consistent theme using custom fonts (Inter & Poppins).
- **Performance & UX**
  - Dynamic fetching and rendering of portfolios and assets.
  - Interactive asset forms and visualisations for decision support.
  - Error handling and informative user feedback on API or backend failures.

## Methodology:
- **Backend**
  - Spring Boot with H2 in-memory database for quick development and testing.
  - JPA used to manage `Portfolio` and `Asset` entities with relationships.
  - REST API endpoints structured for portfolios, assets, and real-time stock data.
- **Frontend**
  - React app fetches data asynchronously via Axios.
  - State managed using hooks (`useState`, `useEffect`) for portfolio lists, token, and dark mode.
  - Reusable components for forms and visualisations ensure maintainability.
- **API Integration**
  - AlphaVantage API calls routed through backend for security.
  - Response data normalsed and processed for visualisation in asset bars and summary components.
- **Testing**
  - Manual testing conducted for CRUD operations, form validation, API calls, and UI rendering.

## Challenges Faced:
- **API Rate Limiting**
  - AlphaVantage free tier limited to 5 requests per minute.
  - Mitigated by systematically testing at specific times and testing performance using local dummy data.
- **Dynamic State Management**
  - Handling multiple portfolios and assets dynamically required careful `useEffect` dependencies.
  - Prevented infinite loops when updating portfolio values from API.
- **Responsive UI**
  - Ensuring consistent layout and dark mode across all components required custom Tailwind classes.

## Planned Improvements:
- **Automated Testing**
  - Unit and integration tests for backend APIs.
  - JUnit and React Testing Library for frontend components.
- **Persistent Database**
  - Migrate from H2 to PostgreSQL for production deployment.
- **Enhanced Analytics**
  - Add historical portfolio trends and asset performance charts (might require AlphaVantage subscription).
  - Integrate financial ratios for advanced insights.
- **Real-Time Updates**
  - WebSocket integration for live stock price updates.
- **Export & Reporting**
  - PDF or CSV export of portfolio summaries and performance metrics.
- **User Experience**
  - Drag-and-drop portfolio ordering.
  - Improved error handling with toast notifications.

## Planned Deployment:
- Currently runs locally with `npm start` for frontend and `./gradlew bootrun` for backend.
- Production deployment planned using Docker and cloud hosting (AWS or Heroku).
