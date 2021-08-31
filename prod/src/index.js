(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["app-state-utils"] = factory();
	else
		root["app-state-utils"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/clearValue.js":
/*!*************************************!*\
  !*** ./src/functions/clearValue.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearValue": () => (/* binding */ clearValue)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");


/**
 * @author Peter Collins - https://github.com/onepetercollins
 * 
 * @fileoverview : Exports a function: clearValue(state, payload)
 * 
 * @function clearValue : For state drilling and surgical deletion of object values.
 *                        This function can be used to dynamically delete infinitely nested object values.
 *                        It takes current state and a payload object as arguments.
 *                        It returns a local function which returns updated state.
 * 
 * @param   {Object}   state The object to be mutated.
 * @param   {Object}   payload { name: String, child: Array }
 * @param   {String}   payload.name Name of the key to be cleared or second object in the nesting hieriarchy.
 * @param   {Array}    payload.child Array of strings pointing to the nested key to be cleared.
 * @returns {Function} (local function) (payload) => : The new app state, or current state if it was not altered.
 */
var clearValue = function clearValue(state, payload) {
  /**
   * @param   {Object} payload { name: String, child: Array }
   * @param   {String} payload.name Name of the key to be created or second object in the nesting hieriarchy.
   * @param   {Array}  payload.child Array of strings pointing to the nested key to be cleared.
   * @returns {Object} { updatedState } : The new app state, or current state if it was not altered.
   */
  return function () {
    var payloadInherited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : payload;
    var currentState = JSON.parse(JSON.stringify(state));
    var updatedState = null;
    var name = payloadInherited.name,
        child = payloadInherited.child;
    var nameField = name;
    var children = child;
    var testArray = state ? Array.from(state) : null;
    var snapshots = [];

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(state) !== 'object' || state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined") {
      console.error("[state] must be a valid javascript object");
      return state;
    }

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(children) === "object")
      /* check if 'children' is an empty array and nullify it */
      {
        if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
          children = null;
        }
      }

    if (!children && currentState.hasOwnProperty(nameField)) {
      Object.assign(currentState, state);

      if (typeof currentState[nameField] === "boolean") {
        if (currentState[nameField]) {
          currentState[nameField] = false;
          updatedState = currentState;
          return updatedState;
        }
      } else if (typeof currentState[nameField] === "number") {
        if (currentState[nameField] !== 0) {
          currentState[nameField] = 0;
          updatedState = currentState;
          return updatedState;
        }
      } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(currentState[nameField]) === "object") {
        if (currentState[nameField]) {
          if (typeof currentState.length === "number" && typeof currentState[currentState.length - 1] !== "undefined") {
            currentState[nameField] = [];
            updatedState = currentState;
            return updatedState;
          } else {
            currentState[nameField] = {};
            updatedState = currentState;
            return updatedState;
          }
        }
      } else if (typeof currentState[nameField] === "string" || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(currentState[nameField]) === "symbol") {
        if (currentState[nameField].length) {
          currentState[nameField] = '';
          updatedState = currentState;
          return updatedState;
        }
      } else {
        currentState[nameField] = '';
        updatedState = currentState;
        return updatedState;
      }
    } else if (!children && !currentState.hasOwnProperty(nameField)) {
      console.error("The referenced property '".concat(nameField, "' does not exist in current state."));
      return state;
    } else if (children.length) {
      for (var index = 0; index < children.length; index++) {
        if (!snapshots.length) {
          if (typeof currentState[nameField][children[index]] !== "undefined") {
            snapshots.push(currentState[nameField][children[index]]);
          } else {
            console.error("The referenced property '".concat(children[index], "' does not exist in current state."));
            return state;
          }
        } else {
          if (typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
            snapshots.push(snapshots[snapshots.length - 1][children[index]]);
          } else {
            console.error("The referenced property '".concat(children[index], "' does not exist in current state."));
            return state;
          }
        }

        if (index === children.length - 1) {
          for (var index0 = snapshots.length - 1; index0 >= 0; index0--) {
            if (index0 === snapshots.length - 1) {
              if (snapshots[snapshots.length - 1] !== null) {
                if (typeof snapshots[snapshots.length - 1] === "boolean") {
                  if (snapshots[snapshots.length - 1]) {
                    snapshots[snapshots.length - 1] = false;
                  }
                } else if (typeof snapshots[snapshots.length - 1] === "number") {
                  if (snapshots[snapshots.length - 1] !== 0) {
                    snapshots[snapshots.length - 1] = 0;
                  }
                } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(snapshots[snapshots.length - 1]) === "object") {
                  if (snapshots[snapshots.length - 1]) {
                    if (typeof snapshots[snapshots.length - 1].length === "number" && typeof (snapshots[snapshots.length - 1].length - 1) !== "undefined") {
                      snapshots[snapshots.length - 1] = [];
                    } else {
                      snapshots[snapshots.length - 1] = {};
                    }
                  }
                } else if (typeof snapshots[snapshots.length - 1] === "string") {
                  if (snapshots[snapshots.length - 1].length) {
                    snapshots[snapshots.length - 1] = '';
                  }
                } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(snapshots[snapshots.length - 1]) === "symbol") {
                  snapshots[snapshots.length - 1] = '';
                } else {
                  snapshots[snapshots.length - 1] = '';
                }
              }
            } else {
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
    }
  };
};

