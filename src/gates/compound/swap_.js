
module.exports = function(circuit, q1, q2) {
	
	circuit.apply()
		.cnot(q2, q1).h(q1).h(q2)
		.cnot(q2, q1).h(q1).h(q2)
		.cnot(q2, q1)
}
