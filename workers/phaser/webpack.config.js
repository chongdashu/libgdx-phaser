// Copyright (c) 2016 All Right Reserved, Improbable Worlds Ltd.

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

const REGEX = {
  js: /\.js$/,
  ts: /\.tsx?$/,
};

module.exports = {
  REGEX: REGEX,
  entry: {
    // Your project's entry point.
    "index": "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'demo.js',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: REGEX.js,
        include: /src|node_modules/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: REGEX.ts,
        include: /src|node_modules/,
        loader: "babel?cacheDirectory!ts-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       })
  ],
  resolve: {
    extensions: ["", ".js"],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
};