/***/ }),

/***/ "./src/functions/createEntry.js":
/*!**************************************!*\
  !*** ./src/functions/createEntry.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEntry": () => (/* binding */ createEntry)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");


/**
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
  return function () {
    var payloadInherited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : payload;
    var currentState = JSON.parse(JSON.stringify(state));
    var updatedState = null;
    var name = payloadInherited.name,
        value = payloadInherited.value,
        child = payloadInherited.child;
    var nameField = name;
    var children = child;
    var testArray = state ? Array.from(state) : null;
    var snapshots = [];

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(state) !== 'object' || state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined") {
      console.error("[state] must be a valid javascript object");
      return state;
    }

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(children) === "object")
      /* check if 'children' is an empty array and nullify it */
      {
        if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
          children = null;
        }
      }

    if (!children && currentState[nameField])
      /* warn if current state has key that corresponds with new key*/
      {
        console.warn("'".concat(nameField, "' key already exists in state."));

        if (value === currentState[nameField])
          /* warn if current state value corresponds with new value*/
          {
            console.warn('State is already up to date.');
            return state;
          } else {
          if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(value) !== (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(currentState[nameField]))
            /* prevent unauthorized type changes */
            {
              console.error("\n                        \n State update failed,\n                        \n You are attempting to perform unauthorized type changes.\n                        \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                    ");
              return state;
            } else
            /* update value and return state if state has corresponding key with different value */
            {
              Object.assign(currentState, state);
              currentState[nameField] = value;
              updatedState = currentState;
              return updatedState;
            }
        }
      } else if (!children && !currentState[nameField]) {
      if (currentState.hasOwnProperty(nameField)) {
        console.warn("'".concat(nameField, "' key already exists in state."));

        if (value === currentState[nameField])
          /* warn if current state value corresponds with new value*/
          {
            console.warn('State is already up to date.');
            return state;
          } else {
          if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(value) !== (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(currentState[nameField]))
            /* prevent unauthorized type changes */
            {
              console.error("\n                            \n State update failed,\n                            \n You are attempting to perform unauthorized type changes.\n                            \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                        ");
              return state;
            } else
            /* update value and return state if state has corresponding key with different value */
            {
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
                if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(currentState[nameField][children[index]]) !== (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(value))
                  /* prevent unauthorized type changes */
                  {
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
};

/***/ }),

/***/ "./src/functions/deleteEntry.js":
/*!**************************************!*\
  !*** ./src/functions/deleteEntry.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteEntry": () => (/* binding */ deleteEntry)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");


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
var deleteEntry = function deleteEntry(state, payload) {
  /**
   * @param   {Object} payload { name: String, child: Array }
   * @param   {String} payload.name Name of the [key: value] pair to be deleted or second object in the nesting hieriarchy.
   * @param   {Array}  payload.child Array of strings pointing to the nested [key: value] pair to be deleted.
   * @returns {Object} { updatedState } : The new app state, or current state if it was not altered.
   */
  return function () {
    var payloadInherited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : payload;
    var currentState = JSON.parse(JSON.stringify(state));
    var updatedState = null;
    var name = payloadInherited.name,
        child = payloadInherited.child;
    var nameField = name;
    var children = child;
    var testArray = state ? Array.from(state) : null;
    var snapshots = [];

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(state) !== 'object' || state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined") {
      console.error("[state] must be a valid javascript object");
      return state;
    }

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(children) === "object")
      /* check if 'children' is an empty array and nullify it */
      {
        if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
          children = null;
        }
      }

    if (!children && !currentState.hasOwnProperty(nameField)) {
      console.error("The referenced property '".concat(nameField, "' does not exist in current state."));
      return state;
    }

    if (!children && currentState.hasOwnProperty(nameField)) {
      updatedState = {};

      if (Object.keys(currentState).length > 1) {
        for (var index = 0; index < Object.keys(currentState).length; index++) {
          if (Object.keys(currentState)[index] !== nameField) {
            updatedState[Object.keys(currentState)[index]] = Object.values(currentState)[index];
          }
        }

        return updatedState;
      } else {
        return updatedState;
      }
    } else if (children.length && currentState.hasOwnProperty(nameField)) {
      for (var _index = 0; _index < children.length; _index++) {
        if (!snapshots.length) {
          if (_index !== children.length - 1) {
            snapshots.push(currentState[nameField][children[_index]]);
          } else {
            var mutatedObject = {};

            for (var index0 = 0; index0 < Object.keys(currentState[nameField]).length; index0++) {
              if (Object.keys(currentState[nameField])[index0] !== children[children.length - 1]) {
                mutatedObject[Object.keys(currentState[nameField])[index0]] = currentState[nameField][Object.keys(currentState[nameField])[index0]];
              }

              if (index0 === Object.keys(currentState[nameField]).length - 1) {
                Object.assign(currentState, state);
                currentState[nameField] = mutatedObject;
                updatedState = currentState;
                return updatedState;
              }
            }
          }
        } else {
          if (_index === children.length - 1) {
            var _mutatedObject = {};

            for (var _index2 = 0; _index2 < Object.keys(snapshots[snapshots.length - 1]).length; _index2++) {
              if (Object.keys(snapshots[snapshots.length - 1])[_index2] !== children[children.length - 1]) {
                if (typeof snapshots[snapshots.length - 1][children[_index]] !== "undefined") {
                  _mutatedObject[Object.keys(snapshots[snapshots.length - 1])[_index2]] = snapshots[snapshots.length - 1][Object.keys(snapshots[snapshots.length - 1])[_index2]];
                } else if (typeof snapshots[snapshots.length - 1][children[_index]] === "undefined") {
                  console.log("The referenced property '".concat(children[_index], "' does not exist in current state."));
                  return state;
                }
              }

              if (_index2 === Object.keys(snapshots[snapshots.length - 1]).length - 1) {
                snapshots[snapshots.length - 1] = _mutatedObject;
              }
            }

            for (var _index3 = snapshots.length - 1; _index3 >= 0; _index3--) {
              if (_index3 < snapshots.length - 1) {
                snapshots[_index3][children[_index3 + 1]] = snapshots[_index3 + 1];
              }

              if (_index3 === 0) {
                Object.assign(currentState, state);
                currentState[nameField][children[_index3]] = snapshots[_index3];
                updatedState = currentState;
                return updatedState;
              }
            }
          } else {
            if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(snapshots[snapshots.length - 1][children[_index]]) === "object" && typeof snapshots[snapshots.length - 1][children[_index]] !== "undefined") {
              snapshots.push(snapshots[snapshots.length - 1][children[_index]]);
            } else if (typeof snapshots[snapshots.length - 1][children[_index]] === "undefined") {
              console.log("The referenced property '".concat(children[_index], "' does not exist in current state."));
              return state;
            }
          }
        }
      }
    } else {
      console.log("The referenced property '".concat(nameField, "' does not exist in current state."));
      return state;
    }
  };
};

