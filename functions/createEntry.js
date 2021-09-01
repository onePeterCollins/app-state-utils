"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.createEntry=void 0;var _typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof"));/**
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

var createEntry=function createEntry(state,payload){

/**
     * @param   {Object} payload { name: String, value: any, child: Array }
     * @param   {String} payload.name Name of the key to be created or second object in the nesting hieriarchy.
     * @param   {any}    payload.value Value to be assigned to newly created key.
     * @param   {Array}  payload.child Array of strings pointing to the nested key to be created.
     * @returns {Object} { updatedState } : The new app state, or current state if it was not altered.
     */

return function(){var payloadInherited=arguments.length>0&&arguments[0]!==undefined?arguments[0]:payload;
var currentState=JSON.parse(JSON.stringify(state));
var updatedState=null;
var name=payloadInherited.name,value=payloadInherited.value,child=payloadInherited.child;
var nameField=name;
var children=child;
var testArray=state?Array.from(state):null;
var snapshots=[];

if((0,_typeof2.default)(state)!=='object'||state[state.length-1]===testArray.pop()&&typeof testArray.pop()!=="undefined"){
console.error("[state] must be a valid javascript object");
return state;
}

if((0,_typeof2.default)(children)==="object")/* check if 'children' is an empty array and nullify it */{
if(children.length===0&&typeof children[children.length-1]==="undefined"){
children=null;
}
}

if(!children&&currentState[nameField])/* warn if current state has key that corresponds with new key*/{
console.warn("'".concat(nameField,"' key already exists in state."));

if(value===currentState[nameField])/* warn if current state value corresponds with new value*/{
console.warn('State is already up to date.');
return state;
}else{
if((0,_typeof2.default)(value)!==(0,_typeof2.default)(currentState[nameField]))/* prevent unauthorized type changes */{
console.error("\n                        \n State update failed,\n                        \n You are attempting to perform unauthorized type changes.\n                        \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                    ");




return state;
}else/* update value and return state if state has corresponding key with different value */{
Object.assign(currentState,state);
currentState[nameField]=value;
updatedState=currentState;
return updatedState;
}
}
}else if(!children&&!currentState[nameField]){
if(currentState.hasOwnProperty(nameField)){
console.warn("'".concat(nameField,"' key already exists in state."));

if(value===currentState[nameField])/* warn if current state value corresponds with new value*/{
console.warn('State is already up to date.');
return state;
}else{
if((0,_typeof2.default)(value)!==(0,_typeof2.default)(currentState[nameField]))/* prevent unauthorized type changes */{
console.error("\n                            \n State update failed,\n                            \n You are attempting to perform unauthorized type changes.\n                            \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                        ");




return state;
}else/* update value and return state if state has corresponding key with different value */{
Object.assign(currentState,state);
currentState[nameField]=value;
updatedState=currentState;
return updatedState;
}
}
}else{
Object.assign(currentState,state);
currentState[nameField]=value;
updatedState=currentState;
return updatedState;
}
}else if(children.length&&value!==currentState[nameField]){
for(var index=0;index<children.length;index++){
if(!snapshots.length){
if(typeof currentState[nameField]==="undefined"){
if(index===children.length-1){
currentState[nameField]={};
currentState[nameField][children[index]]=value;
snapshots.push(currentState[nameField][children[index]]);
}else{
currentState[nameField]={};
currentState[nameField][children[index]]={};
snapshots.push(currentState[nameField][children[index]]);
}
}else{
if(typeof currentState[nameField][children[index]]==="undefined"){
if(index===children.length-1){
currentState[nameField][children[index]]=value;
snapshots.push(currentState[nameField][children[index]]);
}else{
currentState[nameField][children[index]]={};
snapshots.push(currentState[nameField][children[index]]);
}
}else{
if(index===children.length-1){
if((0,_typeof2.default)(currentState[nameField][children[index]])!==(0,_typeof2.default)(value))/* prevent unauthorized type changes */{
console.error("\n                                        \n State update failed,\n                                        \n You are attempting to perform unauthorized type changes.\n                                        \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                                    ");




return state;
}else{
currentState[nameField][children[index]]=value;
snapshots.push(currentState[nameField][children[index]]);
}
}else{
snapshots.push(currentState[nameField][children[index]]);
}
}
}
}else{
if(index===children.length-1){
snapshots[snapshots.length-1][children[index]]=value;
snapshots.push(snapshots[snapshots.length-1][children[index]]);
}

if(typeof snapshots[snapshots.length-1][children[index]]!=="undefined"){
if(index!==children.length-1){
snapshots.push(snapshots[snapshots.length-1][children[index]]);
}
}else{
if(index!==children.length-1){
snapshots[snapshots.length-1][children[index]]={};
snapshots.push(snapshots[snapshots.length-1][children[index]]);
}
}
}

if(index===children.length-1){
for(var index0=snapshots.length-1;index0>=0;index0--){
if(index0!==snapshots.length-1){
snapshots[index0][children[index0+1]]=snapshots[index0+1];
}

if(index0===0){
Object.assign(currentState,state);
currentState[nameField][children[index0]]=snapshots[index0];
updatedState=currentState;
return updatedState;
}
}
}
}
}else{
Object.assign(currentState,state);
return currentState;
}
};
};exports.createEntry=createEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUVudHJ5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUVudHJ5Iiwic3RhdGUiLCJwYXlsb2FkIiwicGF5bG9hZEluaGVyaXRlZCIsImN1cnJlbnRTdGF0ZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInVwZGF0ZWRTdGF0ZSIsIm5hbWUiLCJ2YWx1ZSIsImNoaWxkIiwibmFtZUZpZWxkIiwiY2hpbGRyZW4iLCJ0ZXN0QXJyYXkiLCJBcnJheSIsImZyb20iLCJzbmFwc2hvdHMiLCJsZW5ndGgiLCJwb3AiLCJjb25zb2xlIiwiZXJyb3IiLCJ3YXJuIiwiT2JqZWN0IiwiYXNzaWduIiwiaGFzT3duUHJvcGVydHkiLCJpbmRleCIsInB1c2giLCJpbmRleDAiXSwibWFwcGluZ3MiOiJrUUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVRLEdBQU1BLENBQUFBLFdBQVcsQ0FBRyxRQUFkQSxDQUFBQSxXQUFjLENBQUNDLEtBQUQsQ0FBUUMsT0FBUixDQUFvQjs7QUFFNUM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUksTUFBTyxXQUFzQyxJQUE1QkMsQ0FBQUEsZ0JBQTRCLDJEQUFURCxPQUFTO0FBQ3pDLEdBQUlFLENBQUFBLFlBQVksQ0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsU0FBTCxDQUFlTixLQUFmLENBQVgsQ0FBbkI7QUFDQSxHQUFJTyxDQUFBQSxZQUFZLENBQUcsSUFBbkI7QUFDQSxHQUFNQyxDQUFBQSxJQUFOLENBQTZCTixnQkFBN0IsQ0FBTU0sSUFBTixDQUFZQyxLQUFaLENBQTZCUCxnQkFBN0IsQ0FBWU8sS0FBWixDQUFtQkMsS0FBbkIsQ0FBNkJSLGdCQUE3QixDQUFtQlEsS0FBbkI7QUFDQSxHQUFJQyxDQUFBQSxTQUFTLENBQUdILElBQWhCO0FBQ0EsR0FBSUksQ0FBQUEsUUFB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UyxDQUFDQyxNQUFWLENBQW1CLENBQXJDLENBQXdDVSxNQUFNLEVBQUksQ0FBbEQsQ0FBcURBLE1BQU0sRUFBM0QsQ0FBK0Q7QUFDM0QsR0FBSUEsTUFBTSxHQUFLWCxTQUFTLENBQUNDLE1BQVYsQ0FBbUIsQ0FBbEMsQ0FBcUM7QUFDakNELFNBQVMsQ0FBQ1csTUFBRCxDQUFULENBQWtCZixRQUFRLENBQUNlLE1BQU0sQ0FBRyxDQUFWLENBQTFCLEVBQTBDWCxTQUFTLENBQUNXLE1BQU0sQ0FBRyxDQUFWLENBQW5EO0FBQ0g7O0FBRUQsR0FBSUEsTUFBTSxHQUFLLENBQWYsQ0FBa0I7QUFDZEwsTUFBTSxDQUFDQyxNQUFQLENBQWNwQixZQUFkLENBQTRCSCxLQUE1QjtBQUNBRyxZQUFZLENBQUNRLFNBQUQsQ0FBWixDQUF3QkMsUUFBUSxDQUFDZSxNQUFELENBQWhDLEVBQTRDWCxTQUFTLENBQUNXLE1BQUQsQ0FBckQ7QUFDQXBCLFlBQVksQ0FBR0osWUFBZjtBQUNBLE1BQU9JLENBQUFBLFlBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKLENBekVNLElBeUVBO0FBQ0hlLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjcEIsWUFBZCxDQUE0QkgsS0FBNUI7QUFDQSxNQUFPRyxDQUFBQSxZQUFQO0FBQ0g7QUFDSixDQWxKRDtBQW1KSCxDQTdKTyxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgUGV0ZXIgQ29sbGlucyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9vbmVwZXRlcmNvbGxpbnNcclxuICogXHJcbiAqIEBmaWxlb3ZlcnZpZXcgOiBFeHBvcnRzIGEgZnVuY3Rpb246IGNyZWF0ZUVudHJ5KHN0YXRlLCBwYXlsb2FkKVxyXG4gKiBcclxuICogQGZ1bmN0aW9uIGNyZWF0ZUVudHJ5IDogRm9yIGNyZWF0aW5nIG5ldyBba2V5OiB2YWx1ZV0gcGFpcnMgaW4gYXBwIHN0YXRlLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGZ1bmN0aW9uIGNhbiBiZSB1c2VkIHRvIGR5bmFtaWNhbGx5IGNyZWF0ZSBpbmZpbml0ZWx5IG5lc3RlZCBba2V5OiB2YWx1ZV0gcGFpcnMuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIEl0IHRha2VzIGN1cnJlbnQgc3RhdGUgYW5kIGEgcGF5bG9hZCBvYmplY3QgYXMgYXJndW1lbnRzLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBJdCByZXR1cm5zIGEgbG9jYWwgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB1cGRhdGVkIHN0YXRlLlxyXG4gKiBcclxuICogQHBhcmFtICAge09iamVjdH0gICBzdGF0ZSBUaGUgb2JqZWN0IHRvIGJlIG11dGF0ZWQuXHJcbiAqIEBwYXJhbSAgIHtPYmplY3R9ICAgcGF5bG9hZCB7IG5hbWU6IFN0cmluZywgdmFsdWU6IGFueSwgY2hpbGQ6IEFycmF5IH1cclxuICogQHBhcmFtICAge1N0cmluZ30gICBwYXlsb2FkLm5hbWUgTmFtZSBvZiB0aGUga2V5IHRvIGJlIGNyZWF0ZWQgb3Igc2Vjb25kIG9iamVjdCBpbiB0aGUgbmVzdGluZyBoaWVyaWFyY2h5LlxyXG4gKiBAcGFyYW0gICB7YW55fSAgICAgIHBheWxvYWQudmFsdWUgVmFsdWUgdG8gYmUgYXNzaWduZWQgdG8gbmV3bHkgY3JlYXRlZCBrZXkuXHJcbiAqIEBwYXJhbSAgIHtBcnJheX0gICAgcGF5bG9hZC5jaGlsZCBBcnJheSBvZiBzdHJpbmdzIHBvaW50aW5nIHRvIHRoZSBuZXN0ZWQga2V5IHRvIGJlIGNyZWF0ZWQuXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gKGxvY2FsIGZ1bmN0aW9uKSAocGF5bG9hZCkgPT4gOiBUaGUgbmV3IGFwcCBzdGF0ZSwgb3IgY3VycmVudCBzdGF0ZSBpZiBpdCB3YXMgbm90IGFsdGVyZWQuXHJcbiAqL1xyXG5cclxuIGV4cG9ydCBjb25zdCBjcmVhdGVFbnRyeSA9IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtICAge09iamVjdH0gcGF5bG9hZCB7IG5hbWU6IFN0cmluZywgdmFsdWU6IGFueSwgY2hpbGQ6IEFycmF5IH1cclxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9IHBheWxvYWQubmFtZSBOYW1lIG9mIHRoZSBrZXkgdG8gYmUgY3JlYXRlZCBvciBzZWNvbmQgb2JqZWN0IGluIHRoZSBuZXN0aW5nIGhpZXJpYXJjaHkuXHJcbiAgICAgKiBAcGFyYW0gICB7YW55fSAgICBwYXlsb2FkLnZhbHVlIFZhbHVlIHRvIGJlIGFzc2lnbmVkIHRvIG5ld2x5IGNyZWF0ZWQga2V5LlxyXG4gICAgICogQHBhcmFtICAge0FycmF5fSAgcGF5bG9hZC5jaGlsZCBBcnJheSBvZiBzdHJpbmdzIHBvaW50aW5nIHRvIHRoZSBuZXN0ZWQga2V5IHRvIGJlIGNyZWF0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB7IHVwZGF0ZWRTdGF0ZSB9IDogVGhlIG5ldyBhcHAgc3RhdGUsIG9yIGN1cnJlbnQgc3RhdGUgaWYgaXQgd2FzIG5vdCBhbHRlcmVkLlxyXG4gICAgICovXHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwYXlsb2FkSW5oZXJpdGVkID0gcGF5bG9hZCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50U3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZWRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHsgbmFtZSwgdmFsdWUsIGNoaWxkIH0gPSBwYXlsb2FkSW5oZXJpdGVkO1xyXG4gICAgICAgIGxldCBuYW1lRmllbGQgPSBuYW1lO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IGNoaWxkO1xyXG4gICAgICAgIGxldCB0ZXN0QXJyYXkgPSBzdGF0ZSA/IEFycmF5LmZyb20oc3RhdGUpIDogbnVsbFxyXG4gICAgICAgIGxldCBzbmFwc2hvdHMgPSBbXTtcclxuICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT09ICdvYmplY3QnIHx8IChzdGF0ZVtzdGF0ZS5sZW5ndGggLSAxXSA9PT0gdGVzdEFycmF5LnBvcCgpICYmIHR5cGVvZiB0ZXN0QXJyYXkucG9wKCkgIT09IFwidW5kZWZpbmVkXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtzdGF0ZV0gbXVzdCBiZSBhIHZhbGlkIGphdmFzY3JpcHQgb2JqZWN0YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSBcIm9iamVjdFwiKSAvKiBjaGVjayBpZiAnY2hpbGRyZW4nIGlzIGFuIGVtcHR5IGFycmF5IGFuZCBudWxsaWZ5IGl0ICovIHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCAmJiB0eXBlb2YgY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICghY2hpbGRyZW4gJiYgY3VycmVudFN0YXRlW25hbWVGaWVsZF0pIC8qIHdhcm4gaWYgY3VycmVudCBzdGF0ZSBoYXMga2V5IHRoYXQgY29ycmVzcG9uZHMgd2l0aCBuZXcga2V5Ki8ge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCcke25hbWVGaWVsZH0nIGtleSBhbHJlYWR5IGV4aXN0cyBpbiBzdGF0ZS5gKTtcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdKSAvKiB3YXJuIGlmIGN1cnJlbnQgc3RhdGUgdmFsdWUgY29ycmVzcG9uZHMgd2l0aCBuZXcgdmFsdWUqLyB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1N0YXRlIGlzIGFscmVhZHkgdXAgdG8gZGF0ZS4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IHR5cGVvZiBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSkgLyogcHJldmVudCB1bmF1dGhvcml6ZWQgdHlwZSBjaGFuZ2VzICovIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXFxuIFN0YXRlIHVwZGF0ZSBmYWlsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gcGVyZm9ybSB1bmF1dGhvcml6ZWQgdHlwZSBjaGFuZ2VzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcXG4gUGFzcyAnZmFsc2UnIHRvIHRoZSAoc3RhdGljVHlwZSkgcGFyYW1ldGVyIG9mIHRoZSAndXBkYXRlVmFsdWUoKScgZnVuY3Rpb24gdG8gYWxsb3cgdHlwZSBjaGFuZ2VzLlxyXG4gICAgICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSAvKiB1cGRhdGUgdmFsdWUgYW5kIHJldHVybiBzdGF0ZSBpZiBzdGF0ZSBoYXMgY29ycmVzcG9uZGluZyBrZXkgd2l0aCBkaWZmZXJlbnQgdmFsdWUgKi8ge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkU3RhdGUgPSBjdXJyZW50U3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRTdGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIWNoaWxkcmVuICYmICFjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXRlLmhhc093blByb3BlcnR5KG5hbWVGaWVsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJyR7bmFtZUZpZWxkfScga2V5IGFscmVhZHkgZXhpc3RzIGluIHN0YXRlLmApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdKSAvKiB3YXJuIGlmIGN1cnJlbnQgc3RhdGUgdmFsdWUgY29ycmVzcG9uZHMgd2l0aCBuZXcgdmFsdWUqLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdTdGF0ZSBpcyBhbHJlYWR5IHVwIHRvIGRhdGUuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSB0eXBlb2YgY3VycmVudFN0YXRlW25hbWVGaWVsZF0pIC8qIHByZXZlbnQgdW5hdXRob3JpemVkIHR5cGUgY2hhbmdlcyAqLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIFN0YXRlIHVwZGF0ZSBmYWlsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4gWW91IGFyZSBhdHRlbXB0aW5nIHRvIHBlcmZvcm0gdW5hdXRob3JpemVkIHR5cGUgY2hhbmdlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBQYXNzICdmYWxzZScgdG8gdGhlIChzdGF0aWNUeXBlKSBwYXJhbWV0ZXIgb2YgdGhlICd1cGRhdGVWYWx1ZSgpJyBmdW5jdGlvbiB0byBhbGxvdyB0eXBlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIC8qIHVwZGF0ZSB2YWx1ZSBhbmQgcmV0dXJuIHN0YXRlIGlmIHN0YXRlIGhhcyBjb3JyZXNwb25kaW5nIGtleSB3aXRoIGRpZmZlcmVudCB2YWx1ZSAqLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRTdGF0ZSA9IGN1cnJlbnRTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRTdGF0ZSA9IGN1cnJlbnRTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkU3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuLmxlbmd0aCAmJiB2YWx1ZSAhPT0gY3VycmVudFN0YXRlW25hbWVGaWVsZF0pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzbmFwc2hvdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IChjaGlsZHJlbi5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IChjaGlsZHJlbi5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChjdXJyZW50U3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAoY2hpbGRyZW4ubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0gIT09IHR5cGVvZiB2YWx1ZSkgLyogcHJldmVudCB1bmF1dGhvcml6ZWQgdHlwZSBjaGFuZ2VzICovIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4gU3RhdGUgdXBkYXRlIGZhaWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gcGVyZm9ybSB1bmF1dGhvcml6ZWQgdHlwZSBjaGFuZ2VzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIFBhc3MgJ2ZhbHNlJyB0byB0aGUgKHN0YXRpY1R5cGUpIHBhcmFtZXRlciBvZiB0aGUgJ3VwZGF0ZVZhbHVlKCknIGZ1bmN0aW9uIHRvIGFsbG93IHR5cGUgY2hhbmdlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90c1tzbmFwc2hvdHMubGVuZ3RoIC0gMV1bY2hpbGRyZW5baW5kZXhdXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXVtjaGlsZHJlbltpbmRleF1dICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAoY2hpbGRyZW4ubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90c1tzbmFwc2hvdHMubGVuZ3RoIC0gMV1bY2hpbGRyZW5baW5kZXhdXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXVtjaGlsZHJlbltpbmRleF1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAoY2hpbGRyZW4ubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleDAgPSBzbmFwc2hvdHMubGVuZ3RoIC0gMTsgaW5kZXgwID49IDA7IGluZGV4MC0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleDAgIT09IHNuYXBzaG90cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHNbaW5kZXgwXVtjaGlsZHJlbltpbmRleDAgKyAxXV0gPSBzbmFwc2hvdHNbaW5kZXgwICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXgwID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXgwXV0gPSBzbmFwc2hvdHNbaW5kZXgwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRTdGF0ZSA9IGN1cnJlbnRTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkU3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIl19 
