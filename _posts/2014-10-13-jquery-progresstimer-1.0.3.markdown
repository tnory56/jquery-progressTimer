---
layout: post
title:  "jQuery Progress Timer 1.0.3"
date:   2014-10-13 21:52:05
categories: jquery bootstrap progress
customjs:
  - /jquery-progressTimer/dist/js/static.min.js
  - /jquery-progressTimer/dist/js/jquery.progresstimer.js
  - /jquery-progressTimer/dist/js/demo.js
customcss:
  - /jquery-progressTimer/dist/css/static.min.css
---

I realized when I looking at the code on my plugin that the showPercentage option would only work half the time. 

So I added a new option. 

showHtmlSpan: true | false;

So now you should be able to use this and not show any percentage or html in the progress bar. 


<div class="loading-progress-3-1"></div>

{% highlight html %}
<div class="loading-progress-3-1"></div>
<script>
var progress31 = $(".loading-progress-3-1").progressTimer({
    timeLimit: 10,
    onFinish: function () {
        console.log('completed!');
    },
    showHtmlSpan: true
});
$.ajax({
    url: "http://localhost/"
}).error(function () {
    progress31.progressTimer('error', {
        errorText: 'ERROR!',
        onFinish: function () {
            console.log('There was an error processing your information!');
        }
    });
}).done(function () {
    progress31.progressTimer('complete');
});
</script>
{% endhighlight %}

<div class="loading-progress-3-2"></div>
{% highlight html %}
<div class="loading-progress-3-2"></div>
<script>
var progress32 = $(".loading-progress-3-2").progressTimer({
    timeLimit: 30,
    onFinish: function () {
        console.log('completed!');
    },
    showHtmlSpan: false
});
$.ajax({
    url: "http://localhost/"
}).error(function () {
    progress32.progressTimer('error', {
        errorText: 'ERROR!',
        onFinish: function () {
            console.log('There was an error processing your information!');
        }
    });
}).done(function () {
    progress32.progressTimer('complete');
});
</script>
{% endhighlight %}

## Default Settings
{% highlight html %}
//total number of seconds
timeLimit: 60,
//seconds remaining triggering switch to warning color
warningThreshold: 5,
//invoked once the timer expires
onFinish: function () {
},
//bootstrap progress bar style at the beginning of the timer
baseStyle: '',
//bootstrap progress bar style in the warning phase
warningStyle: 'progress-bar-danger',
//bootstrap progress bar style at completion of timer
completeStyle: 'progress-bar-success',
//show html on progress bar div area
showHtmlSpan: true,
//set the error text when error occurs
errorText: 'ERROR!'
{% endhighlight %}