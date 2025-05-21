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
 * Service for parsing URL parameters.
 */
angular.module('app').factory('urlParamService', ['$location', 
    function urlParamService($location) {
    
    var service = {};
    
    /**
     * Gets the value of the specified URL parameter.
     *
     * @param {String} name
     *     The name of the parameter to get.
     *
     * @returns {String}
     *     The value of the parameter, or null if the parameter does not exist.
     */
    service.getParam = function getParam(name) {
        return $location.search()[name] || null;
    };
    
    /**
     * Determines if the current path matches the specified path.
     *
     * @param {String} path
     *     The path to check.
     *
     * @returns {Boolean}
     *     true if the current path matches the specified path, false otherwise.
     */
    service.isPath = function isPath(path) {
        return $location.path() === path;
    };
    
    return service;
}]);
