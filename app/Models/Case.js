import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";


export class Case {
  constructor(data) {
    this.id = data.id || generateId()
    this.reportBody = data.reportBody || 'Fill out a report.'
    this.clearance = data.clearance
    this.agency = data.agency
    // NOTE we have things in our local storage so we need to write a ternary thats going to say hey if there is a date show us that date, if there is not assign us a new date
    this.date = data.date ? new Date(data.date) : new Date()
    this.unlocked = false
  }

  // NOTE our case template will take in our getters, it creates an additional property on a class and they can be accessed just like any other property

  // NOTE since this is MVC we need to tell the button where we are going to find the function using app.CONTROLLER

  // NOTE add the id as an argument because its the unique value and good practice, needs to be in a string because the id is a string (the way JS reads it, if I don't put it in a string JS thinks its an object/variable)

  get CasesTemplate() {
    return `
      <div class="d-flex justify-content-between" onclick="app.casesController.setActive('${this.id}')">
          <p>${this.agency}</p>
          <h3>${this.ComputeTitle}</h3>
          <p>${this.ComputeDate}</p>
      </div>
    `
  }

  // NOTE we want to comment this out and create TWO templates - one for the unRedactedReport and one for the redactedReport
  // get ActiveTemplate() {
  //   return `
  //   <div class="col-8">
  //           <h1 class="text-danger">${this.clearance}</h1>
  //           <p>${this.agency}</p>
  //           <p>${this.ComputeDate}</p>
  //   </div>
  //   <div class="col-4 text-end">
  //           <button class="btn btn-primary" onclick="app.casesController.viewUnRedactedReport()">
  //             <i class="mdi mdi-eye"></i>
  //           </button>
  //   </div>
  //   <div class="col-12">
  //           <textarea class="w-100" name="reportBody" id="reportBody" cols="30" rows="10">${this.ComputeRedactedReport}</textarea>
  //   </div>
  //   `
  // }

  // NOTE will show the redactedReport with the black squares
  get RedactedReportTemplate() {
    return `
        <div class="col-md-8">
            <h1>${this.clearance}</h1>
            <p>${this.agency}</p>
            <p>${this.ComputeDate}</p>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-primary" onclick="app.casesController.unlockReport()">
              <i class="mdi mdi-eye"></i>
            </button>
          </div>
          <div class="col-md-12">
            <textarea class="w-100" name="reportBody" id="reportBody" cols="30" rows="10">${this.ComputeRedactedReport}</textarea>
          </div>
    `
  }

  // NOTE will show the regular reportBody
  get UnredactedReportTemplate() {
    return `
        <div class="col-md-8">
            <h1>${this.clearance}</h1>
            <p>${this.agency}</p>
            <p>${this.ComputeDate}</p>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-primary" onclick="app.casesController.saveReport()">
              <i class="mdi mdi-content-save"></i>
            </button>
          </div>
          <div class="col-md-12">
            <textarea onblur="app.casesController.saveReport()" class="w-100 reportBody" name="reportBody" id="reportBody" cols="30" rows="10">${this.reportBody}</textarea>
          </div>
    `
  }

  get ComputeDate() {
    let date = this.date
    // NOTE each date.getXYZ is its own string so it needs to be wrapped in its own parens and then string concatenated with the other info 
    return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
  }

  get ComputeTitle() {
    // NOTE using slice because it can target strings (slices off characters in a string), this takes in two arguments which are the positions(characters) that we want to show/have inside the string (start here, end here, and give whats in between) we also string concat the ... for visual effect
    return (this.reportBody.slice(0, 15) + '...')
  }

  // NOTE right now we are able to see the report BUT we want to be able to unlock the case if we have the credentials (at some point) so if we are logged in we need the ability to see the case FOR NOW default to hide the case every time
  // NOTE compute is an industry standard word - we are computing the data to take on another form
  get ComputeRedactedReport() {
    // NOTE take the original report body and turn it into an array of individual words
    // NOTE using 'split' with a space in between the quotes looks for spaces in between the words and pushes the individual word into an array 
    let originalReportArray = this.reportBody.split(' ')
    // NOTE want to look at the array of words in the report and compare them to the list of classified words in the appState
    // NOTE if one of the words in the report are the same as a classified word then transform/change the word into a black square using .map
    let redactedReportArray = originalReportArray.map(word => {
      // NOTE this is an anonymous function because we used lambda and opened up the curly braces
      // NOTE saftey check with .toLowerCase because it is case sensitive 
      if (appState.classifiedWords.includes(word.toLowerCase())) {
        return '⬛⬛⬛⬛'
      } else {
        return word
      }
    })
    // NOTE taking the redacted array and joining all the strings/word/boxes together with the spaces in between each one
    return redactedReportArray.join(' ')
  }
}