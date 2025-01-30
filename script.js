function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();

  // Open a new print window
  let printWindow = window.open('', '_blank', 'width=600,height=400');

  if (!printWindow || printWindow.closed || typeof printWindow.closed === "undefined") {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }

  // Ensure the new window loads content properly
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 12pt;
            margin: 0;
            padding: 10px;
          }
          .details {
            margin-bottom: 5px;
          }
          .details h2 {
            font-size: 12pt;
            margin: 2px 0;
          }
          img {
            width: 150px;
            height: 150px;
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
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
