async function mergePDFs() {
  const files = document.getElementById("pdfs").files;
  const status = document.getElementById("status");

  if (files.length < 2) {
    status.innerText = "⚠️ Please select at least two PDFs.";
    status.style.color = "yellow";
    return;
  }

  status.innerText = "⏳ Merging PDFs, please wait...";
  status.style.color = "lightblue";

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (let file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  const blob = new Blob([mergedBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "merged.pdf";
  link.click();

  status.innerText = "✅ PDFs merged successfully! Download started.";
  status.style.color = "lightgreen";
}
