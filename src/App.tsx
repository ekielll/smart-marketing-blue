import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import WelcomeForm from './components/WelcomeForm'
import SmartInterview from './components/SmartInterview'
import ExpertAnalysis from './components/ExpertAnalysis'
import MarketingBlueprint from './components/MarketingBlueprintNew'
import Dashboard from './components/Dashboard'

export type CompanyInfo = {
  name: string
  industry: string
  contactName: string
  email: string
  phone: string
}

export type InterviewResponse = {
  question: string
  answer: string
  followUp?: string
}

export type ExpertAnalysis = {
  marketAnalyst: string
  socialMediaGuru: string
  advertisingPro: string
  seoExpert: string
  competitorAnalyst: string
  marketResearcher: string
}

export type CompanyStrategy = {
  id: string
  companyInfo: CompanyInfo
  interviewResponses: InterviewResponse[]
  analysis: ExpertAnalysis
  createdAt: string
  lastModified: string
}

export type AppPhase = 'dashboard' | 'welcome' | 'interview' | 'analysis' | 'blueprint'

function App() {
  const [currentPhase, setCurrentPhase] = useKV<AppPhase>('current-phase', 'dashboard')
  const [companyInfo, setCompanyInfo] = useKV<CompanyInfo | null>('company-info', null)
  const [interviewResponses, setInterviewResponses] = useKV<InterviewResponse[]>('interview-responses', [])
  const [expertAnalysis, setExpertAnalysis] = useKV<ExpertAnalysis | null>('expert-analysis', null)
  const [strategies, setStrategies] = useKV<CompanyStrategy[]>('company-strategies', [])
  const [currentStrategyId, setCurrentStrategyId] = useKV<string | null>('current-strategy-id', null)

  const handleCompanySubmit = (info: CompanyInfo) => {
    setCompanyInfo(info)
    setCurrentPhase('interview')
    toast.success(`Welcome ${info.contactName}! Let's create a strategy for ${info.name}.`)
  }

  const handleInterviewComplete = (responses: InterviewResponse[]) => {
    setInterviewResponses(responses)
    setCurrentPhase('analysis')
    toast.success('Interview complete! Our experts are now analyzing your responses.')
  }

  const handleAnalysisComplete = (analysis: ExpertAnalysis) => {
    setExpertAnalysis(analysis)
    setCurrentPhase('blueprint')
    toast.success('Analysis complete! Your custom marketing blueprint is ready.')
  }

  const saveStrategy = () => {
    if (!companyInfo || !expertAnalysis) return

    const strategy: CompanyStrategy = {
      id: currentStrategyId || `strategy-${Date.now()}`,
      companyInfo,
      interviewResponses: interviewResponses || [],
      analysis: expertAnalysis,
      createdAt: currentStrategyId ? 
        (strategies || []).find(s => s.id === currentStrategyId)?.createdAt || new Date().toISOString() :
        new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    setStrategies(current => {
      const currentStrategies = current || []
      const existing = currentStrategies.findIndex(s => s.id === strategy.id)
      if (existing >= 0) {
        const updated = [...currentStrategies]
        updated[existing] = strategy
        return updated
      }
      return [strategy, ...currentStrategies]
    })

    setCurrentStrategyId(strategy.id)
    toast.success('Strategy saved successfully!')
  }

  const loadStrategy = (strategy: CompanyStrategy) => {
    setCompanyInfo(strategy.companyInfo)
    setInterviewResponses(strategy.interviewResponses)
    setExpertAnalysis(strategy.analysis)
    setCurrentStrategyId(strategy.id)
    setCurrentPhase('blueprint')
    toast.success(`Loaded strategy for ${strategy.companyInfo.name}`)
  }

  const deleteStrategy = (strategyId: string) => {
    setStrategies(current => (current || []).filter(s => s.id !== strategyId))
    if (currentStrategyId === strategyId) {
      setCurrentStrategyId(null)
      resetApp()
    }
    toast.success('Strategy deleted successfully')
  }

  const startNewStrategy = () => {
    setCurrentPhase('welcome')
    setCompanyInfo(null)
    setInterviewResponses([])
    setExpertAnalysis(null)
    setCurrentStrategyId(null)
  }

  const resetApp = () => {
    setCurrentPhase('dashboard')
    setCompanyInfo(null)
    setInterviewResponses([])
    setExpertAnalysis(null)
    setCurrentStrategyId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {currentPhase === 'dashboard' && (
        <Dashboard 
          strategies={strategies || []}
          onNewStrategy={startNewStrategy}
          onLoadStrategy={loadStrategy}
          onDeleteStrategy={deleteStrategy}
        />
      )}
      
      {currentPhase === 'welcome' && (
        <WelcomeForm 
          onSubmit={handleCompanySubmit}
          onBack={() => setCurrentPhase('dashboard')}
        />
      )}
      
      {currentPhase === 'interview' && companyInfo && (
        <SmartInterview 
          companyInfo={companyInfo}
          onComplete={handleInterviewComplete}
          onBack={() => setCurrentPhase('welcome')}
        />
      )}
      
      {currentPhase === 'analysis' && (
        <ExpertAnalysis 
          companyInfo={companyInfo!}
          responses={interviewResponses || []}
          onComplete={handleAnalysisComplete}
        />
      )}
      
      {currentPhase === 'blueprint' && (
        <MarketingBlueprint 
          companyInfo={companyInfo!}
          responses={interviewResponses || []}
          analysis={expertAnalysis!}
          onReset={resetApp}
          onSave={saveStrategy}
        />
      )}
    </div>
  )
}

export default App