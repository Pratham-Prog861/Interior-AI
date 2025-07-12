"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Material {
  name: string
  unit: string
  pricePerUnit: number
  category: string
  quantity: number
  totalCost: number
}

interface MaterialListProps {
  materials: Material[]
  title: string
  totalCost: number
  className?: string
}

export function MaterialList({ materials, title, totalCost, className }: MaterialListProps) {
  const groupedMaterials = materials.reduce((acc, material) => {
    if (!acc[material.category]) {
      acc[material.category] = []
    }
    acc[material.category].push(material)
    return acc
  }, {} as Record<string, Material[]>)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(totalCost)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedMaterials).map(([category, categoryMaterials]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                {category}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">
                        Material
                      </th>
                      <th className="text-right py-2 font-medium text-gray-700 dark:text-gray-300">
                        Quantity
                      </th>
                      <th className="text-right py-2 font-medium text-gray-700 dark:text-gray-300">
                        Unit Price
                      </th>
                      <th className="text-right py-2 font-medium text-gray-700 dark:text-gray-300">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryMaterials.map((material, index) => (
                      <tr 
                        key={material.name} 
                        className={cn(
                          "border-b border-gray-100 dark:border-gray-800",
                          index === categoryMaterials.length - 1 && "border-b-0"
                        )}
                      >
                        <td className="py-3 text-gray-900 dark:text-gray-100">
                          {material.name}
                        </td>
                        <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                          {material.quantity.toLocaleString()} {material.unit}
                        </td>
                        <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                          {formatCurrency(material.pricePerUnit)}
                        </td>
                        <td className="py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                          {formatCurrency(material.totalCost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 