"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.createEntry = void 0;var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof")); /**
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

var createEntry = function createEntry(state, payload) {

  /**
   * @param   {Object} payload { name: String, value: any, child: Array }
   * @param   {String} payload.name Name of the key to be created or second object in the nesting hieriarchy.
   * @param   {any}    payload.value Value to be assigned to newly created key.
   * @param   {Array}  payload.child Array of strings pointing to the nested key to be created.
   * @returns {Object} { updatedState } : The new app state, or current state if it was not altered.
   */

  return function () {var payloadInherited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : payload;
    var currentState = JSON.parse(JSON.stringify(state));
    var updatedState = null;
    var name = payloadInherited.name,value = payloadInherited.value,child = payloadInherited.child;
    var nameField = name;
    var children = child;
    var testArray = state ? Array.from(state) : null;
    var snapshots = [];

    if ((0, _typeof2["default"])(state) !== 'object' || state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined") {
      console.error("[state] must be a valid javascript object");
      return state;
    }

    if ((0, _typeof2["default"])(children) === "object") /* check if 'children' is an empty array and nullify it */{
        if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
          children = null;
        }
      }

    if (!children && currentState[nameField]) /* warn if current state has key that corresponds with new key*/{
        console.warn("'".concat(nameField, "' key already exists in state."));

        if (value === currentState[nameField]) /* warn if current state value corresponds with new value*/{
            console.warn('State is already up to date.');
            return state;
          } else {
          if ((0, _typeof2["default"])(value) !== (0, _typeof2["default"])(currentState[nameField])) /* prevent unauthorized type changes */{
              console.error("\n                        \n State update failed,\n                        \n You are attempting to perform unauthorized type changes.\n                        \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                    ");




              return state;
            } else /* update value and return state if state has corresponding key with different value */{
              Object.assign(currentState, state);
              currentState[nameField] = value;
              updatedState = currentState;
              return updatedState;
            }
        }
      } else if (!children && !currentState[nameField]) {
      if (currentState.hasOwnProperty(nameField)) {
        console.warn("'".concat(nameField, "' key already exists in state."));

        if (value === currentState[nameField]) /* warn if current state value corresponds with new value*/{
            console.warn('State is already up to date.');
            return state;
          } else {
          if ((0, _typeof2["default"])(value) !== (0, _typeof2["default"])(currentState[nameField])) /* prevent unauthorized type changes */{
              console.error("\n                            \n State update failed,\n                            \n You are attempting to perform unauthorized type changes.\n                            \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                        ");




              return state;
            } else /* update value and return state if state has corresponding key with different value */{
              Object.assign(currentState, state);
              currentState[nameField] = value;
              updatedState = currentState;
              return updatedState;
            }
        }
      } else {
        Object.assign(currentState, state);
        currentState[nameField] = value;
        updatedState = currentState;
        return updatedState;
      }
    } else if (children.length && value !== currentState[nameField]) {
      for (var index = 0; index < children.length; index++) {
        if (!snapshots.length) {
          if (typeof currentState[nameField] === "undefined") {
            if (index === children.length - 1) {
              currentState[nameField] = {};
              currentState[nameField][children[index]] = value;
              snapshots.push(currentState[nameField][children[index]]);
            } else {
              currentState[nameField] = {};
              currentState[nameField][children[index]] = {};
              snapshots.push(currentState[nameField][children[index]]);
            }
          } else {
            if (typeof currentState[nameField][children[index]] === "undefined") {
              if (index === children.length - 1) {
                currentState[nameField][children[index]] = value;
                snapshots.push(currentState[nameField][children[index]]);
              } else {
                currentState[nameField][children[index]] = {};
                snapshots.push(currentState[nameField][children[index]]);
              }
            } else {
              if (index === children.length - 1) {
                if ((0, _typeof2["default"])(currentState[nameField][children[index]]) !== (0, _typeof2["default"])(value)) /* prevent unauthorized type changes */{
                    console.error("\n                                        \n State update failed,\n                                        \n You are attempting to perform unauthorized type changes.\n                                        \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                                    ");




                    return state;
                  } else {
                  currentState[nameField][children[index]] = value;
                  snapshots.push(currentState[nameField][children[index]]);
                }
              } else {
                snapshots.push(currentState[nameField][children[index]]);
              }
            }
          }
        } else {
          if (index === children.length - 1) {
            snapshots[snapshots.length - 1][children[index]] = value;
            snapshots.push(snapshots[snapshots.length - 1][children[index]]);
          }

          if (typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
            if (index !== children.length - 1) {
              snapshots.push(snapshots[snapshots.length - 1][children[index]]);
            }
          } else {
            if (index !== children.length - 1) {
              snapshots[snapshots.length - 1][children[index]] = {};
              snapshots.push(snapshots[snapshots.length - 1][children[index]]);
            }
          }
        }

        if (index === children.length - 1) {
          for (var index0 = snapshots.length - 1; index0 >= 0; index0--) {
            if (index0 !== snapshots.length - 1) {
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
    } else {
      Object.assign(currentState, state);
      return currentState;
    }
  };
};exports.createEntry = createEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUVudHJ5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUVudHJ5Iiwic3RhdGUiLCJwYXlsb2FkIiwicGF5bG9hZEluaGVyaXRlZCIsImN1cnJlbnRTdGF0ZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInVwZGF0ZWRTdGF0ZSIsIm5hbWUiLCJ2YWx1ZSIsImNoaWxkIiwibmFtZUZpZWxkIiwiY2hpbGRyZW4iLCJ0ZXN0QXJyYXkiLCJBcnJheSIsImZyb20iLCJzbmFwc2hvdHMiLCJsZW5ndGgiLCJwb3AiLCJjb25zb2xlIiwiZXJyb3IiLCJ3YXJuIiwiT2JqZWN0IiwiYXNzaWduIiwiaGFzT3duUHJvcGVydHkiLCJpbmRleCIsInB1c2giLCJpbmRleDAiXSwibWFwcGluZ3MiOiI4UUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVRLElBQU1BLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLEtBQUQsRUFBUUMsT0FBUixFQUFvQjs7QUFFNUM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUksU0FBTyxZQUFzQyxLQUE1QkMsZ0JBQTRCLHVFQUFURCxPQUFTO0FBQ3pDLFFBQUlFLFlBQVksR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsU0FBTCxDQUFlTixLQUFmLENBQVgsQ0FBbkI7QUFDQSxRQUFJTyxZQUFZLEdBQUcsSUFBbkI7QUFDQSxRQUFNQyxJQUFOLEdBQTZCTixnQkFBN0IsQ0FBTU0sSUFBTixDQUFZQyxLQUFaLEdBQTZCUCxnQkFBN0IsQ0FBWU8sS0FBWixDQUFtQkMsS0FBbkIsR0FBNkJSLGdCQUE3QixDQUFtQlEsS0FBbkI7QUFDQSxRQUFJQyxTQUFTLEdBQUdILElBQWhCO0FBQ0EsUUFBSUksUUFBUSxHQUFHRixLQUFmO0FBQ0EsUUFBSUcsU0FBUyxHQUFHYixLQUFLLEdBQUdjLEtB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LFlBQUlBLEtBQUssS0FBTWIsUUFBUSxDQUFDSyxNQUFULEdBQWtCLENBQWpDLEVBQXFDO0FBQ2pDLGVBQUssSUFBSVUsTUFBTSxHQUFHWCxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBckMsRUFBd0NVLE1BQU0sSUFBSSxDQUFsRCxFQUFxREEsTUFBTSxFQUEzRCxFQUErRDtBQUMzRCxnQkFBSUEsTUFBTSxLQUFLWCxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBbEMsRUFBcUM7QUFDakNELGNBQUFBLFNBQVMsQ0FBQ1csTUFBRCxDQUFULENBQWtCZixRQUFRLENBQUNlLE1BQU0sR0FBRyxDQUFWLENBQTFCLElBQTBDWCxTQUFTLENBQUNXLE1BQU0sR0FBRyxDQUFWLENBQW5EO0FBQ0g7O0FBRUQsZ0JBQUlBLE1BQU0sS0FBSyxDQUFmLEVBQWtCO0FBQ2RMLGNBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjcEIsWUFBZCxFQUE0QkgsS0FBNUI7QUFDQUcsY0FBQUEsWUFBWSxDQUFDUSxTQUFELENBQVosQ0FBd0JDLFFBQVEsQ0FBQ2UsTUFBRCxDQUFoQyxJQUE0Q1gsU0FBUyxDQUFDVyxNQUFELENBQXJEO0FBQ0FwQixjQUFBQSxZQUFZLEdBQUdKLFlBQWY7QUFDQSxxQkFBT0ksWUFBUDtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0osS0F6RU0sTUF5RUE7QUFDSGUsTUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNwQixZQUFkLEVBQTRCSCxLQUE1QjtBQUNBLGFBQU9HLFlBQVA7QUFDSDtBQUNKLEdBbEpEO0FBbUpILENBN0pPLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGF1dGhvciBQZXRlciBDb2xsaW5zIC0gaHR0cHM6Ly9naXRodWIuY29tL29uZXBldGVyY29sbGluc1xyXG4gKiBcclxuICogQGZpbGVvdmVydmlldyA6IEV4cG9ydHMgYSBmdW5jdGlvbjogY3JlYXRlRW50cnkoc3RhdGUsIHBheWxvYWQpXHJcbiAqIFxyXG4gKiBAZnVuY3Rpb24gY3JlYXRlRW50cnkgOiBGb3IgY3JlYXRpbmcgbmV3IFtrZXk6IHZhbHVlXSBwYWlycyBpbiBhcHAgc3RhdGUuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gZHluYW1pY2FsbHkgY3JlYXRlIGluZmluaXRlbHkgbmVzdGVkIFtrZXk6IHZhbHVlXSBwYWlycy5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgSXQgdGFrZXMgY3VycmVudCBzdGF0ZSBhbmQgYSBwYXlsb2FkIG9iamVjdCBhcyBhcmd1bWVudHMuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIEl0IHJldHVybnMgYSBsb2NhbCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHVwZGF0ZWQgc3RhdGUuXHJcbiAqIFxyXG4gKiBAcGFyYW0gICB7T2JqZWN0fSAgIHN0YXRlIFRoZSBvYmplY3QgdG8gYmUgbXV0YXRlZC5cclxuICogQHBhcmFtICAge09iamVjdH0gICBwYXlsb2FkIHsgbmFtZTogU3RyaW5nLCB2YWx1ZTogYW55LCBjaGlsZDogQXJyYXkgfVxyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgIHBheWxvYWQubmFtZSBOYW1lIG9mIHRoZSBrZXkgdG8gYmUgY3JlYXRlZCBvciBzZWNvbmQgb2JqZWN0IGluIHRoZSBuZXN0aW5nIGhpZXJpYXJjaHkuXHJcbiAqIEBwYXJhbSAgIHthbnl9ICAgICAgcGF5bG9hZC52YWx1ZSBWYWx1ZSB0byBiZSBhc3NpZ25lZCB0byBuZXdseSBjcmVhdGVkIGtleS5cclxuICogQHBhcmFtICAge0FycmF5fSAgICBwYXlsb2FkLmNoaWxkIEFycmF5IG9mIHN0cmluZ3MgcG9pbnRpbmcgdG8gdGhlIG5lc3RlZCBrZXkgdG8gYmUgY3JlYXRlZC5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufSAobG9jYWwgZnVuY3Rpb24pIChwYXlsb2FkKSA9PiA6IFRoZSBuZXcgYXBwIHN0YXRlLCBvciBjdXJyZW50IHN0YXRlIGlmIGl0IHdhcyBub3QgYWx0ZXJlZC5cclxuICovXHJcblxyXG4gZXhwb3J0IGNvbnN0IGNyZWF0ZUVudHJ5ID0gKHN0YXRlLCBwYXlsb2FkKSA9PiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gICB7T2JqZWN0fSBwYXlsb2FkIHsgbmFtZTogU3RyaW5nLCB2YWx1ZTogYW55LCBjaGlsZDogQXJyYXkgfVxyXG4gICAgICogQHBhcmFtICAge1N0cmluZ30gcGF5bG9hZC5uYW1lIE5hbWUgb2YgdGhlIGtleSB0byBiZSBjcmVhdGVkIG9yIHNlY29uZCBvYmplY3QgaW4gdGhlIG5lc3RpbmcgaGllcmlhcmNoeS5cclxuICAgICAqIEBwYXJhbSAgIHthbnl9ICAgIHBheWxvYWQudmFsdWUgVmFsdWUgdG8gYmUgYXNzaWduZWQgdG8gbmV3bHkgY3JlYXRlZCBrZXkuXHJcbiAgICAgKiBAcGFyYW0gICB7QXJyYXl9ICBwYXlsb2FkLmNoaWxkIEFycmF5IG9mIHN0cmluZ3MgcG9pbnRpbmcgdG8gdGhlIG5lc3RlZCBrZXkgdG8gYmUgY3JlYXRlZC5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHsgdXBkYXRlZFN0YXRlIH0gOiBUaGUgbmV3IGFwcCBzdGF0ZSwgb3IgY3VycmVudCBzdGF0ZSBpZiBpdCB3YXMgbm90IGFsdGVyZWQuXHJcbiAgICAgKi9cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBheWxvYWRJbmhlcml0ZWQgPSBwYXlsb2FkKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcclxuICAgICAgICBsZXQgdXBkYXRlZFN0YXRlID0gbnVsbDtcclxuICAgICAgICBsZXQgeyBuYW1lLCB2YWx1ZSwgY2hpbGQgfSA9IHBheWxvYWRJbmhlcml0ZWQ7XHJcbiAgICAgICAgbGV0IG5hbWVGaWVsZCA9IG5hbWU7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gY2hpbGQ7XHJcbiAgICAgICAgbGV0IHRlc3RBcnJheSA9IHN0YXRlID8gQXJyYXkuZnJvbShzdGF0ZSkgOiBudWxsXHJcbiAgICAgICAgbGV0IHNuYXBzaG90cyA9IFtdO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ29iamVjdCcgfHwgKHN0YXRlW3N0YXRlLmxlbmd0aCAtIDFdID09PSB0ZXN0QXJyYXkucG9wKCkgJiYgdHlwZW9mIHRlc3RBcnJheS5wb3AoKSAhPT0gXCJ1bmRlZmluZWRcIikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW3N0YXRlXSBtdXN0IGJlIGEgdmFsaWQgamF2YXNjcmlwdCBvYmplY3RgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIC8qIGNoZWNrIGlmICdjaGlsZHJlbicgaXMgYW4gZW1wdHkgYXJyYXkgYW5kIG51bGxpZnkgaXQgKi8ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIHR5cGVvZiBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCFjaGlsZHJlbiAmJiBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSkgLyogd2FybiBpZiBjdXJyZW50IHN0YXRlIGhhcyBrZXkgdGhhdCBjb3JyZXNwb25kcyB3aXRoIG5ldyBrZXkqLyB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJyR7bmFtZUZpZWxkfScga2V5IGFscmVhZHkgZXhpc3RzIGluIHN0YXRlLmApO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gY3VycmVudFN0YXRlW25hbWVGaWVsZF0pIC8qIHdhcm4gaWYgY3VycmVudCBzdGF0ZSB2YWx1ZSBjb3JyZXNwb25kcyB3aXRoIG5ldyB2YWx1ZSovIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignU3RhdGUgaXMgYWxyZWFkeSB1cCB0byBkYXRlLicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gdHlwZW9mIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdKSAvKiBwcmV2ZW50IHVuYXV0aG9yaXplZCB0eXBlIGNoYW5nZXMgKi8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcXG4gU3RhdGUgdXBkYXRlIGZhaWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXFxuIFlvdSBhcmUgYXR0ZW1wdGluZyB0byBwZXJmb3JtIHVuYXV0aG9yaXplZCB0eXBlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBQYXNzICdmYWxzZScgdG8gdGhlIChzdGF0aWNUeXBlKSBwYXJhbWV0ZXIgb2YgdGhlICd1cGRhdGVWYWx1ZSgpJyBmdW5jdGlvbiB0byBhbGxvdyB0eXBlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIC8qIHVwZGF0ZSB2YWx1ZSBhbmQgcmV0dXJuIHN0YXRlIGlmIHN0YXRlIGhhcyBjb3JyZXNwb25kaW5nIGtleSB3aXRoIGRpZmZlcmVudCB2YWx1ZSAqLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3RhdGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRTdGF0ZSA9IGN1cnJlbnRTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghY2hpbGRyZW4gJiYgIWN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUuaGFzT3duUHJvcGVydHkobmFtZUZpZWxkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAnJHtuYW1lRmllbGR9JyBrZXkgYWxyZWFkeSBleGlzdHMgaW4gc3RhdGUuYCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gY3VycmVudFN0YXRlW25hbWVGaWVsZF0pIC8qIHdhcm4gaWYgY3VycmVudCBzdGF0ZSB2YWx1ZSBjb3JyZXNwb25kcyB3aXRoIG5ldyB2YWx1ZSovIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1N0YXRlIGlzIGFscmVhZHkgdXAgdG8gZGF0ZS4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IHR5cGVvZiBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSkgLyogcHJldmVudCB1bmF1dGhvcml6ZWQgdHlwZSBjaGFuZ2VzICovIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4gU3RhdGUgdXBkYXRlIGZhaWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gcGVyZm9ybSB1bmF1dGhvcml6ZWQgdHlwZSBjaGFuZ2VzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIFBhc3MgJ2ZhbHNlJyB0byB0aGUgKHN0YXRpY1R5cGUpIHBhcmFtZXRlciBvZiB0aGUgJ3VwZGF0ZVZhbHVlKCknIGZ1bmN0aW9uIHRvIGFsbG93IHR5cGUgY2hhbmdlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgLyogdXBkYXRlIHZhbHVlIGFuZCByZXR1cm4gc3RhdGUgaWYgc3RhdGUgaGFzIGNvcnJlc3BvbmRpbmcga2V5IHdpdGggZGlmZmVyZW50IHZhbHVlICovIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3RhdGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFN0YXRlID0gY3VycmVudFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlZFN0YXRlID0gY3VycmVudFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRTdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4ubGVuZ3RoICYmIHZhbHVlICE9PSBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNuYXBzaG90cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IChjaGlsZHJlbi5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSAhPT0gdHlwZW9mIHZhbHVlKSAvKiBwcmV2ZW50IHVuYXV0aG9yaXplZCB0eXBlIGNoYW5nZXMgKi8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiBTdGF0ZSB1cGRhdGUgZmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuIFlvdSBhcmUgYXR0ZW1wdGluZyB0byBwZXJmb3JtIHVuYXV0aG9yaXplZCB0eXBlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4gUGFzcyAnZmFsc2UnIHRvIHRoZSAoc3RhdGljVHlwZSkgcGFyYW1ldGVyIG9mIHRoZSAndXBkYXRlVmFsdWUoKScgZnVuY3Rpb24gdG8gYWxsb3cgdHlwZSBjaGFuZ2VzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZVtuYW1lRmllbGRdW2NoaWxkcmVuW2luZGV4XV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzLnB1c2goY3VycmVudFN0YXRlW25hbWVGaWVsZF1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChjdXJyZW50U3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleF1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAoY2hpbGRyZW4ubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXVtjaGlsZHJlbltpbmRleF1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKHNuYXBzaG90c1tzbmFwc2hvdHMubGVuZ3RoIC0gMV1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdW2NoaWxkcmVuW2luZGV4XV0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAoY2hpbGRyZW4ubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90cy5wdXNoKHNuYXBzaG90c1tzbmFwc2hvdHMubGVuZ3RoIC0gMV1bY2hpbGRyZW5baW5kZXhdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IChjaGlsZHJlbi5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXVtjaGlsZHJlbltpbmRleF1dID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmFwc2hvdHMucHVzaChzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdW2NoaWxkcmVuW2luZGV4XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IChjaGlsZHJlbi5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4MCA9IHNuYXBzaG90cy5sZW5ndGggLSAxOyBpbmRleDAgPj0gMDsgaW5kZXgwLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4MCAhPT0gc25hcHNob3RzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBzaG90c1tpbmRleDBdW2NoaWxkcmVuW2luZGV4MCArIDFdXSA9IHNuYXBzaG90c1tpbmRleDAgKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleDAgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGVbbmFtZUZpZWxkXVtjaGlsZHJlbltpbmRleDBdXSA9IHNuYXBzaG90c1tpbmRleDBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFN0YXRlID0gY3VycmVudFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRTdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN0YXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4iXX0= 
