// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Create a function to create a task card
function createTaskCard(task) {
  let cardBackGroundColor = ''
  let cardFontColor = '';
  // Get the selected date from the datepicker (assuming you have a datepicker with id 'datepicker')
var selectedDate = new Date(task.deadline);

// Get the current date
var currentDate = new Date();
// Set the time component of the current date to midnight
currentDate.setHours(0, 0, 0, 0);

// Compare the dates
if (selectedDate < currentDate) {
    cardBackGroundColor = '#dc3545'
    cardFontColor = 'white'
} else if (selectedDate > currentDate) {
  console.log("Selected date is in the future");
} else {
  cardFontColor = 'white'
  cardBackGroundColor = '#ffc107'
    console.log("Selected date is today");
}

  const card = `
    <div class="card mb-3" id="task-${task.id}" style="background-color:${cardBackGroundColor}; color: ${cardFontColor};">
      <div class="card-header">${task.title}</div>
      <div class="card-body">
        <p class="card-text">${task.description}</p>
        <p class="card-text">Deadline: ${task.deadline}</p>
        <button class="btn btn-danger delete-btn" data-task-id="${task.id}">Delete</button>
      </div>
    </div>`;
  return card;
}

// Create a function to render the task list and make cards draggable
function renderTaskList() {
  $("#todo-cards").empty();
  $("#in-progress-cards").empty();
  $("#done-cards").empty();

  taskList.forEach(task => {
    const card = createTaskCard(task);
    $(`#${task.status}-cards`).append(card);
  });

  $(".delete-btn").click(handleDeleteTask);

  $(".card").draggable({
    revert: "invalid",
    cursor: "move",
    zIndex: 1000,
  });
}

// Create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const title = $("#title").val();
  const description = $("#description").val();
  const deadline = $("#deadline").val();
  const status = "todo";

  const newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    deadline: deadline,
    status: status,
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));

  renderTaskList();
  $("#formModal").modal("hide");
  $("#taskForm")[0].reset();
}

// Create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.target).data("task-id");
  taskList = taskList.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.attr("id").split("-")[1];
    const newStatus = $(event.target).attr("id");
    const taskIndex = taskList.findIndex(task => task.id.toString() === taskId);
  
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
  
    // Move the dragged card to the new section
    ui.draggable.appendTo(`#${newStatus}-cards`).show();
    location.reload()
  }
  
  // When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
  $(document).ready(function () {
    renderTaskList();
  
    $(".lane").droppable({
      accept: ".card",
      drop: handleDrop,
    });
  
    $("#deadline").datepicker();
  
    $("#taskForm").submit(handleAddTask);
  });
  