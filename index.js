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

import MutationHelper from "./src";

export default MutationHelper;
