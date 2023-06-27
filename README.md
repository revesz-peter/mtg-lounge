# <img src="https://github.com/revesz21/mtg-lounge/assets/106816098/f7456ef0-33c9-4bc0-9663-1c620659245a" width="300">

## Table of Contents


1. [About The Project](#about-the-project)
2. [Architecture](#architecture)
3. [Tech Stack](#built-with)
4. [Features](#features)
5. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setting up PostgreSQL](#setting-up-postgresql-server)
    - [Installation](#installation)


## About The Project

<img src="https://github.com/revesz21/mtg-lounge/assets/106816098/d5049f1c-032d-444c-b9a7-255dace68c09" width="550">

This is a responsive and interactive Magic: The Gathering deck builder to enhance your gameplay experience. It offers an easy-to-use interface for searching through the MTG card library and creating a custom deck. Features include card search functionality, advanced card filtering options, drag-and-drop deck building, deck export and a simple and clean user interface.

## Architecture

The application leverages the Scryfall API to populate its PostgreSQL database with MTG card data, ensuring a comprehensive and up-to-date card library. The data is fetched from the database using Spring Boot, Hibernate, and Spring Data JPA, forming a robust backend that provides the frontend with the necessary data. The frontend, built with React and TypeScript, presents the data in a user-friendly interface. This layered architecture promotes modularity, maintainability, and scalability, providing a solid foundation for future enhancements.

## Built With

This project is built with an array of reliable technologies to ensure high performance and seamless user experience. Below is a list of the major libraries and tools used:

- [React](https://reactjs.org/): A popular JavaScript library for building user interfaces, especially single-page applications.
- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds types to the language, improving developer productivity and code quality.
- [Vite](https://vitejs.dev/): A build tool that significantly improves the frontend development experience. It provides faster and leaner development for modern web projects.
- [React Router Dom](https://reactrouter.com/): The standard routing library for React, used to create a single page application with navigation without page refreshes.
- [React DnD](https://react-dnd.github.io/react-dnd/about): A set of React higher-order components to help you build complex drag and drop interfaces while keeping your components decoupled.
- [Tailwind CSS](https://tailwindcss.com/): A highly customizable, low-level CSS framework that gives you all the building blocks you need to build bespoke designs.
- [Spring Boot](https://spring.io/projects/spring-boot): An open-source Java-based framework used to create stand-alone, production-grade Spring-based Applications with minimal effort.
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa): It simplifies the development of creating a data access layer by reducing the amount of boilerplate code required.
- [Hibernate](https://hibernate.org/): An object-relational mapping tool for the Java programming language. It provides a framework for mapping an object-oriented domain model to a relational database, enabling developers to more easily manipulate database data.
- [PostgreSQL](https://www.postgresql.org/): An advanced, open-source relational database management system.
- [Spring Security](https://spring.io/projects/spring-security): A powerful and highly customizable authentication and access-control framework to secure Spring-based applications.
- [JSON Web Token (JWT)](https://jwt.io/): An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
- [Lombok](https://projectlombok.org/): A Java library that plugs into your editor and build tools, spicing up your Java by reducing the boilerplate code.


## Features

1. **User Registration & Login**: In order to save decks and manage previously built ones, users need to register and log in to the platform. This ensures a personalized experience for each user.
2. **Card Search**: Search through the MTG card library using the search field. The search is responsive and the results are displayed in a paginated grid format.
3. **Advanced Filtering**: Users can filter the card library based on mana cost, set, and color.
4. **Drag-and-Drop Deck Building**: Users can drag cards from the search results into their deck. Cards in the deck are displayed in a condensed format.
5. **Deck Saving & Management**: Registered users can save their custom decks for future use and manage them from their personal dashboard.
6. **Deck Export**: All users, whether logged in or not, can copy their custom deck to the clipboard in a format acceptable for MTG Arena with a single click. This feature simplifies the process of importing decks into the game.
7. **Responsive Design**: The application has a responsive design and can be used on various devices with different screen sizes.

## Getting Started

### Prerequisites

- Node.js
- Java 8 or newer
- Maven
- PostgreSQL

### Setting Up PostgreSQL Server

1. Download and install PostgreSQL from [here](https://www.postgresql.org/download/).

2. Once installed, open the pgAdmin tool that comes with PostgreSQL.

3. Create a new database for this project. You can name it `mtg_lounge`.

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/revesz21/mtg-lounge.git
    ```
    
2. Install NPM packages

    ```bash
    cd client
    npm install
    ```

3. On the server side, set the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` fields in the `application.properties` file to the URL, username, and password of your PostgreSQL database, respectively. For example:
    ```properties
    spring.datasource.driver-class-name=org.postgresql.Driver
    spring.datasource.url=jdbc:postgresql://localhost:5432/mtg_lounge
    spring.datasource.username=postgres
    spring.datasource.password=your-password
    ```
    
4. Run the Spring Boot server

    ```bash
    cd ../server
    mvn spring-boot:run
    ```
    
5. Start the React app (in another terminal window)
    ```bash
    cd ../client
    npm start
    ```
    

