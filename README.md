# app-state-utils
---
App state utils is a set of utilities for state management in web apps, it integrates well with front-end state management libraries like redux and vuex, and can be used on server side as well. It defines methods for mutating keys and values in a conventional Javascript object, and it makes manipulating deeply nested data much easier.

&nbsp;

# Overview

##### - [Getting started](#getting-started)
##### - [Usage](#usage)
- ##### - [with React, Redux and React-Redux](#with-react-and-redux)
- ##### - [with React, Redux, React-Redux and Redux-Thunk](#with-react-redux-react-redux-and-redux-thunk)
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

/* Production mode with no console statements */
<script src="unpkg.com/app-state-utils/dist"></script>
```
&nbsp;

#### usage
This whole documentation is intended to show you how to quickly app-state-utils into your project, it does not strictly define the tools
you must use in your project.
Once you get the setup approach, you can configure app-state-utils to suit your specific use case.

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
---
**Basic to intermediate knowledge of React and Redux is required**.
\
You can visit the codesandbox demo below each example to try out custom configurations.
\
Create a file 'actions.js' to contain actions which can be called from within your app to mutate state.
Your 'actions.js' file should look like this;

```javascript
/*** Mutation Helper Actions ***/

export const createEntry = (payload) => {
  const actionPayload = payload || {};

  return {
    type: "CREATE_ENTRY",
    payload: actionPayload
  };
};

export const updateValue = (payload, staticType) => {
  const actionPayload = payload || {};
  const maintainDataType = staticType ? true : false;

  return {
    type: "UPDATE_VALUE",
    payload: actionPayload,
    staticType: maintainDataType
  };
};

export const clearValue = (payload) => {
  const actionPayload = payload || {};

  return {
    type: "CLEAR_VALUE",
    payload: actionPayload
  };
};

export const deleteEntry = (payload) => {
  const actionPayload = payload || {};

  return {
    type: "DELETE_ENTRY",
    payload: actionPayload
  };
};

export const logState = (payload) => {
  const actionPayload = payload || {};

  return {
    type: "LOG_STATE",
    payload: actionPayload
  };
};

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
    message: ''
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

It is also designed to eliminate the stress involved with managing deeply nested data.

**See some example use cases;**

```javascript
/** Creating new entry in app state **/

import { useState } from "react";
import { connect } from "react-redux";
import { createEntry, logState } from "./actions.js";

const App = (props) => {
  const [KEY, setKey] = useState("");
  const [VALUE, setValue] = useState("");

  return (
   <form onSubmit={(event) => {event.preventDefault()}}>
      <input type="text" name="key" placeholder="Enter Key" onChange={(event) => {setKey(event.target.value)}} value={KEY} />

      <input type="text" name="value" placeholder="Enter Value" onChange={(event) => {setValue(event.target.value)}} value={VALUE} />

      <button onClick={(event) => {props.createEntry({ name: KEY, child: [], value: VALUE })}}>
        Create Entry
      </button>

      <button onClick={(event) => {props.logState()}}>
        Log State To Console
      </button>
    </form>
  );
};

const AppMapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  cart: state.cart,
  darkTheme: state.darkTheme,
  message: state.message
});

const AppMapDispatchToProps = (dispatch) => ({
  createEntry: (payload) => {
    dispatch(createEntry(payload));
  },
  logState: () => {
    dispatch(logState());
  }
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(App);

```

