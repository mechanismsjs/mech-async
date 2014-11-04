// mech-async.js
// version: 0.1.1
// author: Eric Hosick <erichosick@gmail.com> (http://www.erichosick.com/)
// license: MIT
(function() {
"use strict";

var root = this; // window (browser) or exports (server)
var m = root.m || {}; // merge with previous or new module
m._ = m._ || {}; // merge with pervious or new sub-module
m._["version-async"] = '0.1.1'; // version set through gulp build

// export module for node or the browser
if(typeof module !== 'undefined' && module.exports) {
	module.exports = m;
} else {
	root.m = m;
} 

function async(mec,dst,bh) {
	var f = Object.create(AsyncF.prototype);
	f._mc = mec;
	f._dst = dst;
	f._bh = bh;
	if (mec && mec.isMech) {
		f._mc._parDir = f;
	}
	return f;
}
function AsyncF() {}
AsyncF.prototype = Object.create ( Object.prototype, {
	isMech: { get: function() { return true; }},
	mc: { enumerable: false, get: function() { return this._mc; }},
	dst: { enumerable: false, get: function() { return this._dst; }},
	bh: { enumerable: false, get: function() { return this._bh; }},
	go: { enumerable: false, get: function() {
		return (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.go : this._mc;
	}},
	_goRet: { enumerable: false, get: function() {
		if (this._dst && this._dst.isMech) {
			var dest = this._dst.go;
			dest._v = this._v;
			if (this._bh && this._bh.isMech) {
				return this._bh.go;	
			} else {
				return this._v;
			}
		} else {
			return this._v;
		}
	}},
	goNum: { enumerable: false, get: function() {
		return (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.goNum : this._mc;
	}},
	goStr: { enumerable: false, get: function() {
		return (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.goStr : this._mc.toString();
	}},
	goArr: { enumerable: false, get: function() {
		return (undefined === this._mc || null === this._mc) ? [this._mc] : this._mc.isMech ? this._mc.goArr : [this._mc];
	}},
	goBool: { enumerable: false, get: function() {
		return (undefined === this._mc || null === this._mc) ? false : this._mc.isMech ? this._mc.goBool : (this._mc > 0);
	}},
});
m.async = async;
m._.AsyncF = AsyncF;

function asyncify(mc) {
	var f = Object.create(AsyncifyF.prototype);
	f._mc = mc;
	return f;
}
function AsyncifyF() {}
AsyncifyF.prototype = Object.create ( Object.prototype, {
	isMech: { get: function() { return true; }},
	go: { enumerable: false, get: function() {
		var res = (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.go : this._mc;
		if (this._parDir) {
			this._parDir._v = res;
			return this._parDir._goRet;
		}
		return res;
	}},
	goNum: { enumerable: false, get: function() {
		var res = (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.goNum : this._mc;
		if (this._parDir) {
			this._parDir._v = res;
			return this._parDir._goRet;
		}
		return res;
	}},
	goStr: { enumerable: false, get: function() {
		var res = (undefined === this._mc || null === this._mc) ? this._mc : this._mc.isMech ? this._mc.goStr : this._mc;
		if (this._parDir) {
			this._parDir._v = res;
			return this._parDir._goRet;
		}
		return res;
	}},
	goArr: { enumerable: false, get: function() {
		var res = (undefined === this._mc || null === this._mc) ? [this._mc] : this._mc.isMech ? this._mc.goArr : this._mc;
		if (this._parDir) {
			this._parDir._v = res;
			return this._parDir._goRet;
		}
		return res;
	}},
	goBool: { enumerable: false, get: function() {
		var res = (undefined === this._mc || null === this._mc) ? false : this._mc.isMech ? this._mc.goBool : this._mc;
		if (this._parDir) {
			this._parDir._v = res;
			return this._parDir._goRet;
		}
		return res;
	}}
});
m.asyncify = asyncify;
m._.AsyncifyF = AsyncifyF;


}.call(this));