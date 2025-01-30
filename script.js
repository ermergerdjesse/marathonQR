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

    // Convert the QR code to an image
    const imageUrl = canvas.toDataURL();

    // Print the QR code once it is generated
    printQRCode(imageUrl, firstName, lastName, number);

    // Clear input fields after generating the QR code
    setTimeout(() => {
      qrInput.value = "";
      firstNameInput.value = "";
      lastNameInput.value = "";
    }, 200);
  });
}

// Function to print the QR code (shows two identical labels)
function printQRCode(imageUrl, firstName, lastName, number) {
  // Open a new print preview window
  let printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert("Popup blocked! Please enable pop-ups for this site.");
    return;
  }

  // Write the print content
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          @page {
            size: 3in 2in;
            margin: 0.5in;
          }
          body {
            width: 3in;
            height: 2in;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 10pt;
            margin: 0;
            padding: 0;
          }
          .print-page {
            width: 3in;
            height: 2in;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            page-break-after: always;
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
      </head>
      <body>
        <!-- Label 1 -->
        <div class="print-page">
          <div class="details">
            <h2>First: ${firstName}</h2>
            <h2>Last: ${lastName}</h2>
            <h2># ${number}</h2>
          </div>
          <img src="${imageUrl}" alt="QR Code">
        </div>

        <!-- Label 2 (Identical to Label 1) -->
        <div class="print-page">
          <div class="details">
            <h2>First: ${firstName}</h2>
            <h2>Last: ${lastName}</h2>
            <h2># ${number}</h2>
          </div>
          <img src="${imageUrl}" alt="QR Code">
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
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
