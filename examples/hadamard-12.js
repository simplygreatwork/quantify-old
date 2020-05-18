
const Circuit = require('../src/circuit')

let circuit = Circuit('twelve', 12)
for (let i = 0; i < circuit.size; i++) {
	circuit.apply().h(i)
}
circuit.run('verbose')
