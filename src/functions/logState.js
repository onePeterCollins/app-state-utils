/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @fileoverview : Exports a function: logState(state, payload)
 * 
 * @function logState : To log current state or a selected part of it to the console for inspection.
 * 
 * @param   {Object}   state Current state.
 * @param   {Object}   payload { name: String, child: Array }
 * @param   {String}   payload.name Name of the key to log or second object in the nesting hieriarchy.
 * @param   {Array}    payload.child Array of strings pointing to the nested value to log.
 * @returns {Function} (local function) (payload) => : Current app state, it does not alter the state.
 */

 export const logState = (state, payload) => {

    /**
     * @param   {Object} payload { name: String, child: Array }
     * @param   {String} payload.name Name of the key to log or second object in the nesting hieriarchy.
     * @param   {Array}  payload.child Array of strings pointing to the nested value to log.
     * @returns {Object} { state } : Current app state, it does not alter the state.
     */

    return function (payloadInherited = payload || { name: null, child: [] }) {
        let currentState = JSON.parse(JSON.stringify(state));
        let { name, child } = payloadInherited;
        let nameField = name;
        let children = child;
        let testArray = state ? Array.from(state) : null
        let snapshots = [];
        let date = new Date();
        let pathString = `state.${nameField}`;

        if (typeof state !== 'object' || (state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined")) {
            console.error(`[state] must be a valid javascript object`);
            return state;
        }
    
        if (typeof children === "object") /* check if 'children' is an empty array and nullify it */ {
            if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
                children = null;
            }
        }

        if (!payloadInherited.name) {
            console.log(`\n app state @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
            console.log(state)
            return state;
        } else {
            if (!children && !currentState.hasOwnProperty(nameField)) {
                console.error(`The referenced property '${nameField}' does not exist in current state.`);
                return state;
            } else if (!children && currentState.hasOwnProperty(nameField)) /* log state to console */ {
                console.log(`
                    \n app state @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
                    \n ${pathString} :
                `);
                console.log(state[nameField]);
                return state;
            } else if (children.length) {
                for (let index = 0; index < children.length; index++) {
                    if (!snapshots.length) {
                        pathString += `.${children[index]}`;

                        if (index === (children.length - 1)) {
                            console.log(`
                                \n app state @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
                                \n ${pathString} :
                            `);
                            console.log(state[nameField][children[index]]);
                        } else {
                            snapshots.push(state[nameField][children[index]]);
                        }
                    } else {
                        pathString += `.${children[index]}`;

                        if (index !== (children.length - 1)) {
                            snapshots.push(snapshots[snapshots.length - 1][children[index]]);
                        } else {
                            snapshots.push(snapshots[snapshots.length - 1][children[index]]);

                            console.log(`
                                \n app state @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
                                \n ${pathString} :
                            `);
                            console.log(snapshots[snapshots.length - 1]);
                        }
                    }
                }
                return state;
            }
        }
    }
}
