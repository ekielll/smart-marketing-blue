import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Download, 
  RotateCcw, 
  TrendUp, 
  Users, 
  Megaphone, 
  MagnifyingGlass,
  FileText,
  CheckCircle,
  Target
} from '@phosphor-icons/react'
import { CompanyInfo, InterviewResponse, ExpertAnalysis } from '../App'

interface MarketingBlueprintProps {
  companyInfo: CompanyInfo
  responses: InterviewResponse[]
  analysis: ExpertAnalysis
  onReset: () => void
}

export default function MarketingBlueprint({ 
  companyInfo, 
  responses, 
  analysis, 
  onReset 
}: MarketingBlueprintProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const downloadPDF = () => {
    // Create a comprehensive text version for now
    const reportContent = `
MARKETING STRATEGY BLUEPRINT
Company: ${companyInfo.name}
Industry: ${companyInfo.industry}
Generated: ${new Date().toLocaleDateString()}

================================

MARKET ANALYSIS
${analysis.marketAnalyst}

================================

SOCIAL MEDIA STRATEGY  
${analysis.socialMediaGuru}

================================

ADVERTISING STRATEGY
${analysis.advertisingPro}

================================

SEO STRATEGY
${analysis.seoExpert}

================================

INTERVIEW RESPONSES
${responses.map((r, i) => `
Q${i + 1}: ${r.question}
A${i + 1}: ${r.answer}
`).join('\n')}
`

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${companyInfo.name.replace(/\s+/g, '_')}_Marketing_Strategy.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
              <Button onClick={downloadPDF} className="gap-2">
                <Download size={16} />
                Download Report
              </Button>
              <Button variant="outline" onClick={onReset} className="gap-2">
                <RotateCcw size={16} />
                New Strategy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview" className="gap-2">
              <Target size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="market" className="gap-2">
              <TrendUp size={16} />
              Market
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
                  
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <Users size={24} className="text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-purple-900">Social Strategy</h3>
                      <p className="text-sm text-purple-700">Content & platform plan</p>
                    </CardContent>
                  </Card>
                  
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
    </div>
  )
}