[View demo on codesandbox](https://codesandbox.io/s/sharp-zeh-7k14k)

&nbsp;

```javascript
/** Updating existing data in app state **/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateValue, logState } from './actions.js';

const App = (props) => {
  const [NEWVALUE, setValue] = useState("");

  return (
   <form onSubmit={(event) => {event.preventDefault()}}>
      <input type="text" name="value" placeholder="Enter New Value" onChange={(event) => {setValue(event.target.value)}} value={VALUE} />

      <button onClick={(event) => {props.updateValue({ name: 'message', child: [], value: NEWVALUE })}}>
        Update Message
      </button>

      <p>
          <span>{props.message || 'type a message in the input box'}</span>
      </p>

      <button onClick={(event) => {props.logState()}}>
        Log State To Console
      </button>
    </form>
  );
};

const AppMapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  cart: state.cart,
  darkTheme: state.darkTheme,
  message: state.message
});

const AppMapDispatchToProps = (dispatch) => ({
  updateValue: (payload) => {
    dispatch(updateValue(payload));
  },
  logState: () => {
    dispatch(logState());
  }
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(App);

```

[View demo on codesandbox]()

&nbsp;

```javascript
/** Clearing value in app state **/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clearValue, logState } from './actions.js';

const App = (props) => {
  const [NEWVALUE, setValue] = useState("");

  return (
   <form onSubmit={(event) => {event.preventDefault()}}>
      <button onClick={(event) => {props.logState()}}>
        Log State To Console
      </button>
    </form>
  );
};

const AppMapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  cart: state.cart,
  darkTheme: state.darkTheme,
  message: state.message
});

const AppMapDispatchToProps = (dispatch) => ({
  clearValue: (payload) => {
    dispatch(clearValue(payload));
  },
  logState: () => {
    dispatch(logState());
  }
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(App);
```

[View demo on codesandbox]()

&nbsp;

```javascript
/** Deleting entry from app state **/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteEntry, logState } from './actions.js';

const App = (props) => {
  const [NEWVALUE, setValue] = useState("");

  return (
   <form onSubmit={(event) => {event.preventDefault()}}>
      <button onClick={(event) => {props.logState()}}>
        Log State To Console
      </button>
    </form>
  );
};

const AppMapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  cart: state.cart,
  darkTheme: state.darkTheme,
  message: state.message
});

const AppMapDispatchToProps = (dispatch) => ({
  deleteEntry: (payload) => {
    dispatch(deleteEntry(payload));
  },
  logState: () => {
    dispatch(logState());
  }
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(App);
```

[View demo on codesandbox]()

&nbsp;

```javascript
/** Log current app state **/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logState } from './actions.js';

const App = (props) => {
  return (
   <form onSubmit={(event) => {event.preventDefault()}}>
      <button onClick={(event) => {props.logState()}}>
        Log State To Console
      </button>
    </form>
  );
};

const AppMapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  cart: state.cart,
  darkTheme: state.darkTheme,
  message: state.message
});

const AppMapDispatchToProps = (dispatch) => ({
  logState: () => {
    dispatch(logState());
  }
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(App);
```

[View demo on codesandbox]()

**Notice:** Logstate works only in development mode and not in production. Console statements are disabled in production mode.


&nbsp;
&nbsp;

#### with React Redux React-Redux and Redux-Thunk
---
Using app-state-utils within your components is similar to the **React and Redux** example above, so to avoid repetition, we will only
show the aspects of the setup that differ from the example above.
\
You can visit the codesandbox demo below each example to try out custom configurations.


&nbsp;
&nbsp;

#### with Vue and Vuex
---
create a vuex store reference and import MutationHelper from 'app-state-utils'
\
You can visit the codesandbox demo below each example to try out custom configurations.


&nbsp;
&nbsp;

#### with Node JS
---
const MutationHelper = require('app-state-utils')
\
You can visit the codesandbox demo below each example to try out custom configurations.


&nbsp;
&nbsp;

#### in HTML script tag
---
Import using a script tag;
```html
/* Development mode with console warnings enabled */
<script src="unpkg.com/app-state-utils"></script>

/* Production mode with no console statements */
<script src="unpkg.com/app-state-utils/dist"></script>
```

You can manipulate object key/value properties using the methods available
\
You can visit the codesandbox demo below each example to try out custom configurations.


&nbsp;
&nbsp;

## more
---
found any bugs or need help using the package?
report: onepetercollins@gmail.com
