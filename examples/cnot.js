
const Circuit = require('../src/circuit')

Circuit('origin', 2).apply().run('verbose')
Circuit('control off', 2).apply().x(1, [0]).run('verbose')
Circuit('control on', 2).apply().x(0).x(1, [0]).run('verbose')
Circuit('control on (inverse)', 2).apply().x(0).x(1).x(1, [0]).run('verbose')
