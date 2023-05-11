import { Case } from "./Models/Case.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])


  /** @type {import('./Models/Case.js').Case[]} */
  // cases = [
  //   new Case({
  //     reportBody: 'A un identified flying object was seen over code works the other day.',
  //     clearance: 'secret',
  //     agency: '👾'
  //   }),
  //   new Case({
  //     reportBody: 'A large hairy chinned humanoid, was seen tripping on camera behind the full-stack classroom',
  //     clearance: 'none',
  //     agency: '🦄'
  //   }),
  //   new Case({
  //     reportBody: 'Mole People living on the roof of the building.',
  //     clearance: 'top secret',
  //     agency: '🏫'
  //   })
  // ]
  cases = loadState('cases', [Case])


  // NOTE creating a place to store a single case, we make it null so we get the truthy/falsey logic - the activeCase is either there or its not, makes it easier to write if statements (will make more sense as the course continues)
  /** @type {import('./Models/Case.js').Case|null} */
  activeCase = null

  classifiedWords = ['codeworks', 'alien', 'star', 'bitcoin', 'ufo', 'mole', 'hairy', 'flying', 'roof', 'full-stack', 'classroom', 'humanoid', 'camera']


  // NOTE this object is a database with agencies and their passwords, we are mimicking the authentication process of an application - we are verifying who we are as users
  agencies = {
    '🏫': 'secret',
    '🦄': '1234',
    '👾': '5678',
  }

  // NOTE the default is empty string because we are storing the key once the user puts in the input that matches
  userAgency = ''






}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
