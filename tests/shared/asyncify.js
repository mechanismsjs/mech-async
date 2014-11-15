describe("Asyncify (asyncify)", function() {
	it("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.asyncify();
		expect(mech).to.have.property('toString');
		expect(m.asyncify).to.not.eql(undefined);
		expect(m._.AsyncifyF).to.not.eql(undefined);
	});

	it("should have correct properties", function() {
		var mech = m.asyncify(4);
		expect(mech.isMech).to.be.equal(true);
		expect(mech._mc).to.not.be.undefined;
	});

	it("should set _parDir of child mechanisms to parent", function() {
		var mech1 = m.num(1);
		var mech4 = m.asyncify(mech1);
		expect(mech1._parDir).to.equal(mech4);
		var mech5 = m.async();
	});

	it("should be the child of an async mechanism", function() {
		var mech = m.asyncify(m.add(4, 5));
		expect(mech._parDir).to.be.undefined;
		var mech2 = m.async(mech);
		expect(mech._parDir).to.equal(mech2);
	});

	it("should be the child of an async mechanism", function() {
		var mech = m.asyncify(m.add(4, 5));
		expect(mech._parDir).to.be.undefined;
		var mech2 = m.async(mech);
		expect(mech._parDir).to.equal(mech2);
	});

	it("should act like a normal mechanism when not configured within an async aware mechanism", function() {
		var mech = m.add(m.asyncify(4), 3);
		expect(mech.go).to.equal(7);
		expect(mech.goNum).to.equal(7);
		expect(mech.goStr).to.equal("(4 + 3)");
		expect(mech.goArr).to.contain(7)
		expect(mech.goBool).to.equal(true);
	});

	it("should return undefined when not configured", function() {
		var mech = m.asyncify();
		expect(mech.go).to.be.undefined;
		expect(mech.goNum).to.be.undefined;
		expect(mech.goStr).to.be.undefined;
		expect(mech.goArr[0]).to.be.undefined;
		expect(mech.goBool).to.equal(false);

		var mech2 = m.asyncify(null);
		expect(mech2.go).to.be.null;
		expect(mech2.goNum).to.be.null;
		expect(mech2.goStr).to.be.null;
		expect(mech2.goArr[0]).to.be.null;
		expect(mech2.goBool).to.equal(false);
	});

	it("should return the contained value immediately (asyncify isn't actually asynchronous).", function() {
		var mech = m.asyncify(m.add(14, 5));
		expect(mech.go).to.equal(19);
		expect(mech.goNum).to.equal(19);
		expect(mech.goStr).to.equal("(14 + 5)");
		expect(mech.goArr).to.contain(19)
		expect(mech.goBool).to.equal(true);
	});

});