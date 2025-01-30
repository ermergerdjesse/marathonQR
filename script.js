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
    
    printQRCode(canvas, firstName, lastName, number);

    setTimeout(() => {
      qrInput.value = "";
      firstNameInput.value = "";
      lastNameInput.value = "";
    }, 100);
  });
}

// Function to print the QR code
function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();

  const printContent = `
    <div class="print-page">
      <div class="details">
        <h2>First: ${firstName}</h2>
        <h2>Last: ${lastName}</h2>
        <h2># ${number}</h2>
      </div>
      <img src="${imageUrl}" alt="QR Code">
    </div>
    <div class="print-page">
      <div class="details">
        <h2>First: ${firstName}</h2>
        <h2>Last: ${lastName}</h2>
        <h2># ${number}</h2>
      </div>
      <img src="${imageUrl}" alt="QR Code">
    </div>
  `;

  const newWindow = window.open('', '_blank');
  newWindow.document.write(printContent);
  newWindow.document.close();
  newWindow.onload = function () {
    newWindow.print();
  };
}
