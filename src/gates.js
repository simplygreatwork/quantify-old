
const numeric = require('../lib/numeric.js')
const gates = module.exports

gates.h = function() {
	
	return new numeric.T (
		numeric.div([[1, 1], [1, -1]], Math.sqrt(2)),
		numeric.rep([2, 2], 0)
	)
}

gates.x = function() {
	
	return new numeric.T (
		[[0, 1], [1, 0]],
		numeric.rep([2, 2], 0)
	)
}

gates.y = function() {
	
	return new numeric.T (
		numeric.rep([2, 2], 0),
		[[0, -1], [1, 0]]
	)
}

gates.z = function() {
	
	return new numeric.T (
		[[1, 0], [0, -1]],
		numeric.rep([2, 2], 0)
	)
}

gates.z = function() {
	
	return new numeric.T (
		[[1, 0], [0, -1]],
		numeric.rep([2, 2], 0)
	)
}

gates.s = function() {
	
	return new numeric.T (
		[[1, 0], [0, 0]],
		[[0, 0], [0, 1]]
	)
}

const rotate = function(theta) {
	
	const x = Math.cos(theta)
	const y = Math.sin(theta)
	return new numeric.T ([[1, 0], [0, x]], [[0, 0], [0, y]])
}

gates.r2 = function() {
	return rotate(Math.PI / 2)
}

gates.r4 = function() {
	return rotate(Math.PI / 4)
}

gates.r8 = function() {
	return rotate(Math.PI / 8)
}

gates.swap = function() {
	
	return new numeric.T ([
		[1, 0, 0, 0],
		[0, 0, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 1]
	], numeric.rep([4, 4], 0))
}

gates.qft = function(size) {
	
	const n = Math.pow(2, size)
	const wtheta = (2 * Math.PI) / n
	const x = numeric.rep([n, n], 0)
	const y = numeric.rep([n, n], 0)
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			x[i][j] = Math.cos(i * j * wtheta)
			y[i][j] = Math.sin(i * j * wtheta)
		}
	}
	return new numeric.T(x, y).div(Math.sqrt(n))
}

gates.srn = function() {
	
	return new numeric.T (
		numeric.div([[1, -1], [1, 1]], Math.sqrt(2)),
		numeric.rep([2, 2], 0)
	)
}
