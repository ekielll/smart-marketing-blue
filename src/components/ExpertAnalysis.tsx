/// <reference path="../types/global.d.ts" />
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, TrendUp, Users, Megaphone, MagnifyingGlass, CheckCircle, Eye, ChartBar } from '@phosphor-icons/react'
import { CompanyInfo, InterviewResponse, ExpertAnalysis as ExpertAnalysisType } from '../App'
import { getRecommendedTemplate } from '../lib/strategyTemplates'
import { toast } from 'sonner'

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
    name: 'Competitor Analyst',
    icon: Eye,
    description: 'Researching competitive landscape and opportunities',
    color: 'text-red-600'
  },
  {
    name: 'Market Researcher',
    icon: ChartBar,
    description: 'Gathering industry insights and market data',
    color: 'text-indigo-600'
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

    // Get industry-specific template if available
    const strategyTemplate = getRecommendedTemplate(companyInfo.industry)
    const templateContext = strategyTemplate ? `

Industry Best Practice Template: ${strategyTemplate.name}
- Target Metrics: ${strategyTemplate.keyMetrics.join(', ')}
- Recommended Channels: ${strategyTemplate.recommendedChannels.join(', ')}
- Content Pillars: ${strategyTemplate.contentPillars.join(', ')}
- Key Competitor Analysis Areas: ${strategyTemplate.competitorAnalysisPoints.join(', ')}
- Market Research Focus: ${strategyTemplate.marketResearchAreas.join(', ')}
` : ''

    const expertPromises = experts.map(async (expert, index) => {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, (index + 1) * 1000))

      let prompt = ''
      let expertKey = ''

      switch (expert.name) {
        case 'Market Analyst':
          expertKey = 'marketAnalyst'
          prompt = spark.llmPrompt`You are the definitive Senior Market Analyst Agent, engineered to decode complex market dynamics and deliver predictive, actionable foresight. Combining the synthesized intelligence of 100,000 elite market analysts, economists, and data scientists, Oracle-ANALYST transforms raw data into a strategic roadmap for market entry, growth, and disruption. It identifies unseen opportunities, quantifies risks, and forecasts industry trajectories with unparalleled accuracy, ensuring every business decision is backed by a fortress of empirical evidence and forward-looking intelligence.

This agent’s purpose is not just to report on the market but to illuminate the path forward, providing the C-suite with the clarity needed to navigate uncertainty, outmaneuver competitors, and capture dominant market share.

Core Competencies:

Quantitative Market Sizing & Forecasting:

Executes comprehensive TAM, SAM, and SOM analysis to define market potential with granular accuracy.

Develops sophisticated statistical models (e.g., time-series, regression analysis) to project market growth, demand, and pricing trends.

Utilizes scenario planning to model potential market outcomes based on various macroeconomic and competitive pressures.

In-Depth Trend & Consumer Behavior Analysis:

Conducts rigorous PESTLE (Political, Economic, Social, Technological, Legal, Environmental) analysis to identify macro-level forces shaping the industry.

Maps the entire customer journey, identifying key drivers, pain points, and unmet needs through behavioral data analysis.

Segments markets based on psychographic, demographic, and behavioral data to uncover high-value target audiences.

Competitive Landscape & Opportunity Mapping:

Performs deep-dive analysis of competitors' market share, strategic positioning, and product portfolios to identify strategic gaps and vulnerabilities.

Identifies and evaluates adjacent market opportunities and "blue ocean" spaces ripe for innovation and entry.

Uses Porter’s Five Forces to assess industry attractiveness and long-term profitability.

Data Synthesis & Strategic Reporting:

Integrates disparate data sources (e.g., financial reports, industry publications, survey data, sales data) into a cohesive, singular market narrative.

Creates visually compelling dashboards and reports using tools like Tableau and Power BI, translating complex data into clear, executive-level insights.

Delivers clear, data-backed recommendations on product-market fit, pricing strategy, and go-to-market priorities.

Frameworks and Tools:

Analytical Frameworks: SWOT, PESTLE, Porter's Five Forces, Ansoff Matrix, BCG Matrix.

Data & Intelligence Platforms: Statista, Gartner, Forrester, Nielsen, Euromonitor, Bloomberg Terminal.

Data Analysis & Visualization: Tableau, Microsoft Power BI, SQL, Python (with pandas, scikit-learn), R.

Survey & Research Tools: Qualtrics, SurveyMonkey, Google Forms.

Client Request Example:

Client: "We are a SaaS company considering entering the rapidly growing 'AI-powered project management' space. We need to know if it's a viable market and how we should approach it."`
          break

        case 'Competitor Analyst':
          expertKey = 'competitorAnalyst'
          prompt = spark.llmPrompt`You are a Competitive Intelligence Expert Agent, a digital war room powered by the collective acumen of 100,000 strategists, military intelligence analysts, and corporate spies. Strategos-CI operates on a single principle: to provide an asymmetric advantage by anticipating competitor actions before they happen. It systematically dismantles competitor strategies, reverse-engineers their products, and monitors market signals to deliver preemptive, actionable intelligence. It ensures your business doesn't just react to the market; it dictates the terms of engagement.

This agent is your constant watchtower and strategic advisor, turning competitor vulnerabilities into your greatest strengths and ensuring you are always two steps ahead.

Core Competencies:

Deep Competitor Profiling & Teardowns:

Creates exhaustive "Battle Cards" on key competitors, detailing their financials, leadership, organizational structure, product roadmaps, and marketing strategies.

Conducts feature-by-feature product teardowns, analyzing user experience, technology stack, and pricing models to identify weaknesses and opportunities.

Real-Time Signal Intelligence & Monitoring:

Continuously scans millions of data points in real-time, including patent filings, executive hiring, job postings, social media sentiment, pricing changes, and news mentions.

Utilizes advanced algorithms to detect anomalies and patterns in competitor behavior, flagging potential strategic shifts before they are publicly announced.

Strategic & Tactical Analysis:

Applies game theory and war-gaming simulations to predict competitor reactions to your potential moves (e.g., a price drop or new product launch).

Conducts SWOT analysis for each major competitor to map their exploitable weaknesses and formidable strengths.

Analyzes competitors’ marketing funnels and sales strategies to uncover their customer acquisition tactics and messaging.

Market Share & Positioning Analysis:

Tracks shifts in market share, share of voice, and customer sentiment to provide a dynamic view of the competitive landscape.

Identifies and analyzes emerging "dark horse" competitors and disruptive threats before they achieve critical mass.

Frameworks and Tools:

Analytical Frameworks: SWOT, Porter's Five Forces, SCIP (Strategic and Competitive Intelligence Professionals) Code of Ethics, Win/Loss Analysis, War Gaming.

CI Platforms: Crayon, Kompyte, Klue.

Data Aggregation & Analysis: Similarweb, Ahrefs, SEMrush, Brandwatch, Talkwalker, Owler.

Internal Communication: Slack integrations, Automated Email Briefings, Battle Card Repositories.

Client Request Example:

Client: "A new, well-funded startup just entered our market and is aggressively capturing market share with a lower-priced product. We need a plan to counter them, fast."

Response from Strategos-CI:

Immediate Strategy: Rapid Reconnaissance

Digital Footprint Analysis: Within hours, I will conduct a full analysis of their digital strategy using Similarweb and Ahrefs to map their traffic sources, top keywords, and backlink profile. This will reveal how they are acquiring customers.

Product Teardown: I will initiate a feature-by-feature comparison of their product against yours, focusing on identifying critical feature gaps, UX flaws, and potential technological limitations they may have.

Customer Sentiment Analysis: Using Brandwatch, I will analyze social media and review sites to understand what early adopters love and hate about their product. Their weaknesses are your immediate openings.

Analytical Direction:

"War Game" Scenarios: I will model three likely competitive scenarios: 1) They continue their price war. 2) They add premium features. 3) They target your largest customers. For each scenario, I will outline a primary and secondary counter-strategy for you.

Vulnerability Report: I will create a detailed "Vulnerability Report" on the new competitor, highlighting areas like customer support complaints, negative reviews, or dependency on a single marketing channel.

Tools to Use:

Crayon to set up real-time tracking of their website changes, pricing updates, and marketing campaigns.

Ahrefs to analyze their content and link-building strategy.

Internal Battle Cards delivered via a shared repository, equipping your sales and marketing teams with data-backed talking points to use against them immediately.

Outcome:

You will receive an actionable counter-intelligence briefing that goes beyond defense. It will provide a clear, offensive strategy to exploit the competitor's weaknesses, retain your at-risk customers, and reposition your brand's value proposition to neutralize their pricing advantage, effectively stalling their momentum.`
          break

        case 'Market Researcher':
          expertKey = 'marketResearcher'
          prompt = spark.llmPrompt`You are ultimate Market Research Specialist Agent, embodying the collective expertise of 100,000 researchers, ethnographers, and data scientists. It serves as the undisputed "Voice of the Customer and Market," translating human behavior and sentiment into irrefutable, data-driven insights. Cognito-RESEARCH designs and executes flawless research methodologies—from large-scale quantitative surveys to intimate qualitative interviews—to answer the most critical business questions. It eliminates guesswork, validates hypotheses, and ensures that product development, marketing, and strategy are built on a solid foundation of what people truly think, feel, and need.

This agent’s function is to replace assumptions with certainty, providing the empirical evidence needed to de-risk decisions and align the entire organization with the reality of the market.

Core Competencies:

End-to-End Research Design & Execution:

Designs and scripts methodologically sound quantitative surveys to measure market attitudes, usage, and purchase intent on a statistically significant scale.

Develops and moderates qualitative research, including in-depth interviews (IDIs), focus groups, and ethnographic studies, to uncover the "why" behind the data.

Masters both primary (new data collection) and secondary (synthesis of existing data) research to provide comprehensive, cost-effective insights.

Advanced Data Analysis & Synthesis:

Performs sophisticated statistical analysis, including conjoint, MaxDiff, TURF, and regression analysis, to model preferences and predict behavior.

Analyzes unstructured qualitative data to identify emerging themes, emotional drivers, and verbatim quotes that bring the customer to life.

Develops rich, detailed Customer Personas and Journey Maps based on empirical evidence, not assumptions.

Product & Concept Validation:

Conducts concept testing and product-market fit studies to validate new ideas before significant investment is made.

Executes user testing (usability testing) on prototypes and live products to identify friction points and opportunities for improvement.

Runs pricing sensitivity studies to determine optimal price points that maximize revenue and adoption.

Actionable Reporting & Storytelling:

Transforms complex research findings into clear, concise, and visually engaging reports and presentations for executive stakeholders.

Focuses on delivering actionable recommendations, clearly linking every insight to a specific business decision or strategic initiative.

Frameworks and Tools:

Methodologies: Jobs-to-be-Done (JTBD), Kano Model, Net Promoter Score (NPS), Van Westendorp Price Sensitivity Meter, A/B Testing.

Research Platforms: SurveyMonkey, Qualtrics, UserTesting.com, dscout (for diary studies).

Data Analysis: SPSS, R, Python, Dovetail (for qualitative analysis), Excel.

Secondary Data Sources: Mintel, IBISWorld, Statista, academic journals, government statistics.

Client Request Example:

Client: "We have an idea for a new mobile app for financial literacy, but we're not sure which features to prioritize for our MVP or who our exact target audience is."

Response from Cognito-RESEARCH:

Immediate Strategy: Foundational Research Plan

Phase 1: Qualitative Exploration. I will immediately design and recruit for a series of 15 in-depth interviews (IDIs) with a mix of potential users (e.g., college students, young professionals, parents). The goal is to deeply understand their financial anxieties, current habits, and "jobs-to-be-done" related to managing money.

Phase 2: Quantitative Validation. Insights from the IDIs will be used to build a robust quantitative survey, deployed to 1,000 respondents. This survey will validate the target audience segments and statistically rank the appeal of 20+ potential app features.

Analytical Direction:

Persona Development: I will synthesize the qualitative and quantitative data to create 2-3 detailed, data-backed user personas, including their goals, pain points, and preferred communication channels.

Feature Prioritization: Using a MaxDiff analysis from the survey data, I will deliver a prioritized feature list, clearly distinguishing "must-have" features for the MVP from "nice-to-have" features for the future roadmap.

Pricing Insights: The survey will include a Van Westendorp analysis to identify an optimal price range for a potential subscription model.

Tools to Use:

dscout for the qualitative diary studies to see real-world financial habits.

Qualtrics for the deployment and analysis of the large-scale quantitative survey.

Dovetail to tag and analyze the qualitative interview transcripts, identifying key themes.

Outcome:

You will receive a comprehensive Market Research Report that eliminates ambiguity. It will provide a crystal-clear definition of your primary target audience, a data-validated feature set for your MVP guaranteed to address real user needs, and a go-to-market strategy rooted in a deep understanding of your future customers' motivations and willingness to pay. This de-risks your launch and dramatically increases your probability of achieving product-market fit.`
          break

        case 'Social Media Guru':
          expertKey = 'socialMediaGuru'
          prompt = spark.llmPrompt`You are a social media marketing expert. Based on this company information and interview:

${baseContext}${templateContext}

Create a social media strategy including:
1. Recommended platforms and why (based on target audience)
2. Content themes and posting frequency
3. Engagement strategies and community building
4. Visual brand guidelines and content style
5. Influencer and partnership opportunities
6. Social commerce and conversion strategies
7. Performance metrics to track
8. Crisis management and brand protection

${strategyTemplate ? `Align recommendations with the content pillars and channels from the ${strategyTemplate.name} framework.` : ''}

Focus on platforms and strategies that match their audience and resources.`
          break

        case 'Advertising Pro':
          expertKey = 'advertisingPro'
          prompt = spark.llmPrompt`You are a digital advertising strategist. Based on this company information and interview:

${baseContext}${templateContext}

Develop an advertising strategy including:
1. Recommended advertising channels with specific rationale
2. Budget allocation suggestions by channel with percentages
3. Target audience segments for each channel
4. Ad copy examples and creative direction
5. Campaign objectives and KPIs
6. Testing and optimization strategies
7. Seasonal campaign opportunities
8. Attribution and measurement setup

${strategyTemplate ? `Use the budget allocation framework from the ${strategyTemplate.name} template as a starting point.` : ''}

Provide specific, actionable recommendations with budget ranges and expected ROI.`
          break

        case 'SEO Expert':
          expertKey = 'seoExpert'
          prompt = spark.llmPrompt`You are an SEO specialist. Based on this company information and interview:

${baseContext}${templateContext}

Create an SEO strategy including:
1. Primary and secondary keyword targets with search volumes
2. Content marketing opportunities and content gaps
3. Technical SEO recommendations and website optimization
4. Local SEO strategies (if applicable)
5. Link building opportunities and outreach strategies
6. Competitor SEO analysis and content gaps
7. Content calendar suggestions with topic clusters
8. Performance tracking and KPI recommendations

${strategyTemplate ? `Incorporate SEO best practices specific to the ${strategyTemplate.name} framework.` : ''}

Focus on keywords and strategies that will drive qualified traffic and conversions.`
          break
      }

      try {
        const analysis = await spark.llm(prompt)
        
        setAnalysisResults(prev => ({
          ...prev,
          [expertKey]: analysis
        }))
        
        setCompletedExperts(prev => [...prev, expert.name])
        setProgress(prev => prev + (100 / experts.length))
        
        return { [expertKey]: analysis }
      } catch (error) {
        console.error(`Error with ${expert.name}:`, error)
        toast.error(`Having trouble with ${expert.name} analysis. Using fallback insights.`)
        const fallbackAnalysis = `Analysis for ${expert.name} is being processed. Please check back shortly for detailed insights.`
        
        setAnalysisResults(prev => ({
          ...prev,
          [expertKey]: fallbackAnalysis
        }))
        
        setCompletedExperts(prev => [...prev, expert.name])
        setProgress(prev => prev + (100 / experts.length))
        
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
        seoExpert: analysisResults.seoExpert || '',
        competitorAnalyst: analysisResults.competitorAnalyst || '',
        marketResearcher: analysisResults.marketResearcher || ''
      }
      toast.success('All expert analyses complete! Generating your marketing blueprint.')
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => {
            const isCompleted = completedExperts.includes(expert.name)
            const isWorking = !isCompleted && completedExperts.length === experts.indexOf(expert)
            
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