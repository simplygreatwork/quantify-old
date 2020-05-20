
const Circuit = require('../src/circuit')

Circuit('xzzx', 1).apply()
	.x(0)
	.z(0)
	.z(0)
	.x(0)
.run('verbose')

Circuit('zz', 1).apply()
	.z(0)
	.z(0)
.run('verbose')
