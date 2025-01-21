const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const qrCodeDiv = document.getElementById('qr-code');

// Fuction that generates QR code
function generateQRCode(text) {
  qrCodeDiv.innerHTML = ''; // Clears the previous persons information

  if (!text) {
    alert('Please enter some text or URL.');
    return;
  }

  const canvas = document.createElement('canvas');
  qrCodeDiv.appendChild(canvas);

  QRCode.toCanvas(canvas, text, { width: 200, height: 200 }, function (error) {
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate - Ask Jesse');
      return;
    }
    console.log('Foil Stamper QR Generated');
    printQRCode(canvas); // Calls the print fuction to auto pop-up print properties/windows pop-up
  });
}

// Function that prints the QR code only, without having Marathon Press Generator or other items from the site
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

// Event listener for QR generation
generateBtn.addEventListener('click', function () {
  console.log("Generate QR Button Clicked");
  const inputText = qrInput.value.trim();
  generateQRCode(inputText);
});
