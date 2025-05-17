"use client";

import { useState } from "react";
import { Copy, Share2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ToastContainer } from "@/components/toast-container";

export default function Home() {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [loading, setLoading] = useState(false);
  const { toasts, addToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setEmoji(data.emoji);
    setLoading(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setText("");
    setEmoji("");
    setIsSubmitted(false);
  };

  const handleCopy = () => {
    if (emoji) {
      navigator.clipboard.writeText(emoji);
      addToast({
        message: "이모지가 복사되었습니다!",
        type: "success",
        duration: 3000,
      });
    }
  };

  const handleShare = () => {
    if (emoji) {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl);
      addToast({
        message: "현재 페이지 URL이 복사되었습니다!",
        type: "info",
        duration: 3000,
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-3 sm:px-4 py-8 sm:py-10">
      <div className="w-full max-w-md sm:max-w-xl text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            이모지로 대화해요 ✨
          </h1>
          <p className="mt-3 md:mt-4 text-gray-600 text-base md:text-lg leading-relaxed px-1">
            문장을 입력하면 상황에 어울리는 이모지로 바꿔드려요.{" "}
            <br className="hidden sm:block" />
            예를 들어{" "}
            <span className="italic">
              "친구와 커피를 마시며 즐거운 시간을 보내고 있어요"
            </span>
            처럼
            <br className="hidden sm:block" />
            <span className="font-semibold text-purple-600"> 자세한 상황</span>
            을 설명해 주세요.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <textarea
            className="w-full p-4 md:p-5 border border-gray-200 rounded-xl text-sm md:text-base resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 bg-gray-50 disabled:opacity-80 disabled:cursor-not-allowed"
            rows={4}
            placeholder="이모지로 전달하고 싶은 문장을 입력해보세요.(최소 50자 이상 작성하시면 원하는 결과가 나올 확률이 높아요!)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full mt-4 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md text-sm md:text-base ${
              isSubmitted
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            }`}
            onClick={isSubmitted ? handleReset : handleSubmit}
            disabled={loading || (!isSubmitted && text.trim() === "")}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 md:h-5 md:w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                <span>이모지 생성 중...</span>
              </>
            ) : isSubmitted ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="font-bold">다른 문장 만들기</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                <span className="font-bold">이모지 생성하기</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {emoji && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl"></div>
              <div className="relative z-10">
                <div className="text-7xl md:text-8xl mb-4">{emoji}</div>
                <p className="text-gray-700 mt-4 font-medium text-sm md:text-base px-2 line-clamp-3">
                  {text}
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 md:gap-2 text-sm md:text-base"
                onClick={handleCopy}
              >
                <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />
                이모지 복사
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 md:gap-2 text-sm md:text-base"
                onClick={handleShare}
              >
                <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                URL 공유
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      <ToastContainer toasts={toasts} />
    </main>
  );
}
