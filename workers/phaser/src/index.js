const sdk = require("spatialos_worker_sdk");
window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');


let locatorParameters = new sdk.LocatorParameters();
locatorParameters.projectName = "chongulim";
locatorParameters.credentialsType = sdk.LocatorCredentialsType.LOGIN_TOKEN;
locatorParameters.loginToken = {
  token: sdk.DefaultConfiguration.LOCAL_DEVELOPMENT_LOGIN_TOKEN
};


let workerType = "PhaserClient";
const connectionParameters = new sdk.ConnectionParameters();
connectionParameters.workerType = workerType;


const locator = sdk.Locator.create(sdk.DefaultConfiguration.LOCAL_DEVELOPMENT_LOCATOR_URL, locatorParameters);
locator.getDeploymentList((err, deploymentList) => {
  locator.connect("my_deployment", connectionParameters, (err, queueStatus) => {
      return true;
    },
    (err, connection) => {
      if (err) {
        console.log("Error when connecting", err);
        return;
      }
      connection.sendLogMessage(sdk.LogLevel.WARN, workerType, "Hello from JavaScript!");


      let dispatcher = sdk.Dispatcher.create();
      dispatcher.onDisconnect(op => {
        console.log("---> Disconnected", op);
      });
      connection.attachDispatcher(dispatcher);
    });
});

var game = null;
var GLOBAL_GAME_WIDTH = 640;
var GLOBAL_GAME_HEIGHT = 480;

$(document).ready(function() {
  console.log("Hello, Phaser-Spatial");

  game = new Phaser.Game(GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);
});