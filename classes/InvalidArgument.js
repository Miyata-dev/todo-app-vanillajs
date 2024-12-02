import { revisedRandId } from "../utils/index.js";

//creo clases que personalizan los errores. 
export class InvalidArgument extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgument";
  }
}

export class MissingArgument extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingArgument";
  }
}
//creo la clase task para poder después poder manejarla mejor en el dom.
export class Task {
  #taskMessage;
  #id;
  #hasBeenDisplayed;

  constructor(taskMessage) {
    Task.manageArgs(taskMessage);
    this.#taskMessage = taskMessage;
    this.#id = revisedRandId();
    this.#hasBeenDisplayed = false;
  }
  
  static manageArgs(taskMessage) {
    if (taskMessage === undefined) {
      throw new MissingArgument("taskMessage must be provided");
    }

    if (!(typeof taskMessage === "string")) {
      throw new InvalidArgument("taskMessage must be a String");
    }
  }
  
  set hasBeenDisplayed(hasBeenDisplayed) {
    this.#hasBeenDisplayed = hasBeenDisplayed;
  }

  //getters
  get taskMessage() {
    return this.#taskMessage;
  }

  get id() {
    return this.#id;
  }

  get hasBeenDisplayed() {
    return this.#hasBeenDisplayed;
  }
}