"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface InteriorItem {
  name: string
  category: string
  priceRange: { min: number; max: number }
  placement: string
  quantity: number
  estimatedPrice: number
  totalCost: number
}

interface InteriorLayoutProps {
  items: InteriorItem[]
  title: string
  totalCost: number
  className?: string
}

export function InteriorLayout({ items, title, totalCost, className }: InteriorLayoutProps) {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, InteriorItem[]>)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'furniture':
        return '🪑'
      case 'storage':
        return '🗄️'
      case 'appliances':
        return '🔌'
      case 'electronics':
        return '📺'
      default:
        return '📦'
    }
  }

  const getPlacementColor = (placement: string) => {
    switch (placement.toLowerCase()) {
      case 'bedroom':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'living room':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'kitchen':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'dining room':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'utility area':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(totalCost)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                  {category}
                </h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryItems.map((item) => (
                  <div 
                    key={item.name}
                    className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </h5>
                      <Badge variant="secondary" className="text-xs">
                        Qty: {item.quantity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={cn("text-xs", getPlacementColor(item.placement))}
                        >
                          {item.placement}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>Est. Price: {formatCurrency(item.estimatedPrice)}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Total: {formatCurrency(item.totalCost)}
                        </p>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <p>Price Range: {formatCurrency(item.priceRange.min)} - {formatCurrency(item.priceRange.max)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 