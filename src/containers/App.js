import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';


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

    if (this.state.showPersons) {
      persons = <Persons 
        persons={ this.state.persons }
        clicked={ this.deltePersonHandler }
        changed={ this.nameChangedHandler } />;
    }

    return (
      <div className={ classes.App }>
        <Cockpit
          appTitle={ this.props.title }
          showPersons={ this.state.showPersons }
          persons={ this.state.persons }
          clicked={ this.togglePersonsHandler }
        />
        { persons }
      </div>
    );
  }
}

export default App;
