// Get input values inside the click handler to get updated values
document.getElementById("calculate").addEventListener("click", function() {
    let n = parseInt(document.getElementById("n").value);
    let k = parseInt(document.getElementById("k").value);
    
    // Input validation
    if (isNaN(n) || isNaN(k)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers";
        return;
    }
    
    if (k > n) {
        document.getElementById("result").innerHTML = "k cannot be greater than n";
        return;
    }

    if (n < 0 || k < 0) {
        document.getElementById("result").innerHTML = "Numbers must be non-negative";
        return;
    }

    let result = binomialCoefficient(n, k);
    document.getElementById("result").innerHTML = `C(${n},${k}) = ${result}`;
});

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

function binomialCoefficient(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}