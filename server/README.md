# Social Media App Back-End
------------------------------------------------
### Code for the server side of the application
------------------------------------------------
## Steps
* The following steps are detailed in Phase One of the YouTube tutorial (https://www.youtube.com/watch?v=ldGl6L4Vktk&t=2607s)

 ### Installation
 1. Create the server folder and initialize the project 
     - npm init -y
 2. Install the necessary dependencies
     - Express - Node.js framework, server is built on this framework
     - PostgreSQL (pg) - Database management for all of the back-end information
     - .env (dotenv) - Houses the environmental variables, used to save secrets like db addresses, script keys and passwords
     - Helmet - Helps with security
     - CORS - Helps with communication between the server and the client
     - Morgan - Request logging middleware
     - Nodemon - Helps to restart the server every time a change is made
     - .gitignore (gitignore) - Prevents certain files from being uploaded to the Github repository
### Creating Express App
 3. Set up the gitignore to prevent node_modules and environment variables from being pushed to the Github repository
 4. Create a "start" script using nodemon
 5. Create index.js file in main client folder. This houses all of the main code to run the back-end server
     - Import the necessary dependencies
     - Start the server
### Middleware & First Request
 6. Initialize the middlewares
 7. Build test routes to make sure server and routes are working properly
### Creating User Router
 8. Create new folder for routes and add users.js file.
     - This file will contain all the routes to handle user functions
     - Build a test file to import into the main application and test the routing.
     - Import file into main application and test the route.
 9. Add a new file auth.js
     - This file will handle all of the authentication and authorization routing, including registration and login routes.
     - Import file into main application and test the route.
### Creating User Model
10. Add database.sql file to handle the tables in the database and begin building the user model.
    - Build the schema for the Users table containing user_id, username, email, password, profile pic, cover pic, users_following, users_followed, is_admin, created_at & updated_at
### Login and Register System
11. Create db folder and index.js file to handle connection to the database
12. Create a controllers folder and auth.js file to handle all of the authentication functions
13. 