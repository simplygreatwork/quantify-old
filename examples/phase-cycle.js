
const Circuit = require('../src/circuit')

Circuit('xtzstx', 1).apply()
	.x(0)
	.t(0)
	.z(0)
	.s(0)
	.t(0)
	.x(0)
.run('verbose')

Circuit('tzst', 1).apply()
	.t(0)
	.z(0)
	.s(0)
	.t(0)
.run('verbose')
