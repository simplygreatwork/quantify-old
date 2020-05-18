
const Circuit = require('../src/circuit')
const gates = require('../src/gates')

Circuit('origin', 2).apply()
	.x(0)
.run()

Circuit('swap-native', 2).apply()
	.x(1)
	.swap([0, 1], [])
.run()

Circuit('swap-derived', 2).apply()
	.x(0)
	.swap_(0, 1)
.run()
