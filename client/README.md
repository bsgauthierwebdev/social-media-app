# Social Media App Front-End
------------------------------------------------
### Code for the client side of the application
------------------------------------------------
## Steps
* The following steps are detailed in Phase One of the YouTube tutorial (https://www.youtube.com/watch?v=zM93yZ_8SvE&t=0s)

 ### Installation
 1. Create the client folder and create the React application
     - npx create-react-app
     - Delete unnecessary files from src folder (all files except App.js & index.js)
     - Clean up unnecessary code from App.js & index.js files
     - Delete unnecessary files from public folder (all files except index.html)
     - Clean up unnecesary code from index.html
     - Select font style from Google Fonts
     - Paste font information into index.html
     - Create style.css file in the public folder and link it in the index.html file
     - Set up global styling in the style.css file in the public folder
     - Create assets folder in the public folder to host images to be used in the project
     - Create folders for pages & components in the src folder
     - Create home folder in the pages folder with files Home.js & home.css
     - Import the Home page in the App.js file
     - Install Material Icons into the project (npm install @mui/material @mui/icons-material)
 2. Topbar Component
     - Make topbar folder in the components folder and create Topbar.jsx & topbar.css files
     - Import Topbar component into the Home page
 3. Body Components
     - Create feed, sidebar & rightbar folders in the components folder
     - Create .jsx & .css files in the folders mentioned above
     - Build & style Sidebar component and import into the Home component
     - Create folder for and build new Share component
     - Import Share component into the Feed component (This is where you can add posts)
     - Create folder for and build new Post component
     - Add the Post component to the Feed component underneath the Share component
     - Build & style the Rightbar component
 4. Sidebar Component with Materian Icons
 5. Feed (Share, Post Components)
 6. Rightbar Component
 7. Using Dynamic Data
 8. Like Functionality with useState Hook
 9. Profile Page
10. Login & Register Pages
11. Future




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
