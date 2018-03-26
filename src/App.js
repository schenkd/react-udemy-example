import React, { Component } from 'react';
import axios from 'axios';

import Person from './Person/Person.js'
import './App.css';


class App extends Component {
  state = {
    persons: [
      {id: 'gdf', name: 'Max', age: 28 },
      {id: 'dfg', name: 'Manu', age: 29 },
      {id: 'sdfd', name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.setState({ posts: response.data })
      });
  }

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
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
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
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This really working!</p>
        <button 
          style={ style }
          onClick={ this.togglePersonsHandler }>Toggle Persons</button>
        { persons }
      </div>
    );
  }
}

export default App;