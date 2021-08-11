/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @link   github repo :   https://github.com/onepetercollins/app-state-utils
 * 
 * @fileoverview : Exports { MutationHelper } functions;
 *                  * Create an entry
 *                  * Update a value
 *                  * Clear a value
 *                  * Delete an entry
 *                  * Log state
 */

import { clearValue } from "./clearValue";
import { createEntry } from "./createEntry";
import { deleteEntry } from "./deleteEntry";
import { logState } from "./logState";
import { updateValue } from "./updateValue";




export default {
    ...clearValue,
    ...createEntry,
    ...deleteEntry,
    ...logState,
    ...updateValue,
};
