/*
 <div class="progress">
 <div class="progress-bar progress-bar-success progress-bar-striped"
 role="progressbar" aria-valuenow="40" aria-valuemin="0"
 aria-valuemax="100" style="width: 40%">
 <span class="sr-only">40% Complete (success)</span>
 </div>
 </div>
 */
if (typeof jQuery === 'undefined') {
    throw new Error('jQuery progress timer requires jQuery');
}

(function ($) {
    $.fn.progressTimer = function (options) {
        var settings = $.extend({}, $.fn.progressTimer.defaults, options),
            interval,
            span = $("<span/>");
        this.each(function () {
            var showComplete = settings.showComplete === true,
                showPercentage = settings.showPercentage === true,
                start = new Date(),
                limit = settings.timeLimit * 1000,
                bar,
                t = this,
                onComplete = function () {
                    bar = $('.progress-bar', $(this));
                    if (typeof bar.data('interval') !== "undefined") {
                        var interval = bar.data('interval');
                        window.clearInterval(interval);
                    }
                    bar.removeClass(settings.baseStyle)
                        .removeClass(settings.warningStyle)
                        .addClass(settings.completeStyle);
                    bar.width("100%");
                    $('span', bar).html("100%");
                    bar.attr("aria-valuenow", 100);
                    setTimeout(function () {
                        settings.onFinish.call(bar);
                    }, 500);
                };
            if (showComplete) {
                onComplete.call(this);
                return this;
            } else {
                $(this).empty();
                var barContainer = $("<div>").addClass("progress");
                bar = $("<div>").addClass("progress-bar active progress-bar-striped").addClass(settings.baseStyle)
                    .attr("role", "progressbar")
                    .attr("aria-valuenow", "0")
                    .attr("aria-valuemin", "0")
                    .attr("aria-valuemax", settings.timeLimit);
                span.appendTo(bar);
                if (!showPercentage) {
                    span.addClass("sr-only");
                }
                bar.appendTo(barContainer);
                barContainer.appendTo($(this));
            }

            function run() {
                var elapsed = new Date() - start,
                    width = showComplete ? 100 : ((elapsed / limit) * 100);
                bar.attr("aria-valuenow", width);
                bar.width(width + "%");

                var percentage = width.toFixed(2);
                if (percentage >= 100) {
                    percentage = 100;
                }
                span.html(percentage + "%");

                if (limit - elapsed <= 5000) {
                    bar.removeClass(settings.baseStyle)
                        .removeClass(settings.completeStyle)
                        .addClass(settings.warningStyle);
                }

                if (elapsed >= limit || showComplete) {
                    onComplete.call(t);
                }
            }

            // to prevent the interval to be defined many times
            if (typeof bar.data('interval') === "undefined") {
                interval = window.setInterval(run, 250);
                bar.data('interval', interval);
            }
            return this;
        });
        return this;
    };

    $.fn.progressTimer.defaults = {
        timeLimit: 60,  //total number of seconds
        warningThreshold: 5,  //seconds remaining triggering switch to warning color
        onFinish: function () {
        },  //invoked once the timer expires
        baseStyle: '',  //bootstrap progress bar style at the beginning of the timer
        warningStyle: 'progress-bar-danger',  //bootstrap progress bar style in the warning phase
        completeStyle: 'progress-bar-success',  //bootstrap progress bar style at completion of timer
        showPercentage: true, //show percentage in html div area
        showComplete: false //show complete progress bar,
    };
})(jQuery);