const fs = require('fs');

// Function to decode the value based on the base provided
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Lagrange interpolation to find the constant term 'c'
function lagrangeInterpolation(points) {
    let c = 0;

    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let li = 1;

        // Calculate Lagrange basis polynomial l_i(x)
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj] = points[j];
                li *= (-xj) / (xi - xj);
            }
        }

        // Add the contribution of f(xi) * l_i(0) to the result
        c += yi * li;
    }

    return c;
}

// Function to parse JSON input and extract the polynomial roots
function findSecretConstant(jsonInput) {
    const { keys, ...roots } = jsonInput;
    const n = keys.n;
    const k = keys.k;

    // Collect the (x, y) points
    let points = [];

    for (let key in roots) {
        let x = parseInt(key);  // x is the key
        let base = parseInt(roots[key].base);
        let value = roots[key].value;
        let y = decodeValue(base, value);  // Decode y value based on base

        points.push([x, y]);

        // Stop collecting when we have enough points (k = m + 1)
        if (points.length === k) {
            break;
        }
    }

    // Find the constant term 'c' using Lagrange interpolation
    const constant = lagrangeInterpolation(points);
    return constant;
}

// Sample Test Case 1
const jsonInput1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

// Sample Test Case 2
const jsonInput2 = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

// Execute for both test cases
console.log("Constant c for Test Case 1:", findSecretConstant(jsonInput1));
console.log("Constant c for Test Case 2:", findSecretConstant(jsonInput2));
