
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

let circuit = new Circuit(2)
circuit.apply().evaluate().print()
circuit.apply().x(1, [0]).evaluate().print()
circuit.apply().x(0).x(1, [0]).evaluate().print()
circuit.apply().x(0).x(1).x(1, [0]).evaluate().print()
