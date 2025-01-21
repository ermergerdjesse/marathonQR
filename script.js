const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const qrCodeDiv = document.getElementById('qr-code');

// Function to generate the QR code
function generateQRCode(text) {
  // Clear any previous QR code
  qrCodeDiv.innerHTML = '';

  // Check if the input is empty
  if (!text) {
    alert('Please enter some text or URL.');
    return;
  }

  // Create a new canvas element for QR code
  const canvas = document.createElement('canvas');
  qrCodeDiv.appendChild(canvas);  // Append the canvas to the div

  // Generate the QR code on the canvas
  QRCode.toCanvas(canvas, text, { width: 200, height: 200 }, function (error) {
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
      return;
    }
    console.log('QR code generated!');
    // Automatically trigger the print dialog
    printQRCode(canvas);
  });
}

// Function to print the QR code
function printQRCode(canvas) {
  // Convert the canvas to a Data URL (base64 image)
  const imageUrl = canvas.toDataURL();

  // Create an image element to embed on the page
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.maxWidth = '100%';  // Ensure it scales properly for printing
  img.style.height = 'auto';

  // Clear the previous content and append the new image for printing
  const printDiv = document.createElement('div');
  printDiv.style.textAlign = 'center';  // Center the QR code
  printDiv.appendChild(img);
  
  // Append the div with the image to the body
  document.body.appendChild(printDiv);

  // Trigger the print dialog
  window.print();

  // Clean up the DOM after printing
  window.onafterprint = function () {
    document.body.removeChild(printDiv);  // Remove the printed content
  };
}

// Event listener for generating the QR code
generateBtn.addEventListener('click', function () {
  const inputText = qrInput.value.trim();
  generateQRCode(inputText);
});
