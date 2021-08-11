# app-state-utils
A set of utilities for state management in web apps, integrates well with front-end state management libraries like redux and vuex, and can be used on server side as well. It defines methods for mutating keys and values in a conventional Javascript object, and it makes manipulating deeply nested data much easier.

# installation
npm i app-state-utils

# usage
import MutationHelper from 'app-state-utils'

# with react & redux
create a reducer and import MutationHelper from 'app-state-utils'

# with vue & vuex
create a vuex store reference and import MutationHelper from 'app-state-utils'

# with node.js
const MutationHelper = require('app-state-utils')

# with vanilla javascript
use a script tag
<script src="unpkg.com/app-state-utils"></script>

You can manipulate object key/value properties using the methods available

# more
found any bugs or need help using the package?
report: onepetercollins@gmail.com
