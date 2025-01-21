const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const qrCodeDiv = document.getElementById('qr-code');

// Function to generate the QR code
function generateQRCode(text) {
  qrCodeDiv.innerHTML = ''; // Clear any previous QR code

  if (!text) {
    alert('Please enter some text or URL.');
    return;
  }

  const canvas = document.createElement('canvas');
  qrCodeDiv.appendChild(canvas); // Append the canvas to the div

  QRCode.toCanvas(canvas, text, { width: 200, height: 200 }, function (error) {
    if (erro
