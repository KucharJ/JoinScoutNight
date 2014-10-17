ScoutNight = new function()
{
    this.location = "";
    this.unamedParent = 0;

    this.hideError = function(id)
    {
        $("#" + id).hide();
    };

    this.setError = function(id, text)
    {
        $("#" + id).show();
        $("#" + id).html(text);
    };

    this.hideSuccess = function(id)
    {
        $("#" + id).hide();
    };

    this.setSuccess = function(id, text)
    {
        $("#" + id).show();
        $("#" + id).html(text);
    };

    this.validateInput = function()
    {
        if($("#boysName").val() == ""
            || $("#boysAge").val() == ""
            || $("#boysGrade").val() == ""
            || $("#school").val() == ""
            || $("#parentsName").val() == ""
            || $("#emailAddress").val() == ""
            || $("#phone").val() == "")
        {
            this.setError("signin-error",
                "<div style=\"color: red;display: block;text-align: center;margin: 2px auto;width: 100%;\">Please fill out everything so your child can be placed in the correct rank. This information will not be shared and will only be used for our records.</div>");
            return false;
        }
        else
        {
            return true;
        }
    };

    this.submitButton = function()
    {
        this.hideError("signin-error");
        if(this.validateInput())
        {
            var boysName = $("#boysName").val();
            var boysAge = $("#boysAge").val();
            var boysGrade = $("#boysGrade").val();
            var school = $("#school").val();
            var parent = $("#parentsName").val();
            var email = $("#emailAddress").val();
            var phone = $("#phone").val();


            var data = boysName + "," + boysAge + "," + boysGrade + ","
                + school + "," + parent + "," + email + "," + phone + ",,";
            if(parent === "")
            {
                this.writeToFile(data, "UnknowParent-" + this.unamedParent);
                ++this.unamedParent;
            }
            else
            {
                this.writeToFile(data, parent);
            }

            this.clearButton();
            this.setSuccess("signin-success",
                "<div style=\"color: green;display: block;text-align: center;margin: 2px auto;width: 100%;\">Thank you!</div>");
            $window.setTimeout(this.hideSuccess("signin-success"), 5000);
        }
    };
    
    this.clearButton = function()
    {
        $("#boysName").val("");
        $("#boysAge").val("");
        $("#boysGrade").val("");
        $("#school").val(this.location);
        $("#parentsName").val("");
        $("#emailAddress").val("");
        $("#phone").val("");
    };
    
    this.writeToFile = function(info, parent)
    {
        var blob = new Blob([info], {type: "text/plain;charset=utf-8"});
        saveAs(blob, parent + ".txt");
    };
};