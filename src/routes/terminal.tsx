import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/terminal")({
  component: TerminalOS,
});

type HistoryItem = {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
};

const VIRTUAL_FILES: Record<string, string> = {
  "about.md": `# Arnold Shaju — Full-Stack & DevOps Engineer
B.Tech Computer Science & Engineering (Class of 2026)
Location: Kerala, India
Focus: Frontend · Backend · DevOps

Summary:
Computer Science Engineering fresher building scalable backend systems,
mobile tools, real-time WebSocket apps, and automated cloud pipelines.

Core Technologies:
- Languages: Python, JavaScript/TypeScript, Java, C++
- Backend: Django, Django REST Framework, WebSockets, Node.js
- Frontend: React 19, Next.js 15, TanStack Start, Tailwind CSS
- Databases & Cache: PostgreSQL, SQLite, Redis Pub/Sub
- DevOps & Tools: Docker, CI/CD, Git, Linux, Vercel, Nitro`,

  "skills.json": `{
  "developer": "Arnold Shaju",
  "status": "Available for Jobs",
  "technical_stack": [
    "Python", "Django", "React", "Next.js", "Java", "JWT & Auth",
    "PostgreSQL", "SQLite", "Redis", "Celery", "CI/CD", "Docker", "DevOps"
  ],
  "soft_skills": [
    "Team Management", "Communication", "Event Coordination", "Leadership", "Problem-Solving"
  ]
}`,

  "Dockerfile": `# Multi-stage Dockerfile for Portfolio Services
FROM python:3.12-slim AS backend-builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=backend-builder /usr/local /usr/local
COPY --from=frontend-builder /app/.output ./.output
EXPOSE 3000 8000
CMD ["python", "-m", "gunicorn", "server:app"]`,

  "grocery.py": `# Smart Grocery Assistant OCR Engine & Route Optimization
import time

def process_receipt(receipt_image):
    print("[OCR Engine] Scanning receipt image...")
    time.sleep(0.4)
    parsed_items = [
        {"item": "Organic Milk", "qty": 2, "exp_days": 7},
        {"item": "Whole Wheat Bread", "qty": 1, "exp_days": 5},
        {"item": "Fresh Apples", "qty": 6, "exp_days": 12},
    ]
    print(f"[OCR Success] Extracted {len(parsed_items)} items successfully.")
    return parsed_items

def optimize_store_route(items):
    print("[A* Pathfinding] Calculating shortest aisle path...")
    time.sleep(0.3)
    return "Aisle 1 (Dairy) -> Aisle 3 (Bakery) -> Aisle 7 (Produce)"

if __name__ == "__main__":
    items = process_receipt("sample_receipt.jpg")
    route = optimize_store_route(items)
    print(f"[Route Optimized] {route}")`,

  "system.log": `[2026-09-30 14:40:01] INFO  [server] Nitro SSR engine booted on port 3000
[2026-09-30 14:40:02] INFO  [django] Django REST API v4.2 initialized
[2026-09-30 14:40:03] INFO  [redis] Redis Pub/Sub connected on redis://localhost:6379/0
[2026-09-30 14:40:05] SUCCESS [ws] WebSocket Channel 'doc_sync_room_1' established
[2026-09-30 14:40:12] SUCCESS [ocr] Tesseract Engine loaded with 99.4% accuracy`,

  "resume.txt": `ARNOLD SHAJU — RESUME SUMMARY
--------------------------------------------------
Education: B.Tech CSE (2022 - 2026) | CGPA 7.2
Internships: DevFactory (Mobile App Dev), TEKWIZA (IBOT Robotics)
Leadership: NRPF Unit Coordinator, NSS Volunteer
Contact: arnoldshaju75@gmail.com | +91 62380 46258
GitHub: https://github.com/Arnoldshaju`
};

const NEOFETCH_ASCII = `
   ▲          ARNOLD SHAJU @ PORTFOLIO-OS
  ▲ ▲         ---------------------------
 ▲   ▲        OS: Portfolio-OS v2.6 (WebAssembly)
▲ ▲ ▲ ▲       Host: Vercel Nitro Edge Runtime
              Kernel: Linux 6.11.0-portfolio x86_64
              Uptime: 2026 days (Class of 2026)
              Shell: zsh 5.9 (x86_64-apple-darwin22.0)
              Display: 1920x1080 @ 120Hz (React 19 + Tailwind v4)
              CPU: Virtual WASM Octa-Core @ 3.4GHz
              Memory: 2048MiB / 16384MiB
              Stack: Python, Django, React, Next.js, Docker, WebSockets
`;

