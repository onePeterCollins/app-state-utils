# app-state-utils
---
App state utils is a set of utilities for state management in web apps, it integrates well with front-end state management libraries like redux and vuex, and can be used on server side as well. It defines methods for mutating keys and values in a conventional Javascript object, and it makes manipulating deeply nested data much easier.

&nbsp;

# Overview

##### - [Getting started](#getting-started)
##### - [Usage](#usage)
- ##### - [with React and Redux](#with-react-and-redux)
- ##### - [with Vue and Vuex](#with-vue-and-vuex)
- ##### - [with Node JS](#with-node-js)
- ##### - [in HTML script tag](#in-html-script-tag)

&nbsp;
&nbsp;

## Getting Started
---

#### installation

Run the following code to install the latest version from npm.

```sh
npm install app-state-utils
```

To use in HTML script tag

```html
/* Development mode with console warnings enabled */
<script src="unpkg.com/app-state-utils"></script>

/* Production mode with no console warnings */
<script src="unpkg.com/app-state-utils/dist"></script>
```
&nbsp;

#### usage
If you have setup your project using tools like CRA, Webpack, or Vue CLI
You will typically use a state management library within your app.
import the mutation helper in your 'store.js' file thus;

```javascript
import MutationHelper from 'app-state-utils'
```

alternatively, you can import only the functions you need to use within your app thus;

```javascript
import {
    clearValue,
    createEntry,
    deleteEntry,
    logState,
    updateValue
} from 'app-state-utils'
```

&nbsp;

#### with React and Redux
**Basic to intermediate knowledge of React and Redux is required**.
Create a file 'actions.js' to contain actions which can be called from within your app to mutate state.
Your 'actions.js' file should look like this;

```javascript
/*** Mutation Helper Actions ***/

export const createEntry = (payload) => {
    return (dispatch) => {
        const actionPayload = payload || {}

        dispatch ({
            type: "CREATE_ENTRY",
            payload: actionPayload
        })
    }
}

export const updateValue = (payload, staticType) => {
    return (dispatch) => {
        const actionPayload = payload || {}
        const maintainDataType = staticType ? true : false

        dispatch ({
            type: "UPDATE_VALUE",
            payload: actionPayload,
            staticType: maintainDataType
        })
    }
}

export const clearValue = (payload) => {
    return (dispatch) => {
        const actionPayload = payload || {};

        dispatch ({
            type: "CLEAR_VALUE",
            payload: actionPayload
        })
    }
}

export const deleteEntry = (payload) => {
    return (dispatch) => {
        const actionPayload = payload || {};

        dispatch ({
            type: "DELETE_ENTRY",
            payload: actionPayload
        })
    }
}

export const logState = (payload) => {
    return async (dispatch) => {
        const actionPayload = payload || {}

        dispatch ({
            type: "LOG_STATE",
            payload: actionPayload
        })
    }
}

```

&nbsp;

Create another file 'reducer.js' to contain your app state and export a function which returns the updated state.
**import MutationHelper from 'app-state-utils'** and use it as shown below;

```javascript
/*** App Data Reducer ***/

import MutationHelper from 'app-state-utils'

const AppState = {
    user: {},
    products: [],
    cart: [],
    darkTheme: true,
}

export default (state = AppState, action) => {
    const AppData = new MutationHelper(state)
    let updatedState = null

    switch(action.type) {
        case "CREATE_ENTRY":
            updatedState = AppData.createEntry(action.payload)
            break

        case "UPDATE_VALUE":
            updatedState = AppData.updateValue(action.payload, action.staticType)
            break

        case "CLEAR_VALUE":
            updatedState = AppData.clearValue(action.payload)
            break

        case "DELETE_ENTRY":
            updatedState = AppData.deleteEntry(action.payload)
            break
        
        case "LOG_STATE":
            updatedState = AppData.logState(action.payload)
            break

        default:
            return updatedState || state
    }

    return updatedState || state
}

```

&nbsp;

With this setup, you can now use the **MutationHelper functions** within your app and comfortably mutate any part of the app state without needing to create any more actions.

This library is especially useful in large apps where you would otherwise need to write several actions to mutate different parts of your app state.

It is also designed to eliminate the stress involved with mutating deeply nested data.

**See some example use cases;**

```javascript
/** Creating new entry in app state **/
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createEntry, logState } from './actions.js';


const App = function (props) {
    const [KEY, setKey] = useState('')
    const [VALUE, setValue] = useState('')
    
    return (
        <>
            <input type="text" name="key" placeholder="Enter Key" onChange={(event) => {setKey(KEY + event.target.value)}} value={KEY} />
            
            <input type="text" name="value" placeholder="Enter Value" onChange={(event) => {setValue(VALUE + event.target.value)}} value={VALUE} />
            
            <button onClick={(event) => {props.createEntry({name: KEY, child: [], value: VALUE})}} >Create Entry</button>
            
            <button onClick={(event) => {props.logState()}} >Log State To Console</button>
        </>
    )
}

AppMapStateToProps = (state) {
    return {
        user: state.user
        products: state.products
        cart: state.cart
        darkTheme: state.darkTheme
    }
}

AppMapDispatchToProps = (dispatch) {
    return {
        createEntry: (payload) => {
          dispatch(createEntry(payload));
        },
        logState: () => {
          dispatch(logState());
        }
    }
}

export default connect(AppMapStateToProps, AppMapDispatchToProps)(App);


/** Updating existing data in app state **/


/** Clearing value in app state **/


/** deleting entry from in app state **/


/** Log current app state **/


```

[View demo in codesandbox](https://codesandbox.io/s/sharp-zeh-7k14k)


#### with Vue and Vuex
create a vuex store reference and import MutationHelper from 'app-state-utils'

#### with Node JS
const MutationHelper = require('app-state-utils')

#### in HTML script tag
use a script tag
<script src="unpkg.com/app-state-utils"></script>

You can manipulate object key/value properties using the methods available

## more
found any bugs or need help using the package?
report: onepetercollins@gmail.com
