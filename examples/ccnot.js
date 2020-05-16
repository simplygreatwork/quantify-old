
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

let circuit = new Circuit(3)
circuit.apply().evaluate().print()

circuit = new Circuit(3)
circuit.apply().x(0).x(2, [0, 1]).evaluate().print()

circuit = new Circuit(3)
circuit.apply().x(1).x(2, [0, 1]).evaluate().print()

circuit = new Circuit(3)
circuit.apply().x(0).x(1).x(2, [0, 1]).evaluate().print()

circuit = new Circuit(3)
circuit.apply().x(0).x(1).x(2).x(2, [0, 1]).evaluate().print()
