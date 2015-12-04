# React es6 webpack react boilerplate

Work well with nodejs 0.12.7, did not work yet on v4

## Why a new boilerplate
es6 boilerplate are too complex actually.

This boilerplate is not to provide an advanced nor a simple boilerplate but something between.
As you can see on github, there are a lot of boilerplates that are too simple or too complex.
I've tried to take ideas from both to make a more understandable one.

## Tools

* **webpack** = [Why Webpack](https://webpack.github.io/docs/motivation.html) ? Modular approach
* **react-router-bootstrap** = Integration between React Router and React-Bootstrap
* **react-router** = A complete routing solution for React.js
* **react-hot-loader** = reload your app when you change a file
* **babel** = es6 compiler
* **bootstrap-sass** = use bootstrap-sass from npm instead of bower because bower will be dead soon

## Testing
We are using:

* [mocha][3] to describe test and run test
* [chai][2] for assertion 
* [reagent][1] for testing react component

All test should be in `src/components/__tests__`

## Theming
This boilerplate is based on boostrap 3.3.5.
With the use of bootstrap-sass you can modify your app with two files `variables.scss` and `main.scss`

## Webpack configuration
### Plugins

## Commands
### Dev app
``npm run dev``

This command run a webserver on **localhost:8080** by default.
You can play with your app by changing components like the Hompage in **src/components/home.jsx**

### Production app
``npm run build``

This command will compile all your project in a dist directory.
There is a **bundle-[hash].js** that contains your logic
There is a **vendors-[hash].js** that contains external libraries like react, bower components etc...

**[hash]** is very import because you need to have differents filenames for your scripts when you deploy to production to invalidate client cache.
``This hash is generate by webpack``


[1]: https://github.com/airbnb/reagent
[2]: http://chaijs.com 
[3]: https://mochajs.org/