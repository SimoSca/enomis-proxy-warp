#!/usr/bin/env node

'use strict';

const program = require('commander');

const { preparePath } = require('../lib/pathManager');
const { startProxy } = require('../index');



// Set env var for ORIGINAL cwd
// before anything touches it
// process.env.INIT_CWD = process.cwd();


program
    .version('0.0.1')
    .description('Contact management system');

program
    .command('start <sourcefolder>')
    .alias('s')
    .description('Start Proxy server and watching via enproxy.json file in <sourcefolder>')
    .action((sourceFolder) => {
        var executionPath = preparePath(sourceFolder)
        startProxy(executionPath)
    });


program.parse(process.argv);