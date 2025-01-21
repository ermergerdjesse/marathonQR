const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const qrCodeDiv = document.getElementById('qr-code');

// Function to generate the QR code
function generateQRCode(text) {
  qrCodeDiv.innerHTML = '';  // Clear any previous QR code

  QRCode.toCanvas(qrCodeDiv, text, { width: 200, height: 200 }, function (error) {
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
    } else {
      console.log('QR code generated!');
      // Automatically trigger the print dialog
      printQRCode();
    }
  });
}

// Function to print the QR code
function printQRCode() {
  const canvas = qrCodeDiv.querySelector('canvas');
  if (canvas) {
    // Open a new window to print the QR code
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
    printWindow.document.write('<h3>QR Code</h3>');
    printWindow.document.write('<div style="text-align:center;">');
    printWindow.document.write(canvas.outerHTML);  // Add the QR code canvas to the print window
    printWindow.document.write('</div></body></html>');
    printWindow.document.close();
    
    // Wait a bit for the window to load, then print
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();  // Close the print window after printing
    };
  } else {
    alert("QR Code is not generated yet!");
  }
}

// Event listener for generating the QR code
generateBtn.addEventListener('click', function () {
  const inputText = qrInput.value.trim();
  if (inputText) {
    generateQRCode(inputText);
  } else {
    alert('Please enter some text or URL.');
  }
});
