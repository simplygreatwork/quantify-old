
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

Circuit('xx', 1).apply()
	.x(0)
	.x(0)
.run('verbose')

Circuit('hh', 1).apply()
	.h(0)
	.h(0)
.run('verbose')

Circuit('phase-t-tdg', 1).apply()
	.t(0)
	.tdg(0)
.run('verbose')

Circuit('phase-s-sdg', 1).apply()
	.s(0)
	.sdg(0)
.run('verbose')

Circuit('phase-t-tdg', 1).apply()
	.x(0)
	.t(0)
	.tdg(0)
	.x(0)
.run('verbose')

Circuit('phase-s-sdg', 1).apply()
	.x(0)
	.s(0)
	.sdg(0)
	.x(0)
.run('verbose')
