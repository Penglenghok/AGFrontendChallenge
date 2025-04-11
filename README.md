# Time Series Data Visualization Documentation

## Overview

This project visualizes real-time time series data from multiple data producers. It allows users to view, analyze, and interact with data across different timeframes.

## Project Structure

```
src/
├── __test__/          (# Tests for components, utilities, and integration)
├── assets/            (# Static assets like images, icons)
│   ├── plot.png 
│   └── react.svg
├── components/        (# Global reusable components)
│   ├── Chart/
│   ├── Producer/
│   └── Stats/
├── config/            (# Stores all configuration)
│   └── chart.config.ts
├── constant/          (# Stores all constant values)
│   ├── chart.options.ts 
│   ├── environment.ts
│   ├── image.ts
│   ├── index.ts
│   └── layout.ts
├── helper/            (# Global helper functions)
│   └── chart.helper.ts
├── layouts/           (# Main layout for the application)
│   ├── components/
│   │   ├── Content/
│   │   ├── Footer/
│   │   ├── Header/
│   │   └── Sidebar/
│   ├── index.styles.less
│   └── index.tsx
├── lib/               (# Business logic and domain-specific code)
├── mock/              (# Mock data for testing or sample rendering)
│   ├── chart_data.json
│   └── times-series-data.json
├── pages/             (# Main pages of the application)
│   └── Home/
│       ├── Home.styles.less
│       └── Home.tsx
├── routes/            (# Routing for the application)
│   └── index.tsx
├── services/          (# APIs and external service communication)
├── styles/            (# Global styles and LESS variables)
│   ├── app.less
│   └── default.theme.less
├── types/             (# Static types/interfaces for objects and component props)
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── setupTests.ts
├── vite-env.d.ts
└── vite.config.ts

```

## Key Components

### Chart Component

-   Responsible for plotting data points using real-time updates.
    
-   Supports dynamic rendering based on incoming WebSocket data.
    
-   Utilizes configuration from `chart.config.ts`.
-  Can switch between Line chart and Area chart
    

### Producer Component

-   Manages individual data streams from producers.
    
-   Offers selection interfaces (comboboxes) for different timeframes.
    
-   Displays metadata such as producer IDs and statistical insights
- The timeframes in this component can be changed to display different data intervals, depending on user needs.
    

### Stats Component

-   Computes and shows real-time statistics (min, max, average) from data points.
    
-   Facilitates quick insights for selected data streams.
    

## Data Handling

-   **WebSocket Integration**: Real-time data reception from backend servers via WebSockets.
    
-   **Timeframe Selection**: Users can select specific intervals (e.g., 10s, 30s).
    
-   **Dynamic Updates**: Automatic updates of statistics and charts based on new data.
    

## Technologies

-   **Frontend**: React, TypeScript, Vite, Ant Design, uPlot (Chart)
    
-   **Charting**: Custom chart components using uPlot for better chart performance
    
-   **Testing**: Vitest, React Testing Library

## Code Generation Tools

-  **ChatGPT**: Helped produce code snippets, tests, explanations, and documentation

-  **GitHub Copilot**: Provided on-the-fly code suggestions during development
    

## Testing

-   Unit and integration tests are located in the `__test__` folder.
    
-   Uses Vitest and React Testing Library for robust component validation.
    

Example Test Case:

```typescript
describe("Producer Component", () => {
  test("renders correctly with given producerId", () => {
    render(<Producer producerId="1" />);

    expect(screen.getByTestId("producer-item")).toBeInTheDocument();
    expect(screen.getByText("Producer #1")).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(2);
  });
});

```

## Configuration

-   Timeframes and chart options can be adjusted in `chart.config.ts` and other constant files (`chart.options.ts`).
    


## Running the Application

  

To run the project locally:

  

1.  **Install dependencies**:

```bash

npm  install

```

  

2.  **Create a `.env` file**:

```bash

VITE_SOCKET_URL="your socket url"

```

  

3.  **Run the development server**:

```bash

npm  run  dev

```

## Conclusion

This documentation outlines the structure, functionalities, and key technologies used in the Time Series Data Visualization project. It is designed for scalability, ease of use, and maintainability.