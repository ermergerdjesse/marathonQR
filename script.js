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

  // Open a new window to print the QR code
  const printWindow = window.open('', '', 'width=600,height=600');

  // Check if the window opened correctly
  if (!printWindow) {
    alert("Popup blocked. Please allow popups for this site.");
    return;
  }

  // Write basic HTML content to the print window
  printWindow.document.write('<html><head><title>Print QR Code</title>');
  printWindow.document.write('<style>body { font-family: Arial, sans-serif; text-align: center; }</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write('<h3>QR Code</h3>');
  
  // Insert the image (QR code) into the print window
  printWindow.document.write('<img src="' + imageUrl + '" style="max-width: 100%; height: auto;" />');
  
  pri
