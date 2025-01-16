// Load the PNG image
const img = new Image();
img.src = 'icons/ramy8508.jpg'; // Replace with your image path

img.onload = () => {
    // Tiling Pattern 1: Simple Grid
    createTiling('canvas1', img, 1, 1); // 1x1 grid

    // Tiling Pattern 2: Larger Tiles
    createTiling('canvas2', img, 5, 5); // 5x5 grid

    // Tiling Pattern 3: Smaller Tiles
    createTiling('canvas3', img, 15, 15); // 15x15 grid

    // Zoomed-in Tiling Pattern for Canvas 4
    createZoomedTiling('canvas4', img, 15, 15, 4); // 15x15 grid with a 4x zoom

    // Duplicate Canvas 4 content to Canvas 5, 6, and 7
    duplicateCanvasContent('canvas4', ['canvas5', 'canvas6', 'canvas7']);

    // Apply zoomed tiling for Canvases 8 to 11
    duplicateCanvasContent('canvas4', ['canvas8', 'canvas9', 'canvas10', 'canvas11']);
    createZoomedTiling('canvas8', img, 2, 2, 15);
    createZoomedTiling('canvas9', img, 2, 2, 15);
    createZoomedTiling('canvas10', img, 2, 2, 15);
    createZoomedTiling('canvas11', img, 2, 2, 15);

    // Add text to the center of Canvases 8 to 11
    addCenteredText('canvas8', '76');
    addCenteredText('canvas9', '64');
    addCenteredText('canvas10', '43');
    addCenteredText('canvas11', '24');

    // Add animated tiling for Canvas 6
    createAnimatedTiling('canvas6', img, 10, 10); // Use optimized animation for a 10x10 grid
};

// General function to create a tiling pattern
function createTiling(canvasId, image, rows, cols) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Set canvas size to match the image size
    canvas.width = image.width;
    canvas.height = image.height;

    // Calculate tile size
    const tileWidth = canvas.width / cols;
    const tileHeight = canvas.height / rows;

    // Loop through rows and columns to draw tiles
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const sx = col * tileWidth; // Source x (crop start x)
            const sy = row * tileHeight; // Source y (crop start y)

            // Draw the cropped portion of the image on the canvas
            ctx.drawImage(
                image,
                sx, sy, tileWidth, tileHeight, // Source cropping
                col * tileWidth, row * tileHeight, tileWidth, tileHeight // Destination placement
            );

            // Optional: Draw a border for each tile
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.strokeRect(
                col * tileWidth + ctx.lineWidth / 2,
                row * tileHeight + ctx.lineWidth / 2,
                tileWidth - ctx.lineWidth,
                tileHeight - ctx.lineWidth
            );
        }
    }
}

// Function to create a zoomed tiling pattern
function createZoomedTiling(canvasId, image, rows, cols, zoomFactor) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = image.width;
    canvas.height = image.height;

    // Calculate tile size
    const tileWidth = canvas.width / cols;
    const tileHeight = canvas.height / rows;

    // Calculate zoomed source tile size
    const zoomedTileWidth = (image.width / zoomFactor) / cols;
    const zoomedTileHeight = (image.height / zoomFactor) / rows;

    // Calculate offsets for the zoomed region (centered)
    const offsetX = (image.width - image.width / zoomFactor) / 2;
    const offsetY = (image.height - image.height / zoomFactor) / 2;

    // Loop through rows and columns to draw zoomed tiles
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const sx = offsetX + col * zoomedTileWidth; // Adjusted source x
            const sy = offsetY + row * zoomedTileHeight; // Adjusted source y

            // Draw the zoomed and cropped portion of the image
            ctx.drawImage(
                image,
                sx, sy, zoomedTileWidth, zoomedTileHeight, // Source cropping
                col * tileWidth, row * tileHeight, tileWidth, tileHeight // Destination placement
            );

            // Optional: Draw a border for each tile
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10;
            ctx.strokeRect(
                col * tileWidth + ctx.lineWidth / 2,
                row * tileHeight + ctx.lineWidth / 2,
                tileWidth - ctx.lineWidth,
                tileHeight - ctx.lineWidth
            );
        }
    }
}

// Function to duplicate content from a source canvas to multiple target canvases
function duplicateCanvasContent(sourceCanvasId, targetCanvasIds) {
    const sourceCanvas = document.getElementById(sourceCanvasId);
    const sourceCtx = sourceCanvas.getContext('2d');

    targetCanvasIds.forEach(targetCanvasId => {
        const targetCanvas = document.getElementById(targetCanvasId);
        const targetCtx = targetCanvas.getContext('2d');

        // Match target canvas size to source canvas size
        targetCanvas.width = sourceCanvas.width;
        targetCanvas.height = sourceCanvas.height;

        // Copy the content from source to target
        targetCtx.drawImage(sourceCanvas, 0, 0);
    });
}

// Function to draw centered text on a canvas
function addCenteredText(canvasId, text) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Set font and text styles
    ctx.font = 'black 900px Arial'; // Adjust font size
    ctx.fillStyle = 'white'; // Text color
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Calculate canvas center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the text
    ctx.fillText(text, centerX, centerY)
}

