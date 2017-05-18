const sdk = require("spatialos_worker_sdk");
require('jquery');


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


$(document).ready(function() {
  console.log("Hello, Phaser-Spatial");
})