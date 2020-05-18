
const Circuit = require('../src/circuit')

Circuit('bell', 2).apply()
	.h(0)
	.cnot(1, 0)
.run('verbose')
