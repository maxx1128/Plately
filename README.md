# In progress!
# Maxwell Boilerplate Workflow

This is a boilerplate for personal and professional web development projects, with standard components included and set up to include other ones as needed. It has no content already set up with it and is basically a blank slate.

## Dependencies:

- Node.JS - For running the serv-erside javascript
- Gulp - For organizing and creating the specific workflow
```sh
gulp   //run + watch scripts, sass, jade, images for changes
gulp watch   //Watch the above without running them
gulp scripts   //only process JS files
gulp sass   //only process Sass files to CSS
gulp jade   //only process Jade files to HTML
gulp images   //optimize image files
gulp sassdoc   //Create documentation for Sass code
^C   //stop run + watch
```
- NPM - Node package management
```sh
npm install   //install dependencies (deps)
npm install [component] --save-dev  //Install + save deps
npm uninstall [component]   //Remove a dep
npm search [component]   //Search Github for new deps
```
- Bower - Component package management
```sh
bower install
bower install [component] --save-dev
bower uninstall [component]
bower search [component]
```

## Organization:

- Bower.json: Bower file that organizes and saves Bower dependencies. Can be seen and manually removed here. When installed, are saved to the components folder.
- Build: Where the project output is. Jade files are processed and output here at HTML files, and the CSS, JS, and image files are saved to the assets folder. Image files are also optimized and output in the Build folder.
- Components: Bower files and dependencies are all saved here. Any relevant CSS or JS files can be referenced here without weighing down the Build folder.
- Gulpfile.js: Code that controls the basic Gulp workflow and preprocessing of all files. Outputs files to the Build folders and notifies of the processes or the errors.
- JS: All Javascript and jQuery files are placed. Are processed, minified, and output to the Build’s assets folder.
- Lib: All Jade files are written here, are processed and output into the Build folder
- Node_modules: All node dependencies, essential to running the Gulp workflow. Is empty at first, see NPM above for how to install dependencies.
- NPM-debug.log: Debug log of all NPM mistakes and entries with the NPM dependency manager.
- Package.json: List of all NPM dependencies that will be installed, essential to quickly setting up the Gulp workflow.
- Public: All public documentation for the project, such as the SASS documentation.
- Sass: All sass files are gathered and compiled here. And Sass partials must be accurately referenced in the main style.css file.

## Module Dependencies:

- gulp:
- gulp-autoprefixer:
- gulp-bower:
- gulp-concat:
- gulp-imagemin:
- gulp-jade:
- gulp-livereload:
- gulp-minify-css:
- gulp-notify:
- gulp-plumber:
- gulp-rename:
- gulp-sass:
- gulp-sourcemaps:
- gulp-uglify:
- sassdac:

## Bower Dependencies:
- Bourbon:
- Neat:
- Bitters:

## How to use:



> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [Marked] - a super fast port of Markdown to JavaScript
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [keymaster.js] - awesome keyboard handler lib by [@thomasfuchs]
* [jQuery] - duh

```sh
$ git clone [git-repo-url] dillinger
$ cd dillinger
$ npm i -d
$ mkdir -p public/files/{md,html,pdf}
$ gulp build --prod
$ NODE_ENV=production node app
```




[john gruber]:http://daringfireball.net/
[@thomasfuchs]:http://twitter.com/thomasfuchs
[1]:http://daringfireball.net/projects/markdown/
[marked]:https://github.com/chjj/marked
[Ace Editor]:http://ace.ajax.org
[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[keymaster.js]:https://github.com/madrobby/keymaster
[jQuery]:http://jquery.com
[@tjholowaychuk]:http://twitter.com/tjholowaychuk
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org
[Gulp]:http://gulpjs.com
