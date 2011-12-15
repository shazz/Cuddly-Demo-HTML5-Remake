/*
Finite state machine (FSM) library.

A simple finite state machine library for code flow and transition control.

Anthony Blackshaw <ant@getme.co.uk> (www.getme.co.uk)
Copyright (c)2008

Taken from a Python FSM implementation by Noah Spurrier 
(http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/146262).
*/

function FSM( initial_state, data ) {

    /* Finite State Machine (FSM) class.*/

    this.state_transitions = {};
    this.state_transitions_any = {};
    this.default_transition = null;

    this.transition = null;
    this.initial_state = initial_state;
    this.current_state = this.initial_state;
    this.callback = null;
    this.data = data;
    
}

FSM.prototype.reset = function () {
    
    /* Reset the FSM to the initial state. */
    
    this.current_state = this.initial_state;
    this.transition = null;
}

FSM.prototype.add_transition = function ( action, state, callback, next_state ) {

    /* Add a transition for the input symbol. */

    if ( !next_state ) {
        next_state = state;
    }
    
    this.state_transitions[ [ action, state ] ] = [ callback, next_state ];
}

FSM.prototype.add_transition_list = function ( action_list, state, callback, next_state ) {

    /* Add a transition to a list of input symbols. */

    if ( !next_state ) {
        next_state = state;
    }
    
    for ( i = 0; i < action_list; i++ ) {
        this.add_transition( action_list[ i ], state, callback, next_state );
    }
    
}

FSM.prototype.add_transition_any = function ( state, callback, next_state ) {

    /* Add a transition that is supported by any state. */

    if ( !next_state ) {
        next_state = state;
    }
    
    this.state_transitions_any[ state ] = [ callback, next_state ];
}

FSM.prototype.set_default_transition = function ( callback, next_state ) {

    /* Set the default transition for if no transition can be found. */

    this.default_transition = ( callback, next_state );
}

FSM.prototype.get_transition  = function ( action, state ) {

    /* Get the transition for the specified action and state. */
    
    if ( this.state_transitions[ [ action, state ] ] ) {
        return this.state_transitions[ [ action, state ] ];
    } else if ( this.state_transitions_any[ [ action, state ] ] ) {
        return this.state_transitions_any[ [ action, state ] ];
    } else if ( this.default_transition ) {
        return this.default_transition;
    } else {
        throw Error( "Transition is undefined: (" + action + ", " + state + ")" );
    }

}

FSM.prototype.process = function ( action ) {

    /* Process an action. */
    
    this.action = action;
    
    result = this.get_transition( this.action, this.current_state );
    this.action = result[0];
    
    if ( this.action ) {
        this.action.call( this );
    }
    
    this.current_state = result[1];
}