describe ("Asynchronous (async)", function() {

	it ("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.async();
		expect(mech).to.have.property('toString');
		expect(m._.AsyncF).to.not.eql(undefined);
	});

	it ("should have correct properties", function() {
		var mech = m.async(m.num(1), m.num(2), m.num(3));
		expect(mech.mc.isMech).to.be.true;
		expect(mech.mc.go).to.equal(1);
		expect(mech.dst.isMech).to.be.true;
		expect(mech.dst.go).to.equal(2);
		expect(mech.bh.isMech).to.be.true;
		expect(mech.bh.go).to.equal(3);
	});

	it ("should do nothing and return undefined when asynchronous mechanisms is not an asynchronous mechanism", function() {
		var mech = m.async();
		expect(mech.go).to.be.undefined;
		expect(mech.goNum).to.be.undefined;
		expect(mech.goStr).to.be.undefined;
		expect(mech.goArr[0]).to.be.undefined;
		expect(mech.goBool).to.equal(false);

		var mech2 = m.async(null);
		expect(mech2.go).to.be.null;
		expect(mech2.goNum).to.be.null;
		expect(mech2.goStr).to.be.null;
		expect(mech2.goArr[0]).to.be.null;
		expect(mech2.goBool).to.equal(false);

		var mech3 = m.async(null, null);
		expect(mech3.go).to.be.null;
		expect(mech3.goNum).to.be.null;
		expect(mech3.goStr).to.be.null;
		expect(mech3.goArr[0]).to.be.null;
		expect(mech3.goBool).to.equal(false);

		var mech4 = m.async(null, null, null);
		expect(mech4.go).to.be.null;
		expect(mech4.goNum).to.be.null;
		expect(mech4.goStr).to.be.null;
		expect(mech4.goArr[0]).to.be.null;
		expect(mech4.goBool).to.equal(false);

		var mech5 = m.async(4);
		expect(mech5.go).to.equal(4);
		expect(mech5.goNum).to.equal(4);
		expect(mech5.goStr).to.equal("4");
		expect(mech5.goArr).to.contain(4);
		expect(mech5.goBool).to.equal(true);
	});

	it ("should return the contained value", function() {
		m.cell("A:1");

		var mech = m.async(
			m.asyncify(m.add(4, 5)),
			m.cellRef("A:1")
		);
		expect(mech.go).to.equal(9);
		expect(m.cellGet("A:1").go).to.equal(9);

		m.cellSet("A:1", null).go;
		expect(mech.goNum).to.equal(9);
		expect(m.cellGet("A:1").goNum).to.equal(9);

		m.cellSet("A:1", null).go;
		expect(mech.goStr).to.equal("(4 + 5)");
		expect(m.cellGet("A:1").goStr).to.equal("(4 + 5)");

		m.cellSet("A:1", null).go;
		expect(mech.goArr).to.contain(9)
		expect(m.cellGet("A:1").goArr).to.contain(9);

		m.cellSet("A:1", null).go;
		expect(mech.goBool).to.be.true;
		expect(m.cellGet("A:1").goBool).to.be.true;
	});

});
