<img src="https://github.com/kirkwat/mate-match/assets/60279003/54c7fbfa-91e0-40bc-877b-7957075f6481" 
     alt="Mate Match"
     width="400rem"/>

#### This is a full-stack web application that allows users to find new roommates tailored to their preferences. [Click here](https://www.youtube.com/watch?v=c0ZcLqA5QlE) to view the demo.

<hr/>

## Table of Contents

- [Features](#features)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Cloud Architecture](#cloud-architecture)
- [CI/CD](#cicd)
  - [Unit Testing](#unit-testing)
  - [Deployment](#deployment)
- [Configuration](#configuration)
  - [Development](#development)
  - [Production](#production)
- [Next Steps](#next-steps)

## Features

- Create a personal account that provides secure authentication.
- Create and edit personal profile with an avatar image, description, and personal details such as lifestyle preferences.
- Search across other users on the platform and filter results based on user traits.
- View user profiles with ability to send roommate requests with custom messages.
- View sent and received roommate requests with ability rescind sent requests and approve/decline received requests.
- View list of personal roommates as well as roommates of other users.

### Frontend

#### Technologies: React.js Client, Axios, Bootstrap

- Integrated API calls using Axios to communicate with the backend server.
- Applied theming and styling to the user interface using the Bootstrap framework for a consistent and visually appealing design.
- Enforced Login Authentication using JWT (JSON Web Tokens) for secure and authenticated user sessions.
- Implemented the use of Access and Refresh Tokens to manage persistent login sessions and ensure authorized access to protected routes.
- Developed a user-friendly form for creating and updating user profiles, allowing users to input and save their personal information.
- Utilized profile search functionality with advanced filter options to help users find desired profiles based on specific criteria.
- Enabled users to view and interact with other users, including sending and managing roommate requests, approving or declining received requests, and managing existing roommates.

### Backend

#### Technologies: Express Server, Knex.js, AWS SDK

- Implemented MVC (Model-View-Controller) pattern to provide a structured and organized codebase, separating concerns for better maintainability and scalability.
- Utilized Knex.js to interact with the database by performing queries and modifications necessary for editing profiles, sending roommate requests, and adding roommates.
- Applied CORS (Cross-Origin Resource Sharing) to only allow requests from whitelisted origins, ensuring a secure and controlled API access.
- Established authentication using JWT (JSON Web Tokens) with access tokens and refresh tokens, enabling persistent authentication and secure user sessions.
- Leveraged the AWS SDK to add and delete images from the S3 bucket, providing efficient management of avatar images.
- Used the AWS SDK to generate signed URLs with CloudFront and a private key retrieved from Secrets Manager, ensuring secure access to avatar images.
- Configured logging midddleware to record API requests and errors, facilitating debugging and monitoring of the application.
- Utilized Knex database schema migrations to manage and version the database schema, allowing seamless updates and deployments.

## Cloud Architecture

![High Level Cloud Architecture Diagram](https://github.com/kirkwat/mate-match/assets/60279003/024714eb-f4df-4145-b9b5-b2e504253ad9)


The application was deployed on the AWS Cloud, following an architecture that adheres to the AWS Well-Architected Framework. Various AWS services were utilized to ensure alignment with recommended cloud architecture practices.

The front-end React app client was deployed using a combination of AWS services, including CloudFront for content delivery, Amazon S3 for storage, ACM (AWS Certificate Manager) for SSL certificates, and Route 53 for DNS management.

The back-end Node.js Express API was containerized using ECS (Elastic Container Service) and stored in ECR (Elastic Container Registry). It was deployed using Fargate, a serverless compute engine for containers, and integrated with an ALB (Application Load Balancer) for traffic distribution.

For the database, RDS (Relational Database Service) was utilized with MySQL to store application data.

Avatar images were stored and served using CloudFront and S3, providing scalable and high-performance image delivery.

To securely retrieve private keys for generating CloudFront signed URLs, the Express API utilized Secrets Manager to securely retrieve and manage sensitive information.

## CI/CD

### Unit Testing

The development process followed test-driven methodology, where emphasis was placed on writing unit tests for both backend Express API calls and frontend React elements. Unit tests were required to pass successfully as part of the quality assurance process before merging any pull requests into the main branch. This approach ensured the reliability and stability of the codebase by verifying the functionality of individual components and their interactions.

### Deployment

GitHub Actions is utilized to automate the deployment process for changes pushed to the main branch. The deployment workflow involves compiling the React client and sending the bundle to an S3 bucket. Subsequently, the CloudFront cache is invalidated to ensure the delivery of the updated content. For the Express API, a new version of the Docker image is uploaded to the ECR (Elastic Container Registry), which is then used within the ECS cluster to deploy the latest changes. This streamlined approach ensures efficient and consistent deployment of the application.

## Configuration

### Development

- Frontend:
  - Configure the `.env` file in the frontend directory by setting the `REACT_APP_API_URL` variable to http://localhost:8000 in order to establish a connection with the Express API.
  - Install dependencies and run the command `npm run start` to launch the React app in developer mode, enabling real-time code changes and automatic reloading.
- Backend:
  - Configure the `.env` file in the backend directory by setting the `CLIENT_URL` variable to http://localhost:3000 in order to establish a connection with the React client.
  - Ensure that the `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` environment variables are properly set for user authentication.
  - Set up a local MySQL database using Docker or deploy an RDS instance on AWS. Configure the necessary MySQL environment variables to establish a connection with the database.
  - To use the avatar image feature, set up and configure the required AWS services: S3, CloudFront, and Secrets Manager. Utilize Secrets Manager to securely store the private key required to generate signed CloudFront URLs for avatar images.
  - Install dependencies and run the command `npm run dev` to launch the Express server in developer mode, enabling real-time code changes and automatic reloading.

### Production

- Frontend:
  - Configure the `.env` file in the frontend directory by setting the `REACT_APP_API_URL` variable to https://api.matematching.com in order to establish a connection with the Express API.
  - Configure a S3 bucket to store the static content of the React app, CloudFront as the CDN to distribute the content globally, Route 53 for DNS management, and ACM to handle SSL/TLS certificates for secure communication.
  - Install dependencies and run the command `npm run deploy` to compile the React app, upload content to S3 bucket, and invalidate the CloudFront cache.
- Backend:
  - Configure the `.env` file in the backend directory by setting the `CLIENT_URL` variable to https://matematching.com in order to establish a connection with the React client.
  - Ensure that the `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` environment variables are properly set for user authentication.
  - Deploy an MySQL RDS instance on AWS and configure the necessary MySQL environment variables to establish a connection with the database.
  - Configure ECR to store the Docker image of the backend Node.js Express server, ECS to manage the containerized deployment, Fargate for serverless compute capacity, and ALB to distribute incoming traffic.
  - To use the avatar image feature, set up and configure the required AWS services: S3, CloudFront, and Secrets Manager. Utilize Secrets Manager to securely store the private key required to generate signed CloudFront URLs for avatar images.

## Next Steps

If I were to continue working on this project, this is where I would start next.

- Develop a CloudFormation or Terraform configuration file to streamline the setup of the cloud architecture, enabling simple replication and deployment.
- Implement an instant messaging feature within the application, empowering users to engage in real-time conversations before initiating roommate requests, fostering better communication and connection.
