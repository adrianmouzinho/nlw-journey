import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { CrateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'
import { NotFoundPage } from './pages/not-found'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CrateTripPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />,
  },
])

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
