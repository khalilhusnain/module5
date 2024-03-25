# module5
# Task Board

Task Board is a simple Kanban board for managing project tasks. It allows users to add, update, and delete tasks, as well as visualize task progress across different stages.

## Features

- Display tasks in columns representing task progress states: To Do, In Progress, and Done.
- Color-coded indication of task deadlines: Yellow for nearing deadline and Red for overdue.
- Ability to add new tasks with title, description, and deadline date.
- Save tasks locally using localStorage, ensuring persistence after page refresh.
- Drag-and-drop functionality to update task progress state.
- Delete tasks from the board.

## Usage

To use Task Board:

1. Open `index.html` in a web browser.
2. Click on the "Add Task" button to define a new task.
3. Enter the task details in the modal dialog and click "Save".
4. Drag tasks between columns to update their progress.
5. Click on the "Delete" button to remove a task from the board.

## Dependencies

- Bootstrap (5.1.3)
- jQuery (3.4.1)
- jQuery UI (1.12.1)
- Day.js (1.11.3)

## File Structure

- `index.html`: Main HTML file containing the Task Board interface.
- `assets/css/style.css`: CSS file for custom styling.
- `assets/js/script.js`: JavaScript file containing the logic for Task Board functionality.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
