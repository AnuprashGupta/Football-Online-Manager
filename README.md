# Football-Online-Manager

# Setup Instructions

# after cloning the repo:

Repo URL: https://github.com/AnuprashGupta/Football-Online-Manager.git

# backend/server setup:
cd server: npm install then run the command: npm run dev it will start the server and will connect to the database:
# Create the env file in the server folder:
PORT=8000
JWT_SECRET=your_secret_key
MONGO_URI = your-mongo-uri

# frontend setup
cd frontend: npm install 
npm start: it will start the frontend on the port 3000

# Running the Full Application
Ensure the backend server is running (http://localhost:8000).
Ensure the frontend server is running (http://localhost:3000).
Open the browser and navigate to http://localhost:3000 to access the application.

# Features
User authentication (login/register).
Team management (view players, budget).
Transfer market with filtering by team, player name, and price.
Add/remove players to/from the market.

# Time report:

# section                # time
1. user login/register and authentication (frontend & backend) : 4 hrs
2. team allocation and budget (frontend & backend) : 2:30 hrs
3. Transfer market with filteration functionalities (frontend & backend) : 4-5 hourse
4. Add/remove player & logout (frontend & backend): 1:30 hrs
5: some bug fixes and refinement: 2 hrs



