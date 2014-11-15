// README: 
// Must $ gulp webserver then browse to
// http://test.development.com:4050 or Access-Control-Allow-Origin exception is thrown

describe("running web specific tests", function() {

	beforeEach(function() {
		for (var key in m.cellWorkBook) {
			if (m.cellWorkBook.hasOwnProperty(key)) {
				delete m.cellWorkBook[key]; // slow but for tests ok
			}
		}
	});

	// asyncmc - the asynchronous mechanism to run
	// dstmc - a reference to the destination mechanism where the result is stored - sets "v" property
	// optional bhmc - the behavior to run after the asynchronous call is completed
	it("should be easy to use asynchronous results", function() {
		m.cell("A:1", 5); // define the cell
		var mech = m.async(
			m.ajax.get("http://test.development.com:4050/testsweb/testdata/test02.json"),
			m.cellRef("A:1"),
			m.assert(m.eqlNum(5, m.cellGet("A:1")), "Expected result to be 5")
		).go;

	});
});