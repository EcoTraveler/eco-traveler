import { PlanningList } from './planning-list'

export default function PlanningsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Eco Travel Plannings</h1>
      <PlanningList />
    </div>
  )
}