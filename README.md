[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechanisms"
[mech-ajax-home-link]: https://github.com/mechanismsjs/mech-ajax "Ajax mechanisms."
[mech-mongo-home-link]: https://github.com/mechanismsjs/mech-mongo "Mongo mechanisms."
[mech-scope-cell-home-link]: https://github.com/mechanismsjs/mech-scope-cell "Cell based scoping mechanisms."
[mech-scope-stack-home-link]: https://github.com/mechanismsjs/mech-scope-stack "Stack based scoping mechanisms."

# mech-async

Provides mechanisms to support asynchronous calls like those in the [mech-ajax][mech-ajax-home-link] and [mech-mongo][mech-mongo-home-link] libraries.

See [Mechanisms Home][mech-home-link] for more information and other libraries.

Supported Mechanisms:

* *[async](#async-mechanism)* - Support asynchronous calls.
* *[asyncify](#asyncify-mechanism)* - Treats synchronous mechanisms and literals as asynchronous mechanisms.

## No Fibers or Promises

The intent of the async mechanism library is to provide an easy way to do asynchronous call backs without the need for fibers or promises.

There is nothing fancy going on behind the scenes. Underneath, these mechanisms work by using traditional javascript callbacks.

# Supported Mechanisms

## <a name="async-mechanism"></a> Async Mechanism

A mechanism for supporting asynchronous calls (Ajax, reading files, accessing databases, etc).

### Traditionally

Traditionally, asynchronous callbacks are handled using a function. The documentation for [mongodb npm](https://www.npmjs.org/package/mongodb) has some great examples. Provided is one of the examples:

```javascript
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';
MongoClient.connect(url, function(err, db) {
  db.close();
});
```

### Using The Async Mechanism

*m.async* takes three parameters:

* **mech** - The mechanism that will invoke an asynchronous call (ajax, mongo, async file access, etc.).
* **dest** (optional) - The destination where the result of the call is placed  (TODO: along with any errors). Scoping is done via [cell scoping][mech-scope-cell-home-link] or traditional [stack scoping][mech-scope-stack-home-link] to name a few.
* **bh** (optional) - The mechanism (policy) to run when the asynchronous call completes.

Example:

```javascript
// testdata.json on server
{
	"name" : "A Name",
	"age" : 23
}
```

```javascript
// Run in a web browser
m.async(
	m.ajax.get("http://www.example.org/testdata.json"),
	m.cellRef("A:1"),
	m.writeLn(m.cellGet("A:1"))
).go; // returns immediately
```

For the above example, invoking *go* invokes an asynchronous ajax call: the first parameter. The call returns immediately but without a value.

When the ajax call is complete, m.async is notified and places the results in the mechanism configured in the second parameter.

* cellRef - this example is using the [cell scoping][mech-scope-cell-home-link] mechanism. *cellRef(id)* returns a reference to cell *A:1* where the result of the  asynchronous call is then stored (TODO: along with any errors).
* stackRef - we could use stackRef(id) and the result would be placed on the stack.
* other - other scoping mechanisms people might implement. Really, anything you could imagine.

Finally, m.async executes the mechanism's (the policy) configured in the third parameter. This means, any and all behavior that needs to run within the asynchronous call result needs to be placed within the third parameter. This can be anything from tests (in a testing environment) to another asynchronous call.

See [mech-ajax][mech-ajax-home-link] for more examples.

## <a name="asyncify-mechanism"></a> Asyncify Mechanism

Allows synchronous mechanisms to act like asynchronous mechanisms. Note that results are returned immediately.

**HINT**: Great for testing. Use asyncify for mocking asychronyous calls.

```javascript
// asyncify any mechanism
m.asyncify(m.add(14, 5)).go; // immediately returns 19

// asyncify a literal
m.asyncify("hello").go; // immediately returns "hello"
```

*m.async* will return an immediate value and still behave as if the call was asynchronous.

```javascript
m.cell("A:1"); // cell to place async call value
m.async(
	m.asyncify(m.add(14, 5)),
	m.cellRef("A:1"),
	m.writeLn(m.cell("A:1"))
).go; // returns 19 immediately
```

Async will return 19 immediately, the value in cell *A:1* (where the results of the asynchronous call are placed) is set to 19 and 19 is written to the console (m.writeLn is the mechanism m.async runs when the asynchronous call is complete).

# Setup

## Using In Your Projects

Change directory to your node project.

		$ npm install --save mech-async

## Development

### Setup

		$ npm install

### Continuous Rebuild and Testing

See ./dist for files we build.

		$ gulp

#### Test

		$ gulp webtests

OR

Right mouse click on /testsweb/index.html and open in browser.
