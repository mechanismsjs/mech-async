[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechanisms"
[mech-ajax-home-link]: https://github.com/mechanismsjs/mech-ajax "Ajax mechanisms."
[mech-mongo-home-link]: https://github.com/mechanismsjs/mech-mongo "Mongo mechanisms."

# mech-async

Provides mechanisms to support asynchronous mechanisms like those in the [mech-ajax][mech-ajax-home-link] and [mech-mongo][mech-mongo-home-link] libraries.

See [Mechanisms Home][mech-home-link] for more information and other libraries.

Supported Mechanisms:

* *[async](#async-mechanism)* - Support asynchronous calls.
* *[asyncify](#asyncify-mechanism)* - Treats synchronous mechanisms and literals as asynchronous mechanisms.

# Supported Mechanisms

## <a name="async-mechanism"></a> Async Mechanism

A mechanism for supporting asynchronous calls (Ajax, reading files, accessing databases, etc).

See [mech-ajax][mech-ajax-home-link] for examples.

## <a name="asyncify-mechanism"></a> Asyncify Mechanism

Allows a synchronous mechanism to act like an asynchronous mechanism. However, results are returned immediately.

**HINT**: Great for testing. Use asyncify for mocking successful asychronyous calls.

```javascript
// asyncify any mechanism
m.asyncify(m.add(14, 5)).go; // immediately returns 19

// asyncify a literal
m.asyncify("hello").go; // immediately returns "hello"
```

*m.asyn* will return an immediate value and still behave as if the call was asynchronous

```javascript
m.cell("A:1"); // cell to place async call value
m.async(
	m.asyncify(m.add(14, 5)),
	m.cellRef("A:1"),
	m.writeLn(m.cell("A:1"))
).go; // returns 19 immediately
```

Async will return 19 immediately, the value in cell *A:1* (where we are placing the results of the asynchronous call) is set to 19 and we will have *19* written to the console (m.writeLn is the mechanism m.async runs when the asynchronous call is complete).

See [mech-ajax][mech-ajax-home-link] for detailed documention on *m.async()*.

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
