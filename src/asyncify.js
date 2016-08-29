function asyncify(mc) {
  var f = Object.create(AsyncifyF.prototype);
  f._mc = mc;
  if (f._mc && f._mc.isMech) {
    f._mc._parDir = f;
  }
  return f;
}

function AsyncifyF() {}
AsyncifyF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  go: {
    enumerable: false,
    get: function() {
      var res = (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.go : this._mc;
      if (this._parDir && this._parDir.isAsync) {
        this._parDir.v = res;
        return this._parDir._goRet;
      }
      return res;
    }
  },
  goNum: {
    enumerable: false,
    get: function() {
      var res = (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.goNum : this._mc;
      if (this._parDir && this._parDir.isAsync) {
        this._parDir.v = res;
        return this._parDir._goRet;
      }
      return res;
    }
  },
  goStr: {
    enumerable: false,
    get: function() {
      var res = (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.goStr : this._mc;
      if (this._parDir && this._parDir.isAsync) {
        this._parDir.v = res;
        return this._parDir._goRet;
      }
      return res;
    }
  },
  goArr: {
    enumerable: false,
    get: function() {
      var res = (undefined === this._mc || null === this._mc) ? [this._mc] : this._mc.isMech ? this._mc.goArr : this._mc;
      if (this._parDir && this._parDir.isAsync) {
        this._parDir.v = res;
        return this._parDir._goRet;
      }
      return res;
    }
  },
  goBool: {
    enumerable: false,
    get: function() {
      var res = (undefined === this._mc || null === this._mc) ? false : this._mc.isMech ? this._mc.goBool : this._mc;
      if (this._parDir && this._parDir.isAsync) {
        this._parDir.v = res;
        return this._parDir._goRet;
      }
      return res;
    }
  }
});
m.asyncify = asyncify;
m._.AsyncifyF = AsyncifyF;
