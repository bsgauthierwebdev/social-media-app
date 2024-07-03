# Social Media App Back-End
------------------------------------------------
### Code for the server side of the application
------------------------------------------------
## Steps
* The following steps are detailed in Phase One of the YouTube tutorial (https://www.youtube.com/watch?v=ldGl6L4Vktk&t=2607s)

I. Installation
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
II. Creating Express App
     3. Set up the gitignore to prevent node_modules and environment variables from being pushed to the Github repository
     4. Create a "start" script using nodemon
     5. Create index.js file in main client folder. This houses all of the main code to run the back-end server