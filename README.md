# A15-CLI

This is a basic generator for components in Angular 1.5, following most of the [Todd Motto styleguide](https://github.com/toddmotto/angular-styleguide).

## Build

a15-cli is written in ES2016 and transpiled by Babel.  
There are two npm shortcuts : 

    npm build
    npm start ...

The start script will also build.

## Usage : 

    npm start -s generate|g componnent|c component-name directory

Component name must be dashed and lower case.

## Example : 

    npm start g c header-logo ./src/app/components/header


