
const Circuit = require('../src/circuit')

let circuit = Circuit('teleportation', 5)
entanglePair(circuit)
preparePayload(circuit)
send(circuit)
receive(circuit)
verify(circuit)

function entanglePair(circuit) {
	
	circuit.apply()
	.h(2)
	.cnot(4, [2])
	.barrier([0, 1, 2, 3, 4])
}

function preparePayload(circuit) {
	
	circuit.apply()
	.x(0)
	.h(0)
	.t(0)
	.barrier([0, 1, 2, 3, 4])
}

function send(circuit) {
	
	circuit.apply()
	.h(0)
	.h(2)
	.cnot(0, [2])
	.h(2)
	.measure(0, 0)
	.measure(2, 2)
	.barrier([3, 4])
}

function receive(circuit) {
	
	circuit.apply()
	.x(4)
	.z(4)
	.t(0)
	.barrier([3, 4])
}

function verify(circuit) {
	
	circuit.apply()
	.tdg(4)
	.h(4)
	.x(4)
	.measure(4, 4)
}

circuit.run('verbose')