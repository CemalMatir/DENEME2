// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import run from './main'; // main dosyanızın doğru konumda olduğundan emin olun

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });

//         // İlk sayfayı alın, varsayılan olarak 'Sheet1'
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Veriyi JSON formatına çevirin
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         // Dönüşüm işlemi
//         const transformedData = jsonData.map(([name, surname,phoneNumber, message]) => ({
//           name:name,
//           surname:surname,
//           phone_number: phoneNumber,
//           message: message,
//         }));

//         console.log('Dönüştürülmüş Veri:', transformedData);

//         // JSON veriyi run fonksiyonuna iletir
//         await run(transformedData); 

//         console.log('Dosya gönderiliyor:', selectedFile);
//         // Burada dosyayı gönderme işlemini gerçekleşir.
//       };

//       reader.readAsArrayBuffer(selectedFile);
//     } else {
//       console.log('Lütfen bir dosya seçin.');
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Dosyayı Gönder</button>
//     </div>
//   );
// };

// export default FileUpload;





import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import run from './main'; // main dosyanızın doğru konumda olduğundan emin olun

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // İlk sayfayı alın, varsayılan olarak 'Sheet1'
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Veriyi JSON formatına çevirin
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header:1  });

        // Dönüşüm işlemi
        const transformedData = jsonData.map(([name,surname,phoneNumber,message]) => ({
          name:name ||"",
          surname:surname||"",
          phone_number: phoneNumber,
          message: message,
        }));

        console.log('Dönüştürülmüş Veri:', transformedData);

        // JSON veriyi run fonksiyonuna iletir
        await run(transformedData); 

        console.log('Dosya gönderiliyor:', selectedFile);
        // Burada dosyayı gönderme işlemini gerçekleşir.
      };

      reader.readAsArrayBuffer(selectedFile);
    } else {
      console.log('Lütfen bir dosya seçin.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Dosyayı Gönder</button>
    </div>
  );
};

export default FileUpload;
