// Generated by CoffeeScript 1.9.1
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.bit6 || (window.bit6 = {});

  bit6.MyRtc = (function(superClass) {
    extend(MyRtc, superClass);

    function MyRtc(phonertc) {
      this.phonertc = phonertc;
      MyRtc.__super__.constructor.apply(this, arguments);
    }

    MyRtc.prototype.init = function(outgoing, iceServers) {
      this.outgoing = outgoing;
      return MyRtc.__super__.init.apply(this, arguments);
    };

    MyRtc.prototype.update = function(capture, opts, remoteOpts) {
      var cfg, s;
      if (this.session) {
        return;
      }
      this.options = opts;
      console.log('Rtc2.update' + JSON.stringify(this.options) + ' outgoing=' + this.outgoing);
      cfg = {
        isInitiator: this.outgoing,
        streams: {
          audio: this.options.audio,
          video: this.options.video
        }
      };
      if (this.pcConfig.iceServers.length > 1) {
        s = this.pcConfig.iceServers[1];
        cfg.turn = {
          host: s.url,
          username: s.username,
          password: s.credential
        };
      }
      this.session = new this.phonertc.Session(cfg);
      this.session.on('sendMessage', (function(_this) {
        return function(data) {
          console.log('Rtc2.sess.send: ' + JSON.stringify(data));
          switch (data.type) {
            case 'offer':
            case 'answer':
              _this.bufferedOfferAnswer = {
                type: data.type,
                sdp: data.sdp
              };
              return _this._maybeSendOfferAnswer();
            case 'candidate':
              data.sdpMLineIndex = data.label;
              return _this._handleIceCandidate(data);
            case 'IceGatheringChange':
              if (data.state === 'COMPLETE') {
                return _this._handleIceCandidate({});
              }
              break;
            case 'bye':
              return console.log(' - bye');
            case '__set_session_key':
              return console.log('Rtc2 - session key set');
          }
        };
      })(this));
      this.session.on('answer', (function(_this) {
        return function() {
          return console.log('Rtc2.sess.answer');
        };
      })(this));
      this.session.on('disconnect', (function(_this) {
        return function() {
          return console.log('Rtc2.sess.disconnect');
        };
      })(this));
      return this.session.call();
    };

    MyRtc.prototype.stop = function() {
      var ref;
      console.log('Rtc2.stop');
      if ((ref = this.session) != null) {
        ref.close();
      }
      this.session = null;
      return MyRtc.__super__.stop.apply(this, arguments);
    };

    MyRtc.prototype.gotRemoteOfferAnswer = function(msg, capture) {
      var e;
      console.log("Rtc2.gotRemoteOfferAnswer: " + msg.type + ' msg=' + JSON.stringify(msg) + ' sess=' + this.session);
      switch (msg.type) {
        case 'offer':
        case 'answer':
          if (msg.sdp.indexOf('m=video') > 0) {
            e = document.createElement('div');
            this.remoteEls['dummy'] = e;
            this.emit('video', e, 1);
          }
          if (this.session) {
            return this.session.receiveMessage(msg);
          }
      }
    };

    MyRtc.prototype.gotHangup = function(msg) {
      return this.stop();
    };

    return MyRtc;

  })(bit6.Rtc);

}).call(this);
