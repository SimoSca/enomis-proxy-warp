#!/usr/bin/env node

'use strict';

const program = require('commander');

const { preparePath } = require('../lib/pathManager');
const { startProxy } = require('../index');



// Set env var for ORIGINAL cwd
// before anything touches it
// process.env.INIT_CWD = process.cwd();


program
    .version('1.0.3')
    .description('Contact management system');

program
    .command('start <sourcefolder>')
    .alias('s')
    .description('Start Proxy server and watching via enproxy.json file in <sourcefolder>')
    .action((sourceFolder) => {
        var executionPath = preparePath(sourceFolder)
        startProxy(executionPath)
    });


program 
    .command('test')
    .description('Simple echo test')
    .action( () => {
        console.log('I say "test" ok!')
    });

program.parse(process.argv);