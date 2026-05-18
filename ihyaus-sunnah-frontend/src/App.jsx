import AppRoutes from "../Routes";
import { StaffProvider } from "./context/StaffContext";

function App() {
  return (
    <StaffProvider>
      <AppRoutes />
    </StaffProvider>
  );
}

export default App;