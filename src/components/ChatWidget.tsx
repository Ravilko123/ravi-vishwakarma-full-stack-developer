import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatMessage, streamChat } from "@/lib/chat-stream";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "🥗 Suggest a healthy lunch",
  "🍳 Quick breakfast ideas",
  "🎉 Plan a dinner party menu",
  "📊 Weekly meal prep tips",
  "🥑 Low-carb snack options",
  "🍝 Easy pasta recipes",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setShowHistory(false);

    let assistantContent = "";
    const controller = new AbortController();
    abortRef.current = controller;

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: newMessages,
        onDelta: updateAssistant,
        onDone: () => setLoading(false),
        onError: (err) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `⚠️ ${err}` },
          ]);
          setLoading(false);
        },
        signal: controller.signal,
      });
    } catch {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    if (abortRef.current) abortRef.current.abort();
    setMessages([]);
    setLoading(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          "bg-primary text-primary-foreground",
          open && "rotate-90 scale-90"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 sm:w-[420px]"
          style={{ height: "min(600px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
              <div>
                <h3 className="text-sm font-semibold text-primary-foreground">
                  Meal Copilot
                </h3>
                <p className="text-xs text-primary-foreground/70">
                  AI-powered meal assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {hasMessages && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={clearChat}
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              {hasMessages && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => setShowHistory(!showHistory)}
                  title="History"
                >
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showHistory && "rotate-180")} />
                </Button>
              )}
            </div>
          </div>

          {/* History panel */}
          {showHistory && hasMessages && (
            <div className="border-b bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Conversation ({messages.length} messages)</p>
              <div className="max-h-24 overflow-y-auto space-y-0.5">
                {messages.map((m, i) => (
                  <p key={i} className="truncate">
                    <span className="font-medium">{m.role === "user" ? "You" : "AI"}:</span>{" "}
                    {m.content.slice(0, 60)}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {!hasMessages && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <Sparkles className="h-8 w-8 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-foreground">
                    Hi! I'm your Meal Copilot 🍽️
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ask me anything about meals, recipes, or nutrition
                  </p>
                </div>
                {/* Suggestion chips */}
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted text-foreground"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:m-0 [&>ul]:mt-1 [&>ol]:mt-1">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Streaming indicator */}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick suggestions when in conversation */}
          {hasMessages && !loading && (
            <div className="flex gap-1.5 overflow-x-auto px-4 pb-2 scrollbar-none">
              {SUGGESTIONS.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="shrink-0 rounded-full border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="border-t bg-background p-3">
            <div className="flex items-end gap-2 rounded-xl border bg-card px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about meals, recipes..."
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground max-h-20"
                style={{ minHeight: "24px" }}
                disabled={loading}
              />
              <Button
                size="icon"
                className="h-8 w-8 shrink-0 rounded-lg"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground/50">
              Powered by AI · Responses may not always be accurate
            </p>
          </div>
        </div>
      )}
    </>
  );
}
