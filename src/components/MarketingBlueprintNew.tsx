import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Download, Save, Sparkles, Target, TrendingUp, Users, BarChart3, MessageCircle, Search, Megaphone, FileText, Brain } from '@phosphor-icons/react'
import { CompanyInfo, InterviewResponse, ExpertAnalysis } from '../App'
import ApiKeyManager from './ApiKeyManager'
import RealTimeInsights from './RealTimeInsights'
import PdfReportGenerator from './PdfReportGenerator'

interface MarketingBlueprintProps {
  companyInfo: CompanyInfo
  responses: InterviewResponse[]
  analysis: ExpertAnalysis
  onReset: () => void
  onSave: () => void
}

export default function MarketingBlueprint({ 
  companyInfo, 
  responses, 
  analysis, 
  onReset,
  onSave 
}: MarketingBlueprintProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isApiConfigured, setIsApiConfigured] = useState(false)
  const [insights, setInsights] = useState<any>(null)

  const handleApiKeysConfigured = () => {
    setIsApiConfigured(true)
  }

  const handleInsightsGenerated = (generatedInsights: any) => {
    setInsights(generatedInsights)
  }

  const strategies = [
    {
      icon: MessageCircle,
      title: 'Social Media Strategy',
      description: 'Build brand awareness and engage with your target audience',
      analysis: analysis.socialMediaGuru,
      priority: 'High',
      timeline: '2-4 weeks',
      investment: '$2,000-$5,000/month'
    },
    {
      icon: Search,
      title: 'SEO & Content Marketing',
      description: 'Improve organic visibility and establish thought leadership',
      analysis: analysis.seoExpert,
      priority: 'High',
      timeline: '3-6 months',
      investment: '$3,000-$7,000/month'
    },
    {
      icon: Megaphone,
      title: 'Paid Advertising',
      description: 'Drive immediate traffic and qualified leads',
      analysis: analysis.advertisingPro,
      priority: 'Medium',
      timeline: '1-2 weeks',
      investment: '$5,000-$15,000/month'
    }
  ]

  const competitiveInsights = analysis.competitorAnalyst.split('.').filter(Boolean).slice(0, 5)
  const marketInsights = analysis.marketAnalyst.split('.').filter(Boolean).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onReset}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Marketing Strategy for {companyInfo.name}</h1>
                <p className="text-muted-foreground">{companyInfo.industry} • {companyInfo.contactName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={onSave} variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Strategy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* API Key Configuration */}
        <ApiKeyManager onKeysConfigured={handleApiKeysConfigured} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="competitive">Competitive</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-lg">Market Position</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Overall Score</span>
                      <Badge variant="secondary">85/100</Badge>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <CardTitle className="text-lg">Growth Potential</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">12-Month Projection</span>
                      <Badge className="bg-green-100 text-green-800">+150%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Strong indicators for significant growth
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <CardTitle className="text-lg">Target Reach</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Potential Audience</span>
                      <Badge variant="outline">2.3M people</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Qualified prospects in target market
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary & Key Recommendations</CardTitle>
                <CardDescription>
                  Based on expert analysis of {companyInfo.name}'s market position and growth opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Market Opportunities</h4>
                    <div className="space-y-2">
                      {marketInsights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">{insight.trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Priority Actions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-100 text-green-800">1</Badge>
                        <span className="text-sm">Launch social media advertising campaign</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-blue-100 text-blue-800">2</Badge>
                        <span className="text-sm">Optimize website for search engines</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-purple-100 text-purple-800">3</Badge>
                        <span className="text-sm">Develop content marketing strategy</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-orange-100 text-orange-800">4</Badge>
                        <span className="text-sm">Implement email automation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategies Tab */}
          <TabsContent value="strategies" className="space-y-6">
            <div className="grid gap-6">
              {strategies.map((strategy, index) => {
                const Icon = strategy.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{strategy.title}</CardTitle>
                            <CardDescription>{strategy.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={strategy.priority === 'High' ? 'default' : 'secondary'}>
                            {strategy.priority} Priority
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm leading-relaxed">{strategy.analysis}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium">Timeline: </span>
                            <span className="text-sm text-muted-foreground">{strategy.timeline}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Investment: </span>
                            <span className="text-sm text-muted-foreground">{strategy.investment}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <RealTimeInsights 
              companyInfo={companyInfo}
              responses={responses}
              onInsightsGenerated={handleInsightsGenerated}
            />
          </TabsContent>

          {/* Competitive Analysis Tab */}
          <TabsContent value="competitive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Competitive Landscape Analysis
                </CardTitle>
                <CardDescription>
                  Expert insights on your competitive position and market opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitiveInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                      <p className="text-sm leading-relaxed">{insight.trim()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Research Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{analysis.marketResearcher}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PDF Report Tab */}
          <TabsContent value="report" className="space-y-6">
            <PdfReportGenerator 
              companyInfo={companyInfo}
              responses={responses}
              analysis={analysis}
              insights={insights}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}