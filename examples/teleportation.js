
const Circuit = require('../src/circuit')

let circuit = Circuit('set state \'a\' on qubit 2', 5)
state_a(circuit, 2)
circuit.run()

circuit = Circuit('set state \'a\' on qubit 1', 5)
state_a(circuit, 1)
circuit.run()

circuit = Circuit('set state \'a\' on source qubit 1 then teleport to destination qubit 2', 5)
state_a(circuit, 1)
teleport(circuit, 1, 2)
measure(circuit, 1, 2)
circuit.run()

circuit = Circuit('set state \'b\' on destination qubit 1', 5)
state_b(circuit, 1)
circuit.run()

circuit = Circuit('set state \'b\' on source qubit 4', 5)
state_b(circuit, 4)
circuit.run()

circuit = Circuit('set state \'b\' on source qubit 4 then teleport to destination qubit 1', 5)
state_b(circuit, 4)
teleport(circuit, 4, 1)
measure(circuit, 4, 1)
circuit.run()

function state_a(circuit, from) {
	
	circuit.apply().h(from).r4(from).h(from).r4(from).h(from)
}

function state_b(circuit, from) {
	
	circuit.apply().h(from).r8(from).h(from).r4(from).h(from)
}

function teleport(circuit, from, to) {
	
	circuit.apply()
	.h(from)
	.h(to)
	.cnot(0, [to])
	.cnot(0, [from])
	.h(from)
	.cnot(to, [0])
	.h(to)
	.cnot(to, [from])
}

function measure(circuit, from, to) {
	
	circuit.apply().h(from).h(0)
}
