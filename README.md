# suku

Genealogy website frontend with React.
Supports data exported from GRAMPS 5.0

Reference implementation [can be seen here.](http://karttalehtinen.fi/suku)

This is work in progress, so documentation may not be up to date yet.
There are still also possible hard coded links pointing to reference implementation.

## Build & deploy

Building and deploying is basicly done by following steps.
There could be some other configurable things you should take care of
that will be documented later.

* Node & npm should be installed.
* Install dependencies `npm i`
* Edit config.json and set suitable values for your site.
* Export your data from GRAMPS using XML format & no compression.
  Save export to project dir using `gramps.xml` as a name.
* Run `npm tree` to generate data json file.
* Run `npm build`. `dist` contains now all needed stuff for deployment.

Site can be run on development mode with `npm run dev`

### Note about places

Current version fetch places from backend server.
This is needed because GRAMPS currently does not supports attributes
for places.
