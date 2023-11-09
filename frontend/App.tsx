import 'react-native-gesture-handler';
import { AppContextProvider } from './src/contexts/appContext';
import Navigation from './Navigation';


export default function App() {
  return <AppContextProvider><Navigation /></AppContextProvider>
}
