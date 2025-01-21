const generateBtn = document.getElementById('generate-btn');
const qrInput = document.getElementById('qr-input');
const qrCodeDiv = document.getElementById('qr-code');

// Function to generate the QR code
function generateQRCode(text) {
  // Clear any previous QR code
  qrCodeDiv.innerHTML = '';

  // Check if the input is empty
  if (!text) {
    alert('Please enter some text or URL.');
    return;
  }

  // Create a new canvas element for QR code
  const canvas = document.createElement('canvas');
  qrCodeDiv.appendChild(canvas);  // Append the canvas to the div

  // Generate the QR code on the canvas
  QRCode.toCanvas(canvas, text, { width: 200, height: 200 }, function (error) {
    if (error) {
      console.error('Error generating QR Code:', error);
      alert('Failed to generate QR code.');
      return;
    }
    console.log('QR code generated!');
    // Automatically trigger the print dialog
    printQRCode(canvas);
  });
}

// Function to print the QR code
function printQRCode(canvas) {
  // Convert the canvas to a Data URL (base64 image)
  const imageUrl = canvas.toDataURL();

  // Create a hidden iframe to embed the QR code
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);  // Append iframe to the body

  // Open the iframe's document and write HTML content
  const iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<html><head><title>Print QR Code</title>');
  iframeDocument.write('<style>body { font-family: Arial, sans-serif; text-align: center; }</style>');
  iframeDocument.write('</head><body>');
  iframeDocument.write('<h3>QR Code</h3>');
  iframeDocument.write('<img src="' + imageUrl + '" style="max-width: 100%; height: auto;" />');
  iframeDocument.write('</body></html>');
  iframeDocument.close();

  // Wait for the iframe content to load, then trigger the print dialog
  iframe.onload = function () {
    console.log('QR code loaded in iframe. Triggering print...');
    iframe.contentWindow.print();  // Trigger the print dialog
    iframe.contentWindow.onafterprint = function() {
      console.log("Printing complete.");
      document.body.removeChild(iframe);  // Clean up by removing the iframe after printing
    };
  };

  // Timeout fallback if iframe load event fails to fire
  setTimeout(function() {
    console.error("Iframe content loading failed. Tr
