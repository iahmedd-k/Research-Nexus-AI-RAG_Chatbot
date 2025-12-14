// src/utils/pdfparser.ts
import { PDFDocument } from 'pdf-lib';

export async function extractText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const pages = pdfDoc.getPages();
    let fullText = '';
    
    // Note: pdf-lib doesn't extract text directly
    // You'll need to use it with another library or return metadata
    
    // For now, return basic info
    const pageCount = pages.length;
    fullText = `PDF loaded successfully with ${pageCount} pages.\n`;
    fullText += `This PDF requires additional processing for text extraction.`;
    
    return fullText;
  } catch (error) {
    console.error('Error loading PDF:', error);
    throw new Error('Failed to load PDF');
  }
}