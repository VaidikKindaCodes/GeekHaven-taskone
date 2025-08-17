// import { useEffect, useState } from "react";
// import { testData } from "../constants";
// import { useAuth } from "../hooks/useAuth";
// import type { AuthContextType } from "../context/AuthContext";

// interface Question {
//   _id : string;
//   title :string;
//   topic: string;
//   url: string;
// }

// interface QuestionData {
//   _id: string;
//   title: string;
//   questions: [Question]
// }

// function Dashboard() {
//   const { user } = useAuth() as AuthContextType;
//   const [questionData , setQuestionData] = useState<QuestionData[]>([]);
//   const userid = user?._id;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [difficulty, setDifficulty] = useState("All");
//   const [addingToBookmarks , setAddingToBookmarks] = useState(false);
//   const pageSize = 9;
//   const filteredData =
//     difficulty === "All"
//       ? testData
//       : testData.filter((q) => q.difficulty === difficulty);

//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const pageData = filteredData.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );
//   const handleAddToBookmark = async (id: string) => {
//     setAddingToBookmarks(true);
//     try {
//       const res = await fetch("/api/bookmark", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ questionId: id, userId: userid }),
//       });
//       const data = await res.json();
//       if (data && data.sucess) {
//         alert("question bookmarked");
//       } else {
//         alert("coudnt add question to bookmarks");
//       }
//     } catch (error) {

//     } finally {setAddingToBookmarks(true)}
//   };
//   const HandleFetchQuestions = async()=>{
//     const res = await fetch("/api/fetchdata");
//     const data = await res.json();
//     setQuestionData(data);
//   }
//   useEffect(()=>{
//     HandleFetchQuestions();
//   }  , []);
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-6">
//       <main className="w-full max-w-6xl">
//         <header className="mb-8 text-center">
//           <h1 className="text-3xl font-semibold text-white/90">
//             Problem Dashboard
//           </h1>
//           <p className="mt-2 text-sm text-white/60">
//             Browse curated problems — Solve your favourite problems, sort them
//             as peer your liking.
//           </p>
//           <div className="mt-4 flex items-center justify-center gap-3">
//             <label htmlFor="difficulty" className="text-white">
//               Filter by difficulty
//             </label>
//             <select
//               id="difficulty"
//               value={difficulty}
//               onChange={(e) => {
//                 setDifficulty(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="h-10 px-3 rounded-lg bg-white/5 border border-white/8 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//             >
//               <option value="All" className="bg-gray-900 text-white ">
//                 All{" "}
//               </option>
//               <option value="Easy" className="bg-gray-900 text-green-300">
//                 Easy
//               </option>
//               <option value="Medium" className="bg-gray-900 text-yellow-200">
//                 Medium
//               </option>
//               <option value="Hard" className="bg-gray-900 text-red-400">
//                 Hard
//               </option>
//             </select>

//             <button
//               type="button"
//               onClick={() => {
//                 setDifficulty("All");
//                 setCurrentPage(1);
//               }}
//               className="h-10 px-3 rounded-lg bg-white/6 text-sm text-white/90 hover:bg-white/8 transition"
//             >
//               Reset
//             </button>
//           </div>
//         </header>

//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {pageData.map((question, idx) => (
//             <article
//               key={(currentPage - 1) * pageSize + idx}
//               className="h-64 flex flex-col justify-between rounded-2xl p-6 bg-white/5 border border-white/8 backdrop-blur-md shadow-lg shadow-black/40 transition-transform hover:-translate-y-1"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold text-white/95 mb-2">
//                   Question {(currentPage - 1) * pageSize + idx + 1}
//                 </h3>
//                 <p className="text-sm font-medium text-white/80 mb-4 line-clamp-2">
//                   {question.title}
//                 </p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span
//                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-white/6
//                                         ${
//                                           question.difficulty === "Easy"
//                                             ? "bg-green-700/18 text-green-300"
//                                             : question.difficulty === "Medium"
//                                             ? "bg-yellow-700/18 text-yellow-300"
//                                             : "bg-red-700/18 text-red-300"
//                                         }`}
//                 >
//                   {question.difficulty}
//                 </span>
//                 <button
//                   className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ring-1 ring-indigo-400/40 bg-indigo-900/20 text-indigo-200 hover:bg-indigo-800/30 transition focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   onClick={() => handleAddToBookmark(question.url)}
//                   title="Add to Bookmark"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M5 5v16l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
//                     />
//                   </svg>
//                   {addingToBookmarks ?  "Adding to Bookmarks" : "Add to Bookmark"}
//                 </button>

