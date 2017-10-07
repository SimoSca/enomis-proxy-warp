# README

## Environment

to work simply I use `browsersync` with `gulp`, in order to watch file changes and reload browser (via browsersync proxy).

So here the command to work with:

```bash
# initialize package.json file
npm init 
npm install --save-dev browser-sync gulp gulp-sass
```

> if needed, remember to install the global Gulp-cli via `npm install --global gulp-cli`

> **IMPORTANT** : your html MUST contain the `body` tag to work with `browser-sync`!



### START

Run:

```bash
./node_modules/.bin/gulp watch
```

or 


```bash
npm start
```

(see package.json)