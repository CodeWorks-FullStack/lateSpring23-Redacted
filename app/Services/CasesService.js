import { appState } from "../AppState.js"
import { Case } from "../Models/Case.js";
import { saveState } from "../Utils/Store.js";

function _saveCases() {
  saveState('cases', appState.cases)
}

class CasesService {
  createCase(formData) {
    let newCase = new Case(formData)
    // console.log('this is my new case', newCase);
    appState.cases.push(newCase)
    // console.log('this my new case in the appState', appState.cases);
    _saveCases()
    // NOTE this is for UI, when I create a case, unlock it and set it as the activeCase
    newCase.unlocked = true
    appState.activeCase = newCase
    appState.emit('cases')
  }


  // NOTE this function is in the service because we will be manipulating data
  saveReport(reportBody) {
    let activeReport = appState.activeCase
    // NOTE we are able to edit the activeReport because we set the reportBody property to the value we sent from the controller
    // @ts-ignore
    activeReport.reportBody = reportBody
    console.log('this is my edited activeReport', activeReport);
    // NOTE we want to lock up the case again after we save it
    // @ts-ignore
    activeReport.unlocked = false
    // NOTE trigger the observer so save the change
    appState.emit('activeCase')
    // NOTE call saveCases to utilize our save state and make the change persist
    _saveCases()
  }


  unlockReport() {
    // NOTE how do I know what case I'm trying to unlock? The button only exists on the activeCase so do I need to find the case again? No
    // NOTE grab the activeCase
    let foundCase = appState.activeCase
    // NOTE flip the bool - take the property that existed on the foundCase and change it to whatever the opposite is (whatever it is not)
    // @ts-ignore
    foundCase.unlocked = !foundCase.unlocked
    console.log('unlocking the case', appState.activeCase);
    // NOTE need to appState.emit to trick the appState into listening to the change thats happening in the service - because we never actually changed the value of the appState we just reassigned a property
    appState.emit('activeCase')
  }


  setActive(caseId) {
    // NOTE do we have a place to save a single case? we need a place to store a single case with an Id
    let foundCase = appState.cases.find(c => c.id == caseId)
    // NOTE strict setting is on so the appState.activeCase will have an error under it saying its potentially null, this if fine just ignore and and console log
    // console.log('this is my found case', foundCase);
    // @ts-ignore
    appState.activeCase = foundCase
    console.log('active case in the appState', appState.activeCase);
  }
}



export const casesService = new CasesService()