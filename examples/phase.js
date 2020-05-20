
const Circuit = require('../src/circuit')

Circuit('s', 1).apply()
	.s(0)
.run('verbose')

Circuit('xs', 1).apply()
	.x(0)
	.s(0)
.run('verbose')

Circuit('t', 1).apply()
	.t(0)
.run('verbose')

Circuit('xt', 1).apply()
	.x(0)
	.t(0)
.run('verbose')

Circuit('phase-s', 1).apply()
	.x(0)
	.s(0)
.run('verbose')

Circuit('phase-sdg', 1).apply()
	.x(0)
	.sdg(0)
.run('verbose')

Circuit('phase-t', 1).apply()
	.x(0)
	.t(0)
.run('verbose')

Circuit('phase-tdg', 1).apply()
	.x(0)
	.tdg(0)
.run('verbose')

Circuit('phase-t-tdg', 1).apply()
	.x(0)
	.t(0)
	.tdg(0)
.run('verbose')

Circuit('phase-s-sdg', 1).apply()
	.x(0)
	.s(0)
	.sdg(0)
.run('verbose')
