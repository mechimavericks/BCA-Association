"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import quiz from "@/data/quiz";
import { useRouter } from "next/navigation";

export default function EntranceQuestionsPage() {

  const router = useRouter(); // initialize router

  const [start, setStart] = useState(false);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200); // 5 min default
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Pick 100 questions grouped & randomized inside groups
  useEffect(() => {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const eng = shuffle(quiz.filter((q) => q.type === "english")).slice(0, 40);
    const math = shuffle(quiz.filter((q) => q.type === "math")).slice(0, 50);
    const gk = shuffle(quiz.filter((q) => q.type === "gk")).slice(0, 10);

    // Keep fixed order: Eng → Math → GK
    setSelectedQuestions([...eng, ...math, ...gk]);
  }, []);

  // Timer
  useEffect(() => {
    if (start && !submitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !submitted) handleSubmit();
  }, [timeLeft, start, submitted]);

  // Fullscreen detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fs =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fs);

      if (start && !submitted && !fs) handleSubmit();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [start, submitted]);

  const handleAnswer = (id, option) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
  };

  const handleSubmit = () => {
    let sc = 0;
    selectedQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);

    // ✅ Only try to exit if still in fullscreen
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      document.exitFullscreen?.();
    }
  };

  const openFullscreen = () => {
    const elem = document.getElementById("fullscreen-wrapper");
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  const getMessage = () => {
    if (score <= selectedQuestions.length * 0.3)
      return "Low performance, keep practicing!";
    if (score <= selectedQuestions.length * 0.6)
      return "Average performance, you can do better!";
    if (score <= selectedQuestions.length * 0.85)
      return "Better performance, good job!";
    return "Best performance, excellent work!";
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div
      id="fullscreen-wrapper"
      className="flex justify-center items-start min-h-screen bg-gray-50 
                 p-0 sm:p-4 md:p-8"
    >
      <div
        id="quiz-container"
        className="border-2 border-gray-500 rounded-lg bg-white 
                   w-full sm:w-[95%] md:w-[70vw] h-[100vh] flex flex-col relative"
      >
        {/* Start Page */}
        {!start && !submitted && (
          <div className="text-center m-auto space-y-4 p-6">
            <h1 className="text-2xl font-bold">Let’s take a quick test</h1>
            <p className="text-gray-600">
              You will get 100 multiple-choice questions
              (40 English, 50 Math, 10 GK). Best of luck 🍀
            </p>
            <button
              onClick={() => {
                setStart(true);
                openFullscreen();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start Test
            </button>
          </div>
        )}

        {/* Test Running */}
        {start && !submitted && (
          <>
            {/* Top Bar */}
            <div className="flex flex-wrap justify-between items-center gap-2 p-3 border-b border-blue-600">
              <div className="flex items-center gap-4">
                {isFullscreen && (
                  <Link href="/">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src="/images/association.png"
                        alt="BCA Association Logo"
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                      />
                      <span className="text-base sm:text-lg font-bold text-blue-800 hidden sm:block">
                        BCA Association MMC
                      </span>
                    </div>
                  </Link>
                )}
                <p className="font-semibold text-red-600">
                  ⏰ {formatTime(timeLeft)}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Answered {Object.keys(answers).length} / {selectedQuestions.length}
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
              >
                Submit Test
              </button>
            </div>

            {/* Questions */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-6" id="questions-container">
              {["Group A [English]", "Group B [Math]", "Group C [GK]"].map((group, gIdx) => {
                const startIdx = gIdx === 0 ? 0 : gIdx === 1 ? 40 : 90;
                const endIdx = gIdx === 0 ? 40 : gIdx === 1 ? 90 : 100;
                const groupQuestions = selectedQuestions.slice(startIdx, endIdx);

                return (
                  <div key={group} className="space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-4">
                      {group}
                    </h2>

                    {groupQuestions.map((q, idx) => (
                      <div key={q.id} id={`q-${startIdx + idx}`} className="border-b pb-4">
                        <h2 className="text-base sm:text-lg font-semibold mb-2">
                          {startIdx + idx + 1}. {q.question}
                        </h2>

                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt, idx2) => (
                            <button
                              key={idx2}
                              onClick={() => {
                                handleAnswer(q.id, opt);
                                // auto scroll next
                                const nextEl = document.getElementById(`q-${startIdx + idx + 1}`);
                                if (nextEl) {
                                  nextEl.scrollIntoView({ behavior: "smooth", block: "start" });
                                }
                              }}
                              className={`flex-1 min-w-[45%] px-3 py-2 border rounded-lg text-left text-sm sm:text-base break-words
                                ${answers[q.id] === opt
                                  ? "bg-blue-200 border-blue-500"
                                  : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Result Modal */}
        {submitted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80 sm:w-96 space-y-4">
              <h2 className="text-xl font-bold text-green-600">🎉 Congratulations!</h2>
              <p>
                You scored <span className="font-bold">{score}</span> out of{" "}
                {selectedQuestions.length}
              </p>
              <p className="italic">{getMessage()}</p>
              <p className="font-medium">
                BCA Association wishes you best of luck 🍀
              </p>

              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Retry
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/entrance/model-question")
                  }
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg"
                >
                  View Model Question
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                >
                  Home
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
