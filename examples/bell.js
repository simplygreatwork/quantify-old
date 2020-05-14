
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

let circuit = new Circuit(2)
circuit.apply().h(0).x(1, [0])
circuit.evaluate().print({
	filter: true
})
