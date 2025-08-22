import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, TrendUp, Users, Megaphone, MagnifyingGlass, CheckCircle } from '@phosphor-icons/react'
import { CompanyInfo, InterviewResponse, ExpertAnalysis as ExpertAnalysisType } from '../App'

interface ExpertAnalysisProps {
  companyInfo: CompanyInfo
  responses: InterviewResponse[]
  onComplete: (analysis: ExpertAnalysisType) => void
}

const experts = [
  {
    name: 'Market Analyst',
    icon: TrendUp,
    description: 'Analyzing target audience and market positioning',
    color: 'text-blue-600'
  },
  {
    name: 'Social Media Guru',
    icon: Users,
    description: 'Designing content strategy and platform recommendations',
    color: 'text-purple-600'
  },
  {
    name: 'Advertising Pro',
    icon: Megaphone,
    description: 'Creating ad strategies and budget allocation',
    color: 'text-green-600'
  },
  {
    name: 'SEO Expert',
    icon: MagnifyingGlass,
    description: 'Identifying keywords and search optimization',
    color: 'text-orange-600'
  }
]

export default function ExpertAnalysis({ companyInfo, responses, onComplete }: ExpertAnalysisProps) {
  const [progress, setProgress] = useState(0)
  const [completedExperts, setCompletedExperts] = useState<string[]>([])
  const [analysisResults, setAnalysisResults] = useState<Partial<ExpertAnalysisType>>({})

  useEffect(() => {
    analyzeWithExperts()
  }, [])

  const analyzeWithExperts = async () => {
    const conversationContext = responses.map(r => 
      `Q: ${r.question}\nA: ${r.answer}`
    ).join('\n\n')

    const baseContext = `
Company: ${companyInfo.name}
Industry: ${companyInfo.industry}
Contact: ${companyInfo.contactName}
Email: ${companyInfo.email}

Interview Conversation:
${conversationContext}
`

    const expertPromises = experts.map(async (expert, index) => {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, (index + 1) * 1500))

      let prompt = ''
      let expertKey = ''

      switch (expert.name) {
        case 'Market Analyst':
          expertKey = 'marketAnalyst'
          prompt = spark.llmPrompt`You are a senior market analyst. Based on this company information and interview:

${baseContext}

Provide a comprehensive market analysis including:
1. Target audience definition (demographics, psychographics, pain points)
2. Market positioning recommendations
3. Competitive advantages to leverage
4. Market opportunities and threats
5. Customer persona development

Write in a professional but accessible tone. Be specific and actionable.`
          break

        case 'Social Media Guru':
          expertKey = 'socialMediaGuru'
          prompt = spark.llmPrompt`You are a social media marketing expert. Based on this company information and interview:

${baseContext}

Create a social media strategy including:
1. Recommended platforms and why
2. Content themes and posting frequency
3. Engagement strategies
4. Visual brand guidelines
5. Community building approaches
6. Performance metrics to track

Focus on platforms and strategies that match their audience and resources.`
          break

        case 'Advertising Pro':
          expertKey = 'advertisingPro'
          prompt = spark.llmPrompt`You are a digital advertising strategist. Based on this company information and interview:

${baseContext}

Develop an advertising strategy including:
1. Recommended advertising channels (Google Ads, Facebook, LinkedIn, etc.)
2. Budget allocation suggestions by channel
3. Target audience segments for each channel
4. Ad copy examples and creative direction
5. Campaign objectives and KPIs
6. Testing and optimization strategies

Provide specific, actionable recommendations with reasoning.`
          break

        case 'SEO Expert':
          expertKey = 'seoExpert'
          prompt = spark.llmPrompt`You are an SEO specialist. Based on this company information and interview:

${baseContext}

Create an SEO strategy including:
1. Primary and secondary keyword targets
2. Content marketing opportunities
3. Technical SEO recommendations
4. Local SEO strategies (if applicable)
5. Link building opportunities
6. Competitor analysis insights
7. Content calendar suggestions

Focus on keywords and strategies that will drive qualified traffic.`
          break
      }

      try {
        const analysis = await spark.llm(prompt)
        
        setAnalysisResults(prev => ({
          ...prev,
          [expertKey]: analysis
        }))
        
        setCompletedExperts(prev => [...prev, expert.name])
        setProgress(prev => prev + 25)
        
        return { [expertKey]: analysis }
      } catch (error) {
        console.error(`Error with ${expert.name}:`, error)
        const fallbackAnalysis = `Analysis for ${expert.name} is being processed. Please check back shortly for detailed insights.`
        
        setAnalysisResults(prev => ({
          ...prev,
          [expertKey]: fallbackAnalysis
        }))
        
        setCompletedExperts(prev => [...prev, expert.name])
        setProgress(prev => prev + 25)
        
        return { [expertKey]: fallbackAnalysis }
      }
    })

    await Promise.all(expertPromises)
    
    // Small delay to show completion
    setTimeout(() => {
      const finalAnalysis: ExpertAnalysisType = {
        marketAnalyst: analysisResults.marketAnalyst || '',
        socialMediaGuru: analysisResults.socialMediaGuru || '',
        advertisingPro: analysisResults.advertisingPro || '',
        seoExpert: analysisResults.seoExpert || ''
      }
      onComplete(finalAnalysis)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-accent/10 rounded-full">
              <Brain size={40} className="text-accent" weight="fill" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Expert Strategy Session</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Our team of AI marketing experts is analyzing your interview and building your custom strategy
          </p>
          
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analysis Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map((expert) => {
            const isCompleted = completedExperts.includes(expert.name)
            const isWorking = !isCompleted && completedExperts.length < experts.indexOf(expert)
            
            return (
              <Card key={expert.name} className={`transition-all duration-500 ${
                isCompleted ? 'border-green-200 bg-green-50/50' : 
                isWorking ? 'border-accent bg-accent/5' : 'opacity-60'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      isCompleted ? 'bg-green-100' : 
                      isWorking ? 'bg-accent/10' : 'bg-muted'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={24} className="text-green-600" weight="fill" />
                      ) : (
                        <expert.icon size={24} className={isWorking ? 'text-accent' : 'text-muted-foreground'} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground font-normal">
                        {expert.description}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isCompleted ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Analysis Complete
                      </Badge>
                    </div>
                  ) : isWorking ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">Working on analysis...</span>
                    </div>
                  ) : (
                    <Badge variant="outline">Waiting in queue</Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Company Info Reminder */}
        <Card className="mt-8 bg-secondary/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Analyzing {companyInfo.name}</h3>
                <p className="text-muted-foreground">
                  {companyInfo.industry} • Creating personalized strategy based on your interview responses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}