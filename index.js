#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var Twig = require('twig');
Twig.cache(false);
var twig = Twig.twig;
var fs = require('fs');
var decamelize = require('decamelize');
var camelize = require('camelize');
var mkdirp = require('mkdirp');

console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(process.argv[2]);

var command = process.argv[2];
var type = process.argv[3];
var name = process.argv[4]; // dashedFormat
var dashedName = name;
var camelizedName = camelize(dashedName);
var capitalizedName = camelizedName.charAt(0).toUpperCase() + camelizedName.slice(1);
var directory = process.argv[5];

console.log(dashedName, capitalizedName, camelizedName);

var generateComponent = function generateComponent() {
    console.log('Generate component ' + name);
};

if (_.find(['generate', 'g'], function () {
    return command;
}) && _.find(['component', 'c'], function () {
    return type;
})) {
    if (!name) {
        console.error('Need a name');
    }
    if (!directory) {
        console.error('Need a directory');
    }

    //fs.mkdirSync(directory + '/' + dashedName);
    mkdirp.sync(directory + '/' + dashedName);

    var layout = 'layout/component.js.twig';
    var templated = twig({
        path: layout,
        async: false
    }).render({
        component: {
            dashedName: dashedName,
            camelizedName: camelizedName,
            capitalizedName: capitalizedName
        }
    });
    fs.writeFileSync(directory + '/' + dashedName + '/' + dashedName + '.component.js', templated);
    fs.writeFileSync(directory + '/' + dashedName + '/' + dashedName + '.component.css', '');

    layout = 'layout/index.js.twig';
    templated = twig({
        path: layout,
        async: false
    }).render({
        component: {
            dashedName: dashedName,
            camelizedName: camelizedName,
            capitalizedName: capitalizedName
        }
    });
    fs.writeFileSync(directory + '/' + dashedName + '/' + 'index.js', templated);
}

process.exit(0);

var prompt = require('cli-input'),
    completer = require('./completer');
var name = require('path').basename(process.argv[1]);

/**
 *  A example of using tab completion.
 */
console.log('%s | send SIGINT (Ctrl^C) to exit', name);
console.log('%s | hit the tab key to see possible completions', name);
var ps = prompt({ infinite: true, completer: completer });
ps.on('value', function (val, options, ps) {
    console.log('%s | got command: %j', name, val);
});
ps.run();
