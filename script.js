function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();
  
  const printWindow = window.open('', '', 'width=300,height=200');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          @page {
            size: 3in 2in; /* Set exact label size */
            margin: 0; /* Remove any default margins */
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
            margin-bottom: 3px;
          }
          .details h2 {
            font-size: 10pt;
            margin: 2px 0; /* Reduce spacing */
          }
          img {
            width: 1.2in; /* Make sure it fits inside the label */
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
      </body>
    </html>
  `);
  printWindow.document.close();

  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
}