//                 <a
//                   href={question.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-indigo-300 hover:text-indigo-100 text-sm font-medium underline"
//                 >
//                   Reference
//                 </a>
//               </div>
//             </article>
//           ))}
//         </section>

//         <nav
//           aria-label="Pagination"
//           className="mt-10 flex items-center justify-center"
//         >
//           <div className="inline-flex items-center gap-4 bg-white/3 border border-white/6 rounded-xl px-4 py-3 backdrop-blur-sm">
//             <button
//               aria-label="Previous page"
//               className="px-4 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed transition"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             >
//               Previous
//             </button>

//             <div className="px-4 py-1 rounded-full bg-white/6 text-sm text-white/95 font-semibold">
//               Page {currentPage} / {totalPages}
//             </div>

//             <button
//               aria-label="Next page"
//               className="px-4 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed transition"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             >
//               Next
//             </button>
//           </div>
//         </nav>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;
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
  const { user } = useAuth() as AuthContextType;
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const userid = user?._id;
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("All");
  const [addingToBookmarks, setAddingToBookmarks] = useState(false);
  const pageSize = 9;

  const allQuestions = questionData.flatMap((qset) => qset.questions);

  const filteredData =
    topic === "All" ? allQuestions : allQuestions.filter((q) => q.topic === topic);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddToBookmark = async (id: string) => {
    setAddingToBookmarks(true);
    try {
      const res = await fetch("http://localhost:8080/api/bookmark", {
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
    } catch (error) {
      console.error(error);
    } finally {
      setAddingToBookmarks(false);
    }
  };

  const handleFetchQuestions = async () => {
    const res = await fetch("http://localhost:8080/api/fetchdata");
    const data = await res.json();
    setQuestionData(data);
  };
  console.log(questionData);
  useEffect(() => {
    handleFetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-6">
      <main className="w-full max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white/90">
            Problem Dashboard
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Browse curated problems — Solve your favourite problems, sort them
            as per your liking.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <label htmlFor="topic" className="text-white">
              Filter by topic
            </label>
            <select
              id="topic"
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
              <option value="Learn the basics" className="bg-gray-900 text-white">Learn the basics</option>
              <option value="Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]" className="bg-gray-900 text-white">Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]</option>
              <option value="Recursion [PatternWise]" className="bg-gray-900 text-white">Recursion [PatternWise]</option>
              <option value="Bit Manipulation [Concepts & Problems]" className="bg-gray-900 text-white">Bit Manipulation [Concepts & Problems]</option>
              <option value="Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]" className="bg-gray-900 text-white">Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]</option>
              <option value="Sliding Window & Two Pointer Combined Problems" className="bg-gray-900 text-white">Sliding Window & Two Pointer Combined Problems</option>
              <option value="Heaps [Learning, Medium, Hard Problems]" className="bg-gray-900 text-white">Heaps [Learning, Medium, Hard Problems]</option>
              <option value="Greedy Algorithms [Easy, Medium/Hard]" className="bg-gray-900 text-white">Greedy Algorithms [Easy, Medium/Hard]</option>
              <option value="Binary Trees [Traversals, Medium and Hard Problems]" className="bg-gray-900 text-white">Binary Trees [Traversals, Medium and Hard Problems]</option>
              <option value="Binary Search Trees [Concept and Problems]" className="bg-gray-900 text-white">Binary Search Trees [Concept and Problems]</option>
              <option value="Graphs [Concepts & Problems]" className="bg-gray-900 text-white">Graphs [Concepts & Problems]</option>
              <option value="Dynamic Programming [Patterns and Problems]" className="bg-gray-900 text-white">Dynamic Programming [Patterns and Problems]</option>
              <option value="Tries" className="bg-gray-900 text-white">Tries</option>
              <option value="Strings" className="bg-gray-900 text-white">Strings</option>
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
              key={question._id}
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
                <button
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ring-1 ring-indigo-400/40 bg-indigo-900/20 text-indigo-200 hover:bg-indigo-800/30 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => handleAddToBookmark(question._id)}
                  title="Add to Bookmark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5v16l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                    />
                  </svg>
                  {addingToBookmarks ? "Adding..." : "Add to Bookmark"}
                </button>

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
              Page {currentPage} / {totalPages || 1}
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

export default Dashboard;
