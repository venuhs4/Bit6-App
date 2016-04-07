var b6;
var b6Events = window;
JSBroadcaster.initialize(conversationBC);
console.log("bit6 custom");
function signIn(user, pass) {
    var ident = 'usr:' + user;
    b6.session.login({ identity: ident, password: pass }, function (err) {
        if (err) {
            navigator.notification.alert('Sign in error');
            return false;
        }
        else {

            navigator.notification.alert('Sign in sucess');
            setLocalObject('user', {
                loggedIn: true,
                usr: user,
                pass: pass
            });
            afterSignIn();
            return true;
        }
    });

}
function signUp(user, pass) {
    var ident = 'usr:' + user;
    b6.session.signup({ identity: ident, password: pass }, function (err) {
        if (err) {
            console.log('signup error', err);
            navigator.notification.alert('Sign up error');
            return false;
        }
        else {
            b6Events.dispatchEvent(new CustomEvent("onSignIn"));
            navigator.notification.alert('Sign in success');
            setLocalObject('user', {
                loggedIn: true,
                usr: user,
                pass: pass
            });
            afterSignIn();
            return true;
        }
    });
}
function afterSignIn() {
    setLocalObject("conversations", b6.conversations);
    b6.on('conversation', function (c, op) {
        b6Events.dispatchEvent(new CustomEvent("onConversation"));
    });
    b6.on('incomingCall', function (d) {
        b6Events.dispatchEvent(new CustomEvent("onIncommingCall"));
        navigator.notification.alert("You are getting call " + JSON.stringify(d));
    });
    b6.on('video', function (v, d, op) {
        b6Events.dispatchEvent(new CustomEvent("onVideo"));
        navigator.notification.alert("You are getting video call " + JSON.stringify(d));
    });
    b6.on('message', function (m, op) {
        b6Events.dispatchEvent(new CustomEvent("onMessage"), { m: m, op: op });
    });
}
function sendMessage(user, message) {
    var ident = 'usr:' + user;
    b6.compose(ident).text(message).send(function (err) {
        if (err) {
            return true;
        }
        else {
            return true;
        }
    });
}

function getLocalObject(key, defaultValue) {
    var value = localStorage[key];
    if (!angular.isUndefined(value)) {
        return JSON.parse(value)
    }
    else {
        return defaultValue;
    }
}
function setLocalObject(key, value) {
    localStorage[key] = JSON.stringify(value);
}
function editLocalObject(key, property, value) {
    var obj = getLocalObject(key);
    if (!angular.isUndefined(obj)) {
        angular.forEach(obj, function (v, i) {
            if (i == property) {
                obj[i] = value;
            }
        });
    }
    setLocalObject(key, obj);
}
function isDevice() {
    var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    if (app) {
        return true;
    } else {
        return false;
    }
}