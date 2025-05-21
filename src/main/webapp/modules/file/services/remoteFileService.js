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
 * Service for downloading remote files.
 */
angular.module('file').factory('remoteFileService', ['$http', '$q',
    function remoteFileService($http, $q) {
    
    var service = {};
    
    /**
     * Decodes a base64 encoded URL if necessary.
     *
     * @param {String} url
     *     The URL to decode, which may or may not be base64 encoded.
     *
     * @returns {String}
     *     The decoded URL.
     */
    var decodeUrlIfNeeded = function decodeUrlIfNeeded(url) {
        // Check if the URL appears to be base64 encoded
        if (/^[A-Za-z0-9+/=]+$/.test(url)) {
            try {
                return atob(url);
            } catch (e) {
                // If decoding fails, return the original URL
                return url;
            }
        }
        return url;
    };
    
    /**
     * Checks if an error is likely a CORS-related error
     * 
     * @private
     * @param {Object} error
     *     The error object from an HTTP request
     * 
     * @returns {Boolean}
     *     True if the error appears to be CORS-related, false otherwise
     */
    var isCorsError = function isCorsError(error) {
        // CORS errors typically have status 0 and no response data
        return error.status === 0;
    };
    
    /**
     * Downloads a file from the specified URL and returns it as a Blob.
     *
     * @param {String} url
     *     The URL to download from. This may be either a raw URL or a base64 encoded URL.
     *
     * @returns {Promise.<Blob>}
     *     A promise that resolves with the downloaded file as a Blob, or rejects
     *     if an error occurs.
     */
    service.downloadFile = function downloadFile(url) {
        var deferred = $q.defer();
        
        // Decode the URL if it's base64 encoded
        var decodedUrl = decodeUrlIfNeeded(url);
        
        // Download the file
        $http.get(decodedUrl, { responseType: 'blob' })
            .then(function success(response) {
                // Create a Blob with the file name from the URL
                var fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1);
                var blob = new Blob([response.data], { type: response.data.type });
                blob.name = fileName || 'recording.guac';
                deferred.resolve(blob);
            })
            .catch(function error(response) {
                var errorMsg;
                
                if (isCorsError(response)) {
                    errorMsg = 'CORS Error: Unable to access the remote file due to browser security restrictions. ' +
                              'The server hosting the recording must include the "Access-Control-Allow-Origin" header. ' +
                              'URL: ' + decodedUrl;
                } else {
                    // Provide more descriptive error messages based on status code
                    switch (response.status) {
                        case 404:
                            errorMsg = 'File Not Found (404): The requested recording could not be found at URL: ' + decodedUrl;
                            break;
                        case 403:
                            errorMsg = 'Access Denied (403): You do not have permission to access this recording at URL: ' + decodedUrl;
                            break;
                        case 401:
                            errorMsg = 'Authentication Required (401): You need to authenticate to access this recording at URL: ' + decodedUrl;
                            break;
                        case 500:
                            errorMsg = 'Server Error (500): The server encountered an error while processing your request for URL: ' + decodedUrl;
                            break;
                        case -1:
                            errorMsg = 'Network Error: Unable to connect to the server. The server may be down or the URL may be invalid: ' + decodedUrl;
                            break;
                        default:
                            errorMsg = 'Failed to download file (Status ' + response.status + '): ' + 
                                      (response.statusText || 'Unknown error') + ' - URL: ' + decodedUrl;
                    }
                }
                
                console.error('Remote file download error:', errorMsg);
                deferred.reject(errorMsg);
            });
        
        return deferred.promise;
    };
    
    return service;
}]);
