"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.updateValue=void 0;var _typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof"));/**
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

var updateValue=function updateValue(state,payload){var staticType=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;

/**
     * @param   {Object}  payload { name: String, newValue: any, child: Array }
     * @param   {String}  payload.name Name of the key to be mutated or second object in the nesting hieriarchy.
     * @param   {any}     payload.newValue New value to be inserted.
     * @param   {Array}   payload.child Array of strings pointing to the nested key to be mutated.
     * @param   {Boolean} staticType Pass 'false' to turn off console error when altering data types.
     * @returns {Object}  { updatedState } : The new app state, or current state if it was not altered.
     */

return function(){var payloadInherited=arguments.length>0&&arguments[0]!==undefined?arguments[0]:payload;var staticTypeInherited=arguments.length>1&&arguments[1]!==undefined?arguments[1]:staticType;
var currentState=JSON.parse(JSON.stringify(state));
var updatedState=null;
var name=payloadInherited.name,newValue=payloadInherited.newValue,child=payloadInherited.child;
var nameField=name;
var children=child;
var testArray=state?Array.from(state):null;
var snapshots=[];
var staticDataType=staticTypeInherited?true:false;

if((0,_typeof2.default)(state)!=='object'||state[state.length-1]===testArray.pop()&&typeof testArray.pop()!=="undefined"){
console.error("[state] must be a valid javascript object");
return state;
}

if((0,_typeof2.default)(children)==="object")/* check if 'children' is an empty array and nullify it */{
if(children.length===0&&typeof children[children.length-1]==="undefined"){
children=null;
}
}

if(!children&&!currentState.hasOwnProperty(nameField)){
console.error("The referenced property '".concat(nameField,"' does not exist in current state."));
return state;
}

if(!children&&newValue===currentState[nameField])/* warn if current state value corresponds with new value*/{
console.warn('State is already up to date.');
return state;
}else if(!children&&newValue!==currentState[nameField]){
if((0,_typeof2.default)(newValue)!==(0,_typeof2.default)(currentState[nameField])&&staticDataType)/* prevent unauthorized type changes */{
console.error("\n                    \n State update failed,\n                    \n You are attempting to perform unauthorized type changes.\n                    \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                ");




return state;
}else/* update and return state */{
Object.assign(currentState,state);
currentState[nameField]=newValue;
updatedState=currentState;
return updatedState;
}
}else if(children.length&&newValue!==currentState[nameField]){
for(var index=0;index<children.length;index++){
if(!snapshots.length){
if(typeof currentState[nameField][children[index]]!=="undefined"){
snapshots.push(currentState[nameField][children[index]]);
}else{
console.error("The referenced property '".concat(nameField,"' does not exist in current state."));
return state;
}
}else{
if(typeof snapshots[snapshots.length-1][children[index]]!=="undefined"){
snapshots.push(snapshots[snapshots.length-1][children[index]]);
}else{
console.error("The referenced property '".concat(nameField,"' does not exist in current state."));
return state;
}
}

if(index===children.length-1){
if(newValue===snapshots[snapshots.length-1])/* warn if current state value corresponds with new value*/{
console.warn('State is already up to date.');
return state;
}else{
if((0,_typeof2.default)(newValue)!==(0,_typeof2.default)(snapshots[snapshots.length-1])&&staticDataType)/* prevent unauthorized type changes */{
console.error("\n                                State update failed,\n                                \n You are attempting to perform unauthorized type changes.\n                                \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                            ");




return state;
}else/* update and return state */{
for(var index0=snapshots.length-1;index0>=0;index0--){
if(index0===snapshots.length-1){
snapshots[index0]=newValue;
}else{
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
}
}
}else{
Object.assign(currentState,state);
return currentState;
}
};
};exports.updateValue=updateValue;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZVZhbHVlLmpzIl0sIm5hbWVzIjpbInVwZGF0ZVZhbHVlIiwic3RhdGUiLCJwYXlsb2FkIiwic3RhdGljVHlwZSIsInBheWxvYWRJbmhlcml0ZWQiLCJzdGF0aWNUeXBlSW5oZXJpdGVkIiwiY3VycmVudFN0YXRlIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwidXBkYXRlZFN0YXRlIiwibmFtZSIsIm5ld1ZhbHVlIiwiY2hpbGQiLCJuYW1lRmllbGQiLCJjaGlsZHJlbiIsInRlc3RBcnJheSIsIkFycmF5IiwiZnJvbSIsInNuYXBzaG90cyIsInN0YXRpY0RhdGFUeXBlIiwibGVuZ3RoIiwicG9wIiwiY29uc29sZSIsImVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJ3YXJuIiwiT2JqZWN0IiwiYXNzaWduIiwiaW5kZXgiLCJwdXNoIiwiaW5kZXgwIl0sIm1hcHBpbmdzIjoia1FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVRLEdBQU1BLENBQUFBLFdBQVcsQ0FBRyxRQUFkQSxDQUFBQSxXQUFjLENBQUNDLEtBQUQsQ0FBUUMsT0FBUixDQUF1QyxJQUF0QkMsQ0FBQUEsVUFBc0IsMkRBQVQsSUFBUzs7QUFFL0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSSxNQUFPLFdBQXdFLElBQTlEQyxDQUFBQSxnQkFBOEQsMkRBQTNDRixPQUEyQyxJQUFsQ0csQ0FBQUEsbUJBQWtDLDJEQUFaRixVQUFZO0FBQzNFLEdBQUlHLENBQUFBLFlBQVksQ0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsU0FBTCxDQUFlUixLQUFmLENBQVgsQ0FBbkI7QUFDQSxHQUFJUyxDQUFBQSxZQUFZLENBQUcsSUFBbkI7QUFDQSxHQUFNQyxDQUFBQSxJQUFOLENBQWdDUCxnQkFBaEMsQ0FBTU8sSUFBTixD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Q0FBQ0UsTUFBVixDQUFtQixDQUFuQyxDQUF1QztBQUNuQ0YsU0FBUyxDQUFDWSxNQUFELENBQVQsQ0FBb0JuQixRQUFwQjtBQUNILENBRkQsSUFFTztBQUNITyxTQUFTLENBQUNZLE1BQUQsQ0FBVCxDQUFrQmhCLFFBQVEsQ0FBQ2dCLE1BQU0sQ0FBRyxDQUFWLENBQTFCLEVBQTBDWixTQUFTLENBQUNZLE1BQU0sQ0FBRyxDQUFWLENBQW5EO0FBQ0g7O0FBRUQsR0FBSUEsTUFBTSxHQUFLLENBQWYsQ0FBa0I7QUFDZEosTUFBTSxDQUFDQyxNQUFQLENBQWN0QixZQUFkLENBQTRCTCxLQUE1QjtBQUNBSyxZQUFZLENBQUNRLFNBQUQsQ0FBWixDQUF3QkMsUUFBUSxDQUFDZ0IsTUFBRCxDQUFoQyxFQUE0Q1osU0FBUyxDQUFDWSxNQUFELENBQXJEO0FBQ0FyQixZQUFZLENBQUdKLFlBQWY7QUFDQSxNQUFPSSxDQUFBQSxZQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBQ0osQ0FqRE0sSUFpREE7QUFDSGlCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjdEIsWUFBZCxDQUE0QkwsS0FBNUI7QUFDQSxNQUFPSyxDQUFBQSxZQUFQO0FBQ0g7QUFDSixDQWhHRDtBQWlHSCxDQTVHTyxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgUGV0ZXIgQ29sbGlucyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9vbmVwZXRlcmNvbGxpbnNcclxuICogXHJcbiAqIEBmaWxlb3ZlcnZpZXcgOiBFeHBvcnRzIGEgZnVuY3Rpb246IHVwZGF0ZVZhbHVlKHN0YXRlLCBwYXlsb2FkLCBzdGF0aWNUeXBlKVxyXG4gKiBcclxuICogQGZ1bmN0aW9uIHVwZGF0ZVZhbHVlIDogRm9yIHN0YXRlIGRyaWxsaW5nIGFuZCBzdXJnaWNhbCBzdGF0ZSB1cGRhdGVzLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGZ1bmN0aW9uIGNhbiBiZSB1c2VkIHRvIGR5bmFtaWNhbGx5IHNldCBpbmZpbml0ZWx5IG5lc3RlZCBvYmplY3QgdmFsdWVzLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBJdCB0YWtlcyBjdXJyZW50IHN0YXRlLCBhIHBheWxvYWQgb2JqZWN0LCBhbmQgYW4gb3B0aW9uYWwgYm9vbGVhbiB2YWx1ZSBhcyBhcmd1bWVudHMuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIEl0IHJldHVybnMgYSBsb2NhbCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHVwZGF0ZWQgc3RhdGUuXHJcbiAqIFxyXG4gKiBAcGFyYW0gICB7T2JqZWN0fSAgIHN0YXRlIFRoZSBvYmplY3QgdG8gYmUgbXV0YXRlZC5cclxuICogQHBhcmFtICAge09iamVjdH0gICBwYXlsb2FkIHsgbmFtZTogU3RyaW5nLCBuZXdWYWx1ZTogYW55LCBjaGlsZDogQXJyYXkgfVxyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgIHBheWxvYWQubmFtZSBOYW1lIG9mIHRoZSBrZXkgdG8gYmUgbXV0YXRlZCBvciBzZWNvbmQgb2JqZWN0IGluIHRoZSBuZXN0aW5nIGhpZXJpYXJjaHkuXHJcbiAqIEBwYXJhbSAgIHthbnl9ICAgICAgcGF5bG9hZC5uZXdWYWx1ZSBOZXcgdmFsdWUgdG8gYmUgaW5zZXJ0ZWQuXHJcbiAqIEBwYXJhbSAgIHtBcnJheX0gICAgcGF5bG9hZC5jaGlsZCBBcnJheSBvZiBzdHJpbmdzIHBvaW50aW5nIHRvIHRoZSBuZXN0ZWQga2V5IHRvIGJlIG11dGF0ZWQuXHJcbiAqIEBwYXJhbSAgIHtCb29sZWFufSAgc3RhdGljVHlwZSBQYXNzICdmYWxzZScgdG8gdHVybiBvZmYgY29uc29sZSBlcnJvciB3aGVuIGFsdGVyaW5nIGRhdGEgdHlwZXMuXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gKGxvY2FsIGZ1bmN0aW9uKSAocGF5bG9hZCwgc3RhdGljVHlwZSkgPT4gOiBUaGUgbmV3IGFwcCBzdGF0ZSwgb3IgY3VycmVudCBzdGF0ZSBpZiBpdCB3YXMgbm90IGFsdGVyZWQuXHJcbiAqL1xyXG5cclxuIGV4cG9ydCBjb25zdCB1cGRhdGVWYWx1ZSA9IChzdGF0ZSwgcGF5bG9hZCwgc3RhdGljVHlwZSA9IHRydWUpID0+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAgIHtPYmplY3R9ICBwYXlsb2FkIHsgbmFtZTogU3RyaW5nLCBuZXdWYWx1ZTogYW55LCBjaGlsZDogQXJyYXkgfVxyXG4gICAgICogQHBhcmFtICAge1N0cmluZ30gIHBheWxvYWQubmFtZSBOYW1lIG9mIHRoZSBrZXkgdG8gYmUgbXV0YXRlZCBvciBzZWNvbmQgb2JqZWN0IGluIHRoZSBuZXN0aW5nIGhpZXJpYXJjaHkuXHJcbiAgICAgKiBAcGFyYW0gICB7YW55fSAgICAgcGF5bG9hZC5uZXdWYWx1ZSBOZXcgdmFsdWUgdG8gYmUgaW5zZXJ0ZWQuXHJcbiAgICAgKiBAcGFyYW0gICB7QXJyYXl9ICAgcGF5bG9hZC5jaGlsZCBBcnJheSBvZiBzdHJpbmdzIHBvaW50aW5nIHRvIHRoZSBuZXN0ZWQga2V5IHRvIGJlIG11dGF0ZWQuXHJcbiAgICAgKiBAcGFyYW0gICB7Qm9vbGVhbn0gc3RhdGljVHlwZSBQYXNzICdmYWxzZScgdG8gdHVybiBvZmYgY29uc29sZSBlcnJvciB3aGVuIGFsdGVyaW5nIGRhdGEgdHlwZXMuXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSAgeyB1cGRhdGVkU3RhdGUgfSA6IFRoZSBuZXcgYXBwIHN0YXRlLCBvciBjdXJyZW50IHN0YXRlIGlmIGl0IHdhcyBub3QgYWx0ZXJlZC5cclxuICAgICAqL1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAocGF5bG9hZEluaGVyaXRlZCA9IHBheWxvYWQsIHN0YXRpY1R5cGVJbmhlcml0ZWQgPSBzdGF0aWNUeXBlKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcclxuICAgICAgICBsZXQgdXBkYXRlZFN0YXRlID0gbnVsbDtcclxuICAgICAgICBsZXQgeyBuYW1lLCBuZXdWYWx1ZSwgY2hpbGQgfSA9IHBheWxvYWRJbmhlcml0ZWQ7XHJcbiAgICAgICAgbGV0IG5hbWVGaWVsZCA9IG5hbWU7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gY2hpbGQ7XHJcbiAgICAgICAgbGV0IHRlc3RBcnJheSA9IHN0YXRlID8gQXJyYXkuZnJvbShzdGF0ZSkgOiBudWxsXHJcbiAgICAgICAgbGV0IHNuYXBzaG90cyA9IFtdO1xyXG4gICAgICAgIGxldCBzdGF0aWNEYXRhVHlwZSA9IHN0YXRpY1R5cGVJbmhlcml0ZWQgPyB0cnVlIDogZmFsc2U7XHJcbiAgICBcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlICE9PSAnb2JqZWN0JyB8fCAoc3RhdGVbc3RhdGUubGVuZ3RoIC0gMV0gPT09IHRlc3RBcnJheS5wb3AoKSAmJiB0eXBlb2YgdGVzdEFycmF5LnBvcCgpICE9PSBcInVuZGVmaW5lZFwiKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbc3RhdGVdIG11c3QgYmUgYSB2YWxpZCBqYXZhc2NyaXB0IG9iamVjdGApO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJvYmplY3RcIikgLyogY2hlY2sgaWYgJ2NoaWxkcmVuJyBpcyBhbiBlbXB0eSBhcnJheSBhbmQgbnVsbGlmeSBpdCAqLyB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgdHlwZW9mIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIWNoaWxkcmVuICYmICFjdXJyZW50U3RhdGUuaGFzT3duUHJvcGVydHkobmFtZUZpZWxkKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBUaGUgcmVmZXJlbmNlZCBwcm9wZXJ0eSAnJHtuYW1lRmllbGR9JyBkb2VzIG5vdCBleGlzdCBpbiBjdXJyZW50IHN0YXRlLmApO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCFjaGlsZHJlbiAmJiBuZXdWYWx1ZSA9PT0gY3VycmVudFN0YXRlW25hbWVGaWVsZF0pIC8qIHdhcm4gaWYgY3VycmVudCBzdGF0ZSB2YWx1ZSBjb3JyZXNwb25kcyB3aXRoIG5ldyB2YWx1ZSovIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdTdGF0ZSBpcyBhbHJlYWR5IHVwIHRvIGRhdGUuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFjaGlsZHJlbiAmJiBuZXdWYWx1ZSAhPT0gY3VycmVudFN0YXRlW25hbWVGaWVsZF0pIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gdHlwZW9mIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdICYmIHN0YXRpY0RhdGFUeXBlKSAvKiBwcmV2ZW50IHVuYXV0aG9yaXplZCB0eXBlIGNoYW5nZXMgKi8ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgXHJcbiAgICAgICAgICAgICAgICAgICAgXFxuIFN0YXRlIHVwZGF0ZSBmYWlsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXFxuIFlvdSBhcmUgYXR0ZW1wdGluZyB0byBwZXJmb3JtIHVuYXV0aG9yaXplZCB0eXBlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgXFxuIFBhc3MgJ2ZhbHNlJyB0byB0aGUgKHN0YXRpY1R5cGUpIHBhcmFtZXRlciBvZiB0aGUgJ3VwZGF0ZVZhbHVlKCknIGZ1bmN0aW9uIHRvIGFsbG93IHR5cGUgY2hhbmdlcy5cclxuICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2UgLyogdXBkYXRlIGFuZCByZXR1cm4gc3RhdGUgKi8ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3RhdGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkU3RhdGUgPSBjdXJyZW50U3RhdGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZHJlbi5sZW5ndGggJiYgbmV3VmFsdWUgIT09IGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghc25hcHNob3RzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChjdXJyZW50U3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBUaGUgcmVmZXJlbmNlZCBwcm9wZXJ0eSAnJHtuYW1lRmllbGR9JyBkb2VzIG5vdCBleGlzdCBpbiBjdXJyZW50IHN0YXRlLmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNuYXBzaG90c1tzbmFwc2hvdHMubGVuZ3RoIC0gMV1bY2hpbGRyZW5baW5kZXhdXSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFRoZSByZWZlcmVuY2VkIHByb3BlcnR5ICcke25hbWVGaWVsZH0nIGRvZXMgbm90IGV4aXN0IGluIGN1cnJlbnQgc3RhdGUuYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdKSAvKiB3YXJuIGlmIGN1cnJlbnQgc3RhdGUgdmFsdWUgY29ycmVzcG9uZHMgd2l0aCBuZXcgdmFsdWUqLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignU3RhdGUgaXMgYWxyZWFkeSB1cCB0byBkYXRlLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gdHlwZW9mIHNuYXBzaG90c1tzbmFwc2hvdHMubGVuZ3RoIC0gMV0gJiYgc3RhdGljRGF0YVR5cGUpIC8qIHByZXZlbnQgdW5hdXRob3JpemVkIHR5cGUgY2hhbmdlcyAqLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdGF0ZSB1cGRhdGUgZmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gcGVyZm9ybSB1bmF1dGhvcml6ZWQgdHlwZSBjaGFuZ2VzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBQYXNzICdmYWxzZScgdG8gdGhlIChzdGF0aWNUeXBlKSBwYXJhbWV0ZXIgb2YgdGhlICd1cGRhdGVWYWx1ZSgpJyBmdW5jdGlvbiB0byBhbGxvdyB0eXBlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIC8qIHVwZGF0ZSBhbmQgcmV0dXJuIHN0YXRlICovIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4MCA9IHNuYXBzaG90cy5sZW5ndGggLSAxOyBpbmRleDAgPj0gMDsgaW5kZXgwLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXgwID09PSAoc25hcHNob3RzLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90c1tpbmRleDBdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzW2luZGV4MF1bY2hpbGRyZW5baW5kZXgwICsgMV1dID0gc25hcHNob3RzW2luZGV4MCArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleDAgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3RhdGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXgwXV0gPSBzbmFwc2hvdHNbaW5kZXgwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFN0YXRlID0gY3VycmVudFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4iXX0= 
