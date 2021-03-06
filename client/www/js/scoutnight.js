(function(){
    var JSNApp = angular.module('JSNInfo', []);

    JSNApp.controller('SignInController', ['$scope', function($scope) {
        this.firebaseRef = new Firebase('https://popping-inferno-6589.firebaseio.com');

        this.scoutName = new String();
        this.scoutSchool = new String();
        this.parentName = new String();
        this.parentEmail = new String();
        this.parentPhone = new String();
        this.scoutGrade = 'Choose One';
        this.scoutAge = 0;

        this.scoutNameError = false;
        this.scoutNameErrorText = 'Please fill out the scout\'s name.';
        this.scoutAgeError = false;
        this.scoutAgeErrorText = 'Please fill out the scout\'s Age, between 5 and 15.';
        this.scoutGradeError = false;
        this.scoutGradeErrorText = 'Please fill out the scout\'s grade.';
        this.scoutSchoolError = false;
        this.scoutSchoolErrorText = 'Please fill out the scout\'s school.';
        this.parentNameError = false;
        this.parentNameErrorText = 'Please fill out the parent\'s name.';
        this.parentEmailError = false;
        this.parentEmailErrorText = 'Please fill out the parent\'s email.';
        this.parentPhoneError = false;
        this.parentPhoneErrorText = 'Please fill out the scout\'s name.';

        this.showError = false;
        this.errorText = 'Please fill out everything so your child can be placed in the correct rank. This information will not be shared and will only be used for our records.';

        this.removeError = function()
        {
            this.showError = false;
        };

        this.displayError = function()
        {
            this.showError = true;
        };

        this.addScout  = function() {
            // Perform Error checking and save if everything is valid.
            var errorFound = this.performValidation();

            if(!errorFound)
            {
                // Send Data!!
                // Create JSON data:
                var correctData = 
                {
                    "scoutName": this.scoutName,
                    "scoutSchool": this.scoutSchool,
                    "parentName": this.parentName,
                    "parentEmail": this.parentEmail,
                    "parentPhone": this.parentPhone,
                    "scoutGrade": this.scoutGrade,
                    "scoutAge": this.scoutAge
                };
                // TODO SEND DATA!!
                this.firebaseRef.push(correctData);
                // check that the data was saved successfully.
                // Reset the form!
                this.resetForm();
            }
            else
            {
                this.displayError();
            }
        };

        this.clearScout  = function() {
            // Clear all data and reset the form to clean.
            this.resetForm();
        };

        this.resetForm = function() {
            this.removeError();
            this.scoutName = new String();
            this.scoutSchool = new String();
            this.parentName = new String();
            this.parentEmail = new String();
            this.parentPhone = new String();
            this.scoutGrade = 'Choose One';
            this.scoutAge = 0;
            
            // Reset Errors:
            this.scoutNameError = false;
            this.scoutAgeError = false;
            this.scoutSchoolError = false;
            this.parentNameError = false;
            this.parentEmailError = false;
            this.parentPhoneError = false;
            this.scoutGradeError = false;
        };

        this.validateScoutName = function() {
            // Check Scout Name:
            if(!this.scoutName || this.scoutName.length === 0)
            {
                this.scoutNameError = true;
            }
            else
            {
                this.scoutNameError = false;
            }
        };

        this.validateScoutAge = function() {
            // Check Scout's Age:
            if(!this.scoutAge || this.scoutAge < 5 || this.scoutAge > 15)
            {
                this.scoutAgeError = true;
            }
            else
            {
                this.scoutAgeError = false;
            }
        };

        this.validateScoutGrade = function() {
            // Check Scout's Grade:
            if(!this.scoutGrade || this.scoutGrade.length === 0 || this.scoutGrade === 'Choose One')
            {
                this.scoutGradeError = true;
            }
            else
            {
                this.scoutGradeError = false;
            }
        };

        this.validateScoutSchool = function() {
            // Check Scout's school:
            if(!this.scoutSchool || this.scoutSchool.length === 0)
            {
                this.scoutSchoolError = true;
            }
            else
            {
                this.scoutSchoolError = false;
            }
        };

        this.validateParentName = function() {
            // Check Parent's name:
            if(!this.parentName || this.parentName.length === 0)
            {
                this.parentNameError = true;
            }
            else
            {
                this.parentNameError = false;
            }
        };

        this.validateParentEmail = function() {
            // Check Parent's email:
            if(!this.parentEmail || this.parentEmail.length === 0)
            {
                this.parentEmailError = true;
                this.parentEmailErrorText = 'Please fill out the parent\'s email.';
            }
            else
            {

                // TODO: Fix email check
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
                var valid = emailPattern.test(this.parentEmail);
                if(!valid)
                {
                    this.parentEmailError = true;
                    this.parentEmailErrorText = 'Invalid parent\'s email address.';
                }
                else
                {
                    this.parentEmailError = false;
                }
            }
        };

        this.validateParentPhone = function() {
            // Check Parent's phone:
            if(!this.parentPhone || this.parentPhone.length === 0)
            {
                this.parentPhoneError = true;
            }
            else
            {
                // Ensure valid phone number, match numbers and "-"" and "()".
                this.parentPhoneError = false;
            }
        };

        this.performValidation = function() {
            // Check Scout Name:
            this.validateScoutName();

            // Check Scout's Age:
            this.validateScoutAge();
            

            // Check Scout's Grade:
            this.validateScoutGrade();

            // Check Scout's school:
            this.validateScoutSchool();

            // Check Parent's name:
            this.validateParentName();

            // Check Parent's email:
            this.validateParentEmail();

            // Check Parent's phone:
            this.validateParentPhone();

            // Check errors!
            return this.scoutNameError || this.scoutAgeError || this.scoutSchoolError || this.parentNameError || this.parentEmailError || this.parentPhoneError || this.scoutGradeError;
        };
    }]);

})();