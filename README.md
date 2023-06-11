# <img src="https://github.com/revesz21/mtg-lounge/assets/106816098/f7456ef0-33c9-4bc0-9663-1c620659245a" width="300">

## Table of Contents
1. [About The Project](#about-the-project)
2. [Tech Stack](#built-with)
3. [Features](#features)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## About The Project
This is a responsive and interactive Magic: The Gathering deck builder and comprehensive card database to enhance your gameplay experience. It offers an easy-to-use interface for searching through the MTG card library and creating a custom deck. Features include card search functionality, advanced card filtering options, drag-and-drop deck building, and a simple and clean user interface.

## Built With

This project is built with an array of robust and reliable technologies to ensure high performance and seamless user experience. Below is a list of the major libraries and tools used:

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

- [Lombok](https://projectlombok.org/): A Java library that plugs into your editor and build tools, spicing up your Java by reducing the boilerplate code.


## Features
1. **Card Search**: Search through the MTG card library using the search field. The search is responsive and the results are displayed in a grid format.
2. **Advanced Filtering**: Users can filter the card library based on mana cost, set, and other attributes.
3. **Drag-and-Drop Deck Building**: Users can drag cards from the search results into their deck. Cards in the deck are displayed in a condensed format.
4. **Deck Export**: With a single click, users can copy their custom deck to the clipboard in a format acceptable for MTG Arena. This feature simplifies the process of importing decks into the game.
5. **Responsive Design**: The application has a responsive design and can be used on various devices with different screen sizes.

## Getting Started
### Prerequisites
- Node.js
- Java 8 or newer
- Maven
- PostgreSQL

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
3. Run the Spring Boot server
    ```bash
    cd ../server
    mvn spring-boot:run
    ```
4. Start the React app (in another terminal window)
    ```bash
    cd ../client
    npm start
    ```
