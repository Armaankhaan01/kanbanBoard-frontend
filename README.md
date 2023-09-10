# Kanban Board Application

A Kanban board application built with Vite, MongoDB, and Node.js. This application allows users to manage tasks, move them between different status groups, and provides a responsive design for both desktop and mobile devices.

![Desktop Interface](./desktop-screenshot.png)
![Mobile Interface](./mobile-screenshot.png)

## Features

### Front-end Requirements:

1. **Homepage:** Display all tasks, segregated by their status groups: To Do, Doing, Done.
2. **Task Card:** Showcase the task title and description.
3. **Add Task:** Integrate a form to create a new task, prompting users for the title and description of the task.
4. **Edit Task:** Provide an option to edit an existing task’s title and description.
5. **Delete Task:** Implement a feature to remove a task permanently.
6. **Task Status:** Empower users to effortlessly drag and drop tasks between the To Do, Doing, and Done categories.
7. **Responsive Design:** Ensure the application is fully functional and visually coherent on mobile devices.

### Back-end Requirements:

1. Create an API with endpoints to support CRUD operations for tasks.
2. Tasks should be stored in a database.

## Live Demo

Check out the live demo of the project [here](https://ark-kanban-board.vercel.app/).

## Installation and Setup

1. Clone this repository.
2. Navigate to the project directory.

### Front-end (Vite):

```bash
cd frontend
npm install
npm run dev
