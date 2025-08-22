import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Key, Save } from '@phosphor-icons/react'
import { toast } from 'sonner'

export type ApiKeys = {
  openai: string
  gemini: string
}

interface ApiKeyManagerProps {
  onKeysConfigured: () => void
}

export default function ApiKeyManager({ onKeysConfigured }: ApiKeyManagerProps) {
  const [apiKeys, setApiKeys] = useKV<ApiKeys>('api-keys', { openai: '', gemini: '' })
  const [showOpenAI, setShowOpenAI] = useState(false)
  const [showGemini, setShowGemini] = useState(false)
  const [tempKeys, setTempKeys] = useState<ApiKeys>(apiKeys || { openai: '', gemini: '' })

  const handleSave = () => {
    if (!tempKeys.openai.trim() && !tempKeys.gemini.trim()) {
      toast.error('Please enter at least one API key')
      return
    }

    setApiKeys(tempKeys)
    toast.success('API keys saved securely')
    onKeysConfigured()
  }

  const isConfigured = (apiKeys?.openai?.length || 0) > 0 || (apiKeys?.gemini?.length || 0) > 0

  if (isConfigured) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Keys Configuration
          </CardTitle>
          <CardDescription>
            Your API keys are configured and ready for enhanced analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>OpenAI API Key</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type={showOpenAI ? 'text' : 'password'}
                  value={tempKeys.openai}
                  onChange={(e) => setTempKeys(prev => ({ ...prev, openai: e.target.value }))}
                  placeholder="sk-..."
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOpenAI(!showOpenAI)}
                >
                  {showOpenAI ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <Label>Gemini API Key</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type={showGemini ? 'text' : 'password'}
                  value={tempKeys.gemini}
                  onChange={(e) => setTempKeys(prev => ({ ...prev, gemini: e.target.value }))}
                  placeholder="AIza..."
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowGemini(!showGemini)}
                >
                  {showGemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={handleSave} className="mt-4" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Update Keys
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Key className="w-5 h-5" />
          Configure API Keys for Enhanced Analysis
        </CardTitle>
        <CardDescription className="text-yellow-700">
          Add your OpenAI and/or Gemini API keys to enable advanced AI-powered analysis and real-time insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>OpenAI API Key (Optional)</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type={showOpenAI ? 'text' : 'password'}
                value={tempKeys.openai}
                onChange={(e) => setTempKeys(prev => ({ ...prev, openai: e.target.value }))}
                placeholder="sk-..."
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOpenAI(!showOpenAI)}
              >
                {showOpenAI ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label>Gemini API Key (Optional)</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type={showGemini ? 'text' : 'password'}
                value={tempKeys.gemini}
                onChange={(e) => setTempKeys(prev => ({ ...prev, gemini: e.target.value }))}
                placeholder="AIza..."
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGemini(!showGemini)}
              >
                {showGemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save API Keys & Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}