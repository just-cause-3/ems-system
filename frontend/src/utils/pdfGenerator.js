import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateSalarySlipPDF = (salaryData, employeeData) => {
  const docDefinition = {
    content: [
      {
        text: 'SALARY SLIP',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        columns: [
          {
            width: '50%',
            text: [
              { text: 'Employee Details\n', style: 'subheader' },
              { text: `Name: ${employeeData.FirstName} ${employeeData.MiddleName} ${employeeData.LastName}\n` },
              { text: `Employee ID: ${employeeData.EmployeeID}\n` },
              { text: `Email: ${employeeData.Email}\n` },
            ]
          },
          {
            width: '50%',
            text: [
              { text: 'Pay Period\n', style: 'subheader' },
              { text: `Date: ${new Date().toLocaleDateString()}\n` },
            ]
          }
        ]
      },
      { text: '\n' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [
            [
              { text: 'Description', style: 'tableHeader' },
              { text: 'Amount', style: 'tableHeader' }
            ],
            ['Basic Salary', { text: `$${salaryData.BasicSalary.toFixed(2)}`, alignment: 'right' }],
            ['Tax Deduction', { text: `$${salaryData.TaxDeduction.toFixed(2)}`, alignment: 'right' }],
            ['Net Salary', { 
              text: `$${(salaryData.BasicSalary - salaryData.TaxDeduction).toFixed(2)}`,
              alignment: 'right',
              style: 'tableTotal'
            }],
          ]
        }
      },
      { text: '\n\n' },
      {
        text: 'Bank Details',
        style: 'subheader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [
            ['Bank Name', salaryData.BankName],
            ['Account Number', salaryData.AccountNo],
            ['Account Holder', salaryData.AccountHolderName],
            ['IFSC Code', salaryData.IFSCcode],
          ]
        }
      },
      { text: '\n\n' },
      {
        text: 'This is a computer-generated document. No signature is required.',
        style: 'footer',
        alignment: 'center',
        italics: true
      }
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableHeader: {
        bold: true,
        fillColor: '#eeeeee'
      },
      tableTotal: {
        bold: true
      },
      footer: {
        fontSize: 10,
        color: '#666666'
      }
    },
    defaultStyle: {
      fontSize: 12
    }
  };

  return pdfMake.createPdf(docDefinition);
};
