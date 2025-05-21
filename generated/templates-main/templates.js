angular.module('templates-main', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('modules/file/templates/fileChooser.html',
	"<label>\n" +
	"    <ng-transclude></ng-transclude>\n" +
	"    <input type=\"file\">\n" +
	"</label>");
	$templateCache.put('modules/player/templates/player.html',
	"<!-- Actual playback display -->\n" +
	"<guac-player-display display=\"recording.getDisplay()\"\n" +
	"                     ng-click=\"togglePlayback()\"></guac-player-display>\n" +
	"\n" +
	"<!-- Player controls -->\n" +
	"<div class=\"guac-player-controls\" ng-show=\"recording\">\n" +
	"\n" +
	"    <!-- Playback position slider -->\n" +
	"    <input class=\"guac-player-seek\" type=\"range\" min=\"0\" step=\"1\"\n" +
	"           ng-attr-max=\"{{ recording.getDuration() }}\"\n" +
	"           ng-change=\"beginSeekRequest()\"\n" +
	"           ng-model=\"playbackPosition\"\n" +
	"           ng-on-change=\"commitSeekRequest()\">\n" +
	"\n" +
	"    <!-- Play button -->\n" +
	"    <button class=\"guac-player-play\"\n" +
	"            title=\"Play\"\n" +
	"            ng-click=\"recording.play()\"\n" +
	"            ng-hide=\"recording.isPlaying()\"><i class=\"fas fa-play\"></i></button>\n" +
	"\n" +
	"    <!-- Pause button -->\n" +
	"    <button class=\"guac-player-pause\"\n" +
	"            title=\"Pause\"\n" +
	"            ng-click=\"recording.pause()\"\n" +
	"            ng-show=\"recording.isPlaying()\"><i class=\"fas fa-pause\"></i></button>\n" +
	"\n" +
	"    <!-- Playback position and duration -->\n" +
	"    <span class=\"guac-player-position\">\n" +
	"        {{ formatTime(playbackPosition) }}\n" +
	"        /\n" +
	"        {{ formatTime(recording.getDuration()) }}\n" +
	"    </span>\n" +
	"\n" +
	"</div>\n" +
	"\n" +
	"<!-- Modal status indicator -->\n" +
	"<div class=\"guac-player-status\" ng-show=\"operationText\">\n" +
	"    <guac-player-progress-indicator progress=\"operationProgress\"></guac-player-progress-indicator>\n" +
	"    <p>{{ operationText }}</p>\n" +
	"    <button class=\"guac-player-button\" ng-show=\"cancelOperation\"\n" +
	"            ng-click=\"cancelOperation()\"><i class=\"fas fa-stop\"></i> Cancel</button>\n" +
	"</div>");
	$templateCache.put('modules/player/templates/playerDisplay.html',
	"<div class=\"guac-player-display-container\"></div>\n" +
	"<object class=\"glen-resize-sensor\" type=\"text/html\"\n" +
	"        data=\"modules/player/templates/resize-sensor.html\"\n" +
	"        aria-hidden=\"true\" alt=\"\"></object>");
	$templateCache.put('modules/player/templates/progressIndicator.html',
	"<div class=\"guac-player-progress-text\">{{ percentage }}%</div>\n" +
	"<div class=\"guac-player-progress-bar-container\" ng-class=\"{\n" +
	"        'past-halfway' : progress > 0.5\n" +
	"    }\">\n" +
	"    <div class=\"guac-player-progress-bar\" ng-style=\"{\n" +
	"        '-webkit-transform' : barTransform,\n" +
	"        '-moz-transform' : barTransform,\n" +
	"        '-ms-transform' : barTransform,\n" +
	"        '-o-transform' : barTransform,\n" +
	"        'transform' : barTransform\n" +
	"    }\"></div>\n" +
	"</div>");
	$templateCache.put('modules/player/templates/resize-sensor.html',
	"<!DOCTYPE html>\n" +
	"<html lang=\"en\">\n" +
	"    <head>\n" +
	"        <title>Apache Guacamole - Session Recording Player (Resize Sensor)</title>\n" +
	"        <meta charset=\"utf-8\">\n" +
	"        <meta http-equiv=\"x-ua-compatible\" content=\"IE=edge\">\n" +
	"    </head>\n" +
	"    <body><!--\n" +
	"                                                    _/     sw+\n" +
	"                                                    jm   _yWc\n" +
	"                               ______.             _QQL  !Q?\n" +
	"                          _amQQQQQQQQQQQga,        jQQQ, 7   .___,.\n" +
	"                        _yQQQQQQQQQQQQQQQQQQw,     jQQQg    )QQWT?\"\n" +
	"                       jQQQQQQQQQQQQQQQQQQQQWQg,   ]QQQQm, ~~~-\n" +
	"                      jQQQQQQQQQQQQQQQQQQQQQQQQQgwmQQQQQQ.., _,\n" +
	"                     jQQQQQQQQQQQQQQQQQQQQQQQQQQWWP~-$QQQk -?wQga\n" +
	"                    _QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ,  4QQQc   ?`?$\n" +
	"                  .ayQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQm   \"4QQ\n" +
	"                 _yQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ[    -?(\n" +
	"              .sjQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQa,__aaaaa,.\n" +
	"             ayQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQWQWWQQQQW?9WQm,\n" +
	"          _jQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQwyQWQm\n" +
	"         _yQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQWQQQQ[\n" +
	"         --\"\"\"^\"^-`-` -\"??TQWQQQQQQQQQQQQQQQQQQQP?\"-~?9$QQQQQQQQQf\n" +
	"                          .QQQQQQQQQ/  jQQQQQQQQg,         -~~~~-\n" +
	"                           ^^^^^^^^^^  -^~^~^~^~^`\n" +
	"    --></body>\n" +
	"</html>");
}]);