/***/ }),

/***/ "./src/functions/logState.js":
/*!***********************************!*\
  !*** ./src/functions/logState.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logState": () => (/* binding */ logState)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");


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
var logState = function logState(state, payload) {
  /**
   * @param   {Object} payload { name: String, child: Array }
   * @param   {String} payload.name Name of the key to log or second object in the nesting hieriarchy.
   * @param   {Array}  payload.child Array of strings pointing to the nested value to log.
   * @returns {Object} { state } : Current app state, it does not alter the state.
   */
  return function () {
    var payloadInherited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : payload || {
      name: null,
      child: []
    };
    var currentState = JSON.parse(JSON.stringify(state));
    var name = payloadInherited.name,
        child = payloadInherited.child;
    var nameField = name;
    var children = child;
    var testArray = state ? Array.from(state) : null;
    var snapshots = [];
    var date = new Date();
    var pathString = "state.".concat(nameField);

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(state) !== 'object' || state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined") {
      console.error("[state] must be a valid javascript object");
      return state;
    }

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(children) === "object")
      /* check if 'children' is an empty array and nullify it */
      {
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
      } else if (!children && currentState.hasOwnProperty(nameField))
        /* log state to console */
        {
          console.log("\n                    \n app state @ ".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "\n                    \n ").concat(pathString, " :\n                "));
          console.log(state[nameField]);
          return state;
        } else if (children.length) {
        for (var index = 0; index < children.length; index++) {
          if (!snapshots.length) {
            pathString += ".".concat(children[index]);

            if (index === children.length - 1) {
              console.log("\n                                \n app state @ ".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "\n                                \n ").concat(pathString, " :\n                            "));
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
              console.log("\n                                \n app state @ ".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "\n                                \n ").concat(pathString, " :\n                            "));
              console.log(snapshots[snapshots.length - 1]);
            }
          }
        }

        return state;
      }
    }
  };
};

