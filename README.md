# DBMS Simulator

This project is a Database Management System (DBMS) Simulator that allows users to design Entity-Relationship (ER) diagrams. The application provides an interactive interface to create entities, relationships, and visualize the database structure.It also has an ai integreted feature like a teacher which can analyze your ER diagram  or suggest improvements.
## Features

## 1. AI-Powered ER Diagram Creation & Refinement
- Real-time AI analysis of ER diagrams.
- Suggestions for improving entity relationships and structure.
- One-click updates to instantly improve diagram correctness.
- Handling of complex relationships, weak entities, and functional dependencies.

## 2. AI Assistant for DBMS Learning
- Provides real-time explanations, hints, and guidance across the platform.
- Assists with conceptual understanding, ER design corrections, and SQL query issues.

## 3. Interactive Normalization Simulation
- Step-by-step guided journey for normalization (1NF to 3NF).
- Scenario-based learning using real-world datasets (e.g., university management system).
- Instant feedback on normalization steps.
- Visual representation of transformations at each stage.

## 4. Comprehensive Interactive Database Design
- Dynamic creation, modification, and deletion of tables, columns, and rows.
- Setting and adjusting relationships interactively.
- Visual demonstrations of functional dependencies.
- Contextual help and feedback for incorrect solutions.

## 5. SQL Practice & Query Execution
- Built-in SQL editor for writing, executing, and testing queries.
- Live execution with instant output and explanations.
- Reinforces practical SQL learning.

---


## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **ReactFlow:** A library for rendering interactive flow diagrams.
- **Tailwind CSS:** Utility-first CSS framework for fast UI development.
- **Next.js:** A React framework for building optimized web applications.
- **Zustand:** A state management library used for managing the application's state.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- A code editor (e.g., Visual Studio Code).
- NPM or Yarn for package management.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sudhirKsah/dbms-simulator.git
    ```
2. Navigate to the project directory:

```bash
cd dbms-simulator
```
3. Install the dependencies:

```bash
npm install
# or if you're using Yarn
yarn install
```

4. Add your gemini api key in .env.local 
```bash
//in .env.local
NEXT_PUBLIC_GEMINI_API_KEY=<--api key-->
```
5. Start the development server:

```bash
npm run dev
# or if you're using Yarn
yarn dev
```

6.Open your browser and go to http://localhost:3000.
