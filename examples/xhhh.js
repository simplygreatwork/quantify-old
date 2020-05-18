
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

Circuit('xhhh', 4).apply()
	.x(0)
	.h(1)
	.h(2)
	.h(3)
.run('verbose')
