
const numeric = require('../lib/numeric.js')
const circuits = {}

class Factory {
	
	constructor() {
		
	}
	
	circuit(name, size, options) {
		
		if (size !== undefined) circuits[name] = new Circuit(name, size)
		return circuits[name]
	}
	
	configure(circuit) {
		
		Object.assign(circuit, {
			
			on: function(key, func) {
				return
			},
			
			emit: function() {
				return
			}
		})
	}
}

const factory = new Factory()

module.exports = function() {
	
	circuit: function(name, size) {
		
		return factory.circuit(name, size))
	}
}
