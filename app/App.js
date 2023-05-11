import { CasesController } from "./Controllers/CasesController.js";
import { UserController } from "./Controllers/UserController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();

  casesController = new CasesController()

  userController = new UserController()
}

window["app"] = new App();
