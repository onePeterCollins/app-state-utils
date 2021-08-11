/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @fileoverview : Exports a function: clearValue(state, payload)
 * 
 * @function clearValue : For state drilling and surgical deletion of object values.
 *                        This function can be used to dynamically delete infinitely nested object values.
 *                        It takes current state and a payload object as arguments.
 *                        It returns a local function which returns updated state.
 * 
 * @param   {Object}   state The object to be mutated.
 * @param   {Object}   payload { name: String, child: Array }
 * @param   {String}   payload.name Name of the key to be cleared or second object in the nesting hieriarchy.
 * @param   {Array}    payload.child Array of strings pointing to the nested key to be cleared.
 * @returns {Function} (local function) (payload) => : The new app state, or current state if it was not altered.
 */

 export const clearValue = (state, payload) => {

    /**
     * @param   {Object} payload { name: String, child: Array }
     * @param   {String} payload.name Name of the key to be created or second object in the nesting hieriarchy.
     * @param   {Array}  payload.child Array of strings pointing to the nested key to be cleared.
     * @returns {Object} { updatedState } : The new app state, or current state if it was not altered.
     */

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
