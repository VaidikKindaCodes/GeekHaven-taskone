import { Link } from "react-router";

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <main className="w-full max-w-4xl bg-white/6 backdrop-blur-sm border border-white/6 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <section className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Welcome to Vaidik's Website
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Practice DSA and other coding questions (atleast thats what i think we have to make)
          </p>

          <ul className="mt-6 space-y-2 text-sm text-gray-400 max-w-md mx-auto md:mx-0">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                ✓
              </span>
              Topics grouped by  difficulty
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                ✓
              </span>
              Create bookmarks and stuff 
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                ✓
              </span>
              Search for your favourate questions
            </li>
          </ul>

          <div className="mt-6 flex justify-center md:justify-start gap-3">
            <Link to="/dashboard" className="inline-flex items-center px-4 py-3 bg-blue-900 border border-white/10 text-gray-200 rounded-lg transform transition-transform duration-150 ease-out hover:scale-110 hover:bg-blue-800">
                Get Started
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
