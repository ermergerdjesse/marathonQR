function printQRCode(canvas, firstName, lastName, number) {
  const imageUrl = canvas.toDataURL();
  
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .details {
            margin-bottom: 10px; /* Reduced spacing below the details */
            text-align: center;
          }
          .details h2 {
            margin: 5px 0; /* Reduce spacing between the lines */
          }
          img {
            border: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <div class="details">
          <h2>First Name: ${firstName}</h2>
          <h2>Last Name: ${lastName}</h2>
          <h2>Sequential Number: ${number}</h2>
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
