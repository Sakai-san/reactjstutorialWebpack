const path = require('path');
const webpack = require( 'webpack' );


let config = {
    entry: './js/main.js',
    output : {
        path : path.resolve( __dirname__, 'dist',
        filename : 'main.js',

    }
}