// Function to draw the arrow
function drawArrow() {
    const arrowCanvas = document.getElementById('arrowCanvas');
    const ctx = arrowCanvas.getContext('2d');

    // Set the canvas size
    arrowCanvas.width = 600; // Width of the arrow area
    arrowCanvas.height = 200; // Height of the arrow area

    // Arrow properties
    const startX = 50; // Starting x-coordinate
    const startY = 150; // Starting y-coordinate
    const endX = 550; // Ending x-coordinate
    const endY = 50; // Ending y-coordinate
    const arrowHeadLength = 20; // Length of arrowhead lines
    const arrowHeadAngle = Math.PI / 6; // Angle of arrowhead

    // Draw arrow shaft
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Starting point
    ctx.lineTo(endX, endY); // Ending point
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Calculate arrowhead lines
    const angle = Math.atan2(endY - startY, endX - startX); // Angle of the arrow line
    const arrowX1 = endX - arrowHeadLength * Math.cos(angle - arrowHeadAngle);
    const arrowY1 = endY - arrowHeadLength * Math.sin(angle - arrowHeadAngle);
    const arrowX2 = endX - arrowHeadLength * Math.cos(angle + arrowHeadAngle);
    const arrowY2 = endY - arrowHeadLength * Math.sin(angle + arrowHeadAngle);

    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(endX, endY); // Tip of the arrow
    ctx.lineTo(arrowX1, arrowY1); // Left side of the arrowhead
    ctx.lineTo(arrowX2, arrowY2); // Right side of the arrowhead
    ctx.lineTo(endX, endY); // Back to the tip
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Call the function to draw the arrow
drawArrow();

// Optimized function to create an animated tiling pattern
function createAnimatedTiling(canvasId, image, rows, cols) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = image.width;
    canvas.height = image.height;

    // Calculate tile size
    const tileWidth = canvas.width / cols;
    const tileHeight = canvas.height / rows;

    // Initialize animation state
    let frameCount = 0;

    // Animation function
    function animate() {
        frameCount++;

        // Skip frames dynamically to reduce workload
        if (frameCount % 10 !== 0) {
            requestAnimationFrame(animate);
            return;
        }

        // Loop through rows and columns to draw only a subset of tiles
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Update only a subset of tiles for performance
                if ((row + col + frameCount) % 3 !== 0) continue;

                const sx = col * tileWidth; // Source x
                const sy = row * tileHeight; // Source y

                const dx = col * tileWidth; // Destination x
                const dy = row * tileHeight; // Destination y

                // Adjust animation speed with a multiplier
                const multiplier = 0.05;
                const saturation = 100 + 50 * Math.sin((frameCount * multiplier + row * col) * 0.05);
                const brightness = 100 + 50 * Math.sin((frameCount * multiplier + col * row) * 0.07);

                // Apply CSS filter
                ctx.filter = `saturate(${saturation}%) brightness(${brightness}%)`;

                // Draw the cropped portion of the image with dynamic filters
                ctx.drawImage(
                    image,
                    sx, sy, tileWidth, tileHeight, // Source cropping
                    dx, dy, tileWidth, tileHeight // Destination placement
                );

                // Optional: Draw a border around each tile
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.strokeRect(dx, dy, tileWidth, tileHeight);
            }
        }

        // Reset filter after drawing
        ctx.filter = 'none';

        // Request the next animation frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}

function drawGraph() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size (match CSS dimensions)
    canvas.width = 400;
    canvas.height = 400;

    // Draw X and Y axes
    ctx.beginPath();
    ctx.moveTo(50, 350); // Start point of X-axis
    ctx.lineTo(350, 350); // End point of X-axis
    ctx.moveTo(50, 350); // Start point of Y-axis
    ctx.lineTo(50, 50); // End point of Y-axis
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw arrowheads for axes
    ctx.beginPath();
    ctx.moveTo(350, 350); // X-axis arrow
    ctx.lineTo(340, 340);
    ctx.lineTo(340, 360);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(50, 50); // Y-axis arrow
    ctx.lineTo(40, 60);
    ctx.lineTo(60, 60);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();

    // Draw the red arrow vector
    ctx.beginPath();
    ctx.moveTo(50, 350); // Base of the vector
    ctx.lineTo(250, 150); // Tip of the vector
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the arrowhead for the vector
    const angle = Math.atan2(150 - 350, 250 - 50); // Calculate vector angle
    const arrowHeadLength = 10;
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(
        250 - arrowHeadLength * Math.cos(angle - Math.PI / 6),
        150 - arrowHeadLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        250 - arrowHeadLength * Math.cos(angle + Math.PI / 6),
        150 - arrowHeadLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();

    // Optional: Add a red dot at the base of the arrow
    ctx.beginPath();
    ctx.arc(50, 350, 5, 0, 2 * Math.PI); // Draw a small circle
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Call the function to draw the graph
drawGraph();

