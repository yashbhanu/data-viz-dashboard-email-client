# Interactive Data Visualization Dashboard

This is a data visulization dashboard to generate interactive Bar chart & Line chart based on Date range, Age & Gender Filters. 
The given [Dataset](https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0) in Google Docs requirements is integrated into MongoDB Database using a DataPipeline script which is served over an API integration layer for generating charts.
A share chart option has been added to share data visualization charts over a URL upon Authentication.
It's a monorepo where Frontend & Backend are divided into sub-folders client & server respectively.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
* Node.js
* npm (Node Package Manager)

## Installation

<b>Clone the Repository:</b>

```sh
  git clone https://github.com/yashbhanu/data-viz-dashboard.git
  
  ```

  <b>Run Frontend</b>

  ```sh
  cd client
  ```

  <b>Install Dependencies:</b>

```sh
  npm install
  ```

  <b>Configure Environment Variables:</b>
Create a .env file in the root of the project and provide the necessary environment variables. For example:

```sh
  REACT_APP_SERVER_URL="YOUR BACKEND URL"
  REACT_APP_CLIENT_URL="YOUR FRONTEND URL"
  ```

<b>Run the Application:</b>

```sh
  npm start
  ```

    <b>Run Backend</b>

  ```sh
  cd server
  ```

  <b>Install Dependencies:</b>

```sh
  npm install
  ```

  <b>Configure Environment Variables:</b>
Create a .env file in the root of the project and provide the necessary environment variables. For example:

```sh
  MONGODB_URI="YOUR MONGODB URI"
  JWT_SECRET="YOUR JWT SECRET KEY"
  CLIENT_URL="YOUR FRONTEND URL"
  ```

<b>Run the Application:</b>

```sh
  npm start
  ```

  This command will start the server, and you can view the application in your browser at http://localhost:4000.

  ## Deployment

Check out the live app at [https://data-viz-dashboard-roc8.vercel.app/](https://data-viz-dashboard-roc8.vercel.app/).