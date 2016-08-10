#!/usr/bin/env node

var _ = require('lodash');
var Twig = require('twig');
Twig.cache(false);
var twig = Twig.twig;
var fs = require('fs');
var decamelize = require('decamelize');
var camelize = require('camelize');
var mkdirp = require('mkdirp');

var command = process.argv[2];
var type = process.argv[3];
var name = process.argv[4];
var dashedName = name;
var camelizedName = camelize(dashedName);
var capitalizedName = camelizedName.charAt(0).toUpperCase() + camelizedName.slice(1);
var directory = process.argv[5];

if (_.find(['generate', 'g'], () => command) &&
    _.find(['component', 'c'], () => type)) {
    if (!name) {
        console.error('Need a name');
    }
    if (!directory) {
        console.error('Need a directory');
    }

    mkdirp.sync(directory + '/' + dashedName);

    var layout = 'layout/component.js.twig';
    var templated = twig({
            path: layout,
            async: false
        })
        .render({
            component: {
                dashedName,
                camelizedName,
                capitalizedName
            }
        });
    fs.writeFileSync(directory + '/' + dashedName + '/' + dashedName + '.component.js', templated);
    fs.writeFileSync(directory + '/' + dashedName + '/' + dashedName + '.component.css', '');

    layout = 'layout/index.js.twig';
    templated = twig({
            path: layout,
            async: false
        })
        .render({
            component: {
                dashedName,
                camelizedName,
                capitalizedName
            }
        });
    fs.writeFileSync(directory + '/' + dashedName + '/' + 'index.js', templated);
}