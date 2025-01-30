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

  QRCode.toCanvas(canvas, qrData, { width: 50, height: 50, margin: 0, errorCorrectionLevel: 'H' }, function (error) { 
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
      return;
    }

    console.log("QR code generated!");
    const imageUrl = canvas.toDataURL(); // Convert QR to image

    // Small Delay Before Printing for Slower PCs
    setTimeout(() => {
      printQRCode(imageUrl, firstName, lastName, number);
    }, 300);
  });
}

// Function to print only the QR code labels without blank pages
function printQRCode(imageUrl, firstName, lastName, number) {
  const printArea = document.createElement('div');
  printArea.id = 'print-area';
  printArea.innerHTML = `
    <style>
      @page {
        size: 3in 2in;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
        text-align: center;
        width: 3in;
        height: 6in; /* STRICTLY LIMIT PRINT AREA */
        overflow: hidden; /* CUTS OFF ANY EXTRA CONTENT */
        display: grid; /* ENSURES NO EXTRA SPACE */
        grid-template-rows: 3in 3in; /* FORCES TWO LABELS, NO BLANK PAGE */
      }
      .print-wrapper {
        width: 3in;
        height: 6in; /* Matches the exact space for two labels */
        display: grid;
        grid-template-rows: 3in 3in;
        position: relative;
      }
      .label-container {
        width: 3in;
        height: 3in; /* Makes sure both labels fit */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 8pt;
        position: absolute;
      }
      .label-1 {
        top: 0;
      }
      .label-2 {
        top: 3in; /* EXACTLY below the first label */
      }
      .details h2 {
        font-size: 8pt;
        margin: 2px 0;
      }
      img {
        width: 0.75in;
        height: 0.75in;
      }
    </style>

    <div class="print-wrapper">
      <!-- Label 1 -->
      <div class="label-container label-1">
        <div class="details">
          <h2>${firstName} ${lastName}</h2>
          <h2># ${number}</h2>
        </div>
        <img src="${imageUrl}" alt="QR Code">
      </div>

      <!-- Label 2 -->
      <div class="label-container label-2">
        <div class="details">
          <h2>${firstName} ${lastName}</h2>
          <h2># ${number}</h2>
        </div>
        <img src="${imageUrl}" alt="QR Code">
      </div>
    </div>
  `;

  // Add the print area to the page
  document.body.appendChild(printArea);

  // Ensure QR fully renders before printing
  setTimeout(() => {
    window.print();
    document.body.removeChild(printArea);
  }, 500);
}

// Event listener for generating the QR code
generateBtn.addEventListener('click', function () {
  generateQRCode(qrInput.value.trim(), firstNameInput.value.trim(), lastNameInput.value.trim(), sequentialNumber);
  sequentialNumber += 1;
});
