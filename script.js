const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const qrCodeDiv = document.getElementById('qr-code');

// Initialize sequential number
let sequentialNumber = 1;

// Function to generate the QR code
function generateQRCode(text, firstName, lastName, number) {
  qrCodeDiv.innerHTML = ''; // Clear any previous QR code

  if (!text || !firstName || !lastName) {
    alert('Please fill out all fields.');
    return;
  }

  if (text.length > 50) {
    alert('Your text is too long to be stamped. Please revise your text for it to fit.');
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
    printQRCode(canvas, firstName, lastName, number); // Call the print function
  });
}

// Function to print the QR code
function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();

  let printWindow = window.open('', '_blank', 'width=600,height=400');

  if (!printWindow) {
    alert("Popup blocked! Please enable pop-ups for this site.");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          }
          .details h2 {
            font-size: 14pt;
            margin: 5px 0;
          }
          img {
            width: 150px;
            height: 150px;
            border: 1px solid #000;
          }
        </style>
      </head>
      <body>
        <div class="details">
          <h2>First: ${firstName}</h2>
          <h2>Last: ${lastName}</h2>
          <h2># ${number}</h2>
        </div>
        <img src="${imageUrl}" alt="QR Code">
        <script>
          setTimeout(() => { window.print(); }, 500);
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

// Event listener for generating the QR code
generateBtn.addEventListener('click', function () {
  console.log("Generate button clicked!");
  const inputText = qrInput.value.trim();
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  generateQRCode(inputText, firstName, lastName, sequentialNumber);

  // Increment the sequential number for the next QR code
  sequentialNumber += 1;
});
