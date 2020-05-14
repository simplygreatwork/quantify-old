
const numeric = require('../lib/numeric.js')
const Chain = require('./chain')

module.exports = class Circuit {
	
	constructor(size) {
		
		this.size = size
		this.gates = []
		const squared = Math.pow(2, size)
		this.amplitudes = new numeric.T(numeric.rep([squared], 0), numeric.rep([squared], 0))
		this.amplitudes.x[parseInt('0000000000', 2)] = 1
		this.chain = new Chain(this)
	}
	
	apply(gate) {
		
		if (arguments.length === 0) return this.chain
		this.gates.push(gate)
	}
	
	evaluate() {
		
		this.gates.forEach(function(gate, index) {
			console.log(`Evaluating gate ${index + 1} of ${this.gates.length}.`)
			let U = gate.matrix(gate.targets.length)
			gate.controls.forEach(function(control) {
				U = this.controlled(U)
			}.bind(this))
			var qubits = gate.controls.concat(gate.targets)
			this.amplitudes = this.expandMatrix(this.size, U, qubits).dot(this.amplitudes)
		}.bind(this))
		return this
	}
	
	print() {
		
		this.amplitudes = this.amplitudes.div(this.amplitudes.norm2())
		for (let i = 0; i < this.amplitudes.x.length; i++) {
			console.log(`|${this.state_(i)}> ${this.amplitude_(i)} ${this.probability_(i)}`)
		}
		return this
	}
	
	state_(indice) {
		
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
	
	controlled(U) {
		
		const m = U.x.length
		const Mx = numeric.identity(m * 2)
		const My = numeric.rep([m * 2, m * 2], 0)
		for (let i = 0; i < m; i++) {
			for (let j = 0; j < m; j++) {
				Mx[i + m][j + m] = U.x[i][j]
				My[i + m][j + m] = U.y[i][j]
			}
		}
		return new numeric.T(Mx, My)
	}
	
	// Returns a transformation over the entire the register which applies U to the specified qubits in order given
	// Algorithm from Lee Spector's "Automatic Quantum Computer Programming"
	
	expandMatrix(size, U, qubits) {
		
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
				let equal = true
				let k = qubits_.length
				while (k--) {
					if ((i & (1 << qubits_[k])) != (j & (1 << qubits_[k]))) {
						equal = false
						break
					}
				}
				if (equal) {
					let istar = 0
					let jstar = 0
					let k = qubits.length
					while (k--) {
						const q = qubits[k]
						istar |= ((i & (1 << q)) >> q) << k
						jstar |= ((j & (1 << q)) >> q) << k
					}
					X[i][j] = U.x[istar][jstar]
					Y[i][j] = U.y[istar][jstar]
				}
			}
		}
		return new numeric.T(X, Y)
	}
}
