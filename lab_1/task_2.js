var x = 2;
function factorial(m) {
    if (m <= 1) return 1;
    return m * factorial(m - 1);
}

function power(base, exponent) {
    var result = 1;
    for (var i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

var n = 5;
var sum = 0;

for (var k = 1; k <= n; k++) {
    var factKMinus1 = factorial(k - 1);
    var fact2K = factorial(2 * k);
    var power2Kx = power(x, 2 * k);
    var term = (factKMinus1 * factKMinus1 / fact2K) * power2Kx;
    sum += term;
}
WScript.Echo(sum);