import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, MessageCircle, Send, ArrowLeft } from '@phosphor-icons/react'
import { CompanyInfo, InterviewResponse } from '../App'

interface SmartInterviewProps {
  companyInfo: CompanyInfo
  onComplete: (responses: InterviewResponse[]) => void
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

export default function SmartInterview({ companyInfo, onComplete }: SmartInterviewProps) {
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

      const prompt = spark.llmPrompt`You are an expert marketing consultant conducting a strategic interview. 

Company: ${companyInfo.name}
Industry: ${companyInfo.industry}
Contact: ${companyInfo.contactName}

Previous conversation:
${conversationContext}

Based on this conversation, generate the next strategic question that will help create a comprehensive marketing strategy. The question should:
1. Build on previous answers to go deeper
2. Be specific to their industry and situation
3. Help understand their target audience, competitive advantages, or growth challenges
4. Be conversational and engaging

If the conversation already covers the key strategic areas (target audience, unique value proposition, current challenges, growth goals, competitive landscape, budget considerations), respond with "COMPLETE" instead of a question.

Question:`

      const response = await spark.llm(prompt)
      
      if (response.trim() === 'COMPLETE' || conversation.length >= 10) {
        onComplete(conversation)
        return
      }
      
      setCurrentQuestion(response.trim())
      setProgress(Math.min(90, (conversation.length / 8) * 100))
    } catch (error) {
      console.error('Error generating question:', error)
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
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
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