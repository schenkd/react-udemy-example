import React, { Component } from 'react';
import Person from './Person/Person.js';
import classes from './App.css';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


class App extends Component {
  state = {
    persons: [
      {id: 'gdf', name: 'Max', age: 28 },
      {id: 'dfg', name: 'Manu', age: 29 },
      {id: 'sdfd', name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    // get the person object with the matched id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    // unpack the person in a new object with our personIndex
    const person = {
      ...this.state.persons[personIndex]
    };

    // get the target event value and save as new person name
    person.name = event.target.value;

    // make a immutable copy of state.persons array
    const persons = [...this.state.persons];
    // mutate the person on our personIndex
    persons[personIndex] = person;

    // save new persons array in our state
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deltePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;
    let btnClass = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          { this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id} >
                <Person
                click={ () => this.deltePersonHandler(index) }
                name={person.name}
                age={person.age} 
                changed={(event) => this.nameChangedHandler(event, person.id) }/>
              </ErrorBoundary>
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    // dynamic styling classes
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push( classes.Red );
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push( classes.Bold );
    }
    // StyleRoot extends Radium functionality with mediaQueries
    return (
      <div className={ classes.App }>
        <h1>Hi, I'm a React App</h1>
        <p className={ assignedClasses.join(' ') }>This really working!</p>
        <button
          className={btnClass}
          onClick={ this.togglePersonsHandler }>Toggle Persons</button>
        { persons }
      </div>
    );
  }
}

export default App;
