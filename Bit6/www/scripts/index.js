// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        console.log("device ready");
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        var opts = { 'apikey': '1cqvh-uF0UfjHF2s8P' };
        b6 = Bit6.init(opts);

        if (!angular.isUndefined(getLocalObject('user')) && getLocalObject('user').loggedIn == true)
        {
            signIn(getLocalObject('user').usr, getLocalObject('user').pass);
        }
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var element = document.getElementById("deviceready");
        element.innerHTML = 'Device Ready';
        element.className += ' ready';

        document.addEventListener('offline', function () {
            navigator.notification.alert("Network error! You went offline.");
        }, false);

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();