function TerminalOS() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [theme, setTheme] = useState<"cyan" | "green" | "amber">("cyan");
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial welcome banner
    const welcomeItem: HistoryItem = {
      id: "welcome",
      command: "init",
      output: (
        <div className="space-y-2 text-xs">
          <pre className="font-mono text-primary text-[11px] leading-tight select-none">
            {NEOFETCH_ASCII}
          </pre>
          <div className="border-y border-border py-2 text-muted-foreground">
            Welcome to <span className="text-primary font-bold">Portfolio-OS WebAssembly Shell</span>.
            Type <span className="text-primary underline">help</span> to view available commands, or click any quick pill below.
          </div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    };
    setHistory([welcomeItem]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isProcessing]);

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add to command history
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let output: React.ReactNode = null;

    if (mainCmd === "clear" || mainCmd === "cls") {
      setHistory([]);
      setInput("");
      return;
    }

    setIsProcessing(true);

    if (mainCmd === "help") {
      output = (
        <div className="space-y-3 text-xs">
          <div className="font-bold text-primary">PORTFOLIO-OS COMMAND DIRECTORY:</div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="rounded border border-border bg-foreground/5 p-2.5">
              <span className="font-bold text-primary">📁 FILE SYSTEM & INSPECTION</span>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li><span className="text-foreground font-mono">ls</span> — List virtual files & specs</li>
                <li><span className="text-foreground font-mono">cat &lt;file&gt;</span> — Read file content (e.g. cat Dockerfile)</li>
                <li><span className="text-foreground font-mono">neofetch</span> — Display system architecture overview</li>
              </ul>
            </div>
            <div className="rounded border border-border bg-foreground/5 p-2.5">
              <span className="font-bold text-primary">🐍 PYTHON & RUNTIME</span>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li><span className="text-foreground font-mono">python &lt;script.py&gt;</span> — Execute Python script (e.g. python grocery.py)</li>
                <li><span className="text-foreground font-mono">python -c &quot;&lt;code&gt;&quot;</span> — Evaluate inline Python expression</li>
                <li><span className="text-foreground font-mono">pytest</span> — Run automated live unit tests</li>
              </ul>
            </div>
            <div className="rounded border border-border bg-foreground/5 p-2.5">
              <span className="font-bold text-primary">🌐 API & DEVOPS</span>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li><span className="text-foreground font-mono">curl /api/projects</span> — Query project REST API</li>
                <li><span className="text-foreground font-mono">curl /api/skills</span> — Query technical stack API</li>
                <li><span className="text-foreground font-mono">docker ps</span> — List running system containers</li>
              </ul>
            </div>
            <div className="rounded border border-border bg-foreground/5 p-2.5">
              <span className="font-bold text-primary">⚙️ SYSTEM & UTILITIES</span>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li><span className="text-foreground font-mono">theme [cyan|green|amber]</span> — Toggle CLI color palette</li>
                <li><span className="text-foreground font-mono">clear</span> — Clear terminal output buffer</li>
                <li><span className="text-foreground font-mono">home / exit</span> — Exit OS back to portfolio home</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (mainCmd === "neofetch" || mainCmd === "fastfetch") {
      output = (
        <pre className="font-mono text-primary text-[11px] leading-tight select-none">
          {NEOFETCH_ASCII}
        </pre>
      );
    } else if (mainCmd === "ls" || mainCmd === "dir") {
      output = (
        <div className="space-y-1 font-mono text-xs">
          <div className="text-muted-foreground">drwxr-xr-x  2 arnold staff   128 B  projects/</div>
          <div className="text-primary">-rw-r--r--  1 arnold staff  1.4 KB  about.md</div>
          <div className="text-primary">-rw-r--r--  1 arnold staff  412 B   skills.json</div>
          <div className="text-primary">-rw-r--r--  1 arnold staff  620 B   Dockerfile</div>
          <div className="text-primary">-rw-r--r--  1 arnold staff  890 B   grocery.py</div>
          <div className="text-primary">-rw-r--r--  1 arnold staff  450 B   system.log</div>
          <div className="text-primary">-rw-r--r--  1 arnold staff  310 B   resume.txt</div>
        </div>
      );
    } else if (mainCmd === "cat") {
      if (!arg) {
        output = <span className="text-destructive">Usage: cat &lt;filename&gt; (e.g., cat Dockerfile)</span>;
      } else if (VIRTUAL_FILES[arg]) {
        output = (
          <pre className="overflow-x-auto rounded border border-border bg-foreground/5 p-3 font-mono text-xs text-foreground whitespace-pre-wrap">
            {VIRTUAL_FILES[arg]}
          </pre>
        );
      } else {
        output = <span className="text-destructive">cat: {arg}: No such file or directory. Try &quot;ls&quot; to see available files.</span>;
      }
    } else if (mainCmd === "python" || mainCmd === "python3") {
      if (arg === "grocery.py") {
        output = (
          <div className="space-y-1 font-mono text-xs text-primary">
            <div>[WASM Python 3.12] Initializing Tesseract OCR &amp; Route Optimization Runtime...</div>
            <div className="text-foreground">[OCR Engine] Scanning receipt image &quot;sample_receipt.jpg&quot;...</div>
            <div className="text-foreground">[OCR Success] Extracted 3 items:</div>
            <div className="text-muted-foreground pl-4">• Organic Milk (Qty: 2, Expiry: 7 days)</div>
            <div className="text-muted-foreground pl-4">• Whole Wheat Bread (Qty: 1, Expiry: 5 days)</div>
            <div className="text-muted-foreground pl-4">• Fresh Apples (Qty: 6, Expiry: 12 days)</div>
            <div className="text-foreground">[A* Pathfinding] Calculating shortest aisle path graph...</div>
            <div className="text-primary font-bold">[Route Optimized] Aisle 1 (Dairy) ➔ Aisle 3 (Bakery) ➔ Aisle 7 (Produce)</div>
          </div>
        );
      } else if (arg.startsWith("-c")) {
        const expr = arg.replace("-c", "").trim().replace(/^['"]|['"]$/g, "");
        try {
          const res = String(new Function(`"use strict"; return (${expr})`)());
          output = <div className="font-mono text-xs text-primary">{res}</div>;
        } catch {
          output = <div className="font-mono text-xs text-foreground">Hello from Python 3.12 (WASM Evaluator)! Executed: {expr}</div>;
        }
      } else {
        output = (
          <div className="font-mono text-xs text-muted-foreground">
            Python 3.12.2 (main, Sep 30 2026) [WASM WebAssembly Port]<br />
            Type &quot;python grocery.py&quot; or &quot;python -c &apos;2**10&apos;&quot; to test runtime.
          </div>
        );
      }
    } else if (mainCmd === "curl") {
      if (arg.includes("/api/projects")) {
        output = (
          <pre className="overflow-x-auto rounded border border-border bg-foreground/5 p-3 font-mono text-xs text-primary whitespace-pre-wrap">
{JSON.stringify(
  [
    { id: 1, name: "Smart Grocery Assistant", stack: ["OCR", "AI", "Django", "Python"], status: "Active" },
    { id: 2, name: "Zeal Document Editor", stack: ["Next.js", "Django REST", "WebSockets", "Redis"], status: "Active" },
    { id: 3, name: "Terra Mindspace", stack: ["TanStack Start", "React 19", "Tailwind CSS v4"], status: "Deployed" }
  ],
  null,
  2
)}
          </pre>
        );
      } else if (arg.includes("/api/skills")) {
        output = (
          <pre className="overflow-x-auto rounded border border-border bg-foreground/5 p-3 font-mono text-xs text-primary whitespace-pre-wrap">
{JSON.stringify(
  ["Python", "Django", "React", "Next.js", "PostgreSQL", "Docker", "Redis", "Celery", "CI/CD"],
  null,
  2
)}
          </pre>
        );
      } else {
        output = <span className="text-destructive">curl: Could not resolve endpoint &quot;{arg}&quot;. Try &quot;curl /api/projects&quot; or &quot;curl /api/skills&quot;.</span>;
      }
    } else if (mainCmd === "pytest" || mainCmd === "unittest") {
      output = (
        <div className="space-y-1 font-mono text-xs">
          <div className="text-muted-foreground">============================= test session starts =============================</div>
          <div>platform wasm-linux -- Python 3.12.2, pytest-8.1.0, pluggy-1.4.0</div>
          <div className="text-primary font-bold">rootdir: /app, configfile: pytest.ini</div>
          <div className="py-1">
            <span className="text-primary">tests/test_ocr.py</span> <span className="text-emerald-400">✓ PASSED</span> [33%]<br />
            <span className="text-primary">tests/test_websockets.py</span> <span className="text-emerald-400">✓ PASSED</span> [66%]<br />
            <span className="text-primary">tests/test_docker_build.py</span> <span className="text-emerald-400">✓ PASSED</span> [100%]
          </div>
          <div className="text-emerald-400 font-bold">============================== 3 passed in 0.42s ==============================</div>
        </div>
      );
    } else if (mainCmd === "docker") {
      output = (
        <div className="overflow-x-auto font-mono text-xs">
          <div className="text-muted-foreground">CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS        PORTS</div>
          <div className="text-primary">a8f9c102e3d1   portfolio-django-api  &quot;gunicorn server:app&quot;    2 hours ago    Up 2 hours    0.0.0.0:8000-&gt;8000/tcp</div>
          <div className="text-primary">c4b123f98a10   portfolio-redis-pub   &quot;redis-server --save&quot;    2 hours ago    Up 2 hours    0.0.0.0:6379-&gt;6379/tcp</div>
          <div className="text-primary">e901f42a11b8   portfolio-nitro-ssr   &quot;node .output/server&quot;    2 hours ago    Up 2 hours    0.0.0.0:3000-&gt;3000/tcp</div>
        </div>
      );
    } else if (mainCmd === "theme") {
      if (arg === "green") {
        setTheme("green");
        output = <span className="text-emerald-400">Switched terminal theme to Hacker Green matrix.</span>;
      } else if (arg === "amber") {
        setTheme("amber");
        output = <span className="text-amber-400">Switched terminal theme to Amber Retro CRT.</span>;
      } else {
        setTheme("cyan");
        output = <span className="text-primary">Switched terminal theme to Cyber Cyan default.</span>;
      }
    } else if (mainCmd === "exit" || mainCmd === "home") {
      window.location.href = "/";
      return;
    } else {
      output = (
        <span className="text-destructive">
          zsh: command not found: {trimmed}. Type &quot;help&quot; for a list of available system commands.
        </span>
      );
    }

    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          command: trimmed,
          output,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setIsProcessing(false);
      setInput("");
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const getThemeClass = () => {
    if (theme === "green") return "text-emerald-400 border-emerald-500/30";
    if (theme === "amber") return "text-amber-400 border-amber-500/30";
    return "text-primary border-primary/30";
  };

  return (
    <div className="relative min-h-screen bg-background font-mono text-foreground">
      {/* Top Status Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-panel/80 px-4 py-3 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-red-500/80 inline-block" />
            <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="size-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            arnold@portfolio-os:~$ (WASM Shell v2.6)
          </span>
        </div>

        <div className="hidden items-center gap-4 text-xs text-muted-foreground md:flex">
          <span>CPU: <span className="text-primary">1.2%</span></span>
          <span>MEM: <span className="text-primary">2.04 GB</span></span>
          <span>STATUS: <span className="text-emerald-400 font-bold">ONLINE</span></span>
          <Link
            to="/"
            className="rounded-full border border-border px-3 py-1 text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            ← Back to Web UI
          </Link>
        </div>
      </header>

      {/* Main Terminal Window */}
      <main
        className="mx-auto max-w-5xl p-4 md:p-8"
        onClick={() => inputRef.current?.focus()}
      >
        {/* History buffer */}
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="space-y-2">
              {item.command !== "init" && (
                <div className="flex items-center gap-2 text-xs">
                  <span className={getThemeClass()}>arnold@portfolio-os:~$</span>
                  <span className="font-bold text-foreground">{item.command}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{item.timestamp}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
              <span className={getThemeClass()}>arnold@portfolio-os:~$</span>
              <span>Executing WebAssembly microcode...</span>
            </div>
          )}
        </div>

        {/* Prompt Input */}
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className={getThemeClass()}>arnold@portfolio-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent font-mono text-xs text-foreground outline-none border-none focus:ring-0"
            placeholder="Type 'help', 'ls', 'pytest', 'python grocery.py', or 'curl /api/projects'..."
          />
        </div>

        <div ref={bottomRef} />
      </main>

      {/* Quick Action Pills Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-panel/90 px-4 py-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground uppercase text-[10px] tracking-wider">Quick Commands:</span>
          <div className="flex flex-wrap gap-2">
            {[
              "help",
              "neofetch",
              "ls",
              "cat Dockerfile",
              "python grocery.py",
              "pytest",
              "curl /api/projects",
              "docker ps",
              "theme green",
            ].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="rounded-full border border-border bg-foreground/5 px-3 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
