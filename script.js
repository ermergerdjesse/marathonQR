const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const qrCodeDiv = document.getElementById('qr-code');

// Serial number for labels, adds one everytime the generate QR is clicked on, Can be reset by make change to js, reset back to 1
let sequentialNumber = 1;

// fuction to generate QR code
function generateQRCode(text, firstName, lastName, number) {
  qrCodeDiv.innerHTML = '';

  if (!text || !firstName || !lastName) {
    alert('Please fill out all fields.');
    return;
  }

  // Error pops up if the text is over 50 characters in the input field, just states to revise text
  if (text.length > 50) {
    alert('Your text is too long to be stamped. Please revise your text for it to fit 50 characters');
    return;
  }

  const canvas = document.createElement('canvas');
  qrCodeDiv.appendChild(canvas);

  QRCode.toCanvas(canvas, text, { width: 200, height: 200 }, function (error) {
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
      return;
    }
    console.log('QR code generated!');
    printQRCode(canvas, firstName, lastName, number);
  });
}

// function for Printing QR code
function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();
  
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .details {
            text-align: center;
          }
          img {
            border: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <div class="details">
          <h2>First Name: ${firstName}</h2>
          <h2>Last Name: ${lastName}</h2>
          <h2>Sequential Number: ${number}</h2>
        </div>
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

generateBtn.addEventListener('click', function () {
  console.log("Generate button clicked!");
  const inputText = qrInput.value.trim();
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  generateQRCode(inputText, firstName, lastName, sequentialNumber);
  
  sequentialNumber += 1;
});
