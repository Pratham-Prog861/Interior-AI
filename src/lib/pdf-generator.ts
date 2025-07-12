import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface AnalysisResults {
  roomArea: number
  roomType: string
  constructionEstimate: any[]
  interiorEstimate: any[]
  constructionTotal: number
  interiorTotal: number
  grandTotal: number
  suggestions: string[]
}

export async function generatePDFReport(
  results: AnalysisResults,
  analysisType: 'construction' | 'interior',
  imageName: string
) {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    pdf.setFontSize(fontSize)
    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, y)
    return lines.length * (fontSize * 0.4) // Return height used
  }

  // Helper function to add section header
  const addSectionHeader = (title: string, y: number) => {
    pdf.setFillColor(59, 130, 246) // Blue color
    pdf.rect(margin, y - 5, contentWidth, 8, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text(title, margin + 5, y + 2)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'normal')
    return y + 15
  }

  // Helper function to add table
  const addTable = (headers: string[], data: any[][], startY: number) => {
    const colWidths = [60, 30, 30, 40] // Adjust based on your data
    const rowHeight = 8
    let currentY = startY

    // Header
    pdf.setFillColor(240, 240, 240)
    pdf.rect(margin, currentY, contentWidth, rowHeight, 'F')
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    headers.forEach((header, index) => {
      pdf.text(header, margin + 5 + (index * colWidths[index]), currentY + 5)
    })
    currentY += rowHeight

    // Data rows
    pdf.setFont('helvetica', 'normal')
    data.forEach((row, rowIndex) => {
      if (currentY > pageHeight - 30) {
        pdf.addPage()
        currentY = margin
      }
      
      row.forEach((cell, colIndex) => {
        const cellText = typeof cell === 'number' ? formatCurrency(cell) : String(cell)
        pdf.text(cellText, margin + 5 + (colIndex * colWidths[colIndex]), currentY + 5)
      })
      currentY += rowHeight
    })

    return currentY + 10
  }

  // Page 1: Cover Page
  pdf.setFillColor(59, 130, 246)
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(32)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Interior AI', pageWidth / 2, 60, { align: 'center' })
  
  pdf.setFontSize(18)
  pdf.text('Analysis Report', pageWidth / 2, 80, { align: 'center' })
  
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`Analysis Type: ${analysisType === 'construction' ? 'Construction' : 'Interior'}`, pageWidth / 2, 100, { align: 'center' })
  pdf.text(`Image: ${imageName}`, pageWidth / 2, 115, { align: 'center' })
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 130, { align: 'center' })
  
  pdf.setTextColor(0, 0, 0)

  // Page 2: Executive Summary
  pdf.addPage()
  yPosition = addSectionHeader('Executive Summary', yPosition)
  
  pdf.setFontSize(12)
  const summaryText = `This report provides a comprehensive analysis of your ${analysisType} project. 
  The analysis covers material requirements, cost estimates, and design recommendations based on AI-powered image analysis.`
  yPosition += addWrappedText(summaryText, margin, yPosition, contentWidth)
  
  yPosition += 10
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Project Overview:', margin, yPosition)
  yPosition += 8
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  yPosition += addWrappedText(`• Room Area: ${results.roomArea} sq ft`, margin + 10, yPosition, contentWidth - 10)
  yPosition += addWrappedText(`• Room Type: ${results.roomType}`, margin + 10, yPosition, contentWidth - 10)
  yPosition += addWrappedText(`• Total Project Cost: ${formatCurrency(results.grandTotal)}`, margin + 10, yPosition, contentWidth - 10)
  yPosition += addWrappedText(`• Cost per sq ft: ${formatCurrency(results.grandTotal / results.roomArea)}`, margin + 10, yPosition, contentWidth - 10)

  // Page 3: Construction Materials
  pdf.addPage()
  yPosition = margin
  yPosition = addSectionHeader('Construction Materials Estimate', yPosition)
  
  const constructionHeaders = ['Material', 'Unit', 'Quantity', 'Total Cost']
  const constructionData = results.constructionEstimate.map(item => [
    item.name,
    item.unit,
    item.quantity.toString(),
    item.totalCost
  ])
  
  yPosition = addTable(constructionHeaders, constructionData, yPosition)
  
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`Construction Total: ${formatCurrency(results.constructionTotal)}`, margin, yPosition)

  // Page 4: Interior Items
  pdf.addPage()
  yPosition = margin
  yPosition = addSectionHeader('Interior Items & Layout', yPosition)
  
  const interiorHeaders = ['Item', 'Category', 'Quantity', 'Total Cost']
  const interiorData = results.interiorEstimate.map(item => [
    item.name,
    item.category,
    item.quantity.toString(),
    item.totalCost
  ])
  
  yPosition = addTable(interiorHeaders, interiorData, yPosition)
  
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`Interior Total: ${formatCurrency(results.interiorTotal)}`, margin, yPosition)

  // Page 5: Cost Summary & Recommendations
  pdf.addPage()
  yPosition = margin
  yPosition = addSectionHeader('Cost Summary', yPosition)
  
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`Grand Total: ${formatCurrency(results.grandTotal)}`, margin, yPosition)
  yPosition += 15
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  yPosition += addWrappedText(`Construction Materials: ${formatCurrency(results.constructionTotal)}`, margin, yPosition, contentWidth)
  yPosition += addWrappedText(`Interior Items: ${formatCurrency(results.interiorTotal)}`, margin, yPosition, contentWidth)
  
  yPosition += 20
  yPosition = addSectionHeader('AI Recommendations', yPosition)
  
  results.suggestions.forEach((suggestion, index) => {
    yPosition += addWrappedText(`${index + 1}. ${suggestion}`, margin, yPosition, contentWidth)
    yPosition += 5
  })

  // Save the PDF
  const fileName = `interior-ai-report-${analysisType}-${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(fileName)
  
  return fileName
} 