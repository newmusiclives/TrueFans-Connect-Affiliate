import { Target } from 'lucide-react'

interface GoalProgressProps {
  current: number
  goal: number
  label: string
}

export function GoalProgress({ current, goal, label }: GoalProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100)
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-600 text-white">
            <Target className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">{label}</p>
            <p className="text-2xl font-bold">${current.toFixed(2)} / ${goal}</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-indigo-600">{percentage.toFixed(0)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
