# DBMS Simulator

This project is a Database Management System (DBMS) Simulator that allows users to design Entity-Relationship (ER) diagrams. The application provides an interactive interface to create entities, relationships, and visualize the database structure.It also has an ai integreted feature like a teacher which can analyze your ER diagram  or suggest improvements.
## Features

- **Create Entities and Relationships:** Design your database schema by adding entities (tables) and relationships (connections between tables).
- **Positioning:** Drag and drop entities and relationships on the canvas to customize the layout.
- **Zooming and Panning:** Zoom in and out of the canvas and move around to get a better view of your diagram.
- **State Persistence:** Changes to the ER diagram are stored and reflected immediately.

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
   git clone https://github.com/sudhirKsah/dbms-simulator
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
