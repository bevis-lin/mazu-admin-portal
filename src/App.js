import RouteComp from './components/Routes.comp';
import { ROUTES } from './config/routes.config';
import AuthProvider from './providers/AuthProvider';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <RouteComp routes={ROUTES} />
      </AuthProvider>
    </div>
  );
}
