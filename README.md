[![Bower version](https://badge.fury.io/bo/jquery-progresstimer.svg)](https://badge.fury.io/bo/jquery-progresstimer)
[![devDependency Status](https://david-dm.org/tnory56/jquery-progressTimer/dev-status.svg)](https://david-dm.org/tnory56/jquery-progressTimer/#info=devDependencies)
[![Dependency Status](https://david-dm.org/tnory56/jquery-progressTimer/status.svg)](https://david-dm.org/tnory56/jquery-progressTimer/)

jQuery Progress timer is a jquery extension that extends the functionality of the Bootstrap progress [bar component](http://getbootstrap.com/components/#progress)

 - REQUIRES Bootstrap 3.2.0 or greater.

## Table of contents

 - [Quick start](#quick-start)
 - [What's Included](#whats-included)
 - [Simple Example](#simple-example)
 
## Quick start

Three quick start options are available:

- Clone the repo: `git clone https://github.com/tnory56/jquery-progressTimer.git`.
- Install with [Bower](http://bower.io): `bower install jquery-progresstimer`.
- See the demo page [Demo](https://github.com/tnory56/jquery-progressTimer/blob/master/demo/index.html) for usage and possibilities


## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
jquery-progresstimer/
├── demo/
│	├── css/
│	│	├── static.css
│	│	└── static.min.css
│	├── fonts/
│	│	├── glyphicons-halflings-regular.eot
│	│	├── glyphicons-halflings-regular.svg
│	│	├── glyphicons-halflings-regular.ttf
│	│	└── glyphicons-halflings-regular.woff
│	├── js/
│	│	├── static.js
│	│	└── static.min.js
│	├── demo.css
│	└── index.html
├── dist/
│	├── css/
│	│	└── jquery.progresstimer.css
│	└── js/
│		├── jquery.progresstimer.js
│		└── jquery.progresstimer.min.js
├── src/
│	├── css/
│	└── js/
├── bower.json
├── Gruntfile.js
├── LICENSE
├── package.json
└── README.md
```

## Simple Example

```html
<div class="container">
    <div class="loading-progress"></div>
</div>
<script src="js/static.min.js"></script>
<script src="../dist/js/jquery.progresstimer.js"></script>
<script>
    var progress = $(".loading-progress").progressTimer({
        timeLimit: 10,
        onFinish: function () {
            alert('completed!');
        }
    });
    $.ajax({
       url:"http://localhost/"
    }).error(function(){
        progress.progressTimer('error', {
            errorText:'ERROR!',
            onFinish:function(){
                alert('There was an error processing your information!');
            }
        });
    }).done(function(){
        progress.progressTimer('complete');
    });
</script>
```