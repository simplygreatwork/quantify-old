
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

circuit = new Circuit(2)
circuit.apply().x(0).evaluate().print()

circuit = new Circuit(2)
circuit.apply().x(0).swap_(0, 1).evaluate().print()

circuit = new Circuit(2)
circuit.apply().x(1).swap([0, 1], []).evaluate().print()
