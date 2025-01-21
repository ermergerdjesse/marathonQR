function printQRCode(canvas) {
  // Convert the canvas to an HTML image
  const imageUrl = canvas.toDataURL();
  
  // Open a new print window
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

  // Trigger the print dialog
  printWindow.onload = function () {
    printWindow.print();
    printWindow.close(); // Automatically close the window after printing
  };
}
