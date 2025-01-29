function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();

  // Open a new print window
  let printWindow = window.open('', '_blank', 'width=600,height=400');

  // Check if popup was blocked
  if (!printWindow || printWindow.closed || typeof printWindow.closed == "undefined") {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }

  // Write the content to the new print window
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          @page {
            size: 3in 2in;
            margin: 0;
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
            padding: 5px;
          }
          .details {
            margin-bottom: 2px;
          }
          .details h2 {
            font-size: 10pt;
            margin: 2px 0;
          }
          img {
            width: 1.2in;
            height: 1.2in;
            border: 1px solid #ccc;
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
          window.onload = function() {
            setTimeout(() => { window.print(); }, 500);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}
