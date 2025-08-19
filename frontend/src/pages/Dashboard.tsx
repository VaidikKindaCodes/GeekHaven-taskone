import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";

interface Question {
  _id: string;
  title: string;
  topic: string;
  url: string;
}

interface QuestionData {
  _id: string;
  title: string;
  questions: Question[];
}

function Dashboard() {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const { user, setUser } = useAuth() as AuthContextType;
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const userid = user?._id;
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("All");
  const [addingToBookmarks, setAddingToBookmarks] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const pageSize = 9;
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const allQuestions = questionData.flatMap((qset) => qset.questions);

  const filteredData = allQuestions.filter((q) => {
    const matchesTopic = topic === "All" || q.topic === topic;
    const matchesSearch =
      typeof q.title === "string" &&
      q.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddToBookmark = async (id: string) => {
    setAddingToBookmarks(true);
    try {
      const res = await fetch(`${backendurl}/api/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ questionId: id, userId: userid }),
      });
      const data = await res.json();
      if (data && data.success) {
        alert("Question bookmarked");
      } else {
        alert("Couldn't add question to bookmarks");
      }
      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setAddingToBookmarks(false);
    }
  };

  const handleFetchQuestions = async () => {
    const res = await fetch(`${backendurl}/api/fetchdata`);
    const data = await res.json();
    setQuestionData(data);
  };
  const handleAddToSolved = async (id: string) => {
    try {
      const res = await fetch(`${backendurl}/api/addsolved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quesId: id, userId: userid }),
      });
      const data = await res.json();
      if (data && data.success) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                solvedQuestions: [...(prev.SolvedQuestions || []), id],
              }
            : prev
        );
      } else {
        alert("Couldn't mark as solved");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromSolved = async (id: string) => {
    try {
      const res = await fetch(`${backendurl}/api/removesolved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quesId: id, userId: userid }),
      });
      const data = await res.json();
      if (data && data.success) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                solvedQuestions: prev.SolvedQuestions.filter((q) => q !== id),
              }
            : prev
        );
      } else {
        alert("Couldn't remove from solved");
      }
    } catch (error) {
      console.error(error);
    }
  };
  function isQuestionSolved(questionId: string): boolean {
    return (user?.SolvedQuestions as string[] | undefined)?.includes(questionId) ?? false;
  }

  useEffect(() => {
    handleFetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center py-8 px-4 sm:px-6">
      <main className="w-full max-w-6xl">
        <header className="mb-8 text-center px-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white/90">
            Problem Dashboard
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/60 px-1">
            Browse curated problems — Solve your favourite problems, sort them
            as per your liking.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
              className="h-10 w-full sm:w-64 px-3 rounded-lg bg-white/5 border border-white/8 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <label htmlFor="topic" className="text-white text-sm sm:text-base">
              Filter by topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full sm:w-auto px-3 rounded-lg bg-white/5 border border-white/8 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="h-10 w-full sm:w-auto px-3 rounded-lg bg-white/6 text-sm text-white/90 hover:bg-white/8 transition"
            >
              Reset
            </button>
          </div>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-1 sm:px-0">
          {pageData.map((question, idx) => (
            <article
              key={question._id}
              className="h-56 flex flex-col justify-between rounded-xl p-4 bg-white/5 border border-white/10 shadow hover:-translate-y-1 transition"
            >
              <div>
                <h3 className="text-base font-semibold text-white/90 mb-1">
                  Q{(currentPage - 1) * pageSize + idx + 1}
                </h3>
                <p className="text-xs text-white/80 mb-2 line-clamp-2">
                  {question.title}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-1 rounded text-[10px] font-medium bg-indigo-700/20 text-indigo-200">
                  {question.topic}
                </span>
                <button
                  className="px-2 py-1 rounded text-[10px] font-medium bg-indigo-900/20 text-indigo-200 hover:bg-indigo-800/30 transition"
                  onClick={() => handleAddToBookmark(question._id)}
                  disabled={addingToBookmarks}
                >
                  {addingToBookmarks ? "Adding..." : "Bookmark"}
                </button>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      isQuestionSolved(question._id)
                    }
                    onChange={(e) =>
                      e.target.checked
                        ? handleAddToSolved(question._id)
                        : handleRemoveFromSolved(question._id)
                    }
                    className="h-4 w-4 accent-indigo-500 cursor-pointer"
                  />
                  <label className="text-xs text-white/80">{isQuestionSolved(question._id) ? "Solved" : "NotSolved"}</label>
                </div>

                <a
                  href={question.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-100 text-xs underline"
                >
                  Ref
                </a>
              </div>
            </article>
          ))}
        </section>
        <nav className="mt-8 flex items-center justify-center px-2">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/3 border border-white/6 rounded-xl px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm w-full sm:w-auto">
            <button
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <div className="px-3 sm:px-4 py-1 rounded-full bg-white/6 text-xs sm:text-sm text-white/95 font-semibold">
              Page {currentPage} / {totalPages || 1}
            </div>
            <button
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
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

export default Dashboard;
