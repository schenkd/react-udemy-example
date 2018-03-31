import React from 'react';
import classes from './Cockpit.css'


const cockpit = (props) => {
    // dynamic styling classes
    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2) {
      assignedClasses.push( classes.Red );
    }
    if (props.persons.length <= 1) {
      assignedClasses.push( classes.Bold );
    }

    return (
        <div className={ classes.Cockpit }>
            <h1>{ props.appTitle }</h1>
            <p className={ assignedClasses.join(' ') }>This really working!</p>
            <button
            className={ btnClass }
            onClick={ props.clicked }
            >Toggle Persons
            </button>
        </div>
    )
}

export default cockpit;
