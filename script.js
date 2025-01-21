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
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
      return;
    }
    console.log('QR code generated!');
    printQRCode(canvas); // Call the print function
  });
}

// Function to print the QR code
function printQRCode(canvas) {
  const imageUrl = canvas.toDataURL();
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          img {
            border: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <img src="${imageUrl}" alt="QR Code">
      </body>
    </html>
  `);
  printWindow.document.close();

  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
}

// Event listener for generating the QR code
generateBtn.addEventListener('click', function () {
  console.log("Button clicked!");
  const inputText = qrInput.value.trim();
  generateQRCode(inputText);
});
