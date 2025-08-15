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

## Features:
- **Portfolio Management**
  - Create, read, update, and delete portfolios.
  - Supports multiple asset types: Stocks, Bonds, ETFs, Crypto, Mutual Funds.
  - Each portfolio can hold thousands of assets using a dynamic `List<Asset>` structure.
- **Asset Management**
  - Add, edit, or remove assets within a portfolio.
  - Display key information for each asset (ticker, quantity, purchase price, type, date).
  - Visualized asset breakdown by type and value.
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
  - Interactive asset forms and visualizations for decision support.
  - Error handling and informative user feedback on API or backend failures.