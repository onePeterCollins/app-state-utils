const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const functionsPath = './src/functions';
const outputProductionPath = './prod/dist';
const outputFunctionsPath = './prod/functions';
const outputDevelopmentPath = './prod/src';
const outputRootPath = './prod';
const functions = [];





// clean up 'prod' and all its sub directories and create necessary files for the build process

