
const Circuit = require('../src/circuit')

Circuit('entanglement', 2).apply()
	.h(0)
	.cnot(1, 0)
.run('verbose')
