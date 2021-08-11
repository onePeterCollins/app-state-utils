/**
 * @author Peter Collins - github.com\onepetercollins
 * 
 * @fileoverview - HELPER FUNCTIONS TO PERFORM THE FOLLOWING OPERATIONS IN APP STATE
 *                  * Create an entry
 *                  * Update value
 *                  * Clear  value
 *                  * Delete key
 */

/**
 * @function createEntry - For creating new [key: value] pairs in app state.
 *                         This function can be used to dynamically create infinitely nested [key: value] pairs.
 *                         It takes current state as a parameter and returns updated state.
 * 
 * @param {Object}  state The object to be mutated.
 * @param {Object}  payload { name: String, value: any, child: Array }
 * @param {String}  payload.name Name of the key to be created or second object in the nesting hieriarchy.
 * @param {any}     payload.value Value to be assigned to newly created key.
 * @param {Array}   payload.child Array of strings pointing to the nested key to be created.
 * @returns {Object} updatedState The new app state, or current state if it was not altered.
 */

 const createEntry = (state, payload) => {
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
                        \n Pass [false] to the [staticType] parameter of the [updateValue] function to allow type changes.
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
                            \n Pass [false] to the [staticType] parameter of the [updateValue] function to allow type changes.
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
                                        \n Pass [false] to the [staticType] parameter of the [updateValue] function to allow type changes.
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

/**
 * @function updateValue - For state drilling and surgical state updates.
 *                         This function can be used to dynamically set infinitely nested object values.
 *                         It takes current state as a parameter and returns updated state.
 * 
 * @param {Object}  state The object to be mutated.
 * @param {Object}  payload { name: String, newValue: any, child: Array }
 * @param {String}  payload.name Name of the key to be mutated.
 * @param {any}     payload.newValue New value to be inserted.
 * @param {Array}   payload.child Array of strings pointing to the nested key to be mutated.
 * @param {Boolean} staticType Pass [false] to turn off console error when altering data types.
 * @returns {Object} updatedState The new app state, or current state if it was not altered.
 */

const updateValue = (state, payload, staticType = true) => {
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
                    \n Pass [false] to the [staticType] parameter of the [updateValue] function to allow type changes.
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
                                \n Pass [false] to the [staticType] parameter of the [updateValue] function to allow type changes.
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
}

/**
 * @function clearValue - For state drilling and surgical deletion of object values.
 *                        This function can be used to dynamically delete infinitely nested object values.
 *                        It takes current state as a parameter and returns updated state.
 * 
 * @param {Object}  state The object to be mutated.
 * @param {Object}  payload { name: String, child: Array }
 * @param {String}  payload.name Name of the key to be cleared or second object in the nesting hieriarchy.
 * @param {Array}   payload.child Array of strings pointing to the nested value to be cleared.
 * @returns {Object} updatedState The new app state, or current state if it was not altered.
 */

const clearValue = (state, payload) => {
    return function (payloadInherited = payload) {
        let currentState = JSON.parse(JSON.stringify(state));
        let updatedState = null;
        let { name, child } = payloadInherited;
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
    
        if (!children && currentState.hasOwnProperty(nameField)) {
            Object.assign(currentState, state);

            if (typeof currentState[nameField] === "boolean") {
                if (currentState[nameField]) {
                    currentState[nameField] = false;
                    updatedState = currentState;
                    return updatedState;
                }
            } else if (typeof currentState[nameField] === "number") {
                if (currentState[nameField] !== 0) {
                    currentState[nameField] = 0;
                    updatedState = currentState;
                    return updatedState;
                }
            } else if (typeof currentState[nameField] === "object") {
                if (currentState[nameField]) {
                    if (typeof currentState.length === "number" && typeof currentState[currentState.length - 1] !== "undefined") {
                        currentState[nameField] = [];
                        updatedState = currentState;
                        return updatedState;
                    } else {
                        currentState[nameField] = {};
                        updatedState = currentState;
                        return updatedState;
                    }
                }
            } else if (typeof currentState[nameField] === "string" || typeof currentState[nameField] === "symbol") {
                if (currentState[nameField].length) {
                    currentState[nameField] = '';
                    updatedState = currentState;
                    return updatedState;
                }
            } else {
                currentState[nameField] = '';
                updatedState = currentState;
                return updatedState;
            }
        } else if (!children && !currentState.hasOwnProperty(nameField)) {
            console.error(`The referenced property '${nameField}' does not exist in current state.`);
            return state;
        } else if (children.length) {
            for (let index = 0; index < children.length; index++) {
                if (!snapshots.length) {
                    if (typeof currentState[nameField][children[index]] !== "undefined") {
                        snapshots.push(currentState[nameField][children[index]]);
                    } else {
                        console.error(`The referenced property '${children[index]}' does not exist in current state.`);
                        return state;
                    }
                } else {
                    if (typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
                        snapshots.push(snapshots[snapshots.length - 1][children[index]]);
                    } else {
                        console.error(`The referenced property '${children[index]}' does not exist in current state.`);
                        return state;
                    }
                }
    
                if (index === (children.length - 1)) {
                    for (let index0 = snapshots.length - 1; index0 >= 0; index0--) {
                        if (index0 === (snapshots.length - 1)) {
                            if (snapshots[snapshots.length - 1] !== null) {
                                if (typeof snapshots[snapshots.length - 1] === "boolean") {
                                    if (snapshots[snapshots.length - 1]) {
                                        snapshots[snapshots.length - 1] = false;
                                    }
                                } else if (typeof snapshots[snapshots.length - 1] === "number") {
                                    if (snapshots[snapshots.length - 1] !== 0) {
                                        snapshots[snapshots.length - 1] = 0;
                                    }
                                } else if (typeof snapshots[snapshots.length - 1] === "object") {
                                    if (snapshots[snapshots.length - 1]) {
                                        if (typeof (snapshots[snapshots.length - 1].length) === "number" && typeof (snapshots[snapshots.length - 1].length -1) !== "undefined") {
                                            snapshots[snapshots.length - 1] = [];
                                        } else {
                                            snapshots[snapshots.length - 1] = {};
                                        }
                                    }
                                } else if (typeof snapshots[snapshots.length - 1] === "string") {
                                    if (snapshots[snapshots.length - 1].length) {
                                        snapshots[snapshots.length - 1] = '';
                                    }
                                } else if (typeof snapshots[snapshots.length - 1] === "symbol") {
                                    snapshots[snapshots.length - 1] = '';
                                } else {
                                    snapshots[snapshots.length - 1] = '';
                                }
                            }
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
}

/**
 * @function deleteKey - For state drilling and surgical deletion of object keys.
 *                       This function can be used to dynamically delete infinitely nested object keys.
 *                       It takes current state as a parameter and returns updated state.
 * 
 * @param {Object} state The object to be mutated.
 * @param {Object} payload { name: String, child: Array }
 * @param {String}  payload.name Name of the key to be deleted or second object in the nesting hieriarchy.
 * @param {Array}   payload.child Array of strings pointing to the nested value to be deleted.
 * @returns {Object} updatedState The new app state, or current state if it was not altered.
 */

const deleteKey = (state, payload) => {
    return function (payloadInherited = payload) {
        let currentState = JSON.parse(JSON.stringify(state));
        let updatedState = null;
        let { name, child } = payloadInherited;
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
    
        if (!children && !currentState.hasOwnProperty(nameField)) {
            console.error(`The referenced property '${nameField}' does not exist in current state.`);
            return state;
        }
    
        if (!children && currentState.hasOwnProperty(nameField)) {
            updatedState = {};
    
            if (Object.keys(currentState).length > 1) {
                for (let index = 0; index < Object.keys(currentState).length; index++) {
                    if (Object.keys(currentState)[index] !== nameField) {
                        updatedState[Object.keys(currentState)[index]] = Object.values(currentState)[index];
                        return updatedState;
                    }
                }
            } else {
                return updatedState;
            }
        } else if (children.length && currentState.hasOwnProperty(nameField)) {
            for (let index = 0; index < children.length; index++) {
                if (!snapshots.length) {
                    if (index !== (children.length - 1)) {
                        snapshots.push(currentState[nameField][children[index]])
                    } else {
                        let mutatedObject = {}
    
                        for (let index0 = 0; index0 < Object.keys(currentState[nameField]).length; index0++) {
                            if (Object.keys(currentState[nameField])[index0] !== children[children.length - 1]) {
                                mutatedObject[Object.keys(currentState[nameField])[index0]] = currentState[nameField][Object.keys(currentState[nameField])[index0]]
                            }
    
                            if (index0 === (Object.keys(currentState[nameField]).length - 1)) {
                                Object.assign(currentState, state);
                                currentState[nameField] = mutatedObject;
                                updatedState = currentState;
                                return updatedState;
                            }
                        }
                    }
                } else {
                    if (index === (children.length - 1)) {
                        let mutatedObject = {}
    
                        for (let index0 = 0; index0 < Object.keys(snapshots[snapshots.length - 1]).length; index0++) {                        
                            if (Object.keys(snapshots[snapshots.length - 1])[index0] !== children[children.length - 1]) {
                                if (typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
                                    mutatedObject[Object.keys(snapshots[snapshots.length - 1])[index0]] = snapshots[snapshots.length - 1][Object.keys(snapshots[snapshots.length - 1])[index0]]
                                } else if (typeof snapshots[snapshots.length - 1][children[index]] === "undefined") {
                                    console.log(`The referenced property '${children[index]}' does not exist in current state.`);
                                    return state;
                                }
                            }
    
                            if (index0 === (Object.keys(snapshots[snapshots.length - 1]).length - 1)) {
                                snapshots[snapshots.length - 1] = mutatedObject
                            }
                        }
    
                        for (let index0 = snapshots.length - 1; index0 >= 0; index0--) {
                            if (index0 < (snapshots.length - 1)) {
                                snapshots[index0][children[index0 + 1]] = snapshots[index0 + 1];
                            }
        
                            if (index0 === 0) {
                                Object.assign(currentState, state);
                                currentState[nameField][children[index0]] = snapshots[index0];
                                updatedState = currentState;
                                return updatedState;
                            }
                        }
                    } else {
                        if (typeof snapshots[snapshots.length - 1][children[index]] === "object" && typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
                            snapshots.push(snapshots[snapshots.length - 1][children[index]])
                        } else if (typeof snapshots[snapshots.length - 1][children[index]] === "undefined") {
                            console.log(`The referenced property '${children[index]}' does not exist in current state.`);
                            return state;
                        }
                    }
                }
            }
        } else {
            console.log(`The referenced property '${nameField}' does not exist in current state.`);
            return state;
        }
    }
}

/**
 * @function logState - To log current state or a selected part of it to the console for inspection.
 * 
 * @param {Object} state Current state.
 * @param {Object} payload { name: String, child: Array }
 * @param {String}  payload.name Name of the key to log.
 * @param {Array}   payload.child Array of strings pointing to the nested value to log.
 * @returns {Object} state Current app state, it does not alter the state.
 */

const logState = (state, payload) => {
    return function (payloadInherited = payload) {
        let currentState = JSON.parse(JSON.stringify(state));
        let { name, child } = payloadInherited;
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
                children = null
            }
        }
    
        if (!children && !currentState.hasOwnProperty(nameField)) {
            console.error(`The referenced property '${nameField}' does not exist in current state.`);
            return state;
        } else if (!children && currentState.hasOwnProperty(nameField)) /* log state to console */ {
            console.log(currentState[nameField])
        }


    }
}

const MutationHelper = function (state) {
    this.createValue = createEntry(state);
    this.updateValue = updateValue(state);
    this.clearValue = clearValue(state);
    this.deleteKey = deleteKey(state);
    this.logState = logState(state);
};

export default MutationHelper;