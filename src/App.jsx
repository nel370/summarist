import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthModalProvider } from '@/lib/AuthModal';
import AuthModal from '@/components/auth/AuthModal';
import { FirebaseAuthProvider } from '@/lib/FirebaseAuthContext';

import Home from '@/pages/Home';
import ForYou from '@/pages/ForYou';
import BookDetail from '@/pages/BookDetail';
import Player from '@/pages/Player';
import ChoosePlan from '@/pages/ChoosePlan';
import Settings from '@/pages/Settings';
import Library from '@/pages/Library';
import InnerLayout from '@/components/layout/InnerLayout';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <FirebaseAuthProvider>
          <AuthModalProvider>
            <AuthModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/choose-plan" element={<ChoosePlan />} />
              <Route element={<InnerLayout />}>
                <Route path="/for-you" element={<ForYou />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/player/:id" element={<Player />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/library" element={<Library />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster />
          </AuthModalProvider>
        </FirebaseAuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App