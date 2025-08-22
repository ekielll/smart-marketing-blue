import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, Printer, Eye, BarChart3, TrendingUp, Target, Users } from '@phosphor-icons/react'
import { toast } from 'sonner'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { CompanyInfo, InterviewResponse, ExpertAnalysis } from '../App'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

interface PdfReportGeneratorProps {
  companyInfo: CompanyInfo
  responses: InterviewResponse[]
  analysis: ExpertAnalysis
  insights?: any
}

export default function PdfReportGenerator({ companyInfo, responses, analysis, insights }: PdfReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  // Sample data for charts - in real implementation, this would come from analysis
  const marketingChannelsData = {
    labels: ['Social Media', 'SEO', 'Paid Ads', 'Email', 'Content', 'PR'],
    datasets: [{
      label: 'Effectiveness Score',
      data: [85, 78, 92, 67, 89, 45],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
      borderWidth: 0,
      borderRadius: 8,
    }]
  }

  const performanceProjectionData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Projected Growth (%)',
        data: [15, 25, 35, 45],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Industry Average (%)',
        data: [8, 12, 18, 22],
        borderColor: '#6b7280',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  }

  const audienceSegmentData = {
    labels: ['Young Professionals', 'Small Business Owners', 'Enterprise Decision Makers', 'Freelancers'],
    datasets: [{
      data: [35, 30, 20, 15],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0,
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  }

  const generatePDF = async () => {
    if (!reportRef.current) return

    setIsGenerating(true)
    try {
      // Create PDF with proper formatting
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      // Capture the report as canvas
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: reportRef.current.scrollHeight,
        width: reportRef.current.scrollWidth,
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = pageWidth - 20 // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let position = 10 // Start position
      let remainingHeight = imgHeight

      // Add pages as needed
      while (remainingHeight > 0) {
        const currentPageHeight = Math.min(remainingHeight, pageHeight - 20)
        
        pdf.addImage(
          imgData, 
          'PNG', 
          10, 
          position, 
          imgWidth, 
          currentPageHeight,
          undefined,
          'FAST'
        )

        remainingHeight -= (pageHeight - 20)
        
        if (remainingHeight > 0) {
          pdf.addPage()
          position = -(imgHeight - remainingHeight) + 10
        }
      }

      // Save the PDF
      const fileName = `${companyInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}_Marketing_Strategy_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
      toast.success('PDF report generated successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF report')
    } finally {
      setIsGenerating(false)
    }
  }

  const printReport = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Marketing Strategy Report
          </CardTitle>
          <CardDescription>
            Generate a comprehensive PDF report with charts, insights, and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button onClick={generatePDF} disabled={isGenerating}>
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
            <Button onClick={printReport} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print Report
            </Button>
          </div>

          {showPreview && (
            <div className="border rounded-lg p-1 bg-gray-50 max-h-96 overflow-y-auto">
              <div ref={reportRef} className="bg-white p-8 min-h-full" style={{ width: '210mm', margin: '0 auto' }}>
                {/* Report Header */}
                <div className="text-center mb-8 border-b pb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Strategy Report</h1>
                  <h2 className="text-xl text-gray-600 mb-4">{companyInfo.name}</h2>
                  <div className="text-sm text-gray-500">
                    <p>Generated on {new Date().toLocaleDateString()}</p>
                    <p>Contact: {companyInfo.contactName} • {companyInfo.email}</p>
                  </div>
                </div>

                {/* Executive Summary */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Executive Summary
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      Based on our comprehensive analysis of {companyInfo.name} in the {companyInfo.industry} industry, 
                      we've identified key opportunities for growth through strategic marketing initiatives. This report 
                      outlines actionable recommendations to enhance your market presence and drive sustainable growth.
                    </p>
                  </div>
                </section>

                {/* Marketing Channels Effectiveness */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Marketing Channels Effectiveness
                  </h3>
                  <div style={{ height: '300px', marginBottom: '20px' }}>
                    <Bar data={marketingChannelsData} options={chartOptions} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Analysis shows paid advertising and content marketing offer the highest ROI potential for your industry.
                  </p>
                </section>

                {/* Growth Projections */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    12-Month Growth Projections
                  </h3>
                  <div style={{ height: '300px', marginBottom: '20px' }}>
                    <Line data={performanceProjectionData} options={chartOptions} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Conservative projections show 45% growth potential by Q4 with proper implementation of recommended strategies.
                  </p>
                </section>

                {/* Target Audience Segments */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Target Audience Distribution
                  </h3>
                  <div style={{ height: '300px', marginBottom: '20px' }}>
                    <Doughnut data={audienceSegmentData} options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          position: 'right' as const,
                        }
                      }
                    }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Focus on young professionals and small business owners for maximum impact and conversion rates.
                  </p>
                </section>

                {/* Expert Analysis */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Expert Analysis Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Market Analyst Insights</h4>
                      <p className="text-sm text-gray-700">{analysis.marketAnalyst.slice(0, 200)}...</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Social Media Strategy</h4>
                      <p className="text-sm text-gray-700">{analysis.socialMediaGuru.slice(0, 200)}...</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">SEO Recommendations</h4>
                      <p className="text-sm text-gray-700">{analysis.seoExpert.slice(0, 200)}...</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Competitive Analysis</h4>
                      <p className="text-sm text-gray-700">{analysis.competitorAnalyst.slice(0, 200)}...</p>
                    </div>
                  </div>
                </section>

                {/* Key Recommendations */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Key Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <p className="text-gray-700">Implement comprehensive social media strategy focusing on LinkedIn and Instagram</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <p className="text-gray-700">Launch targeted Google Ads campaign with focus on high-intent keywords</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <p className="text-gray-700">Develop content marketing strategy with weekly blog posts and case studies</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <p className="text-gray-700">Optimize website for search engines and improve conversion rate</p>
                    </div>
                  </div>
                </section>

                {/* Report Footer */}
                <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
                  <p>This report was generated by AI Marketing Strategy Platform</p>
                  <p>For questions or support, contact {companyInfo.email}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}