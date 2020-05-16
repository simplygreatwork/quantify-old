
class Math {
	
	Tensor() {
		
	}
	
	identity() {
		
	}
	
	rep(s,v,k) {
		
		if (typeof k === "undefined") {
			k = 0
		}
		var n = s[k], result = Array(n), i
		if (k === s.length - 1) {
			for (i = n - 2; i >= 0; i -= 2) {
				result[i + 1] = v
				result[i] = v
			}
			if (i === -1) {
				result[0] = v
			}
			return result
		}
		for (i = n - 1; i >= 0; i--) {
			result[i] = Math.rep(s, v, k + 1)
		}
		return result
	}
	
	diag(d) {
		
		var i, i1, j, n = d.length, A = Array(n), Ai
		for (i = n - 1; i >= 0; i--) {
			Ai = Array(n)
			i1 = i + 2
			for (j = n - 1; j >= i1; j -= 2) {
				Ai[j] = 0
				Ai[j-1] = 0
			}
			if (j > i) {
				Ai[j] = 0
			}
			Ai[i] = d[i]
			for(j = i - 1; j >= 1; j -= 2) {
				Ai[j] = 0
				Ai[j - 1] = 0
			}
			if (j === 0) {
				Ai[0] = 0
			}
			A[i] = Ai
		}
		return A
	}
	
	div() {
		
	}
	
	dot() {
		
	}
	
	norm2() {
		
	}
}

numeric.identity = 
numeric.diag = 