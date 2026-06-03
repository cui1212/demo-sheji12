import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { CareerDetailPage } from '@/pages/CareerDetailPage'
import { BlueprintPage } from '@/pages/BlueprintPage'
import { BlueprintResultsPage } from '@/pages/BlueprintResultsPage'
import { ComparePage } from '@/pages/ComparePage'

export const router = createBrowserRouter([{
  element: <AppShell />,
  children: [
    { path: '/', element: <HomePage /> },
    { path: '/career/:id', element: <CareerDetailPage /> },
    { path: '/blueprint', element: <BlueprintPage /> },
    { path: '/blueprint/results', element: <BlueprintResultsPage /> },
    { path: '/compare', element: <ComparePage /> },
    { path: '*', element: <NotFound /> },
  ],
}])

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold text-gray-300">404</h1>
      <p className="text-gray-500">页面不存在</p>
      <a href="/" className="text-primary hover:underline">返回首页</a>
    </div>
  )
}
