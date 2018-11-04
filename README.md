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
* Run `npm build`. `dist/` contains now all needed stuff for deployment.
  `media/` contains exported images that should also be uploaded.

Site can be run on development mode with `npm run dev`

### Note about world events

Current version fetch world events from backend server.
You can also write events to static json file.

## About data format

There are some things need to know for making perfect export from GRAMPS.

### Place types

Places hierarchy is important for this site. To make browserable places following hierarchy
must be used:
```
city
  - village
    - farm
      - building
```
This means e.g. every farm must have village parent and every village is covered by city.
You can have places with other types but they are ignored.

### Profile pictures

Add attribute `profile` = `true` for person media object that you want to be used as
profile picture.

### Coat of arms

You can show coat of arms for nobile persons. Add attribute `arms` and filename for picture.

### Links

Link type wikipedia is recognized and show on profile page.
