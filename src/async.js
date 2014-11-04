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