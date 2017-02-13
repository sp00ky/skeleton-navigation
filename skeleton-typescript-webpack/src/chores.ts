//import {computedFrom} from 'aurelia-framework';
import * as PouchDB from 'pouchdb';

export class Chores {
  heading: string = 'Welcome to the Awesome Navigation App';
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;

  db = new PouchDB('urchores');
  remoteCouch = 'https://ersambehesterenceseright:97d53f2497d842d5779126ffe5c8f56f33024c57@softwareshop.cloudant.com/urchores';

  constructor() {

    this.db.sync(this.remoteCouch, {
      live: true
    }).on('change', function (change) {
      // yo, something changed!
    }).on('error', function (err) {
      // yo, we got an error! (maybe the user went offline?)
    });
  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    var person = {
      _id: new Date().toISOString(),
      firstName: this.firstName,
      lastName: this.lastName
    };
    
    this.db.put(person).then(function(result) {
        console.log('Successfully posted a person!');
      }).catch(function(err) {
        console.log(err);
      });  
  }

  canDeactivate(): boolean | undefined {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}
