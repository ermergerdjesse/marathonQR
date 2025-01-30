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

  QRCode.toCanvas(canvas, text, { width: 180, height: 180 }, function (error) {
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
      return;
    }
    console.log('QR code generated!');

    // Convert the QR code to an image
    const imageUrl = canvas.toDataURL();

    // Print the QR code labels
    printQRCode(imageUrl, firstName, lastName, number);

    // Clear input fields after generating the QR code
    setTimeout(() => {
      qrInput.value = "";
      firstNameInput.value = "";
      lastNameInput.value = "";
    }, 200);
  });
}

// Function to print only the QR code labels
function printQRCode(imageUrl, firstName, lastName, number) {
  // Create a print-only section
  const printArea = document.createElement('div');
  printArea.id = 'print-area';
  printArea.innerHTML = `
    <style>
      @page {
        size: 3in 2in;
        margin: 0.5in;
      }
      body {
        margin: 0;
        padding: 0;
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
        border: 1px solid transparent; /* Ensures layout consistency */
      }
      .details {
        margin-bottom: 5px;
      }
      .details h2 {
        font-size: 10pt;
        margin: 2px 0;
      }
      img {
        width: 1.5in;
        height: 1.5in;
        border: 1px solid #000;
      }
    </style>

    <!-- Label 1 -->
    <div class="label-container">
      <div class="details">
        <h2>First: ${firstName}</h2>
        <h2>Last: ${lastName}</h2>
        <h2># ${number}</h2>
      </div>
      <img src="${imageUrl}" alt="QR Code">
    </div>

    <!-- Label 2 (Identical to Label 1) -->
    <div class="label-container">
      <div class="details">
        <h2>First: ${firstName}</h2>
        <h2>Last: ${lastName}</h2>
        <h2># ${number}</h2>
      </div>
      <img src="${imageUrl}" alt="QR Code">
    </div>
  `;

  // Add the print area to the page
  document.body.appendChild(printArea);

  // Print only the labels
  window.print();

  // Remove print content after printing
  setTimeout(() => {
    document.body.removeChild(printArea);
  }, 500);
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
