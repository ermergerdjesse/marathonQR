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
  // Open a new window to print the QR code
  const printWindow = window.open('', '', 'width=600,height=600');
  
  printWindow.document.write('<html><head><title>Print QR Code</title>');
  printWindow.document.write('<style>body { font-family: Arial, sans-serif; text-align: center; }</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write('<h3>QR Code</h3>');
  
  // Append the canvas directly to the print window
  printWindow.document.body.appendChild(canvas.cloneNode(true));  // Use clone to avoid issues with the original canvas

  printWindow.document.write('</body></html>');
  printWindow.document.close();

  // Wait a bit for the window to load, then print
  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();  // Close the print window after printing
  };
}

// Event listener for generating the QR code
generateBtn.addEventListener('click', function () {
  const inputText = qrInput.value.trim();
  generateQRCode(inputText);
});
