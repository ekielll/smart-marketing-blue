import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Phone, ChatCircle, Sparkle, ArrowClockwise, Target, ArrowLeft } from '@phosphor-icons/react'
import { CompanyInfo } from '../App'
import { toast } from 'sonner'

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
  'Education', 'Real Estate', 'Food & Beverage', 'Professional Services',
  'Entertainment', 'Non-Profit', 'Other'
]

interface WelcomeFormProps {
  onSubmit: (info: CompanyInfo) => void
  onBack?: () => void
}

export default function WelcomeForm({ onSubmit, onBack }: WelcomeFormProps) {
  const [formData, setFormData] = useState<CompanyInfo>({
    name: '',
    industry: '',
    contactName: '',
    email: '',
    phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.industry && formData.contactName && formData.email) {
      onSubmit(formData)
    }
  }

  const isFormValid = formData.name && formData.industry && formData.contactName && formData.email

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        {/* Back Button */}
        {onBack && (
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        )}
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-accent/10 rounded-full">
              <Sparkle size={32} className="text-accent" weight="fill" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            AI Marketing Strategy Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Transform your business uncertainty into clarity through intelligent conversation and expert AI analysis
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Let's Get Started</CardTitle>
            <CardDescription className="text-lg">
              Tell us about your business so we can create a personalized marketing strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={formData.industry} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-name">Your Name</Label>
                  <Input
                    id="contact-name"
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full h-12 text-lg font-semibold"
                >
                  <ChatCircle size={20} className="mr-2" />
                  Start Smart Interview
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-lg font-medium"
                  onClick={() => {
                    const message = `Hi! I'd like to discuss marketing strategy for ${formData.name || 'my company'}. Please call me at your earliest convenience.`
                    const subject = `Marketing Consultation Request - ${formData.name || 'Company'}`
                    const body = encodeURIComponent(`${message}\n\nCompany: ${formData.name}\nIndustry: ${formData.industry}\nContact: ${formData.contactName}\nEmail: ${formData.email}\nPhone: ${formData.phone}`)
                    
                    // Create mailto link for easy contact
                    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank')
                    toast.success('Email template opened! Send it to schedule a consultation call.')
                  }}
                >
                  <Phone size={20} className="mr-2" />
                  Schedule Call
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ArrowClockwise size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold">Smart Conversation</h3>
            <p className="text-sm text-muted-foreground">
              AI adapts questions based on your answers
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkle size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold">Expert Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Virtual team of marketing specialists
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Target size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold">Professional Report</h3>
            <p className="text-sm text-muted-foreground">
              Complete marketing blueprint to download
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}