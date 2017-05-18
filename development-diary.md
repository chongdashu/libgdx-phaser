### 18-May 2017

- Trying to wrap my head around all this NPM and WebPack stuff.
- Starting small, going to try to get jQuery working.
- Tried to add it to package.json.
  ```
  "dependencies": {
    "google-protobuf": "3.2.0",
    "spatialos_worker_sdk": "file:./dependencies/javascript_sdk/",
    "jquery": "3.2.1"
  },
  ```
- Got overwritten by generated build scripts. Removed the automated build scripts in `spatialos.PhaerClient.worker.json`.
- Tried to add `$(document).ready(function(){});` to `index.js` -- started giving errors.
- Turns out to make use of global vars like `$`, need to add as a plugin in `webpack.config.js`:
  ```
  plugins: [
    new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       })
  ],
  ```

### 05-May 2017

- Now getting:
  ```
  time="2017-05-05T22:26:20+01:00" level=error msg="error on HTTP call: error while opening resource: build/demo.js" @tags=[infra local] HOSTNAME=CU-Desktop client_ip="::1" client_name= client_version= code=Internal code_string=Internal error="error while opening resource: build/demo.js" experimentz= http_handling_s=0.000 http_imp_user_agent= http_referer="http://localhost:21000/worker/phaser" http_req_path="/worker/<your_directory_name>/resources/build/demo.js" http_req_verb=GET http_resp_size=0 method="/worker/:workerDirectoryName/resources/*" request_id="MfsrH_ReQ0qf1dBa9QfrjQ==" service=http stack="{code = Internal desc = error while opening resource: build/demo.js}\n{code = Unknown desc = open D:\\Projects\\phaser-spatialos\\workers\\<your_directory_name>\\build\\demo.js: The filename, directory name, or volume label syntax is incorrect.}\n{code = Unknown desc = The filename, directory name, or volume label syntax is incorrect.}" sub= version=20170427-135045-445-12-ge649e
  ```

  * Doh, again! Forgot to replace the path in the `index.html` file :P

- Now getting the following after `spatial local launch` and connecting a client.
  ```
  time="2017-05-05T22:23:37+01:00" level=error msg="error on HTTP call: failed to read template from file" @tags=[infra local] HOSTNAME=CU-Desktop client_ip="::1" client_name= client_version= code=Unknown code_string=Unknown error="failed to read template from file" experimentz= http_handling_s=0.000 http_imp_user_agent= http_referer= http_req_path="/worker/PhaserClient" http_req_verb=GET http_resp_size=0 method="/worker/:" request_id="MsirDoboTru1j3se-9YMwQ==" service=http stack="{code = Unknown desc = failed to read template from file}\n{code = Unknown desc = open D:\\Projects\\phaser-spatialos\\workers\\PhaserClient\\index.html: The system cannot find the path specified.}\n{code = Unknown desc = The system cannot find the path specified.}" sub= version=20170427-135045-445-12-ge649e
  ```
  * Doh! Turns out i tried going to `https://localhost:21000/worker/PhaserClient` when it should just be `https://localhost:21000/worker/phaser`

- Tried setting up minimally and ran a spatial build.
	```
	/d/Projects/phaser-spatialos/workers/phaser (master) $ spatial build
	Generating bridge settings for PhaserClient.
	Generating descriptor. 2/2    [====================] 100%

	Running task 'build' for 'PhaserClient'
	[1/3] > Build Codegen
	[1/2] > Codegen Dependencies
	  Extracting packages 1/1    [====================] 100%
	  Extracting packages 1/1    [====================] 100%

	[1/2] < Codegen Dependencies (2.1s)
	[2/2] > Codegen JavaScript
	  Generating code for javascript. 5/5    [====================] 100%

	[2/2] < Codegen JavaScript (10.5s)
	>>> Codegen (12.6s)
	[1/3] < Build Codegen (12.6s)
	[2/3] > Build NPM Install
	npm WARN deprecated babel@6.23.0: In 6.x, the babel package has been deprecated in favor of babel-cli. Check https://opencollective.com/babel to support the Babel maintainers
	npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
	npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.1: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
	[2/3] < Build NPM Install (15.3s)
	[3/3] > Build NPM Build
	ERROR in Entry module not found: Error: Cannot resolve 'file' or 'directory' ./src/index.js in D:\Projects\phaser-spatialos\workers\phaser
	[3/3] < Build NPM Build (1.2s)
	>>> Build (29.1s)
	'spatial.exe build' succeeded (30.5s)
	```

	* Turns out I just didn't follow the instructions and tried to be clever and perform a `spatial worker build` too early.