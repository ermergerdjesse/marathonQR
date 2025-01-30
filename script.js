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

  const qrData = `Name: ${firstName} ${lastName} | ${text} | #${number}`;
  const canvas = document.createElement('canvas');

  QRCode.toCanvas(canvas, qrData, { width: 100, height: 100, margin: 0, errorCorrectionLevel: 'H' }, function (error) { 
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
      return;
    }

    console.log('QR code generated!');
    const imageUrl = canvas.toDataURL(); // Convert QR to image

    // Small Delay Before Printing for Slower PCs
    setTimeout(() => {
      printQRCode(imageUrl, firstName, lastName, number);
    }, 300);
  });
}

// Function to print only the QR code labels
function printQRCode(imageUrl, firstName, lastName, number) {
  const printArea = document.createElement('div');
  printArea.id = 'print-area';
  printArea.innerHTML = `
    <style>
      @page {
        size: 3in 2in;
        margin: 0.125in;
      }
      .label-container {
        width: 3in;
        height: 2in;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 10pt;
        page-break-after: always;
      }
      .details h2 {
        font-size: 10pt;
        margin: 2px 0;
      }
      img {
        width: 1in;
        height: 1in;
      }
    </style>

    <div class="label-container">
      <div class="details">
        <h2>${firstName} ${lastName}</h2>
        <h2># ${number}</h2>
      </div>
      <img src="${imageUrl}" alt="QR Code">
    </div>
  `;

  document.body.appendChild(printArea);
  setTimeout(() => {
    window.print();
    document.body.removeChild(printArea);
  }, 500);
}

generateBtn.addEventListener('click', function () {
  generateQRCode(qrInput.value.trim(), firstNameInput.value.trim(), lastNameInput.value.trim(), sequentialNumber);
  sequentialNumber += 1;
});
