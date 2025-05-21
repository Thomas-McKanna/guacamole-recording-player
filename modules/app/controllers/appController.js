/*
 * Copyright (C) 2025 Thomas McKanna
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * The controller for the root of the Apache Guacamole session player web
 * application.
 */
angular.module('app').controller('appController', ['$scope', 'urlParamService', 'remoteFileService',
    function appController($scope, urlParamService, remoteFileService) {

    /**
     * The currently selected recording, or null if no recording is selected.
     *
     * @type {Blob}
     */
    $scope.selectedRecording = null;

    /**
     * Whether the session recording player within the application is currently
     * playing a recording.
     *
     * @type {Boolean}
     */
    $scope.playing = false;

    /**
     * Whether an error prevented the requested recording from being loaded.
     *
     * @type {Boolean}
     */
    $scope.error = false;
    
    /**
     * The error message to display if an error occurred.
     *
     * @type {String}
     */
    $scope.errorMessage = null;
    
    /**
     * Whether the application is in remote file mode.
     *
     * @type {Boolean}
     */
    $scope.remoteMode = false;
    
    /**
     * Whether the application is currently downloading a remote file.
     *
     * @type {Boolean}
     */
    $scope.downloading = false;

    // Clear any errors if a new recording is loading
    $scope.$on('guacPlayerLoading', function loadingStarted() {
        $scope.error = false;
        $scope.errorMessage = null;
    });

    // Update error status if a failure occurs
    $scope.$on('guacPlayerError', function recordingError(event, message) {
        $scope.selectedRecording = null;
        $scope.error = true;
        $scope.errorMessage = message || 'An error occurred while loading the recording.';
    });

    // Update playing/paused status when playback starts
    $scope.$on('guacPlayerPlay', function playbackStarted() {
        $scope.playing = true;
    });

    // Update playing/paused status when playback stops
    $scope.$on('guacPlayerPause', function playbackStopped() {
        $scope.playing = false;
    });
    
    /**
     * Initialize the application based on the current URL.
     */
    var initializeFromUrl = function initializeFromUrl() {
        // Check if we're in remote mode
        if (urlParamService.isPath('/remote')) {
            $scope.remoteMode = true;
            
            // Get the URL parameter
            var url = urlParamService.getParam('url');
            if (url) {
                $scope.downloading = true;
                
                // Download the remote file
                remoteFileService.downloadFile(url)
                    .then(function success(blob) {
                        $scope.selectedRecording = blob;
                        $scope.downloading = false;
                    })
                    .catch(function error(message) {
                        $scope.error = true;
                        $scope.errorMessage = message;
                        $scope.downloading = false;
                        
                        // Log the error to console for debugging
                        console.error('Remote file download error:', message);
                    });
            } else {
                $scope.error = true;
                $scope.errorMessage = 'No URL specified. Use /remote?url=<url> to specify a remote recording.';
            }
        } else {
            // Local file mode (default)
            $scope.remoteMode = false;
        }
    };
    
    // Initialize the application
    initializeFromUrl();

}]);
