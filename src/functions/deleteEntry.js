/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @fileoverview : Exports a function: deleteEntry(state, payload)
 * 
 * @function deleteEntry : For state drilling and surgical deletion of object [key: value] pairs.
 *                         This function can be used to dynamically delete infinitely nested object entries.
 *                         It takes current state and a payload object as arguments.
 *                         It returns a local function which returns updated state.
 * 
 * @param   {Object}   state The object to be mutated.
 * @param   {Object}   payload { name: String, child: Array }
 * @param   {String}   payload.name Name of the [key: value] pair to be deleted or second object in the nesting hieriarchy.
 * @param   {Array}    payload.child Array of strings pointing to the nested [key: value] pair to be deleted.
 * @returns {Function} (local function) (payload) => : The new app state, or current state if it was not altered.
 */

 export const deleteEntry = (state, payload) => {

    /**
     * @param   {Object} payload { name: String, child: Array }
     * @param   {String} payload.name Name of the [key: value] pair to be deleted or second object in the nesting hieriarchy.
     * @param   {Array}  payload.child Array of strings pointing to the nested [key: value] pair to be deleted.
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
