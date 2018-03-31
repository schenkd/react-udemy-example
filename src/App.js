import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person.js';
import './App.css';


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
    // extended with :hover (Thx to Radium!)
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          { this.state.persons.map((person, index) => {
            return <Person
              click={ () => this.deltePersonHandler(index) }
              name={person.name}
              age={person.age} 
              key={person.id} 
              changed={(event) => this.nameChangedHandler(event, person.id) }/>
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
          backgroundColor: 'salmon',
          color: 'black'
      };
    }

    // dynamic styling classes
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={ classes.join(' ') }>This really working!</p>
          <button 
            style={ style }
            onClick={ this.togglePersonsHandler }>Toggle Persons</button>
          { persons }
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
