import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Building, Calendar, CaretRight, Plus, Trash, Eye, Clock, Users } from '@phosphor-icons/react'
import type { CompanyStrategy } from '../App'

interface DashboardProps {
  strategies: CompanyStrategy[]
  onNewStrategy: () => void
  onLoadStrategy: (strategy: CompanyStrategy) => void
  onDeleteStrategy: (strategyId: string) => void
}

export default function Dashboard({ strategies, onNewStrategy, onLoadStrategy, onDeleteStrategy }: DashboardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getIndustryColor = (industry: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Finance': 'bg-purple-100 text-purple-800',
      'Retail': 'bg-orange-100 text-orange-800',
      'Education': 'bg-cyan-100 text-cyan-800',
      'Manufacturing': 'bg-gray-100 text-gray-800',
      'Real Estate': 'bg-emerald-100 text-emerald-800',
      'Food & Beverage': 'bg-red-100 text-red-800',
      'Professional Services': 'bg-indigo-100 text-indigo-800'
    }
    return colors[industry as keyof typeof colors] || 'bg-slate-100 text-slate-800'
  }

  const handleDelete = (strategyId: string) => {
    if (showDeleteConfirm === strategyId) {
      onDeleteStrategy(strategyId)
      setShowDeleteConfirm(null)
    } else {
      setShowDeleteConfirm(strategyId)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Strategy Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage and track your marketing strategies across all companies
              </p>
            </div>
            <Button onClick={onNewStrategy} size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Create New Strategy
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Strategies</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{strategies.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(strategies.map(s => s.companyInfo.name)).size}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {strategies.filter(s => {
                  const created = new Date(s.createdAt)
                  const now = new Date()
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategies List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Strategies</h2>
            {strategies.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {strategies.length} strateg{strategies.length === 1 ? 'y' : 'ies'} total
              </p>
            )}
          </div>

          {strategies.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-muted p-3">
                  <Building className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No strategies yet</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Get started by creating your first marketing strategy. Our AI-powered interview will help you build a comprehensive plan.
                  </p>
                  <Button onClick={onNewStrategy} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Strategy
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{strategy.companyInfo.name}</CardTitle>
                          <Badge variant="outline" className={getIndustryColor(strategy.companyInfo.industry)}>
                            {strategy.companyInfo.industry}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span>{strategy.companyInfo.contactName}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Created {formatDate(strategy.createdAt)}
                          </span>
                          {strategy.lastModified !== strategy.createdAt && (
                            <>
                              <Separator orientation="vertical" className="h-4" />
                              <span className="text-xs">Modified {formatDate(strategy.lastModified)}</span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onLoadStrategy(strategy)}
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button
                          variant={showDeleteConfirm === strategy.id ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => handleDelete(strategy.id)}
                          className="gap-2"
                        >
                          <Trash className="w-4 h-4" />
                          {showDeleteConfirm === strategy.id ? "Confirm" : "Delete"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-3">
                      <strong>Contact:</strong> {strategy.companyInfo.email} • {strategy.companyInfo.phone}
                    </div>
                    <div className="text-sm">
                      <strong>Interview Responses:</strong> {strategy.interviewResponses.length} questions answered
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}