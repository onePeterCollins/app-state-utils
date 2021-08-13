/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @fileoverview : Exports a function: updateValue(state, payload, staticType)
 * 
 * @function updateValue : For state drilling and surgical state updates.
 *                         This function can be used to dynamically set infinitely nested object values.
 *                         It takes current state, a payload object, and an optional boolean value as arguments.
 *                         It returns a local function which returns updated state.
 * 
 * @param   {Object}   state The object to be mutated.
 * @param   {Object}   payload { name: String, newValue: any, child: Array }
 * @param   {String}   payload.name Name of the key to be mutated or second object in the nesting hieriarchy.
 * @param   {any}      payload.newValue New value to be inserted.
 * @param   {Array}    payload.child Array of strings pointing to the nested key to be mutated.
 * @param   {Boolean}  staticType Pass 'false' to turn off console error when altering data types.
 * @returns {Function} (local function) (payload, staticType) => : The new app state, or current state if it was not altered.
 */

 export const updateValue = (state, payload, staticType = true) => {

    /**
     * @param   {Object}  payload { name: String, newValue: any, child: Array }
     * @param   {String}  payload.name Name of the key to be mutated or second object in the nesting hieriarchy.
     * @param   {any}     payload.newValue New value to be inserted.
     * @param   {Array}   payload.child Array of strings pointing to the nested key to be mutated.
     * @param   {Boolean} staticType Pass 'false' to turn off console error when altering data types.
     * @returns {Object}  { updatedState } : The new app state, or current state if it was not altered.
     */

    return function (payloadInherited = payload, staticTypeInherited = staticType) {
        let currentState = JSON.parse(JSON.stringify(state));
        let updatedState = null;
        let { name, newValue, child } = payloadInherited;
        let nameField = name;
        let children = child;
        let testArray = state ? Array.from(state) : null
        let snapshots = [];
        let staticDataType = staticTypeInherited ? true : false;
    
        if (typeof state !== 'object' || (state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined")) {
            console.error(`[state] must be a valid javascript object`);
            return state;
        }
    
        if (typeof children === "object") /* check if 'children' is an empty array and nullify it */ {
            if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
                children = null;
            }
        }
    
        if (!children && !currentState.hasOwnProperty(nameField)) {
            console.error(`The referenced property '${nameField}' does not exist in current state.`);
            return state;
        }
    
        if (!children && newValue === currentState[nameField]) /* warn if current state value corresponds with new value*/ {
            console.warn('State is already up to date.');
            return state;
        } else if (!children.length && newValue !== currentState[nameField]) {
            if (typeof newValue !== typeof currentState[nameField] && staticDataType) /* prevent unauthorized type changes */ {
                console.error(`
                    \n State update failed,
                    \n You are attempting to perform unauthorized type changes.
                    \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.
                `);
                return state;
            } else /* update and return state */ {
                Object.assign(currentState, state);
                currentState[nameField] = newValue;
                updatedState = currentState;
                return updatedState;
            }
        } else if (children.length && newValue !== currentState[nameField]) {
            for (let index = 0; index < children.length; index++) {
                if (!snapshots.length) {
                    if (typeof currentState[nameField][children[index]] !== "undefined") {
                        snapshots.push(currentState[nameField][children[index]]);
                    } else {
                        console.error(`The referenced property '${nameField}' does not exist in current state.`);
                        return state;
                    }
                } else {
                    if (typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
                        snapshots.push(snapshots[snapshots.length - 1][children[index]]);
                    } else {
                        console.error(`The referenced property '${nameField}' does not exist in current state.`);
                        return state;
                    }
                }
    
                if (index === (children.length - 1)) {
                    if (newValue === snapshots[snapshots.length - 1]) /* warn if current state value corresponds with new value*/ {
                        console.warn('State is already up to date.');
                        return state;
                    } else {
                        if (typeof newValue !== typeof snapshots[snapshots.length - 1] && staticDataType) /* prevent unauthorized type changes */ {
                            console.error(`
                                State update failed,
                                \n You are attempting to perform unauthorized type changes.
                                \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.
                            `);
                            return null;
                        } else /* update and return state */ {
                            for (let index0 = snapshots.length - 1; index0 >= 0; index0--) {
                                if (index0 === (snapshots.length - 1)) {
                                    snapshots[index0] = newValue;
                                } else {
                                    snapshots[index0][children[index0 + 1]] = snapshots[index0 + 1];
                                }
    
                                if (index0 === 0) {
                                    Object.assign(currentState, state);
                                    currentState[nameField][children[index0]] = snapshots[index0];
                                    updatedState = currentState;
                                    return updatedState;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            Object.assign(currentState, state);
            return currentState;
        }
    }
};
