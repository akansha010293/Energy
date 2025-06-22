⚡ Energy Usage Dashboard – Built by Akansha Gupta
This project is a full-stack web application that displays a household's electricity consumption using data sourced from smart meters. It provides daily usage summaries, peak consumption insights, and an interactive UI to explore usage patterns across custom date ranges.

I built this project to showcase my ability to integrate backend data processing with a responsive, user-friendly frontend using TypeScript, React, and Node.js.

🌟 Features
✅ Backend
Parses and processes energy usage data from a CSV file.

Calculates:

Total kWh consumption over the selected time period.

Average daily consumption and average hourly usage per day.

Peak usage hour for each day, showing when the highest demand occurred.

Exposes an API endpoint to serve the processed data to the frontend.

✅ Frontend
Displays a detailed usage summary and daily breakdown.

Allows users to filter the data by number of days (e.g., 3, 5, or 7).

Includes a loading spinner for improved user experience during data fetch.

Responsive and clean UI using modern React best practices.

🛠️ Tech Stack
Frontend: React, TypeScript, Next.js

Backend: Node.js (via Next.js API routes)

Data Handling: CSV parsing with custom utility functions

Testing: Jest

Styling: CSS Modules / Plain CSS (easily swappable with Tailwind or similar)

📂 CSV Data Format
The CSV data represents half-hourly electricity usage.

Format:

Column 4: Date

Columns 6 onward: kWh readings per 30-minute interval

Example snippet:

swift
Copy
Edit
NMI,Date,Read Type,...,01/01/2021,01/01/2021,...
ABC123,01/01/2021,A,...,0.122,0.140,...
🚀 Getting Started
1. Install dependencies
bash
Copy
Edit
npm install
2. Run the development server
bash
Copy
Edit
npm run dev
Open http://localhost:3000 to view it in the browser.

3. Run tests
bash
Copy
Edit
npm run test

👩‍💻 Author
Akansha Gupta
Frontend Developer with a strong interest in full-stack development, data-driven UI, and creating user-centric applications.
