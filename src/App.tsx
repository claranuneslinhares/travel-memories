import AppNavigator from "./navigation/AppNavigator";
import { TripProvider } from "./context/TripContext";

export default function App() {
  return (
    <TripProvider>
      <AppNavigator />
    </TripProvider>
  );
}