/***/ }),

/***/ "./src/functions/updateValue.js":
/*!**************************************!*\
  !*** ./src/functions/updateValue.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateValue": () => (/* binding */ updateValue)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");


/**
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
var updateValue = function updateValue(state, payload) {
  var staticType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  /**
   * @param   {Object}  payload { name: String, newValue: any, child: Array }
   * @param   {String}  payload.name Name of the key to be mutated or second object in the nesting hieriarchy.
   * @param   {any}     payload.newValue New value to be inserted.
   * @param   {Array}   payload.child Array of strings pointing to the nested key to be mutated.
   * @param   {Boolean} staticType Pass 'false' to turn off console error when altering data types.
   * @returns {Object}  { updatedState } : The new app state, or current state if it was not altered.
   */
  return function () {
    var payloadInherited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : payload;
    var staticTypeInherited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : staticType;
    var currentState = JSON.parse(JSON.stringify(state));
    var updatedState = null;
    var name = payloadInherited.name,
        newValue = payloadInherited.newValue,
        child = payloadInherited.child;
    var nameField = name;
    var children = child;
    var testArray = state ? Array.from(state) : null;
    var snapshots = [];
    var staticDataType = staticTypeInherited ? true : false;

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(state) !== 'object' || state[state.length - 1] === testArray.pop() && typeof testArray.pop() !== "undefined") {
      console.error("[state] must be a valid javascript object");
      return state;
    }

    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(children) === "object")
      /* check if 'children' is an empty array and nullify it */
      {
        if (children.length === 0 && typeof children[children.length - 1] === "undefined") {
          children = null;
        }
      }

    if (!children && !currentState.hasOwnProperty(nameField)) {
      console.error("The referenced property '".concat(nameField, "' does not exist in current state."));
      return state;
    }

    if (!children && newValue === currentState[nameField])
      /* warn if current state value corresponds with new value*/
      {
        console.warn('State is already up to date.');
        return state;
      } else if (!children && newValue !== currentState[nameField]) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(newValue) !== (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(currentState[nameField]) && staticDataType)
        /* prevent unauthorized type changes */
        {
          console.error("\n                    \n State update failed,\n                    \n You are attempting to perform unauthorized type changes.\n                    \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                ");
          return state;
        } else
        /* update and return state */
        {
          Object.assign(currentState, state);
          currentState[nameField] = newValue;
          updatedState = currentState;
          return updatedState;
        }
    } else if (children.length && newValue !== currentState[nameField]) {
      for (var index = 0; index < children.length; index++) {
        if (!snapshots.length) {
          if (typeof currentState[nameField][children[index]] !== "undefined") {
            snapshots.push(currentState[nameField][children[index]]);
          } else {
            console.error("The referenced property '".concat(nameField, "' does not exist in current state."));
            return state;
          }
        } else {
          if (typeof snapshots[snapshots.length - 1][children[index]] !== "undefined") {
            snapshots.push(snapshots[snapshots.length - 1][children[index]]);
          } else {
            console.error("The referenced property '".concat(nameField, "' does not exist in current state."));
            return state;
          }
        }

        if (index === children.length - 1) {
          if (newValue === snapshots[snapshots.length - 1])
            /* warn if current state value corresponds with new value*/
            {
              console.warn('State is already up to date.');
              return state;
            } else {
            if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(newValue) !== (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(snapshots[snapshots.length - 1]) && staticDataType)
              /* prevent unauthorized type changes */
              {
                console.error("\n                                State update failed,\n                                \n You are attempting to perform unauthorized type changes.\n                                \n Pass 'false' to the (staticType) parameter of the 'updateValue()' function to allow type changes.\n                            ");
                return state;
              } else
              /* update and return state */
              {
                for (var index0 = snapshots.length - 1; index0 >= 0; index0--) {
                  if (index0 === snapshots.length - 1) {
                    snapshots[index0] = newValue;
                  } else {
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
        }
      }
    } else {
      Object.assign(currentState, state);
      return currentState;
    }
  };
};

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _functions_clearValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/clearValue */ "./src/functions/clearValue.js");
/* harmony import */ var _functions_createEntry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/createEntry */ "./src/functions/createEntry.js");
/* harmony import */ var _functions_deleteEntry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/deleteEntry */ "./src/functions/deleteEntry.js");
/* harmony import */ var _functions_logState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions/logState */ "./src/functions/logState.js");
/* harmony import */ var _functions_updateValue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functions/updateValue */ "./src/functions/updateValue.js");
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

var MutationHelper = function MutationHelper(state) {
  this.createEntry = (0,_functions_createEntry__WEBPACK_IMPORTED_MODULE_1__.createEntry)(state);
  this.updateValue = (0,_functions_updateValue__WEBPACK_IMPORTED_MODULE_4__.updateValue)(state);
  this.clearValue = (0,_functions_clearValue__WEBPACK_IMPORTED_MODULE_0__.clearValue)(state);
  this.deleteEntry = (0,_functions_deleteEntry__WEBPACK_IMPORTED_MODULE_2__.deleteEntry)(state);
  this.logState = (0,_functions_logState__WEBPACK_IMPORTED_MODULE_3__.logState)(state);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MutationHelper);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});