
const Circuit = require('../src/circuit.js')

var circuit = new Circuit(5)
Circuit('base', 5).apply()
	.x(0)
	.h(2)
	.t(2)
.run()

Circuit('increment', 5).apply()
	.x(0)
	.h(2)
	.t(2)
	.ccnot(0, 1, 4)
	.ccnot(4, 2, 3)
	.ccnot(0, 1, 4)
	.ccnot(0, 1, 2)
	.cnot(1, 0)
	.x(0)
.run()

Circuit('decrement', 5).apply()
	.x(0)
	.h(2)
	.t(2)
	.x(0)
	.cnot(1, 0)
	.ccnot(circuit, 2, 0, 1)
	.ccnot(circuit, 4, 0, 1)
	.ccnot(circuit, 3, 4, 2)
	.ccnot(circuit, 4, 0, 1)
.run()
