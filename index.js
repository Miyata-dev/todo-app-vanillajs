import { handleClick } from "./utils/index.js";

const taskHolder = document.querySelector("#taskHolder");
const input = document.querySelector("#input"); // Encuentra el input dentro del formulario
const taskContainer = document.querySelector("#taskContainer");

const tasks = []; //Usa la clase Task, esta lista es la que se despliega después en el dom.

taskHolder.addEventListener("submit", (event) => {
  handleClick({ event, input, tasks, taskContainer });
});