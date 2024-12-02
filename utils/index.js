import { InvalidArgument, MissingArgument, Task } from "../classes/InvalidArgument.js";

//HELPER FUNCTIONS...
const addRemoveDivEvent = ({ card }) => {
  card.addEventListener("click", (ev) => {
    const { target } = ev;
    const cssClasses = target.classList;
    //solo elimina el div si es que el target fue el deleteIcon.
    if (cssClasses.contains("deleteIcon")) {
      card.remove();
    } 
  });
}
//ACTUAL FUNCTIONS.
export const revisedRandId = () => {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}
//agrega la tarea a el arreglo que se pasa por argumentos.
export const addTask = ({ taskArr, value }) => {
  if (!Array.isArray(taskArr)) {
    throw new InvalidArgument("taskArr must be an array.");
  }

  if (!(typeof value === "string")) {
    throw new InvalidArgument("value must be a string.");
  }

  if (value.length === 0) return; //no agrega el str si está vacío

  const task = new Task(value);
  taskArr.push(task);
}
//esta función se encarga de mostrar la tarea en el dom.
export const showTask = ({ taskArr, container }) => {
  if (!Array.isArray(taskArr)) {
    throw new InvalidArgument("taskArr must be an array.");
  }

  if (container === undefined) {
    throw new MissingArgument("container div must be provided");
  }

  taskArr.forEach(element => {
    if (element.hasBeenDisplayed) return;

    const { card } = createTaskCard({ task: element.taskMessage });
    element.hasBeenDisplayed = true; //se deja como que ya se desplejo, por lo tanto ya no se muestra dsp.
    container.appendChild(card);
    //agrega el event click para poder eliminar la taskCard de ser necesario.
    addRemoveDivEvent({ card });
  });
}
//crea la taskCard, la cual muestra la tarea guardada por el usuario.
export const createTaskCard = ({ task }) => {
  if (!(typeof task === "string")) {
    throw new InvalidArgument("task must be a String.");
  }

  // Crear contenedor principal
  const card = document.createElement('div');
  card.classList.add("card");

  // Crear texto de la tarea
  const taskText = document.createElement('span');
  taskText.textContent = task;

  // Crear contenedor de iconos
  const iconContainer = document.createElement('div');
  iconContainer.style.display = 'flex';
  iconContainer.style.gap = '10px';

  // Crear icono de edición
  const editIcon = document.createElement('span');
  editIcon.textContent = '✏️'; // Emoji de lápiz
  editIcon.style.cursor = 'pointer';

  // Crear icono de eliminación
  const deleteIcon = document.createElement('span');
  deleteIcon.textContent = '🗑️'; // Emoji de papelera
  deleteIcon.style.cursor = 'pointer';
  deleteIcon.classList.add("deleteIcon");

  // Agregar iconos al contenedor de iconos
  iconContainer.appendChild(editIcon);
  iconContainer.appendChild(deleteIcon);

  // Agregar texto e iconos al contenedor principal
  card.appendChild(taskText);
  card.appendChild(iconContainer);

  return { card, deleteIcon, editIcon };
}

//event functions
export const handleClick = ({ event, input, tasks, taskContainer }) => {
  event.preventDefault();

  const value = input.value;
  
  addTask({ taskArr: tasks, value });
  showTask({ taskArr: tasks, container: taskContainer });
  input.value = "";
}