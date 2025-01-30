function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();

  // Open the print window
  let printWindow = window.open('', '_blank', 'width=600,height=400');
  
  if (!printWindow) {
    alert("Popup blocked! Please enable pop-ups for this site.");
    return;
  }

  // Write content into the print window
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          }
          .details h2 {
            font-size: 14pt;
            margin: 5px 0;
          }
          img {
            width: 150px;
            height: 150px;
            border: 1px solid #000;
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
          setTimeout(() => { window.print(); }, 500);
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
