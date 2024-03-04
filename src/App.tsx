import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

// components imports
import { RootLayout } from './components';

// pages imports
import { HomePage, ProductDetailsPage } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/products/:id' element={<ProductDetailsPage />} />
      </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;