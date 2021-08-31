"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.logState=void 0;var _typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof"));/**
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

var logState=function logState(state,payload){

/**
     * @param   {Object} payload { name: String, child: Array }
     * @param   {String} payload.name Name of the key to log or second object in the nesting hieriarchy.
     * @param   {Array}  payload.child Array of strings pointing to the nested value to log.
     * @returns {Object} { state } : Current app state, it does not alter the state.
     */

return function(){var payloadInherited=arguments.length>0&&arguments[0]!==undefined?arguments[0]:payload||{name:null,child:[]};
var currentState=JSON.parse(JSON.stringify(state));
var name=payloadInherited.name,child=payloadInherited.child;
var nameField=name;
var children=child;
var testArray=state?Array.from(state):null;
var snapshots=[];
var date=new Date();
var pathString="state.".concat(nameField);

if((0,_typeof2.default)(state)!=='object'||state[state.length-1]===testArray.pop()&&typeof testArray.pop()!=="undefined"){
console.error("[state] must be a valid javascript object");
return state;
}

if((0,_typeof2.default)(children)==="object")/* check if 'children' is an empty array and nullify it */{
if(children.length===0&&typeof children[children.length-1]==="undefined"){
children=null;
}
}

if(!payloadInherited.name){
console.log("\n app state @ ".concat(date.getHours(),":").concat(date.getMinutes(),":").concat(date.getSeconds()));
console.log(state);
return state;
}else{
if(!children&&!currentState.hasOwnProperty(nameField)){
console.error("The referenced property '".concat(nameField,"' does not exist in current state."));
return state;
}else if(!children&&currentState.hasOwnProperty(nameField))/* log state to console */{
console.log("\n                    \n app state @ ".concat(
date.getHours(),":").concat(date.getMinutes(),":").concat(date.getSeconds(),"\n                    \n ").concat(
pathString," :\n                "));

console.log(state[nameField]);
return state;
}else if(children.length){
for(var index=0;index<children.length;index++){
if(!snapshots.length){
pathString+=".".concat(children[index]);

if(index===children.length-1){
console.log("\n                                \n app state @ ".concat(
date.getHours(),":").concat(date.getMinutes(),":").concat(date.getSeconds(),"\n                                \n ").concat(
pathString," :\n                            "));

console.log(state[nameField][children[index]]);
}else{
snapshots.push(state[nameField][children[index]]);
}
}else{
pathString+=".".concat(children[index]);

if(index!==children.length-1){
snapshots.push(snapshots[snapshots.length-1][children[index]]);
}else{
snapshots.push(snapshots[snapshots.length-1][children[index]]);

console.log("\n                                \n app state @ ".concat(
date.getHours(),":").concat(date.getMinutes(),":").concat(date.getSeconds(),"\n                                \n ").concat(
pathString," :\n                            "));

console.log(snapshots[snapshots.length-1]);
}
}
}
return state;
}
}
};
};exports.logState=logState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ1N0YXRlLmpzIl0sIm5hbWVzIjpbImxvZ1N0YXRlIiwic3RhdGUiLCJwYXlsb2FkIiwicGF5bG9hZEluaGVyaXRlZCIsIm5hbWUiLCJjaGlsZCIsImN1cnJlbnRTdGF0ZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIm5hbWVGaWVsZCIsImNoaWxkcmVuIiwidGVzdEFycmF5IiwiQXJyYXkiLCJmcm9tIiwic25hcHNob3RzIiwiZGF0ZSIsIkRhdGUiLCJwYXRoU3RyaW5nIiwibGVuZ3RoIiwicG9wIiwiY29uc29sZSIsImVycm9yIiwibG9nIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImhhc093blByb3BlcnR5IiwiaW5kZXgiLCJwdXNoIl0sIm1hcHBpbmdzIjoiK1BBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVEsR0FBTUEsQ0FBQUEsUUFBUSxDQUFHLFFBQVhBLENBQUFBLFFBQVcsQ0FBQ0MsS0FBRCxDQUFRQyxPQUFSLENBQW9COztBQUV6QztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUksTUFBTyxXQUFtRSxJQUF6REMsQ0FBQUEsZ0JBQXlELDJEQUF0Q0QsT0FBTyxFQUFJLENBQUVFLElBQUksQ0FBRSxJQUFSLENBQWNDLEtBQUssQ0FBRSxFQUFyQixDQUEyQjtBQUN0RSxHQUFJQyxDQUFBQSxZQUFZLENBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLFNBQUwsQ0FBZVIsS0FBZixDQUFYLENBQW5CO0FBQ0EsR0FBTUcsQ0FBQUEsSUFBTixDQUFzQkQsZ0JBQXRCLENBQU1DLElBQU4sQ0FBWUMsS0FBWixDQUFzQkYsZ0JBQXRCLENBQVlFLEtBQVo7QUFDQSxHQUFJSyxDQUFBQSxTQUFTLENBQUdOLElBQWhCO0FBQ0EsR0FBSU8sQ0FBQUEsUUFBUSxDQUFHTixLQUFmO0FBQ0EsR0FBSU8sQ0FBQUEsU0FBUyxD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TCxDQUFpQkMsUUFBUSxDQUFDaUIsS0FBRCxDQUF6QixDQUFmO0FBQ0g7QUFDSixDQVpELElBWU87QUFDSFYsVUFBVSxhQUFRUCxRQUFRLENBQUNpQixLQUFELENBQWhCLENBQVY7O0FBRUEsR0FBSUEsS0FBSyxHQUFNakIsUUFBUSxDQUFDUSxNQUFULENBQWtCLENBQWpDLENBQXFDO0FBQ2pDSixTQUFTLENBQUNjLElBQVYsQ0FBZWQsU0FBUyxDQUFDQSxTQUFTLENBQUNJLE1BQVYsQ0FBbUIsQ0FBcEIsQ0FBVCxDQUFnQ1IsUUFBUSxDQUFDaUIsS0FBRCxDQUF4QyxDQUFmO0FBQ0gsQ0FGRCxJQUVPO0FBQ0hiLFNBQVMsQ0FBQ2MsSUFBVixDQUFlZCxTQUFTLENBQUNBLFNBQVMsQ0FBQ0ksTUFBVixDQUFtQixDQUFwQixDQUFULENBQWdDUixRQUFRLENBQUNpQixLQUFELENBQXhDLENBQWY7O0FBRUFQLE9BQU8sQ0FBQ0UsR0FBUjtBQUNxQlAsSUFBSSxDQUFDUSxRQUFMLEVBRHJCLGFBQ3dDUixJQUFJLENBQUNTLFVBQUwsRUFEeEMsYUFDNkRULElBQUksQ0FBQ1UsVUFBTCxFQUQ3RDtBQUVTUixVQUZUOztBQUlBRyxPQUFPLENBQUNFLEdBQVIsQ0FBWVIsU0FBUyxDQUFDQSxTQUFTLENBQUNJLE1BQVYsQ0FBbUIsQ0FBcEIsQ0FBckI7QUFDSDtBQUNKO0FBQ0o7QUFDRCxNQUFPbEIsQ0FBQUEsS0FBUDtBQUNIO0FBQ0o7QUFDSixDQXJFRDtBQXNFSCxDQS9FTyxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgUGV0ZXIgQ29sbGlucyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9vbmVwZXRlcmNvbGxpbnNcclxuICogXHJcbiAqIEBmaWxlb3ZlcnZpZXcgOiBFeHBvcnRzIGEgZnVuY3Rpb246IGxvZ1N0YXRlKHN0YXRlLCBwYXlsb2FkKVxyXG4gKiBcclxuICogQGZ1bmN0aW9uIGxvZ1N0YXRlIDogVG8gbG9nIGN1cnJlbnQgc3RhdGUgb3IgYSBzZWxlY3RlZCBwYXJ0IG9mIGl0IHRvIHRoZSBjb25zb2xlIGZvciBpbnNwZWN0aW9uLlxyXG4gKiBcclxuICogQHBhcmFtICAge09iamVjdH0gICBzdGF0ZSBDdXJyZW50IHN0YXRlLlxyXG4gKiBAcGFyYW0gICB7T2JqZWN0fSAgIHBheWxvYWQgeyBuYW1lOiBTdHJpbmcsIGNoaWxkOiBBcnJheSB9XHJcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgcGF5bG9hZC5uYW1lIE5hbWUgb2YgdGhlIGtleSB0byBsb2cgb3Igc2Vjb25kIG9iamVjdCBpbiB0aGUgbmVzdGluZyBoaWVyaWFyY2h5LlxyXG4gKiBAcGFyYW0gICB7QXJyYXl9ICAgIHBheWxvYWQuY2hpbGQgQXJyYXkgb2Ygc3RyaW5ncyBwb2ludGluZyB0byB0aGUgbmVzdGVkIHZhbHVlIHRvIGxvZy5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufSAobG9jYWwgZnVuY3Rpb24pIChwYXlsb2FkKSA9PiA6IEN1cnJlbnQgYXBwIHN0YXRlLCBpdCBkb2VzIG5vdCBhbHRlciB0aGUgc3RhdGUuXHJcbiAqL1xyXG5cclxuIGV4cG9ydCBjb25zdCBsb2dTdGF0ZSA9IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtICAge09iamVjdH0gcGF5bG9hZCB7IG5hbWU6IFN0cmluZywgY2hpbGQ6IEFycmF5IH1cclxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9IHBheWxvYWQubmFtZSBOYW1lIG9mIHRoZSBrZXkgdG8gbG9nIG9yIHNlY29uZCBvYmplY3QgaW4gdGhlIG5lc3RpbmcgaGllcmlhcmNoeS5cclxuICAgICAqIEBwYXJhbSAgIHtBcnJheX0gIHBheWxvYWQuY2hpbGQgQXJyYXkgb2Ygc3RyaW5ncyBwb2ludGluZyB0byB0aGUgbmVzdGVkIHZhbHVlIHRvIGxvZy5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHsgc3RhdGUgfSA6IEN1cnJlbnQgYXBwIHN0YXRlLCBpdCBkb2VzIG5vdCBhbHRlciB0aGUgc3RhdGUuXHJcbiAgICAgKi9cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBheWxvYWRJbmhlcml0ZWQgPSBwYXlsb2FkIHx8IHsgbmFtZTogbnVsbCwgY2hpbGQ6IFtdIH0pIHtcclxuICAgICAgICBsZXQgY3VycmVudFN0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xyXG4gICAgICAgIGxldCB7IG5hbWUsIGNoaWxkIH0gPSBwYXlsb2FkSW5oZXJpdGVkO1xyXG4gICAgICAgIGxldCBuYW1lRmllbGQgPSBuYW1lO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IGNoaWxkO1xyXG4gICAgICAgIGxldCB0ZXN0QXJyYXkgPSBzdGF0ZSA/IEFycmF5LmZyb20oc3RhdGUpIDogbnVsbFxyXG4gICAgICAgIGxldCBzbmFwc2hvdHMgPSBbXTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IHBhdGhTdHJpbmcgPSBgc3RhdGUuJHtuYW1lRmllbGR9YDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ29iamVjdCcgfHwgKHN0YXRlW3N0YXRlLmxlbmd0aCAtIDFdID09PSB0ZXN0QXJyYXkucG9wKCkgJiYgdHlwZW9mIHRlc3RBcnJheS5wb3AoKSAhPT0gXCJ1bmRlZmluZWRcIikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW3N0YXRlXSBtdXN0IGJlIGEgdmFsaWQgamF2YXNjcmlwdCBvYmplY3RgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIC8qIGNoZWNrIGlmICdjaGlsZHJlbicgaXMgYW4gZW1wdHkgYXJyYXkgYW5kIG51bGxpZnkgaXQgKi8ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIHR5cGVvZiBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXBheWxvYWRJbmhlcml0ZWQubmFtZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgXFxuIGFwcCBzdGF0ZSBAICR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfWApO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghY2hpbGRyZW4gJiYgIWN1cnJlbnRTdGF0ZS5oYXNPd25Qcm9wZXJ0eShuYW1lRmllbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBUaGUgcmVmZXJlbmNlZCBwcm9wZXJ0eSAnJHtuYW1lRmllbGR9JyBkb2VzIG5vdCBleGlzdCBpbiBjdXJyZW50IHN0YXRlLmApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjaGlsZHJlbiAmJiBjdXJyZW50U3RhdGUuaGFzT3duUHJvcGVydHkobmFtZUZpZWxkKSkgLyogbG9nIHN0YXRlIHRvIGNvbnNvbGUgKi8ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFxyXG4gICAgICAgICAgICAgICAgICAgIFxcbiBhcHAgc3RhdGUgQCAke2RhdGUuZ2V0SG91cnMoKX06JHtkYXRlLmdldE1pbnV0ZXMoKX06JHtkYXRlLmdldFNlY29uZHMoKX1cclxuICAgICAgICAgICAgICAgICAgICBcXG4gJHtwYXRoU3RyaW5nfSA6XHJcbiAgICAgICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlW25hbWVGaWVsZF0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc25hcHNob3RzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoU3RyaW5nICs9IGAuJHtjaGlsZHJlbltpbmRleF19YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIGFwcCBzdGF0ZSBAICR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiAke3BhdGhTdHJpbmd9IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKHN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoU3RyaW5nICs9IGAuJHtjaGlsZHJlbltpbmRleF19YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXVtjaGlsZHJlbltpbmRleF1dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIGFwcCBzdGF0ZSBAICR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiAke3BhdGhTdHJpbmd9IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19 
