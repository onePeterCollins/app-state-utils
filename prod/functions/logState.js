"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.logState = void 0;var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof")); /**
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

var logState = function logState(state, payload) {

  /**
   * @param   {Object} payload { name: String, child: Array }
   * @param   {String} payload.name Name of the key to log or second object in the nesting hieriarchy.
   * @param   {Array}  payload.child Array of strings pointing to the nested value to log.
   * @returns {Object} { state } : Current app state, it does not alter the state.
   */

  return function () {var payloadInherited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : payload || { name: null, child: [] };
    var currentState = JSON.parse(JSON.stringify(state));
    var name = payloadInherited.name,child = payloadInherited.child;
    var nameField = name;
    var children = child;
    var testArray = state ? Array.from(state) : null;
    var snapshots = [];
    var date = new Date();
    var pathString = "state.".concat(nameField);

    if ((0, _typeof2["default"])(state) !== 'object' || state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined") {
      console.error("[state] must be a valid javascript object");
      return state;
    }

    if ((0, _typeof2["default"])(children) === "object") /* check if 'children' is an empty array and nullify it */{
        if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
          children = null;
        }
      }

    if (!payloadInherited.name) {
      console.log("\n app state @ ".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds()));
      console.log(state);
      return state;
    } else {
      if (!children && !currentState.hasOwnProperty(nameField)) {
        console.error("The referenced property '".concat(nameField, "' does not exist in current state."));
        return state;
      } else if (!children && currentState.hasOwnProperty(nameField)) /* log state to console */{
          console.log("\n                    \n app state @ ".concat(
          date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "\n                    \n ").concat(
          pathString, " :\n                "));

          console.log(state[nameField]);
          return state;
        } else if (children.length) {
        for (var index = 0; index < children.length; index++) {
          if (!snapshots.length) {
            pathString += ".".concat(children[index]);

            if (index === children.length - 1) {
              console.log("\n                                \n app state @ ".concat(
              date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "\n                                \n ").concat(
              pathString, " :\n                            "));

              console.log(state[nameField][children[index]]);
            } else {
              snapshots.push(state[nameField][children[index]]);
            }
          } else {
            pathString += ".".concat(children[index]);

            if (index !== children.length - 1) {
              snapshots.push(snapshots[snapshots.length - 1][children[index]]);
            } else {
              snapshots.push(snapshots[snapshots.length - 1][children[index]]);

              console.log("\n                                \n app state @ ".concat(
              date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "\n                                \n ").concat(
              pathString, " :\n                            "));

              console.log(snapshots[snapshots.length - 1]);
            }
          }
        }
        return state;
      }
    }
  };
};exports.logState = logState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ1N0YXRlLmpzIl0sIm5hbWVzIjpbImxvZ1N0YXRlIiwic3RhdGUiLCJwYXlsb2FkIiwicGF5bG9hZEluaGVyaXRlZCIsIm5hbWUiLCJjaGlsZCIsImN1cnJlbnRTdGF0ZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIm5hbWVGaWVsZCIsImNoaWxkcmVuIiwidGVzdEFycmF5IiwiQXJyYXkiLCJmcm9tIiwic25hcHNob3RzIiwiZGF0ZSIsIkRhdGUiLCJwYXRoU3RyaW5nIiwibGVuZ3RoIiwicG9wIiwiY29uc29sZSIsImVycm9yIiwibG9nIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImhhc093blByb3BlcnR5IiwiaW5kZXgiLCJwdXNoIl0sIm1hcHBpbmdzIjoiMlFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVEsSUFBTUEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsS0FBRCxFQUFRQyxPQUFSLEVBQW9COztBQUV6QztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUksU0FBTyxZQUFtRSxLQUF6REMsZ0JBQXlELHVFQUF0Q0QsT0FBTyxJQUFJLEVBQUVFLElBQUksRUFBRSxJQUFSLEVBQWNDLEtBQUssRUFBRSxFQUFyQixFQUEyQjtBQUN0RSxRQUFJQyxZQUFZLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLFNBQUwsQ0FBZVIsS0FBZixDQUFYLENBQW5CO0FBQ0EsUUFBTUcsSUFBTixHQUFzQkQsZ0JBQXRCLENBQU1DLElBQU4sQ0FBWUMsS0FBWixHQUFzQkYsZ0JBQXRCLENBQVlFLEtBQVo7QUFDQSxRQUFJSyxTQUFTLEdBQUdOLElBQWhCO0FBQ0EsUUFBSU8sUUFBUSxHQUFHTixLQUFmO0FBQ0EsUUFBSU8sU0FBUyxHQUFHWCxLQUFLLEdBQUdZLEtBQUssQ0FBQ0MsSUFBTixDQUFXYixLQUFYLENBQUgs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QUFELENBQXpCLENBQWY7QUFDSDtBQUNKLFdBWkQsTUFZTztBQUNIVixZQUFBQSxVQUFVLGVBQVFQLFFBQVEsQ0FBQ2lCLEtBQUQsQ0FBaEIsQ0FBVjs7QUFFQSxnQkFBSUEsS0FBSyxLQUFNakIsUUFBUSxDQUFDUSxNQUFULEdBQWtCLENBQWpDLEVBQXFDO0FBQ2pDSixjQUFBQSxTQUFTLENBQUNjLElBQVYsQ0FBZWQsU0FBUyxDQUFDQSxTQUFTLENBQUNJLE1BQVYsR0FBbUIsQ0FBcEIsQ0FBVCxDQUFnQ1IsUUFBUSxDQUFDaUIsS0FBRCxDQUF4QyxDQUFmO0FBQ0gsYUFGRCxNQUVPO0FBQ0hiLGNBQUFBLFNBQVMsQ0FBQ2MsSUFBVixDQUFlZCxTQUFTLENBQUNBLFNBQVMsQ0FBQ0ksTUFBVixHQUFtQixDQUFwQixDQUFULENBQWdDUixRQUFRLENBQUNpQixLQUFELENBQXhDLENBQWY7O0FBRUFQLGNBQUFBLE9BQU8sQ0FBQ0UsR0FBUjtBQUNxQlAsY0FBQUEsSUFBSSxDQUFDUSxRQUFMLEVBRHJCLGNBQ3dDUixJQUFJLENBQUNTLFVBQUwsRUFEeEMsY0FDNkRULElBQUksQ0FBQ1UsVUFBTCxFQUQ3RDtBQUVTUixjQUFBQSxVQUZUOztBQUlBRyxjQUFBQSxPQUFPLENBQUNFLEdBQVIsQ0FBWVIsU0FBUyxDQUFDQSxTQUFTLENBQUNJLE1BQVYsR0FBbUIsQ0FBcEIsQ0FBckI7QUFDSDtBQUNKO0FBQ0o7QUFDRCxlQUFPbEIsS0FBUDtBQUNIO0FBQ0o7QUFDSixHQXJFRDtBQXNFSCxDQS9FTyxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgUGV0ZXIgQ29sbGlucyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9vbmVwZXRlcmNvbGxpbnNcclxuICogXHJcbiAqIEBmaWxlb3ZlcnZpZXcgOiBFeHBvcnRzIGEgZnVuY3Rpb246IGxvZ1N0YXRlKHN0YXRlLCBwYXlsb2FkKVxyXG4gKiBcclxuICogQGZ1bmN0aW9uIGxvZ1N0YXRlIDogVG8gbG9nIGN1cnJlbnQgc3RhdGUgb3IgYSBzZWxlY3RlZCBwYXJ0IG9mIGl0IHRvIHRoZSBjb25zb2xlIGZvciBpbnNwZWN0aW9uLlxyXG4gKiBcclxuICogQHBhcmFtICAge09iamVjdH0gICBzdGF0ZSBDdXJyZW50IHN0YXRlLlxyXG4gKiBAcGFyYW0gICB7T2JqZWN0fSAgIHBheWxvYWQgeyBuYW1lOiBTdHJpbmcsIGNoaWxkOiBBcnJheSB9XHJcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgcGF5bG9hZC5uYW1lIE5hbWUgb2YgdGhlIGtleSB0byBsb2cgb3Igc2Vjb25kIG9iamVjdCBpbiB0aGUgbmVzdGluZyBoaWVyaWFyY2h5LlxyXG4gKiBAcGFyYW0gICB7QXJyYXl9ICAgIHBheWxvYWQuY2hpbGQgQXJyYXkgb2Ygc3RyaW5ncyBwb2ludGluZyB0byB0aGUgbmVzdGVkIHZhbHVlIHRvIGxvZy5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufSAobG9jYWwgZnVuY3Rpb24pIChwYXlsb2FkKSA9PiA6IEN1cnJlbnQgYXBwIHN0YXRlLCBpdCBkb2VzIG5vdCBhbHRlciB0aGUgc3RhdGUuXHJcbiAqL1xyXG5cclxuIGV4cG9ydCBjb25zdCBsb2dTdGF0ZSA9IChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtICAge09iamVjdH0gcGF5bG9hZCB7IG5hbWU6IFN0cmluZywgY2hpbGQ6IEFycmF5IH1cclxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9IHBheWxvYWQubmFtZSBOYW1lIG9mIHRoZSBrZXkgdG8gbG9nIG9yIHNlY29uZCBvYmplY3QgaW4gdGhlIG5lc3RpbmcgaGllcmlhcmNoeS5cclxuICAgICAqIEBwYXJhbSAgIHtBcnJheX0gIHBheWxvYWQuY2hpbGQgQXJyYXkgb2Ygc3RyaW5ncyBwb2ludGluZyB0byB0aGUgbmVzdGVkIHZhbHVlIHRvIGxvZy5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHsgc3RhdGUgfSA6IEN1cnJlbnQgYXBwIHN0YXRlLCBpdCBkb2VzIG5vdCBhbHRlciB0aGUgc3RhdGUuXHJcbiAgICAgKi9cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBheWxvYWRJbmhlcml0ZWQgPSBwYXlsb2FkIHx8IHsgbmFtZTogbnVsbCwgY2hpbGQ6IFtdIH0pIHtcclxuICAgICAgICBsZXQgY3VycmVudFN0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xyXG4gICAgICAgIGxldCB7IG5hbWUsIGNoaWxkIH0gPSBwYXlsb2FkSW5oZXJpdGVkO1xyXG4gICAgICAgIGxldCBuYW1lRmllbGQgPSBuYW1lO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IGNoaWxkO1xyXG4gICAgICAgIGxldCB0ZXN0QXJyYXkgPSBzdGF0ZSA/IEFycmF5LmZyb20oc3RhdGUpIDogbnVsbFxyXG4gICAgICAgIGxldCBzbmFwc2hvdHMgPSBbXTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IHBhdGhTdHJpbmcgPSBgc3RhdGUuJHtuYW1lRmllbGR9YDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ29iamVjdCcgfHwgKHN0YXRlW3N0YXRlLmxlbmd0aCAtIDFdID09PSB0ZXN0QXJyYXkucG9wKCkgJiYgdHlwZW9mIHRlc3RBcnJheS5wb3AoKSAhPT0gXCJ1bmRlZmluZWRcIikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW3N0YXRlXSBtdXN0IGJlIGEgdmFsaWQgamF2YXNjcmlwdCBvYmplY3RgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIC8qIGNoZWNrIGlmICdjaGlsZHJlbicgaXMgYW4gZW1wdHkgYXJyYXkgYW5kIG51bGxpZnkgaXQgKi8ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIHR5cGVvZiBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXBheWxvYWRJbmhlcml0ZWQubmFtZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgXFxuIGFwcCBzdGF0ZSBAICR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfWApO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghY2hpbGRyZW4gJiYgIWN1cnJlbnRTdGF0ZS5oYXNPd25Qcm9wZXJ0eShuYW1lRmllbGQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBUaGUgcmVmZXJlbmNlZCBwcm9wZXJ0eSAnJHtuYW1lRmllbGR9JyBkb2VzIG5vdCBleGlzdCBpbiBjdXJyZW50IHN0YXRlLmApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjaGlsZHJlbiAmJiBjdXJyZW50U3RhdGUuaGFzT3duUHJvcGVydHkobmFtZUZpZWxkKSkgLyogbG9nIHN0YXRlIHRvIGNvbnNvbGUgKi8ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFxyXG4gICAgICAgICAgICAgICAgICAgIFxcbiBhcHAgc3RhdGUgQCAke2RhdGUuZ2V0SG91cnMoKX06JHtkYXRlLmdldE1pbnV0ZXMoKX06JHtkYXRlLmdldFNlY29uZHMoKX1cclxuICAgICAgICAgICAgICAgICAgICBcXG4gJHtwYXRoU3RyaW5nfSA6XHJcbiAgICAgICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlW25hbWVGaWVsZF0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc25hcHNob3RzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoU3RyaW5nICs9IGAuJHtjaGlsZHJlbltpbmRleF19YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIGFwcCBzdGF0ZSBAICR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiAke3BhdGhTdHJpbmd9IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKHN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoU3RyaW5nICs9IGAuJHtjaGlsZHJlbltpbmRleF19YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXVtjaGlsZHJlbltpbmRleF1dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIGFwcCBzdGF0ZSBAICR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiAke3BhdGhTdHJpbmd9IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiJdfQ== 
