import { useState } from "react";
import { testData } from "../constants";

function Bookmarks() {

    const [currentPage, setCurrentPage] = useState(1);
    const [difficulty, setDifficulty] = useState("All");
    const pageSize = 9;
    const filteredData =difficulty === "All" ? testData : testData.filter((q) => q.difficulty === difficulty);
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const pageData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-6">
            <main className="w-full max-w-6xl">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold text-white/90">Your Bookmarks</h1>
                    <p className="mt-2 text-sm text-white/60">Solve your favourate problems.</p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <label htmlFor="difficulty" className="text-white">Filter by difficulty</label>
                        <select
                            id="difficulty"
                            value={difficulty}
                            onChange={(e) => {
                                setDifficulty(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="h-10 px-3 rounded-lg bg-white/5 border border-white/8 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                            <option value="All" className="bg-gray-900 text-white ">All </option>
                            <option value="Easy" className="bg-gray-900 text-green-300">Easy</option>
                            <option value="Medium" className="bg-gray-900 text-yellow-200">Medium</option>
                            <option value="Hard" className="bg-gray-900 text-red-400">Hard</option>
                        </select>

                        <button
                            type="button"
                            onClick={() => {
                                setDifficulty("All");
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
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-white/6
                                        ${question.difficulty === "Easy"
                                            ? "bg-green-700/18 text-green-300"
                                            : question.difficulty === "Medium"
                                            ? "bg-yellow-700/18 text-yellow-300"
                                            : "bg-red-700/18 text-red-300"
                                        }`}
                                >
                                    {question.difficulty}
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

                <nav aria-label="Pagination" className="mt-10 flex items-center justify-center">
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