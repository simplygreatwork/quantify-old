
module.exports = class Chain {
	
	constructor(circuit) {
		
		this.circuit = circuit
		this.simple(require('./gates'))
		this.compound(require('./gates/compound/index'))
	}
	
	simple(gates) {
		
		let chain = this
		Object.keys(gates).forEach(function(key) {
			let circuit = this.circuit
			this[key.toLowerCase()] = function() {
				circuit.apply({
					name: this,
					matrix: gates[this],
					targets: typeof arguments[0] == 'Array' ? arguments[0] : [arguments[0]],
					controls: arguments[1] || []
				})
				return chain
			}.bind(key)
		}.bind(this))
	}
	
	compound(gates) {
		
		let chain = this
		Object.keys(gates).forEach(function(key) {
			let circuit = this.circuit
			this[key.toLowerCase()] = function() {
				gates[key](circuit, ...arguments)
				return chain
			}.bind(key)
		}.bind(this))
	}
	
	verbose() {
		
		return this.circuit
	}
	
	run() {
		
		this.circuit.run(...arguments)
		return this.circuit
	}
}
