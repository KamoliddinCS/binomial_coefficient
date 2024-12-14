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

// Instant calculate button
document.getElementById("instant").addEventListener("click", function() {
    let n = parseInt(document.getElementById("n").value);
    let k = parseInt(document.getElementById("k").value);
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

function visualizeBinomialCalculation(n, k) {
    // Create container div for scrolling
    const container = document.createElement('div');
    container.style.maxHeight = '400px';
    container.style.overflowY = 'auto';
    container.style.overflowX = 'auto';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '5px';

    // Create canvas element with dynamic size
    const canvas = document.createElement('canvas');
    const minWidth = 600;
    const minHeight = 400;
    const rowHeight = 50;
    const colWidth = 50;
    
    // Calculate required canvas size based on triangle size
    canvas.width = Math.max(minWidth, (n + 1) * colWidth * 2); // Extra width for spacing
    canvas.height = Math.max(minHeight, (n + 1) * rowHeight + 100); // Extra height for padding
    
    const ctx = canvas.getContext('2d');

    // Style settings
    ctx.font = '16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';

    // Generate Pascal's triangle up to row n
    let triangle = [];
    for (let i = 0; i <= n; i++) {
        triangle[i] = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                triangle[i][j] = 1;
            } else {
                triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
            }
        }
    }

    // Animation variables
    let circles = [];
    const radius = 20;
    const startY = 50;
    const spacing = 50;
    
    // Create circle objects for animation
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= i; j++) {
            let x = canvas.width/2 + (j - i/2) * spacing;
            let y = startY + i * spacing;
            circles.push({
                x: x,
                y: y,
                value: triangle[i][j],
                row: i,
                col: j,
                alpha: 0,
                highlighted: i === n && j === k
            });
        }
    }

    let currentRow = 0;
    let animationDelay = 10; // Delay between rows in milliseconds

    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw circles and numbers for current and previous rows
        circles.forEach(circle => {
            if (circle.row <= currentRow) {
                // Gradually increase opacity for current row
                if (circle.row === currentRow && circle.alpha < 1) {
                    circle.alpha += 0.02;
                }
                // Full opacity for previous rows
                if (circle.row < currentRow) {
                    circle.alpha = 1;
                }

                ctx.beginPath();
                ctx.globalAlpha = circle.alpha;
                
                // Highlight the target combination
                if (circle.highlighted) {
                    ctx.fillStyle = '#007bff';
                    ctx.strokeStyle = '#0056b3';
                } else {
                    ctx.fillStyle = '#f0f0f0';
                    ctx.strokeStyle = '#333';
                }
                
                ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Draw numbers
                ctx.fillStyle = circle.highlighted ? '#fff' : '#333';
                ctx.fillText(circle.value, circle.x, circle.y + 6);
                ctx.globalAlpha = 1;
            }
        });

        // Draw connecting lines with animation
        ctx.strokeStyle = '#ccc';
        circles.forEach(circle => {
            if (circle.row < currentRow) {
                // Find children in next row
                let leftChild = circles.find(c => c.row === circle.row + 1 && c.col === circle.col);
                let rightChild = circles.find(c => c.row === circle.row + 1 && c.col === circle.col + 1);
                
                if (leftChild) {
                    ctx.beginPath();
                    ctx.globalAlpha = Math.min(circle.alpha, leftChild.alpha);
                    ctx.moveTo(circle.x, circle.y + radius);
                    ctx.lineTo(leftChild.x, leftChild.y - radius);
                    ctx.stroke();
                }
                
                if (rightChild) {
                    ctx.beginPath();
                    ctx.globalAlpha = Math.min(circle.alpha, rightChild.alpha);
                    ctx.moveTo(circle.x, circle.y + radius);
                    ctx.lineTo(rightChild.x, rightChild.y - radius);
                    ctx.stroke();
                }
            }
        });

        // Continue animation if current row's circles are not fully visible
        if (circles.some(circle => circle.row === currentRow && circle.alpha < 1)) {
            requestAnimationFrame(animate);
        } else if (currentRow < n) {
            // Move to next row after delay
            currentRow++;
            setTimeout(() => requestAnimationFrame(animate), animationDelay);
        }
    }

    // Start animation
    animate();
    
    // Add canvas to container
    container.appendChild(canvas);
    return container;
}

// Modify the click event handler to show canvas visualization
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

    // Clear previous result
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';
    
    // Add canvas visualization
    const container = visualizeBinomialCalculation(n, k);
    resultDiv.appendChild(container);
});

