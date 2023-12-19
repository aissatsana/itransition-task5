function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
  
//   function exportToCSV() {
//     const table = document.querySelector('#userTable');
//     const rows = Array.from(table.querySelectorAll('tr'));
//     console.log(rows);
//     // Extract data from table
//     const csvContent = rows.map(row => {
//       const columns = Array.from(row.querySelectorAll('th, td'));
//       return columns.map(column => column.textContent).join(',');
//     }).join('\n');
  
//     // Create and download CSV file
//     downloadCSV(csvContent, 'exported_data.csv');
//   }
  function exportToCSV() {
    const table = document.querySelector('#userTable');
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvContent = rows.map(row => {
        const columns = Array.from(row.querySelectorAll('th, td'));
        return columns.map(column => {
          const text = column.textContent.trim().replace(/"/g, '""');
          return `"${text}"`;
        }).join(',');
      }).join('\n');
      

    downloadCSV(csvContent, 'exported_data.csv');
  }
  

const exportBtn = document.querySelector('#exportBtn');
exportBtn.addEventListener('click', () => exportToCSV());