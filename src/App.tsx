import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import WelcomeForm from './components/WelcomeForm'
import SmartInterview from './components/SmartInterview'
import ExpertAnalysis from './components/ExpertAnalysis'
import MarketingBlueprint from './components/MarketingBlueprint'

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
}

export type AppPhase = 'welcome' | 'interview' | 'analysis' | 'blueprint'

function App() {
  const [currentPhase, setCurrentPhase] = useKV<AppPhase>('current-phase', 'welcome')
  const [companyInfo, setCompanyInfo] = useKV<CompanyInfo | null>('company-info', null)
  const [interviewResponses, setInterviewResponses] = useKV<InterviewResponse[]>('interview-responses', [])
  const [expertAnalysis, setExpertAnalysis] = useKV<ExpertAnalysis | null>('expert-analysis', null)

  const handleCompanySubmit = (info: CompanyInfo) => {
    setCompanyInfo(info)
    setCurrentPhase('interview')
  }

  const handleInterviewComplete = (responses: InterviewResponse[]) => {
    setInterviewResponses(responses)
    setCurrentPhase('analysis')
  }

  const handleAnalysisComplete = (analysis: ExpertAnalysis) => {
    setExpertAnalysis(analysis)
    setCurrentPhase('blueprint')
  }

  const resetApp = () => {
    setCurrentPhase('welcome')
    setCompanyInfo(null)
    setInterviewResponses([])
    setExpertAnalysis(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPhase === 'welcome' && (
        <WelcomeForm onSubmit={handleCompanySubmit} />
      )}
      
      {currentPhase === 'interview' && companyInfo && (
        <SmartInterview 
          companyInfo={companyInfo}
          onComplete={handleInterviewComplete}
        />
      )}
      
      {currentPhase === 'analysis' && (
        <ExpertAnalysis 
          companyInfo={companyInfo!}
          responses={interviewResponses}
          onComplete={handleAnalysisComplete}
        />
      )}
      
      {currentPhase === 'blueprint' && (
        <MarketingBlueprint 
          companyInfo={companyInfo!}
          responses={interviewResponses}
          analysis={expertAnalysis!}
          onReset={resetApp}
        />
      )}
    </div>
  )
}

export default App