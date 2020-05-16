
module.exports = function(circuit, target, control1, control2) {
	
	circuit.apply()
	.h(target)
		.cnot(target, control2).tdg(target).cnot(target, control1).t(target)
		.cnot(target, control2).tdg(target).cnot(target, control1).t(target)
	.h(target)
	.t(control2)
	.cnot(control2, control1)
		.t(control1).tdg(control2)
	.cnot(control2, control1)
}
