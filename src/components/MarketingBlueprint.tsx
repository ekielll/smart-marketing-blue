import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Download, 
  RotateCcw, 
  TrendUp, 
  Users, 
  Megaphone, 
  MagnifyingGlass,
  FileText,
  CheckCircle,
  Target,
  Share,
  Printer,
  Eye,
  X,
  FloppyDisk,
  Envelope,
  Calendar,
  Phone,
  BarChart3,
  BookOpen
} from '@phosphor-icons/react'
import { CompanyInfo, InterviewResponse, ExpertAnalysis } from '../App'
import { downloadPDFReport, shareViaEmail, generateCalendarEvent, ReportData } from '../lib/reportUtils'
import { getRecommendedTemplate, getAllTemplates } from '../lib/strategyTemplates'
import { toast } from 'sonner'

interface MarketingBlueprintProps {
  companyInfo: CompanyInfo
  responses: InterviewResponse[]
  analysis: ExpertAnalysis
  onReset: () => void
  onSave?: () => void
}

export default function MarketingBlueprint({ 
  companyInfo, 
  responses, 
  analysis, 
  onReset,
  onSave
}: MarketingBlueprintProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showPreview, setShowPreview] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showCalendarDialog, setShowCalendarDialog] = useState(false)
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [emailForm, setEmailForm] = useState({ 
    to: companyInfo.email, 
    subject: `Marketing Strategy for ${companyInfo.name}`,
    message: `Hi ${companyInfo.contactName},\n\nAttached is your custom marketing strategy blueprint for ${companyInfo.name}. This comprehensive plan includes market analysis, competitor insights, market research, social media strategy, advertising recommendations, and SEO tactics tailored specifically to your business.\n\nPlease review the recommendations and let me know if you have any questions.\n\nBest regards,\nMarketing Strategy Team`
  })

  const recommendedTemplate = getRecommendedTemplate(companyInfo.industry)
  const allTemplates = getAllTemplates()

  const downloadPDF = async () => {
    setIsDownloading(true)
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const reportData: ReportData = {
      companyInfo,
      responses,
      analysis
    }
    
    downloadPDFReport(reportData)
    
    setIsDownloading(false)
    setShowPreview(false)
    toast.success('Marketing strategy report downloaded successfully!')
  }

  const shareStrategy = () => {
    if (navigator.share) {
      navigator.share({
        title: `Marketing Strategy for ${companyInfo.name}`,
        text: `Custom marketing blueprint generated for ${companyInfo.name} in the ${companyInfo.industry} industry.`,
        url: window.location.href
      }).then(() => {
        toast.success('Strategy shared successfully!')
      }).catch(() => {
        toast.error('Unable to share strategy.')
      })
    } else {
      // Fallback to copying to clipboard
      const shareText = `Check out this custom marketing strategy for ${companyInfo.name}!`
      navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`).then(() => {
        toast.success('Link copied to clipboard!')
      }).catch(() => {
        toast.error('Unable to copy link. Please copy the URL manually.')
      })
    }
  }

  const printReport = () => {
    window.print()
    toast.success('Print dialog opened!')
  }

  const sendEmail = () => {
    const reportData: ReportData = {
      companyInfo,
      responses,
      analysis
    }
    
    shareViaEmail(reportData, emailForm.message)
    setShowEmailDialog(false)
    toast.success('Email client opened with strategy details!')
  }

  const scheduleConsultation = () => {
    const reportData: ReportData = {
      companyInfo,
      responses,
      analysis
    }
    
    generateCalendarEvent(reportData)
    setShowCalendarDialog(false)
    toast.success('Calendar event template opened!')
  }

  const formatAnalysisContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.match(/^\d+\./)) {
        return (
          <div key={index} className="flex items-start gap-3 mb-3">
            <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" weight="fill" />
            <p className="text-foreground">{line}</p>
          </div>
        )
      }
      if (line.match(/^[A-Z\s]+:$/)) {
        return <h4 key={index} className="font-semibold text-lg mt-6 mb-3 text-primary">{line}</h4>
      }
      if (line.trim() === '') {
        return <div key={index} className="mb-2"></div>
      }
      return <p key={index} className="mb-2 text-foreground">{line}</p>
    })
  }

  const ReportPreview = () => (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto shadow-2xl">
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MARKETING STRATEGY BLUEPRINT</h1>
        <div className="text-gray-600 space-y-1">
          <p className="text-xl font-semibold">{companyInfo.name}</p>
          <p>{companyInfo.industry} Industry</p>
          <p>Generated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          EXECUTIVE SUMMARY
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded border">
            <h3 className="font-semibold text-blue-900 mb-2">Company Profile</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><span className="font-medium">Company:</span> {companyInfo.name}</p>
              <p><span className="font-medium">Industry:</span> {companyInfo.industry}</p>
              <p><span className="font-medium">Contact:</span> {companyInfo.contactName}</p>
              <p><span className="font-medium">Analysis Date:</span> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded border">
            <h3 className="font-semibold text-green-900 mb-2">Strategy Components</h3>
            <div className="text-sm text-green-800 space-y-1">
              <p>✓ Market Analysis & Positioning</p>
              <p>✓ Competitive Intelligence</p>
              <p>✓ Market Research & Trends</p>
              <p>✓ Social Media Strategy</p>
              <p>✓ Advertising & Promotion Plan</p>
              <p>✓ SEO & Content Strategy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Analysis Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          MARKET ANALYSIS & POSITIONING
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          {analysis.marketAnalyst.split('\n').slice(0, 6).map((line, index) => (
            <p key={index} className="mb-3">{line}</p>
          ))}
          {analysis.marketAnalyst.split('\n').length > 6 && (
            <p className="text-gray-500 italic">... [continued in full report]</p>
          )}
        </div>
      </div>

      {/* Competitive Analysis Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          COMPETITIVE ANALYSIS & INTELLIGENCE
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          {analysis.competitorAnalyst.split('\n').slice(0, 6).map((line, index) => (
            <p key={index} className="mb-3">{line}</p>
          ))}
          {analysis.competitorAnalyst.split('\n').length > 6 && (
            <p className="text-gray-500 italic">... [continued in full report]</p>
          )}
        </div>
      </div>

      {/* Market Research Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          MARKET RESEARCH & INDUSTRY INSIGHTS
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          {analysis.marketResearcher.split('\n').slice(0, 6).map((line, index) => (
            <p key={index} className="mb-3">{line}</p>
          ))}
          {analysis.marketResearcher.split('\n').length > 6 && (
            <p className="text-gray-500 italic">... [continued in full report]</p>
          )}
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          SOCIAL MEDIA STRATEGY
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          {analysis.socialMediaGuru.split('\n').slice(0, 6).map((line, index) => (
            <p key={index} className="mb-3">{line}</p>
          ))}
          {analysis.socialMediaGuru.split('\n').length > 6 && (
            <p className="text-gray-500 italic">... [continued in full report]</p>
          )}
        </div>
      </div>

      {/* Advertising Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          ADVERTISING STRATEGY
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          {analysis.advertisingPro.split('\n').slice(0, 6).map((line, index) => (
            <p key={index} className="mb-3">{line}</p>
          ))}
          {analysis.advertisingPro.split('\n').length > 6 && (
            <p className="text-gray-500 italic">... [continued in full report]</p>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          SEO STRATEGY
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          {analysis.seoExpert.split('\n').slice(0, 6).map((line, index) => (
            <p key={index} className="mb-3">{line}</p>
          ))}
          {analysis.seoExpert.split('\n').length > 6 && (
            <p className="text-gray-500 italic">... [continued in full report]</p>
          )}
        </div>
      </div>

      {/* Interview Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          INTERVIEW INSIGHTS
        </h2>
        <div className="text-gray-600 text-sm">
          <p className="mb-3">This strategy is based on {responses.length} strategic interview questions and responses.</p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-medium mb-2">Key Topics Covered:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Business objectives and target audience</li>
              <li>Current marketing challenges and opportunities</li>
              <li>Competitive landscape and positioning</li>
              <li>Budget considerations and resource allocation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
        <p>This marketing strategy blueprint was generated using AI-powered analysis.</p>
        <p>For best results, review and adapt recommendations to your specific business context.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <FileText size={32} className="text-accent" weight="fill" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Marketing Blueprint</h1>
                <p className="text-muted-foreground">
                  Custom strategy for {companyInfo.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-4 py-2">
                {companyInfo.industry}
              </Badge>
              
              <Button 
                onClick={() => setShowTemplateDialog(true)} 
                variant="outline" 
                size="sm" 
                className="gap-2"
              >
                <BookOpen size={16} />
                Templates
              </Button>
              
              {onSave && (
                <Button onClick={onSave} variant="outline" size="sm" className="gap-2">
                  <FloppyDisk size={16} />
                  Save
                </Button>
              )}
              
              <Button 
                onClick={() => setShowEmailDialog(true)} 
                variant="outline" 
                size="sm" 
                className="gap-2"
              >
                <Envelope size={16} />
                Email
              </Button>
              
              <Button 
                onClick={() => setShowCalendarDialog(true)} 
                variant="outline" 
                size="sm" 
                className="gap-2"
              >
                <Calendar size={16} />
                Schedule
              </Button>
              
              <Button onClick={shareStrategy} variant="outline" size="sm" className="gap-2">
                <Share size={16} />
                Share
              </Button>
              
              <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Eye size={16} />
                    Preview Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl h-[90vh] p-0">
                  <DialogHeader className="p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="flex items-center gap-3">
                        <FileText size={24} className="text-accent" />
                        Report Preview
                      </DialogTitle>
                      <div className="flex items-center gap-2">
                        <Button onClick={downloadPDF} size="sm" className="gap-2">
                          <Download size={16} />
                          Download
                        </Button>
                      </div>
                    </div>
                  </DialogHeader>
                  <ScrollArea className="h-full p-6 pt-0">
                    <ReportPreview />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              
              <Button onClick={onReset} variant="outline" className="gap-2">
                <RotateCcw size={16} />
                New Strategy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Industry Template Alert */}
        {recommendedTemplate && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BookOpen size={24} className="text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">
                    Strategy Based on {recommendedTemplate.name}
                  </h3>
                  <p className="text-sm text-blue-700">
                    {recommendedTemplate.description} - Our analysis incorporates industry best practices and benchmarks.
                  </p>
                </div>
                <Button 
                  onClick={() => setShowTemplateDialog(true)}
                  variant="outline" 
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="overview" className="gap-2">
              <Target size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="market" className="gap-2">
              <TrendUp size={16} />
              Market
            </TabsTrigger>
            <TabsTrigger value="competitive" className="gap-2">
              <Eye size={16} />
              Competitive
            </TabsTrigger>
            <TabsTrigger value="research" className="gap-2">
              <BarChart3 size={16} />
              Research
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2">
              <Users size={16} />
              Social
            </TabsTrigger>
            <TabsTrigger value="advertising" className="gap-2">
              <Megaphone size={16} />
              Advertising
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <MagnifyingGlass size={16} />
              SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target size={24} className="text-primary" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <TrendUp size={24} className="text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-blue-900">Market Analysis</h3>
                      <p className="text-sm text-blue-700">Target audience & positioning</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4 text-center">
                      <Eye size={24} className="text-red-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-red-900">Competitive Analysis</h3>
                      <p className="text-sm text-red-700">Competitor insights & differentiation</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-indigo-50 border-indigo-200">
                    <CardContent className="p-4 text-center">
                      <BarChart3 size={24} className="text-indigo-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-indigo-900">Market Research</h3>
                      <p className="text-sm text-indigo-700">Industry trends & opportunities</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <Users size={24} className="text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-purple-900">Social Strategy</h3>
                      <p className="text-sm text-purple-700">Content & platform plan</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Megaphone size={24} className="text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-green-900">Ad Strategy</h3>
                      <p className="text-sm text-green-700">Budget & channel allocation</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-4 text-center">
                      <MagnifyingGlass size={24} className="text-orange-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-orange-900">SEO Plan</h3>
                      <p className="text-sm text-orange-700">Keywords & content strategy</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Company Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-medium">Company:</span> {companyInfo.name}
                      </div>
                      <div>
                        <span className="font-medium">Industry:</span> {companyInfo.industry}
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span> {companyInfo.contactName}
                      </div>
                      <div>
                        <span className="font-medium">Interview Questions:</span> {responses.length} strategic insights gathered
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-600" weight="fill" />
                          <span>Review each strategy section in detail</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-600" weight="fill" />
                          <span>Download complete report for your team</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-600" weight="fill" />
                          <span>Prioritize recommendations by impact</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-600" weight="fill" />
                          <span>Begin implementation with highest-priority items</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendUp size={24} className="text-blue-600" />
                  Market Analysis & Positioning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formatAnalysisContent(analysis.marketAnalyst)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye size={24} className="text-red-600" />
                  Competitive Analysis & Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formatAnalysisContent(analysis.competitorAnalyst)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 size={24} className="text-indigo-600" />
                  Market Research & Industry Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formatAnalysisContent(analysis.marketResearcher)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users size={24} className="text-purple-600" />
                  Social Media Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formatAnalysisContent(analysis.socialMediaGuru)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advertising" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Megaphone size={24} className="text-green-600" />
                  Advertising Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formatAnalysisContent(analysis.advertisingPro)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MagnifyingGlass size={24} className="text-orange-600" />
                  SEO Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formatAnalysisContent(analysis.seoExpert)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Envelope size={20} className="text-accent" />
              Email Strategy Report
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-to">To</Label>
              <Input
                id="email-to"
                value={emailForm.to}
                onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                placeholder="recipient@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Email subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailForm.message}
                onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Email message"
                rows={6}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                Cancel
              </Button>
              <Button onClick={sendEmail} className="gap-2">
                <Envelope size={16} />
                Open Email Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendar Dialog */}
      <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar size={20} className="text-accent" />
              Schedule Consultation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Meeting Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Company:</strong> {companyInfo.name}</p>
                <p><strong>Contact:</strong> {companyInfo.contactName}</p>
                <p><strong>Email:</strong> {companyInfo.email}</p>
                <p><strong>Industry:</strong> {companyInfo.industry}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Consultation</p>
                  <p className="text-sm text-muted-foreground">Discuss strategy over a phone call</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Video Meeting</p>
                  <p className="text-sm text-muted-foreground">Screen-share to review the strategy together</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCalendarDialog(false)}>
                Cancel
              </Button>
              <Button onClick={scheduleConsultation} className="gap-2">
                <Calendar size={16} />
                Create Calendar Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Strategy Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen size={20} className="text-accent" />
              Strategy Templates & Best Practices
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              {recommendedTemplate && (
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Badge variant="default" className="px-3 py-1">Recommended</Badge>
                      <span>{recommendedTemplate.name}</span>
                    </CardTitle>
                    <p className="text-muted-foreground">{recommendedTemplate.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Metrics</h4>
                        <ul className="text-sm space-y-1">
                          {recommendedTemplate.keyMetrics.map((metric, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle size={16} className="text-green-600" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Recommended Channels</h4>
                        <ul className="text-sm space-y-1">
                          {recommendedTemplate.recommendedChannels.map((channel, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle size={16} className="text-blue-600" />
                              {channel}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Budget Allocation Framework</h4>
                      <div className="space-y-2">
                        {recommendedTemplate.budgetAllocation.map((allocation, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="font-medium">{allocation.channel}</span>
                            <div className="text-right">
                              <span className="font-semibold text-primary">{allocation.percentage}%</span>
                              <p className="text-xs text-muted-foreground">{allocation.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Implementation Phases</h4>
                      <div className="space-y-3">
                        {recommendedTemplate.implementation.map((phase, idx) => (
                          <Card key={idx} className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{phase.phase}</h5>
                              <Badge variant={
                                phase.priority === 'High' ? 'destructive' : 
                                phase.priority === 'Medium' ? 'default' : 'secondary'
                              }>
                                {phase.priority} Priority
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Duration: {phase.duration}</p>
                            <ul className="text-sm space-y-1">
                              {phase.actions.map((action, actionIdx) => (
                                <li key={actionIdx} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-4">All Available Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allTemplates.map((template) => (
                    <Card key={template.id} className={template.id === recommendedTemplate?.id ? 'border-primary bg-primary/5' : ''}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          {template.id === recommendedTemplate?.id && (
                            <Badge variant="outline" className="text-xs">Current</Badge>
                          )}
                          {template.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Target Industries:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {template.targetIndustries.slice(0, 3).map((industry, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {industry}
                                </Badge>
                              ))}
                              {template.targetIndustries.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{template.targetIndustries.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}