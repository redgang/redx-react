## redx-redux
> `react、antd-design、react-router、redux、webpack、ES6、postcss`

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/redgang/redx-react.git
$ cd redx-react
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
```

### Plans

- 完善components组件库，包含Form，DataTable，FileLoader，TinyMce等
- 完善demo示例

### Usage
-----

Before delving into the descriptions of each available npm script, here's a brief summary of the three which will most likely be your bread and butter:

* Doing live development? Use `npm start` to spin up the dev server.
* Compiling the application to disk? Use `npm run compile`.
* Deploying to an environment? `npm run deploy` can help with that.

Great, now that introductions have been made here's everything in full detail:

|`npm run...`|Description|
|---|---|
|`start`|Spins up Koa server to serve your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon to automatically restart the server when server-related code is changed.|
|`dev:nw`|Same as `npm run dev`, but opens the redux devtools in a new window.|
|`dev:no-debug`|Same as `npm run dev` but disables redux devtools.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`flow:check`|Analyzes the project for type errors.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

**NOTE:** Deploying to a specific environment? Make sure to specify your target `NODE_ENV` so webpack will use the correct configuration. For example: `NODE_ENV=production npm run compile` will compile your application with `~/config/_production.js`.

### Configuration

Basic project configuration can be found in `~/config/_base.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the webpack build configuration**.

Common configuration options:

|Key|Description|
|---|---|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Koa server|
|`server_port`|port for the Koa server|
|`compiler_css_modules`|whether or not to enable CSS modules|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive.

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.js             # Application bootstrap and rendering
│   ├── components           # Reusable Presentational Components
│   ├── containers           # Reusable Container Components
│   ├── common               # utils
│   ├── layouts              # Components that dictate major page structure
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── routes               # Main route definitions and async split points
│       ├── index.js         # Bootstrap main application routes with store
│       ├── Root.js          # Wrapper component for context-aware providers
│       ├── Home             # Fractal route
│       │   ├── index.js     # Route definitions and async split points
│       │   ├── assets       # Assets required to render components
│       │   ├── components   # Presentational React Components
│       │   ├── container    # Connect components to actions and store
│       │   ├── modules      # Collections of reducers/constants/actions
│       │   └── routes **    # Fractal sub-routes (** optional)
│       └── NotFound         # Capture unknown routes in component
└── tests                    # Unit tests
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/_base.js`. When adding new globals, also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|

### Redux DevTools

#### We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

However, adding the DevTools components to your project is simple, first grab the packages from npm:

```
npm i --D redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Features
--------

* [React](https://github.com/facebook/react) (`^15.2.0`)
* [Redux](https://github.com/rackt/redux) (`^3.5.0`)
  * react-redux (`^4.4.0`)
  * redux-thunk middleware
* [react-router](https://github.com/rackt/react-router) (`^2.5.0`)
  * Asynchronous routes configured with dependencies and reducers
* [react-router-redux](https://github.com/rackt/react-router-redux) (`^4.0.0`)
* [Webpack](https://github.com/webpack/webpack)
  * Vanilla HMR using `module.hot` and `webpack-dev-middleware`
  * Code-splitting using `react-router` route configuration
  * Bundle splitting and CSS extraction
  * Less w/ CSS modules, autoprefixer, and minification
* [Koa](https://github.com/koajs/koa) (`^2.0.0-alpha`)
* [Karma](https://github.com/karma-runner/karma)
  * Mocha w/ chai, sinon-chai, and chai-as-promised, and [chai-enzyme](https://github.com/producthunt/chai-enzyme)
  * PhantomJS
  * Code coverage reports/instrumentation with [isparta](https://github.com/deepsweet/isparta-loader)
* [Flow](http://flowtype.org/) (`^0.22.0`)
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined
  * [babel-plugin-transform-react-constant-elements](https://babeljs.io/docs/plugins/transform-react-constant-elements/) save some memory allocation
  * [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) remove `PropTypes`
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this.

Thank You
---------

- [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
- [bang88](https://github.com/bang88) [typescript-react-redux-starter](https://github.com/bang88/typescript-react-redux-starter)


