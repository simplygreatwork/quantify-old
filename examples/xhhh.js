
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

let circuit = new Circuit(4)
circuit.apply()
	.x(0)
	.h(1)
	.h(2)
	.h(3)
.evaluate().print()
