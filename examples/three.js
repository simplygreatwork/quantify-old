
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

let size = 3
let circuit = new Circuit(size)
for (let i = 0; i < size; i++) {
	circuit.apply().h(i)
}
circuit.evaluate().print({
	filter: true
})
