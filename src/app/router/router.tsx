import { createBrowserRouter } from 'react-router'

import RootLayout from '@/app/layout/root-layout'
import HomePage from '@/pages/home/home-page'
import ReservationConfirmationPage from '@/pages/reservation-confirmation/reservation-confirmation-page'
import SeatSelectionPage from '@/pages/seat-selection/seat-selection-page'
import TrainSearchPage from '@/pages/train-search/train-search-page'

const routes = [
  {
    Component: RootLayout,
    children: [
      { path: '/', Component: HomePage },
      { path: '/train-search', Component: TrainSearchPage },
      { path: '/seat-selection/:trainRunId', Component: SeatSelectionPage },
      { path: '/reservation-confirmation', Component: ReservationConfirmationPage },
    ],
  },
]

export const router = createBrowserRouter(routes)
