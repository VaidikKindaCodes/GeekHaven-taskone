import { useEffect, useState } from "react";
import type { AuthContextType } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

interface Question {
  _id: string;
  title: string;
  topic: string;
  url: string;
}

function Bookmarks() {
    
  const { user } = useAuth() as AuthContextType;
  const [refresh , setRefresh] = useState(false);
  const [bookmarkData, setBookmarkData] = useState<Array<Question>>([]);
  const handleRefresh = ()=>{
    setRefresh((prev)=> !prev);
    setRefresh((prev)=> !prev);
  }
  console.log(user?._id)
  const fetchBookmarkData = async()=>{
        const res = await fetch (`http://localhost:8080/api/getbookmarkdata?userId=${user?._id}`);
        const data = await res.json();
        setBookmarkData(data);
    }
    useEffect(()=>{fetchBookmarkData()} , [user , refresh])
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("All");
  const pageSize = 9;
  const filteredData =
    topic === "All"
      ? bookmarkData
      : bookmarkData.filter((q) => q.topic == topic);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-6">
      <main className="w-full max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white/90">
            Your Bookmarks
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Solve your favourate problems.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <label htmlFor="difficulty" className="text-white">
              Filter by topic
            </label>
            <select
              id="difficulty"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 px-3 rounded-lg bg-white/5 border border-white/8 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="All" className="bg-gray-900 text-white">
                All
              </option>
              <option
                value="Learn the basics"
                className="bg-gray-900 text-white"
              >
                Learn the basics
              </option>
              <option
                value="Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]"
                className="bg-gray-900 text-white"
              >
                Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]
              </option>
              <option
                value="Recursion [PatternWise]"
                className="bg-gray-900 text-white"
              >
                Recursion [PatternWise]
              </option>
              <option
                value="Bit Manipulation [Concepts & Problems]"
                className="bg-gray-900 text-white"
              >
                Bit Manipulation [Concepts & Problems]
              </option>
              <option
                value="Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]"
                className="bg-gray-900 text-white"
              >
                Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack,
                Implementation]
              </option>
              <option
                value="Sliding Window & Two Pointer Combined Problems"
                className="bg-gray-900 text-white"
              >
                Sliding Window & Two Pointer Combined Problems
              </option>
              <option
                value="Heaps [Learning, Medium, Hard Problems]"
                className="bg-gray-900 text-white"
              >
                Heaps [Learning, Medium, Hard Problems]
              </option>
              <option
                value="Greedy Algorithms [Easy, Medium/Hard]"
                className="bg-gray-900 text-white"
              >
                Greedy Algorithms [Easy, Medium/Hard]
              </option>
              <option
                value="Binary Trees [Traversals, Medium and Hard Problems]"
                className="bg-gray-900 text-white"
              >
                Binary Trees [Traversals, Medium and Hard Problems]
              </option>
              <option
                value="Binary Search Trees [Concept and Problems]"
                className="bg-gray-900 text-white"
              >
                Binary Search Trees [Concept and Problems]
              </option>
              <option
                value="Graphs [Concepts & Problems]"
                className="bg-gray-900 text-white"
              >
                Graphs [Concepts & Problems]
              </option>
              <option
                value="Dynamic Programming [Patterns and Problems]"
                className="bg-gray-900 text-white"
              >
                Dynamic Programming [Patterns and Problems]
              </option>
              <option value="Tries" className="bg-gray-900 text-white">
                Tries
              </option>
              <option value="Strings" className="bg-gray-900 text-white">
                Strings
              </option>
            </select>

            <button
              type="button"
              onClick={() => {
                setTopic("All");
                setCurrentPage(1);
              }}
              className="h-10 px-3 rounded-lg bg-white/6 text-sm text-white/90 hover:bg-white/8 transition"
            >
              Reset
            </button>
            
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageData.map((question, idx) => (
            <article
              key={(currentPage - 1) * pageSize + idx}
              className="h-64 flex flex-col justify-between rounded-2xl p-6 bg-white/5 border border-white/8 backdrop-blur-md shadow-lg shadow-black/40 transition-transform hover:-translate-y-1"
            >
              <div>
                <h3 className="text-lg font-semibold text-white/95 mb-2">
                  Question {(currentPage - 1) * pageSize + idx + 1}
                </h3>
                <p className="text-sm font-medium text-white/80 mb-4 line-clamp-2">
                  {question.title}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-white/6 bg-indigo-700/20 text-indigo-300">
                  {question.topic}
                </span>
                <a
                  href={question.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-100 text-sm font-medium underline"
                >
                  Reference
                </a>
              </div>
            </article>
          ))}
        </section>

        <nav
          aria-label="Pagination"
          className="mt-10 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/3 border border-white/6 rounded-xl px-4 py-3 backdrop-blur-sm">
            <button
              aria-label="Previous page"
              className="px-4 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed transition"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>

            <div className="px-4 py-1 rounded-full bg-white/6 text-sm text-white/95 font-semibold">
              Page {currentPage} / {totalPages}
            </div>

            <button
              aria-label="Next page"
              className="px-4 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed transition"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}

export default Bookmarks;
