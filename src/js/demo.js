var progress1 = $(".loading-progress-1").progressTimer({
    timeLimit: 10,
    onFinish: function () {
        console.log('completed!');
    }
});
$.ajax({
    url: "http://localhost/"
}).error(function () {
    progress1.progressTimer('error', {
        errorText: 'ERROR!',
        onFinish: function () {
            console.log('1 - There was an error processing your information!');
        }
    });
}).done(function () {
    progress1.progressTimer('complete');
});


var progress2 = $(".loading-progress-2").progressTimer({
    timeLimit: 30
});
$.ajax({
    url: "http://www.github.com/"
}).error(function () {
    progress2.progressTimer('error', {
        errorText: 'Cannot connect to github',
        onFinish: function () {
            console.log('2 - Cannot connect to github!');
        }
    });
}).done(function () {
    progress2.progressTimer('complete', {
        onFinish: function () {
            console.log('With new completion!');
        }
    });
});


var progress3 = $(".loading-progress-3").progressTimer({
    timeLimit: 30
});
$.ajax({
    url: "https://api.github.com/users/octocat/orgs"
}).error(function () {
    progress3.progressTimer('error', {
        errorText: 'Cannot connect to github api',
        onFinish: function () {
            console.log('3 - Cannot connect to github api');
        }
    });
}).done(function () {
    progress3.progressTimer('complete', {
        successText: 'Connected successfully to github api',
        onFinish: function () {
            var successText = '3 - Connected successfully to github api';
            console.log(successText);
            var glyph = $('<span></span>').addClass('glyphicon glyphicon-ok');
            $(".loading-progress-3").append($('<p></p>').append(glyph).append(' ' + successText));
        }
    });
});


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