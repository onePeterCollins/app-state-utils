/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @fileoverview : Exports a function: createEntry(state, payload)
 * 
 * @function createEntry : For creating new [key: value] pairs in app state.
 *                         This function can be used to dynamically create infinitely nested [key: value] pairs.
 *                         It takes current state and a payload object as arguments.
 *                         It returns a local function which returns updated state.
 * 
 * @param   {Object}   state The object to be mutated.
 * @param   {Object}   payload { name: String, value: any, child: Array }
 * @param   {String}   payload.name Name of the key to be created or second object in the nesting hieriarchy.
 * @param   {any}      payload.value Value to be assigned to newly created key.
 * @param   {Array}    payload.child Array of strings pointing to the nested key to be created.
 * @returns {Function} (local function) (payload) => : The new app state, or current state if it was not altered.
 */

 export const createEntry = (state, payload) => {

    /**
     * @param   {Object} payload { name: String, value: any, child: Array }
     * @param   {String} payload.name Name of the key to be created or second object in the nesting hieriarchy.
     * @param   {any}    payload.value Value to be assigned to newly created key.
     * @param   {Array}  payload.child Array of strings pointing to the nested key to be created.
     * @returns {Object} { updatedState } : The new app state, or current state if it was not altered.
     */

    return function (payloadInherited = payload) {
        let currentState = JSON.parse(JSON.stringify(state));
        let updatedState = null;
        let { name, value, child } = payloadInherited;
        let nameField = name;
        let children = child;
        let testArray = state ? Array.from(state) : null
        let snapshots = [];
    
        if (typeof state !== 'object' || (state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined")) {
            console.error(`[state] must be a valid javascript object`);
            return state;
        }
    
        if (typeof children === "object") /* check if 'children' is an empty array and nullify it */ {
            if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
                children = null;
            }
        }
    
        if (!children && currentState[nameField]) /* warn if current state has key that corresponds with new key*/ {
            console.warn(`'${nameField}' key already exists in state.`);
    
            if (value === currentState[nameField]) /* warn if current state value corresponds with new value*/ {
                console.warn('State is already up to date.');
                return state;
            } else {
                if (typeof value !== typeof currentState[nameField]) /* prevent unauthorized type changes */ {
                    console.error(`
                        \n State update failed,
                        \n You are attempting to perform unauthorized type changes.
                        \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.
                    `);
                    return state;
                } else /* update value and return state if state has corresponding key with different value */ {
                    Object.assign(currentState, state);
                    currentState[nameField] = value;
                    updatedState = currentState;
                    return updatedState;
                }
            }
        } else if (!children && !currentState[nameField]) {
            if (currentState.hasOwnProperty(nameField)) {
                console.warn(`'${nameField}' key already exists in state.`);
    
                if (value === currentState[nameField]) /* warn if current state value corresponds with new value*/ {
                    console.warn('State is already up to date.');
                    return state;
                } else {
                    if (typeof value !== typeof currentState[nameField]) /* prevent unauthorized type changes */ {
                        console.error(`
                            \n State update failed,
                            \n You are attempting to perform unauthorized type changes.
                            \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.
                        `);
                        return state;
                    } else /* update value and return state if state has corresponding key with different value */ {
                        Object.assign(currentState, state);
                        currentState[nameField] = value;
                        updatedState = currentState;
                        return updatedState;
                    }
                }
            } else {
                Object.assign(currentState, state);
                currentState[nameField] = value;
                updatedState = currentState;
                return updatedState;
            }
        } else if (children.length && value !== currentState[nameField]) {
            for (let index = 0; index < children.length; index++) {
                if (!snapshots.length) {
                    if (typeof currentState[nameField] === "undefined") {
                        if (index === (children.length - 1)) {
                            currentState[nameField] = {};
                            currentState[nameField][children[index]] = value;
                            snapshots.push(currentState[nameField][children[index]]);
                        } else {
                            currentState[nameField] = {};
                            currentState[nameField][children[index]] = {};
                            snapshots.push(currentState[nameField][children[index]]);
                        }
                    } else {
                        if (typeof currentState[nameField][children[index]] === "undefined") {
                            if (index === (children.length - 1)) {
                                currentState[nameField][children[index]] = value;
                                snapshots.push(currentState[nameField][children[index]]);
                            } else {
                                currentState[nameField][children[index]] = {};
                                snapshots.push(currentState[nameField][children[index]]);
                            }
                        } else {
                            if (index === (children.length - 1)) {
                                if (typeof currentState[nameField][children[index]] !== typeof value) /* prevent unauthorized type changes */ {
                                    console.error(`
                                        \n State update failed,
                                        \n You are attempting to perform unauthorized type changes.
                                        \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.
                                    `);
                                    return state;
                                } else {
                                    currentState[nameField][children[index]] = value;
                                    snapshots.push(currentState[nameField][children[index]]);
                                }
                            } else {
                                snapshots.push(currentState[nameField][children[index]]);
                            }
                        }
                    }
                } else {
                    if (index === (children.length - 1)) {
                        snapshots[snapshots.length - 1][children[index]] = value;
                        snapshots.push(snapshots[snapshots.length - 1][children[index]]);
                    }
    
                    if (typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
                        if (index !== (children.length - 1)) {
                            snapshots.push(snapshots[snapshots.length - 1][children[index]]);
                        }
                    } else {
                        if (index !== (children.length - 1)) {
                            snapshots[snapshots.length - 1][children[index]] = {};
                            snapshots.push(snapshots[snapshots.length - 1][children[index]]);
                        }
                    }
                }
    
                if (index === (children.length - 1)) {
                    for (let index0 = snapshots.length - 1; index0 >= 0; index0--) {
                        if (index0 !== snapshots.length - 1) {
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
        } else {
            Object.assign(currentState, state);
            return currentState;
        }
    }
}
