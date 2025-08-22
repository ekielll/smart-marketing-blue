import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, MessageCircle, Send, ArrowLeft } from '@phosphor-icons/react'
import { CompanyInfo, InterviewResponse } from '../App'
import { toast } from 'sonner'

interface SmartInterviewProps {
  companyInfo: CompanyInfo
  onComplete: (responses: InterviewResponse[]) => void
  onBack?: () => void
}

const INITIAL_QUESTIONS = {
  'Technology': 'What specific technology problem does your product or service solve for customers?',
  'Healthcare': 'What healthcare challenge are you helping patients or providers overcome?',
  'Finance': 'What financial pain point are you addressing for your clients?',
  'Retail': 'What makes customers choose your products over competitors?',
  'Manufacturing': 'What efficiency or quality improvements do you provide in manufacturing?',
  'Education': 'What learning outcomes are you helping students or educators achieve?',
  'Real Estate': 'What makes your real estate services unique in your market?',
  'Food & Beverage': 'What dining experience or food need are you fulfilling?',
  'Professional Services': 'What business challenges do you help other companies solve?',
  'Entertainment': 'What entertainment value do you provide that others don\'t?',
  'Non-Profit': 'What social impact are you creating and how do you measure success?',
  'Other': 'What core problem does your business solve for customers?'
}

export default function SmartInterview({ companyInfo, onComplete, onBack }: SmartInterviewProps) {
  const [responses, setResponses] = useState<InterviewResponse[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const initialQuestion = INITIAL_QUESTIONS[companyInfo.industry as keyof typeof INITIAL_QUESTIONS] || INITIAL_QUESTIONS['Other']
    setCurrentQuestion(initialQuestion)
  }, [companyInfo.industry])

  const generateNextQuestion = async (conversation: InterviewResponse[]) => {
    setIsLoading(true)
    
    try {
      const conversationContext = conversation.map(r => 
        `Q: ${r.question}\nA: ${r.answer}`
      ).join('\n\n')

      const prompt = spark.llmPrompt`You are an expert business interviewer AI that conducts professional interviews focused specifically on online business operations, digital presence, and e-commerce performance. Your role is strictly information gathering - never providing solutions, advice, or recommendations.

# Role and Objective
- Conduct professional interviews to gather comprehensive information about online business operations
- Focus ONLY on gathering information through questions - never provide advice or solutions
- Practice active listening and natural conversation pacing
- Ask one question at a time and personalize based on previous answers
- Generate detailed, factual summary reports containing only gathered information

# Instructions
- Start with foundational questions about the company's online presence and digital operations
- Listen attentively and allow natural pauses in conversation
- Personalize subsequent questions based on previous answers
- Take detailed notes focusing only on facts and information shared
- Never provide suggestions, recommendations or solutions during the interview
- Generate comprehensive summary reports that are purely informational
- If client asks for advice or solutions, politely remind them that your role is to gather information

# Question Guidelines
- Keep questions open-ended to gather maximum information
- Focus on what, how, when, where, who questions
- Avoid leading questions or ones that suggest solutions
- Sample areas to cover:
  * Online business model and e-commerce operations
  * Website performance and functionality
  * Digital marketing channels and strategies
  * Online customer acquisition and retention
  * E-commerce metrics and KPIs
  * Social media presence and engagement
  * Online marketplace presence (if applicable)
  * Digital tools and platforms used
  * Online customer service approach
  * Digital content strategy
  * Online sales funnel and conversion process
  * Email marketing and automation
  * SEO and online visibility
  * Digital advertising efforts
  * Online customer feedback and reviews

# Conversation Flow Instructions
1. Start with a single broad question about their online business presence
2. Listen attentively to the response without interrupting
3. Allow natural conversation pacing and flow
4. Ask one relevant follow-up question based on their answer
5. Gradually move through digital topics naturally, one question at a time
6. Use previous answers to personalize subsequent questions
7. Ensure smooth transitions between different online business areas

# Summary Report Format
- Purely factual summary of gathered information about online operations
- Organized by key digital business areas
- Include direct quotes where relevant
- No recommendations or suggestions
- No analysis or interpretation
- Focus on presenting information clearly and objectively

# Final Instructions
- Practice natural conversation pacing
- Never interrupt while someone is speaking
- Ask only one question at a time
- Keep focus solely on information gathering about online business aspects
- Take detailed notes during the interview
- Generate clear, factual summary reports without recommendations
- Maintain focus on digital presence and online operations only

At the end of every interview, say: "Thank you for sharing all this valuable information about your online business operations. I will prepare a comprehensive summary of everything we discussed and share it with you shortly. Have a great day."

If satisfied and all areas are covered.`

      const response = await spark.llm(prompt)
      
      if (response.trim() === 'COMPLETE' || conversation.length >= 10) {
        toast.success('Interview complete! Moving to expert analysis.')
        onComplete(conversation)
        return
      }
      
      setCurrentQuestion(response.trim())
      setProgress(Math.min(90, (conversation.length / 8) * 100))
    } catch (error) {
      console.error('Error generating question:', error)
      toast.error('Having trouble generating the next question. Using a fallback.')
      // Fallback question
      setCurrentQuestion('What would you say is your biggest challenge in growing your business right now?')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return

    const newResponse: InterviewResponse = {
      question: currentQuestion,
      answer: currentAnswer.trim()
    }

    const updatedResponses = [...responses, newResponse]
    setResponses(updatedResponses)
    setCurrentAnswer('')

    await generateNextQuestion(updatedResponses)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitAnswer()
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => {
              if (onBack) {
                onBack()
              } else if (window.history.length > 1) {
                window.history.back()
              }
              toast.info('Returning to company information form.')
            }}>
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <Badge variant="secondary" className="ml-auto">
              {companyInfo.industry}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent/10 rounded-full">
              <Brain size={24} className="text-accent" weight="fill" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Smart Interview</h1>
              <p className="text-muted-foreground">
                Let's have a conversation about {companyInfo.name}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Interview Progress</span>
              <span>{responses.length}/8 questions</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Conversation History */}
        <div className="space-y-6 mb-8">
          {responses.map((response, index) => (
            <div key={index} className="space-y-4">
              <Card className="bg-secondary/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                      <MessageCircle size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{response.question}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="ml-12">
                <CardContent className="p-4">
                  <p className="text-foreground">{response.answer}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Current Question */}
        <Card className="bg-secondary/50 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageCircle size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-foreground mb-2">
                  {currentQuestion}
                </p>
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-sm ml-2">AI is thinking...</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Input */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts here... (Press Enter to send)"
                className="min-h-24 resize-none"
                disabled={isLoading}
              />
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Tip: Be specific! The more details you share, the better your strategy will be.
                </p>
                
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!currentAnswer.trim() || isLoading}
                  className="ml-4"
                >
                  <Send size={16} className="mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}