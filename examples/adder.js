
const Circuit = require('../src/circuit.js')

let result = {}
let circuit = new Circuit(10)
circuit.apply()
.x(a(0))
.x(a(1))
.x(a(2))
.x(b(3))
.evaluate()
.print()
.results(function(each) {
	result.a = parseInt(each.state.substring(1, 5).split('').reverse().join(''), 2)
	result.b = parseInt(each.state.substring(5, 9).split('').reverse().join(''), 2)
})

circuit = new Circuit(10)
circuit.apply()
.x(a(0))
.x(a(1))
.x(a(2))
.x(b(3))
add(circuit, a, b, cin, cout)
circuit
.evaluate()
.print()
.results(function(each) {
	result.c = parseInt(each.state.substring(5, 9).split('').reverse().join(''), 2)
	console.log(`${result.a} + ${result.b} = ${result.c}`)
})

function add(circuit, a, b, cin, cout) {
	
	majority(circuit, cin(0), b(0), a(0))
	majority(circuit, a(0), b(1), a(1))
	majority(circuit, a(1), b(2), a(2))
	majority(circuit, a(2), b(3), a(3))
	circuit.apply()
	.cnot(a(3), cout(0))
	unmajority(circuit, a(2), b(3), a(3))
	unmajority(circuit, a(1), b(2), a(2))
	unmajority(circuit, a(0), b(1), a(1))
	unmajority(circuit, cin(0), b(0), a(0))
}

function majority(circuit, a, b, c) {
	
	circuit.apply()
	.cnot(b, c)
	.cnot(a, c)
	.ccnot(c, a, b)
}

function unmajority(circuit, a, b, c) {
	
	circuit.apply()
	.ccnot(c, a, b)
	.cnot(a, c)
	.cnot(b, a)
}

function cin() {
	return 0
}

function a(index) {
	return 1 + index
}

function b(index) {
	return 5 + index
}

function cout() {
	return 9
}
