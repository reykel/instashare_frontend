#  InstaShare System Frontend  
 
## Getting Started

InstaShare Frontend is an application based on Vue 3 in Vite [Vite](https://vitejs.dev/) that provides a frontend client for InstaShare System Backend. The system is configured to require a secure connection on deployment. Therefore, an SSL certificate must be installed on the destination domain before runs deployment process. Also you are going to require an email provider and [Pusher account](https://pusher.com) configuration to be set and running.

To get started, clone this repository from GitHub and install the dependencies.

## Stage and Features

This project is at an early stage of the development process. As a work-in-progress repository, its content will be increased and adjusted by a periodic succession of commits pushed from the local environment. The set of features currently uploaded are those related to platform management. No business logic has been developed yet, except for modules designed for testing and demonstration purposes. A more extensive explanation will be posted in the wiki session.

## Application setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
2. Clone the sample application repository.
3. Navigate to the root folder of the application in the command line.
4. Type `npm install` to install required npm packages.
5. Type `npm run dev` to start a development server.
6. The application opens in your browser at <http://localhost:8080>.

Next step is running the application using the serve script and navigate to **http://localhost:8080/** to view the application.</p>

## Application testing

1. Type `npm run test` to run the testing set.

## Structure

InstaShare System Frontend consists of 2 main parts; the application layout and the resources:

### Application layout: 
 -**App.vue** inside src folder is the main component containing the template for the base layout

### Resources:
 -**SASS** structure for the layout are placed inside the **src/assets/** folder.</p>

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2024-present, [InstaShare](https://app.instashare.com/)
