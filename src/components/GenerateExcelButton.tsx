"use client"
import writeXlsxFile from "write-excel-file";

export default function GenerateExcelButton({projects}: { projects: any }) {

  async function generateExcel() {
    const HEADER_ROW = [
      {value: 'Name', fontWeight: 'bold'},
      {value: 'Description', fontWeight: 'bold'},
      {value: "Created At", fontWeight: 'bold'},
      {value: "Updated At", fontWeight: 'bold'},
    ];

    let DATA_ROW_1: any = [];
    projects.forEach((project: any) => {
      DATA_ROW_1.push({type: String, value: project.name});
      DATA_ROW_1.push({type: String, value: project.description});
      DATA_ROW_1.push({type: Date, value: project.createdAt, format: "mm/dd/yyyy"});
      DATA_ROW_1.push({type: Date, value: project.updatedAt, format: "mm/dd/yyyy"});
    });

    // const DATA_ROW_1 = [
    //     {type: String, value: 'John Smith'},
    //     {type: Date, value: new Date(), format: 'mm/dd/yyyy'},
    // ];

    const data = [HEADER_ROW, DATA_ROW_1];
    await writeXlsxFile(data, {fileName: 'projects.xlsx'});
  }

  return (
    <>
      <button onClick={() => generateExcel()} className="p-2 mt-28 rounded-sm bg-black text-white dark:bg-orange-400">Download
        Projects
      </button>
    </>
  )
}
