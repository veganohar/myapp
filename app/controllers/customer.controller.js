const db = require("../models");
const Customer = db.customer;
const Excel = require('exceljs');
const PdfPrinter = require('pdfmake/src/printer');
var printer = new PdfPrinter();
exports.createCustomer = (req,res)=>{
    let obj = req.body;
    let customerData = new Customer();
    for(let p in obj){
        customerData[p] = obj[p];
    }
    customerData.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Record Saved Successfully"
        })
    })

}


exports.getAllCustomers = (req,res)=>{
    Customer.find((err,customers)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(200).send({
            statusCode:200,
            data:customers
        })
    })
}

exports.updateCustomer = (req,res)=>{
    Customer.updateOne({_id:req.body._id},req.body,(err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Data Updated Successfully"
        })
    })
}


exports.deleteCustomer = (req,res)=>{
    Customer.deleteOne({_id:req.params.cid},(err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Data Deleted Successfully"
        })
    })
}


exports.generateExcel =  (req,res)=>{
    Customer.find(async (err,customers)=>{
        if(err){
            return res.status(500).send({message:err})
        }
           let filename = await createExcelFile(customers);
        res.status(200).send({
            statusCode:200,
            message:"Excel Generated Successfully",
            filepath:'http://localhost:3000/'+filename
        })
    })
}


createExcelFile = async (data)=>{
    let workbook = new Excel.Workbook();

    let worksheet = workbook.addWorksheet('samplexl');
    let worksheet2 = workbook.addWorksheet('interests');
    worksheet.columns = [
        {header: 'S.No', key: 'index'},
        {header: 'Name', key: 'name'},
        {header: "Fther's Name", key: 'father_name'},
        {header: 'DOB', key: 'dob'},
        {header: 'Age', key: 'age'},
        {header: 'Phone', key: 'phone'},
        {header: 'Email', key: 'email'},
        {header: 'Gender', key: 'gender'},
        {header: 'Interests', key: 'hobbies'},
        {header: 'Address', key: 'address'},
        {header: 'State', key: 'state'},
        {header: 'City', key: 'city'},
      ];

      worksheet2.columns = [
        {header: 'S.No', key: 'sno'},
        {header: 'Name', key: 'name'},
        {header: 'Interest', key: 'interest'}
      ]

      worksheet.columns.forEach(column => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      })

      worksheet2.columns.forEach(column => {
        column.width = column.header.length < 12 ? 12 : column.header.length;
      })

      worksheet.getRow(1).font = {bold: true}
      worksheet2.getRow(1).font = {bold: true}

      let sno = 0;
      data.forEach((e, index) => {
        let rowIndex = index + 1
        let obj = e;
        obj.index = rowIndex;
        obj.age = findAge(obj.dob);
        obj.hobbies = obj.interests.join(",");
        worksheet.addRow(obj);

        obj.interests.forEach((e)=>{
            let obj1 = {};
            sno++;
            obj1.sno = sno;
            obj1.name = obj.name;
            obj1.interest = e;
            worksheet2.addRow(obj1);
        })

      })


      worksheet.views = [
        { state: 'frozen', xSplit: 0, ySplit: 1 }
      ]
      worksheet2.views = [
        { state: 'frozen', xSplit: 0, ySplit: 1 }
      ]
     await workbook.xlsx.writeFile('reports/samplexl.xlsx')
      return `samplexl.xlsx`;
}


function findAge(dob){
    let bDay = new Date(dob);
    let tDay = new Date();
    let age = tDay.getFullYear() - bDay.getFullYear();
    let md = tDay.getMonth() - bDay.getMonth();
    let dd = tDay.getDate() - bDay.getDate();
    if (md < 0 || (md == 0 && dd < 0)) {
        age--;
    }
    return age;
}


exports.generatePDF = (req,res)=>{
    var dd = {
        content: [
            'First paragraph',
            'Another paragraph'
        ]
    }
    var pdfDoc = printer.createPdfKitDocument(dd);
    pdfDoc.pipe(fs.createWriteStream("samplepdf"));
pdfDoc.end();
res.send("success");
}