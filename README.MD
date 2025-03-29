# EmployWise Assignment

## Overview

This is a Next.js(React Framework) application that integrates with the Reqres API to perform basic user management functions, including authentication, user listing, editing, and deletion.

## Features

- *Authentication Screen:* Users can log in using the provided credentials.
- *User List Page:* Displays a paginated list of users.
- *Edit & Delete Users:* Users can edit user details and delete users.
- *Client-side Search & Filtering:* Search functionality for users.
- *Navigation:* Implemented using React Router.
- *Persistence:* The authentication token is stored in local storage.
- *Error Handling:* Proper error messages are displayed for API failures.

## Tech Stack

- *Next.js* (React framework)
- *Axios* (For API requests)
- *Tailwind CSS* (For styling)
- *React Router* (For navigation)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 16.0)
- npm or yarn

### Installation

1. Clone the repository:
   bash
   git clone https://github.com/srivanij23/UserManagement-ReqresApi-
   
2. Navigate to the project folder:
   bash
   cd usermanagement-reqresapi-
   
3. Install dependencies:
   bash
   npm install --legacy-peer-deps
   
   or
   bash
   yarn install
   

### Running the Application

To start the development server, run:

bash
npm run dev


Or, if using yarn:

bash
yarn dev


The application will be accessible at http://localhost:3000/.


### API Endpoints Used

- *Login:* POST https://reqres.in/api/login
- *Fetch Users:* GET https://reqres.in/api/users?page=1
- *Edit User:* PUT https://reqres.in/api/users/{id}
- *Delete User:* DELETE https://reqres.in/api/users/{id}

### Deployment

You can deploy the Next.js app on platforms like Vercel, Netlify, or any Node.js hosting service. To deploy on Vercel:

bash
npm install -g vercel
vercel


Follow the on-screen instructions to complete the deployment.

### Bonus Features Implemented

✅ Client-side search & filtering✅ React Router for navigation✅ Hosted on [https://user-management-reqres.vercel.app/]

## Author

[J Srivani](https://github.com/srivanij23)

## License

This project is licensed under the MIT License.