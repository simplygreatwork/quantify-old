
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

let circuit = new Circuit(2)
circuit.apply().h(0).cnot(1, 0).evaluate().print()
