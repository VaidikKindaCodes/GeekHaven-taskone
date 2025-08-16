import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
function App() {

  return (
    <AuthProvider>
       <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="mt-12">
      <Outlet />
      </main>
      <Footer />
    </div>
    </AuthProvider>
   
  )
}

export default App
