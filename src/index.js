/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @link   github repo :   https://github.com/onepetercollins/app-state-utils
 * 
 * @fileoverview : Exports a { MutationHelper } object which contains methods to perform the following operations in app state;
 *                  * Create an entry
 *                  * Update a value
 *                  * Clear a value
 *                  * Delete an entry
 *                  * Log state
 * 
 *                 The functions listed below have closures, and they are partially called with 'state' in the { MutationHelper } constructor;
 *                  * createEntry()
 *                  * updateValue()
 *                  * clearValue()
 *                  * deleteEntry()
 *                  * logState()
 * 
 *                 The { MutationHelper } methods accept payload objects as arguments, as specified in their respective documentation.
 */

import { clearValue } from "./functions/clearValue";
import { createEntry } from "./functions/createEntry";
import { deleteEntry } from "./functions/deleteEntry";
import { logState } from "./functions/logState";
import { updateValue } from "./functions/updateValue";





/**
 * @constructor MutationHelper : Wrapper constructor containing methods for direct state mutation.
 *                               It accepts current state as its only argument.
 *                               It passes current state down to its methods for manipulation.
 * 
 * @param   {Object}    state Current state.
 * @method  createEntry : For creating new [key: value] pairs in app state.
 * @method  updateValue : For mutating existing values in app state.
 * @method  clearValue  : For deleting/clearing existing values in app state.
 * @method  deleteEntry : For deleting existing [key: value] pairs in app state.
 * @method  logState    : For logging current state to the console.
 * @returns {Object}    {
 *                        createEntry(state),
 *                        updateValue(state),
 *                        clearValue(state),
 *                        deleteEntry(state),
 *                        logState(state)
 *                      } : Methods for state mutation.
 */

 const MutationHelper = function (state) {
    this.createEntry = createEntry(state);
    this.updateValue = updateValue(state);
    this.clearValue  = clearValue(state);
    this.deleteEntry = deleteEntry(state);
    this.logState    = logState(state);
};

export default MutationHelper;
