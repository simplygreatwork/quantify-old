
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

let size = 12
let circuit = new Circuit(size)
for (let i = 0; i < size; i++) {
	circuit.apply().h(i)
}
circuit.evaluate().print()
