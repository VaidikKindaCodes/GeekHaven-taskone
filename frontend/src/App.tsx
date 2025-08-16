import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="mt-12">
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
