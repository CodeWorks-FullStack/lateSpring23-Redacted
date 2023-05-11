import { appState } from "../AppState.js"
import { Pop } from "../Utils/Pop.js"


class UserService {
  verifyUser(input) {
    // NOTE we are using a for-in loop to loop over each key:value pair/property in an object
    // NOTE this is a 'you don't need to know how to do this, don't need it for checkpoint' showing it off because this app requires it, also good to know how to iterate over an object 
    let agencies = appState.agencies
    // NOTE key/emoji is a banana word - show off using key
    // console.log('these are my agencies', agencies);
    // use a for-in loop to loop over each key:value pair/property in the agencies object
    for (const emoji in agencies) {
      // iterate through agencies and check to see if the user input matches one of the password value in the object
      // if the input matches then take the key and assign that to the user or save that somewhere 
      if (agencies[emoji] == input) {
        Pop.toast('You have been verified.')
        // if the key and its corresponding value matches the users input then store that key in the appState for the user
        // NOTE show the students the console for when the value matches and when the value doesn't match one of the keys 
        // console.log('verified', key, agencies[key]);
        appState.userAgency = emoji
        // console.log(appState.userAgency);
        return
      }
    }
    Pop.error('Hey Hacker.... get outta here.')
  }
}


export const userService = new UserService()