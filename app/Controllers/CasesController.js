import { appState } from "../AppState.js"
import { casesService } from "../Services/CasesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { setHTML } from "../Utils/Writer.js"

// NOTE private functions have an underscore this is best practice/industry standard
function _drawCases() {
  // console.log('this is my template');
  let cases = appState.cases
  let template = ''
  // NOTE now we want to filter the cases so that only the cases that the user is verified to see i.e. the user inputted agency matches the agency of the case
  // NOTE when we do this but don't change the draw in the constructor it won't show up
  let filterCases = cases.filter(c => c.agency == appState.userAgency)

  filterCases.forEach(c => template += c.CasesTemplate)
  setHTML('cases', template)
}

function _drawActiveCase() {
  let activeCase = appState.activeCase
  // NOTE if our case is unlocked show the unredactedReport or if the case is locked show the redactedReport

  // NOTE reactively draw to the page based on the unlocked property
  if (activeCase?.unlocked) {
    setHTML('activeCase', activeCase.UnredactedReportTemplate)
  } else {
    setHTML('activeCase', activeCase?.RedactedReportTemplate)
  }

  // NOTE this is the ternary way to do it - cleaner talk out each thing
  // setHTML('activeCase', activeCase?.unlocked ? activeCase?.UnredactedTemplate : activeCase?.RedactedTemplate )

}

export class CasesController {
  constructor() {
    // console.log('hello from the casesController');
    // _drawCases()
    // NOTE we will use a listener to listen to the appState userAgency. When the user inputs the code then the cases will draw
    appState.on('userAgency', _drawCases)
    appState.on('cases', _drawCases)
    // NOTE we comment out drawCases because its reading the code on page load and won't show the cases with the agency attached. 
    // _drawActiveCase()
    appState.on('activeCase', _drawActiveCase)
  }

  setActive(caseId) {
    // console.log('setting the active case', caseId);
    // NOTE now that the console log is coming through, I need to pass in the case Id with arguments/parameters so that I know what case is being selected
    // NOTE we are verifying we are getting the case we want, now we need to talk to the service so we can start modifying the appState
    casesService.setActive(caseId)
  }

  unlockReport() {
    // console.log('unlocking the report');
    casesService.unlockReport()
    // @ts-ignore
    document.querySelector('.reportBody').focus()
    // NOTE now when we click the unRedact button we are immediately dropped into the text area
  }

  saveReport() {
    // console.log('saving the report');
    // NOTE this is the element this will return back the entire textarea
    let report = document.getElementById('reportBody')
    // console.log('this is our report element', report);
    // @ts-ignore
    // NOTE this is the 'value' this is what the reportBody property is
    let reportBody = report.value
    // console.log('this is the report value', reportBody);
    casesService.saveReport(reportBody)
  }

  createCase() {
    // @ts-ignore
    window.event.preventDefault()
    // console.log('creating a case');
    // NOTE this is the entire element 
    let form = event?.target
    // console.log('this is my form', form);
    let formData = getFormData(form)
    // NOTE after we see agency as undefined from the service, come back and set the agency in our form to whatever agency we are logged in as
    // @ts-ignore
    formData.agency = appState.userAgency
    console.log('this is my formData', formData);
    casesService.createCase(formData)
    // NOTE after we submit we should clear the form 
    // @ts-ignore
    form.reset()


    // NOTE I don't want to have to click on the textarea to start editing the report, I want to create the case and immediately be able to start writing in the text area
    // NOTE lets 'focus' on the text area --> https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
    // @ts-ignore
    document.querySelector('.reportBody').focus()
  }

}