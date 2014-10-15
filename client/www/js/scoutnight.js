(function(){
    var JSNApp = angular.module('JSNInfo', []);

    JSNApp.controller('SignInController', function() {
        this.scoutInfo = {};

        this.showError = false;
        this.errorText = '';

        this.removeError = function()
        {
            this.showError = false;
        };

        this.setError = function(text)
        {
            this.errorText = text;
            this.showError = true;
        };

        this.addScout  = function() {
            // Perform Error checking and save if everything is valid.
            this.scoutInfo = {};
        };

        this.clearScout  = function() {
            // Clear all data and reset the form to clean.
            this.scoutInfo = {};
        };
    });

})();