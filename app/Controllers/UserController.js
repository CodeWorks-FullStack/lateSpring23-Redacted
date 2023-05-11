import { userService } from "../Services/UserService.js";
import { Pop } from "../Utils/Pop.js";


export class UserController {
  constructor() {
    // NOTE put a console log in the constructor right away to let the students know to register the controller 
    // console.log('hello from the user controller');

    // NOTE when the controller is being mounted to the page everything under the constructor will run on page load (because the page is being constructed)
    this.verifyUser()
  }

  // NOTE this function is interacted with so it goes inside the class because there will be user input
  // NOTE this function is async because you have to wait for the user to input - if this is not async/await then it will run the entire block of code before the user puts something in 

  async verifyUser() {
    let input = await Pop.prompt('Please put in your agency code')
    // NOTE how do you get this to run on page load --> put it in the constructor
    // console.log('this is the input', input);
    userService.verifyUser(input)
  }
}