
const Circuit = require('../src/circuit')

Circuit('xssssx', 1).apply()
	.x(0)
	.s(0)
	.s(0)
	.s(0)
	.s(0)
	.x(0)
.run('verbose')

Circuit('ssss', 1).apply()
	.s(0)
	.s(0)
	.s(0)
	.s(0)
.run('verbose')
