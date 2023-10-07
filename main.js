document.addEventListener('DOMContentLoaded', () => {
    // Log the ml5.js version
    console.log(`ml5.js version: ${ml5.version}`);
    
    // Declare the webcamInstance variable
    let webcamInstance;

    // Function to load the model using the provided link
    function loadModel(modelURL) {
        // Load your Teachable Machine model using ml5.js
        ml5.poseNet(modelURL, () => {
            // Model loaded callback
            console.log('Model loaded successfully');
            
            // Set up the webcam
            setupWebcam();
        });
    }

    // Read the model link from the external file
    fetch('hand_gestures_project_model_link.txt')
        .then((response) => response.text())
        .then((modelLink) => {
            // Append 'model.json' to the model link
            const modelURL = modelLink.trim() + 'model.json';

            // Use modelURL for loading the model with ml5.js
            loadModel(modelURL);
        })
        .catch((error) => {
            console.error('Error reading model link:', error);
        });

    // Function to set up the webcam
    async function setupWebcam() {
        const camera = document.getElementById('webcam');
        const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
        camera.srcObject = stream;
        camera.play();

        // Create a webcam instance
        webcamInstance = new Webcam(camera);

        // Attach the webcam
        webcamInstance.start().then(result => {
            console.log("Webcam attached:", result);
        }).catch(err => {
            console.error("Error attaching webcam:", err);
        });
    }

    // Capture button click event listener
    const captureButton = document.getElementById('capture-btn');
    captureButton.addEventListener('click', () => {
        // Capture an image
        const capturedImage = webcamInstance.snap();

        // Update the captured image element
        const capturedImageElement = document.getElementById('captured-image-src');
        capturedImageElement.src = capturedImage;

        // Show the captured image
        const capturedImageDiv = document.getElementById('captured-image');
        capturedImageDiv.style.display = 'block';
    });
});
