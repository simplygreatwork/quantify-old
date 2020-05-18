
const Circuit = require('../src/circuit')

Circuit('origin', 3).apply().run()
Circuit('first control on', 3).apply().x(0).ccnot_(2, 0, 1).run('verbose')
Circuit('second control on', 3).apply().x(1).ccnot_(2, 0, 1).run('verbose')
Circuit('both controls on', 3).apply().x(0).x(1).ccnot_(2, 0, 1).run('verbose')
Circuit('both controls on (inverse)', 3).apply().x(0).x(1).x(2).ccnot_(2, 0, 1).run('verbose')
