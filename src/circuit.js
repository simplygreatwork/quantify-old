
const numeric = require('../lib/numeric.js')
const Chain = require('./chain')
const circuits = {}

class Circuit {
	
	constructor(name, size, options) {
		
		this.name = name
		this.size = size
		this.options = options || []
		this.gates = []
		const squared = Math.pow(2, size)
		this.amplitudes = new numeric.T(numeric.rep([squared], 0), numeric.rep([squared], 0))
		this.amplitudes.x[0] = 1
		this.chain = new Chain(this)
		this.emitter = require('./emitter')()
		this.listen()
	}
	
	apply(gate) {
		
		if (arguments.length === 0) return this.chain
		this.gates.push(gate)
	}
	
	run() {
		
		this.flags(...arguments)
		this.emit('circuit-will-run', this)
		this.gates.forEach(function(gate, index) {
			this.emit('gate-will-run', gate, index, this.gates.length)
			let matrix = gate.matrix(gate.targets.length)
			gate.controls.forEach(function(control) {
				matrix = this.controlled(matrix)
			}.bind(this))
			const qubits = gate.controls.concat(gate.targets)
			this.amplitudes = this.expand(matrix, this.size, qubits).dot(this.amplitudes)
			if (false) this.amplitudes = this.amplitudes.div(this.amplitudes.norm2())
			this.emit('gate-did-run', gate, index, this.gates.length)
		}.bind(this))
		this.amplitudes = this.amplitudes.div(this.amplitudes.norm2())
		this.state = this.state_()
		this.emit('circuit-did-run', this)
		return this
	}
	
	flags() {
		
		Array.from(arguments).forEach(function(each, index) {
			if (each == 'verbose') this.options.verbose = true
			if (each == 'changed') this.options.changes = true
			if (each == 'filtered') this.options.filtered = true
		}.bind(this))
	}
	
	// print 000.0000
	
	print() {		// also need to be able to print circle notation angles
		
		console.log()
		this.state.forEach(function(each, index) {
			if (this['changed?'](each, index)) {
				console.log(`    |${each.bits}> ${each.probability} ${each.amplitude} (was ${this.last[index].probability} ${this.last[index].amplitude})`)
			} else {
				if (each.probability != '0.0000%') {
					console.log(`    |${each.bits}> ${each.probability} ${each.amplitude} `)
				}
			}
		}.bind(this))
		return this
	}
	
	'changed?'(state, index) {
		
		if (this.last) {
			if (state.amplitude != this.last[index].amplitude) return true
			if (state.probability != this.last[index].probability) return true
		}
		return false
	}
	
	results(fn) {
		
		this.state.forEach(function(each, index) {
			if (each.probability != '0.0000%') {
				fn(each)
			}
		}.bind(this))
	}
	
	state_() {
		
		let results = []
		this.amplitudes.x.forEach(function(each, i) {
			results.push({
				bits: this.bits_(i),
				amplitude: this.amplitude_(i),
				probability: this.probability_(i),
			})
		}.bind(this))
		return results
	}
	
	bits_(indice) {
		
		let result = ''
		for (let i = 0; i < this.size; i++) {
			result = ((indice & (1 << i)) >> i) + result
		}
		return result
	}
	
	amplitude_(indice) {
		
		let result = []
		result.push(this.amplitudes.x[indice].toFixed(8))
		result.push(this.amplitudes.y[indice] < 0 ? '-' : '+')
		result.push(Math.abs(this.amplitudes.y[indice]).toFixed(8) + 'i')
		return result.join('')
	}
	
	probability_(indice) {
		
		return ((
			Math.pow(this.amplitudes.x[indice], 2) +
			Math.pow(this.amplitudes.y[indice], 2)
		) * 100).toFixed(4) + '%'
	}
	
	// Returns a version of U controlled by first qubit
	
	controlled(matrix) {
		
		const m = matrix.x.length
		const Mx = numeric.identity(m * 2)
		const My = numeric.rep([m * 2, m * 2], 0)
		for (let i = 0; i < m; i++) {
			for (let j = 0; j < m; j++) {
				Mx[i + m][j + m] = matrix.x[i][j]
				My[i + m][j + m] = matrix.y[i][j]
			}
		}
		return new numeric.T(Mx, My)
	}
	
	// Returns a transformation over the entire the register which applies U to the specified qubits in order given
	// Algorithm from Lee Spector's "Automatic Quantum Computer Programming"
	
	expand(matrix, size, qubits) {
		
		const qubits_ = []
		const n = Math.pow(2, size)
		qubits = qubits.slice(0)
		for (let i = 0; i < qubits.length; i++) {
			qubits[i] = (size - 1) - qubits[i]
		}
		qubits.reverse()
		for (let i = 0; i < size; i++) {
			if (qubits.indexOf(i) == -1) {
				qubits_.push(i)
			}
		}
		const X = numeric.rep([n, n], 0)
		const Y = numeric.rep([n, n], 0)
		let i = n
		while (i--) {
			let j = n
			while (j--) {
				let equals = true
				let k = qubits_.length
				while (k--) {
					if ((i & (1 << qubits_[k])) != (j & (1 << qubits_[k]))) {
						equals = false
						break
					}
				}
				if (equals) {
					let istar = 0
					let jstar = 0
					let k = qubits.length
					while (k--) {
						const q = qubits[k]
						istar |= ((i & (1 << q)) >> q) << k
						jstar |= ((j & (1 << q)) >> q) << k
					}
					X[i][j] = matrix.x[istar][jstar]
					Y[i][j] = matrix.y[istar][jstar]
				}
			}
		}
		return new numeric.T(X, Y)
	}
	
	on(key, func) {
		this.emitter.on(key, func)
	}
	
	emit() {
		this.emitter.emit(...arguments)
	}
	
	listen() {
		
		this.on('circuit-will-run', function(circuit) {
			console.log('-----------------------------------------------------------------------------------')
			console.log(`\nRunning circuit "${this.name}"`)
			this.state = this.state_()
			console.log(`\n  Initial state`)
			if (this.options.verbose) this.print()
			this.last = this.state
		}.bind(this))
		this.on('circuit-did-run', function(circuit) {
			console.log(`\n  Finished "${this.name}"`)
			this.print()
			console.log()
		}.bind(this))
		this.on('gate-will-run', function(gate, index, length) {
			if (this.options.verbose) {
				let targets = gate.targets.join(' ')
				let controls = gate.controls.length > 0 ? ' with controls ' + JSON.stringify(gate.controls) : ''
				console.log(`\n  Apply gate "${gate.name.toUpperCase()}" to qubit ${targets}${controls} (Gate ${index + 1} of ${length})`)
			}
		}.bind(this))
		this.on('gate-did-run', function(gate, index, length) {
			this.state = this.state_()
			if (this.options.verbose) this.print()
			this.last = this.state
		}.bind(this))
	}
}

module.exports = function(name, size) {
	
	if (size !== undefined) {
		circuits[name] = new Circuit(name, size)
	}
	return circuits[name]
}
