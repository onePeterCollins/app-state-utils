const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');


// source paths
const functionsPath = './src/functions';

// webpack configs
const developmentConfig = require('../../webpack-config/prod/src.config.js');
const productionConfig = require('../../webpack-config/prod/dist.config.js');

// output paths
const outputFunctionsPath = './prod/functions';





// Read all function definitions from 'root/src/functions' and transpile them with the defined options
// Store the build output in 'root/prod/functions' and 'root/prod/src'
fs.readdir(path.join(functionsPath), (error, files) => {
    // function file names
    const functions = [];

    if (error) {
        console.warn(`\n Error reading files from ${functionsPath} -- @ scripts/build/build.js line 28 \n`);
        console.error(error);
    } else {
        if (!files.length) {
            console.error(`\n No files found in ${functionsPath} -- @ scripts/build/build.js line 32 \n`);
        } else {
            files.forEach((fileName) => {
                functions.push(fileName);
            });

            functions.forEach((fileName) => {
                fs.readFile(`${functionsPath}/${fileName}`, 'utf8', (error, file) => {
                    if (error) {
                        console.log(`\n\n ERROR @ scripts/build/build.js -- line 41 \n`)
                        console.log(`ENCOUNTERED ERROR WHILE READING ${fileName}: \n`);
                        console.log(error);
                    }

                    // compile production functions
                    buildProdFunctions(file, outputFunctionsPath, fileName);
                });
            });
        }
    }
});





// Read 'root/src/index.js' and bundle dependencies with webpack using the defined configFile
// Store the compiled output in '.prod/src'
(function buildProdSrc () {
    webpack(
        developmentConfig,
        (error, stats) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(stats.toString({
                chunks: false,  // Makes the build much quieter
                colors: true    // Shows colors in the console
            }));
        }
    );
})();





// Read 'root/src/index.js' and bundle dependencies with webpack using the defined configFile
// Store the compiled output in '.prod/dist'
(function buildProdDist () {
    webpack(
        productionConfig ,
        (error, stats) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(stats.toString({
                chunks: false,  // Makes the build much quieter
                colors: true    // Shows colors in the console
            }));
        }
    );
})();





// compile and write output to './prod/functions'
const buildProdFunctions = function (file, outputPath, fileName) {
    const babelOptions = {
        filename: fileName,
        code: true,
        compact: true,
        retainLines: true,
        sourceMaps: 'inline',
        sourceFileName: fileName,
        sourceType: 'module',
        targets: '> 0.25%, not dead'
    };

    babel.transformAsync(file, babelOptions)
    .then((result) => {
        fs.writeFile(`${outputPath}/${fileName}`, `${result.code} \n`, (error) => {
            if (error) {
                console.log(`\n\n ERROR @ scripts/build/build.js -- line 87 \n`)
                console.log(`ENCOUNTERED ERROR WHILE TRANSPILING ${fileName}: \n`);
                console.log(error);
            }
        });

        // console.log(`\n\n COMPILED OUTPUT FOR '${fileName}': \n`);
        // console.log(result.code);
    })
    .catch((error) => {
        console.log(`\n\n ERROR @ scripts/build/build.js -- line 85 \n`)
        console.log(`ENCOUNTERED ERROR WHILE TRANSPILING ${fileName}: \n`);
        console.log(error);
    });
}
