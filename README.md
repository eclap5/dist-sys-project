# Reservation calendar
An activity reservation calendar project created for Distributed Systems course. Everything runs inside the cloud in Azure except for the client. Every part of the system operates concurrently, is physically distributed, linked over a network, and have independent clocks, making the system distributed in nature. Project utilizes containerization with a CI/CD-pipeline to build Docker images and deploying them to Azure Container Registry automatically on main branch update.

## Technical Stack

-   **Database**: MongoDB, specifically **Azure Cosmos DB for MongoDB**, handles data persistence.
-   **Backend**: Split into microservices using **Node.js** and **TypeScript**, exposed as a **REST API**.

## Main components:
- **CLI client:** A Python application with the ability to create new reservations or list existing ones.
- **Activity Controller Microservice (ACM)**: Handles incoming requests from the CLI client and forwards them to the Database Controller.
- **Database Controller Microservice (DCM)**: Processes requests from the Activity Controller, interacts with the database, and ensures data flows back to the client following the path DB -> DCM -> ACM -> Client.

## Features

The system is designed to demonstrate high scalability, reliability, and maintainability through:

-   **Containerization**: Ensures consistent environments from development through production.
-   **CI/CD Pipeline**: Automates the build and deployment process.
-   **Azure Integration**: Takes full advantage of Azure's managed services and infrastructure.

## Project Goals

The primary goal was to create a software system fully executed and maintained within the Azure cloud environment, focusing on:

-   **Distributed System Characteristics**
-   **Cloud-Native Technologies**
