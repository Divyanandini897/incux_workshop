import React, { useState, useEffect } from 'react';
import { Terminal, Play, Cpu, Sparkles, CheckCircle2, Shield, Search, ArrowRight, RefreshCw, Zap, Layers } from 'lucide-react';

export default function AiInteractiveLab({ onOpenAuth, onOpenPortal, currentUser }) {
  const [activeTab, setActiveTab] = useState('agentic');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [ragQuery, setRagQuery] = useState("Explain state persistence in LangGraph multi-agent loops");

  // Simulation steps for Agentic AI
  const agenticSteps = [
    { title: "Task Decomposition", role: "Planner Agent", desc: "Deconstructing prompt into autonomous DAG graph tasks..." },
    { title: "Tool Retrieval", role: "Tool Agent", desc: "Binding LangGraph state schema, Python sandbox, and vector indices..." },
    { title: "Execution & Coding", role: "Coder Agent", desc: "Generating high-performance async microservice handlers..." },
    { title: "Verification & Test", role: "Evaluator Agent", desc: "Running unit assertions, linting, and benchmark validation..." },
    { title: "Production Deployment", role: "DevOps Agent", desc: "Packaging container artifact to campus lab Kubernetes cluster..." }
  ];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setTerminalLogs(["$ incuxai-agent --initiate-graph --cluster=campus-lab-01"]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < agenticSteps.length) {
        setActiveStep(step);
        setTerminalLogs(prev => [
          ...prev,
          `[${agenticSteps[step].role}] ${agenticSteps[step].desc}`,
          `>> Latency: ${(Math.random() * 40 + 12).toFixed(1)}ms • Tokens: ${Math.floor(Math.random() * 300 + 400)} • Memory: 1.2GB`
        ]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setTerminalLogs(prev => [
          ...prev,
          "✓ All 5 pipeline stages executed successfully with zero runtime assertions.",
          "● Pipeline ready for production verification."
        ]);
      }
    }, 900);
  };

  useEffect(() => {
    // Initial demo log
    if (activeTab === 'agentic') {
      setTerminalLogs([
        "$ incuxai-agent --status",
        "✓ Multi-Agent LangGraph Node Runtime initialized.",
        "💡 Click 'Run Agentic Simulation' below to see autonomous task orchestration in action."
      ]);
    } else if (activeTab === 'rag') {
      setTerminalLogs([
        "$ incuxai-rag --query",
        `Query: "${ragQuery}"`,
        "✓ Vector similarity search: cosine distance 0.942 against 150 campus PDF embeddings.",
        "✓ Context window assembled: 3 top chunks injected into prompt.",
        "✓ Synthesizing accurate answer with production citation links."
      ]);
    } else {
      setTerminalLogs([
        "$ incuxai-sec --scan --cluster=prod-aws-eu",
        "● Ingress controller audit: 0 public ports exposed.",
        "✓ mTLS mutual TLS cryptographic certificates validated.",
        "✓ Zero-trust security policy enforced across all 18 microservice pods."
      ]);
    }
  }, [activeTab]);

  return (
    <section
      id="ai-lab"
      className="relative w-full bg-[#faf9f5] dark:bg-navy-950 py-24 border-t border-neutral-200 dark:border-white/10 overflow-hidden transition-colors duration-200"
      aria-label="Interactive AI Lab Sandbox"
    >
      {/* Background architectural glow & dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-electric-600/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4 font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              <span>Interactive AI Engineering Sandbox</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
              Experience Our Tech Labs <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-electric-600 to-accent-emerald dark:from-cyan-400 dark:to-accent-lime">
                Live in the Browser.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Before enrolling, test the actual concepts, autonomous pipelines, and distributed architectures
              our practitioner mentors teach across university auditoriums and hands-on lab terminals.
            </p>
          </div>

          {/* Quick Sandbox Status Indicator */}
          <div className="flex items-center gap-3 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md p-3 rounded-2xl border border-neutral-200 dark:border-white/10 shadow-md font-mono text-xs">
            <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
            <span className="text-neutral-700 dark:text-cyan-200 font-bold">Lab Sandbox Active</span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500 dark:text-neutral-400">Node v22 • Python 3.12</span>
          </div>
        </div>

        {/* Interactive Lab Container */}
        <div className="rounded-3xl bg-white/95 dark:bg-navy-900/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-2xl overflow-hidden">
          {/* Top Tabs Switcher */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 px-6 sm:px-8 py-4 bg-neutral-50/70 dark:bg-navy-950/70 overflow-x-auto no-scrollbar gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setActiveTab('agentic'); setActiveStep(0); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'agentic'
                    ? 'bg-gradient-to-r from-electric-600 to-cyan-500 text-white shadow-glow-cyan shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>1. Agentic AI &amp; LangGraph</span>
              </button>

              <button
                onClick={() => { setActiveTab('rag'); setActiveStep(0); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'rag'
                    ? 'bg-gradient-to-r from-electric-600 to-cyan-500 text-white shadow-glow-cyan shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>2. Hybrid RAG &amp; Vector Embeddings</span>
              </button>

              <button
                onClick={() => { setActiveTab('security'); setActiveStep(0); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-gradient-to-r from-electric-600 to-cyan-500 text-white shadow-glow-cyan shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>3. Zero-Trust Cloud Architecture</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-cyan-400">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span>Interactive CLI Runtime</span>
            </div>
          </div>

          {/* Tab 1: Agentic AI Visualizer */}
          {activeTab === 'agentic' && (
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Pipeline Nodes */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                      Autonomous Pipeline Architecture
                    </span>
                    <button
                      onClick={runSimulation}
                      disabled={isRunning}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-electric-600 to-cyan-500 hover:from-electric-700 hover:to-cyan-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isRunning ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Simulating...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Run Agentic Simulation</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {agenticSteps.map((s, idx) => {
                      const isCurrent = isRunning && activeStep === idx;
                      const isPassed = activeStep > idx || (!isRunning && activeStep === agenticSteps.length - 1);

                      return (
                        <div
                          key={s.title}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                            isCurrent
                              ? 'bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-500 scale-[1.01] shadow-glow-cyan'
                              : isPassed
                              ? 'bg-white dark:bg-navy-950 border-neutral-200 dark:border-white/10 opacity-90'
                              : 'bg-neutral-50 dark:bg-navy-950/50 border-neutral-200/60 dark:border-white/5 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                              isCurrent
                                ? 'bg-cyan-500 text-dark-950 animate-pulse font-extrabold'
                                : isPassed
                                ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                                : 'bg-neutral-200 dark:bg-navy-800 text-neutral-600 dark:text-neutral-400'
                            }`}>
                              0{idx + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-headline font-bold text-sm text-neutral-900 dark:text-white">
                                  {s.title}
                                </h4>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-navy-800 text-neutral-600 dark:text-cyan-300">
                                  {s.role}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                {s.desc}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 ml-2">
                            {isPassed ? (
                              <CheckCircle2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                            ) : isCurrent ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 inline-block" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Console Output */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300 shadow-xl min-h-[360px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-[11px] text-neutral-500 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="ml-2 text-neutral-400">agent_runtime.sh</span>
                        </div>
                        <span className="text-cyan-400">ONLINE</span>
                      </div>

                      <div className="space-y-2 overflow-y-auto max-h-[260px] pr-1">
                        {terminalLogs.map((log, i) => (
                          <div
                            key={i}
                            className={`leading-relaxed text-[11px] sm:text-xs ${
                              log.startsWith('$')
                                ? 'text-cyan-300 font-bold'
                                : log.startsWith('✓')
                                ? 'text-emerald-400 font-semibold'
                                : log.startsWith('>>')
                                ? 'text-cyan-400 text-[10px]'
                                : 'text-neutral-300'
                            }`}
                          >
                            {log}
                          </div>
                        ))}
                        {isRunning && (
                          <div className="flex items-center gap-1 text-cyan-400 text-xs">
                            <span className="animate-pulse">▌ Processing autonomous state graph...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                      <span>Memory: 2.1 GB / 8.0 GB</span>
                      <span>Nodes: 5 active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: RAG Pipeline */}
          {activeTab === 'rag' && (
            <div className="p-6 sm:p-10">
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-cyan-400 mb-2 font-bold">
                    Test Query in Enterprise RAG Knowledge Base
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-navy-950 border border-neutral-300 dark:border-white/10 text-sm font-mono text-neutral-900 dark:text-white outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => {
                        setTerminalLogs([
                          `$ incuxai-rag --query "${ragQuery}"`,
                          "✓ Embedding generated: 1536-dimensional float vector",
                          "✓ HNSW Index queried in 8.4ms (99.1% recall)",
                          "✓ Top 3 chunks retrieved from LangGraph Knowledge Base & Codebase",
                          "✓ Synthesized Answer: LangGraph manages persistence using Checkpointer interfaces (e.g. MemorySaver, AsyncPostgresSaver) storing thread IDs and checkpoint states between node transitions."
                        ]);
                      }}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-electric-600 to-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Visual Similarity Gauges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-navy-950 border border-neutral-200 dark:border-white/10">
                    <span className="text-neutral-500 block text-[10px]">COSINE SIMILARITY</span>
                    <span className="font-bold text-xl text-cyan-600 dark:text-cyan-400">0.942</span>
                    <p className="text-[11px] text-neutral-500 mt-1">Chunk: /core/graph/state.py</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-navy-950 border border-neutral-200 dark:border-white/10">
                    <span className="text-neutral-500 block text-[10px]">RETRIEVAL LATENCY</span>
                    <span className="font-bold text-xl text-electric-600 dark:text-electric-400">8.4 ms</span>
                    <p className="text-[11px] text-neutral-500 mt-1">HNSW Vector Store</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-navy-950 border border-neutral-200 dark:border-white/10">
                    <span className="text-neutral-500 block text-[10px]">LLM GENERATION</span>
                    <span className="font-bold text-xl text-violet-600 dark:text-violet-400">42 tokens/s</span>
                    <p className="text-[11px] text-neutral-500 mt-1">Streaming Completion</p>
                  </div>
                </div>

                {/* Console Log display */}
                <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300">
                  <div className="space-y-1.5">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="text-neutral-300 leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Security & Zero-Trust Cloud */}
          {activeTab === 'security' && (
            <div className="p-6 sm:p-10">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-navy-950 border border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                      Defensive Cloud Security Lab
                    </span>
                    <h3 className="font-headline font-bold text-xl text-neutral-900 dark:text-white">
                      Zero-Trust Policy Enforcement Engine
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Students configure real Envoy sidecars, Kubernetes NetworkPolicies, and cryptographic identity attestation.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setTerminalLogs([
                        "$ incuxai-sec --remediate --auto-apply",
                        "● Vulnerability scanner: Port 8080 unencrypted ingress detected.",
                        "✓ Generated Cilium NetworkPolicy: strictly limiting traffic to internal pods.",
                        "✓ Mutual TLS (mTLS) cryptographic handshakes applied across 4 service meshes.",
                        "✓ Compliance rating: 100% CIS Benchmark passed."
                      ]);
                    }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-electric-600 to-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Run Security Audit
                  </button>
                </div>

                <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300">
                  <div className="space-y-1.5">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="text-neutral-300 leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Callout: Enroll to build this hands-on */}
          <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-electric-600/10 via-cyan-500/15 to-accent-lime/10 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-mono">
                <strong>Want to build these exact autonomous systems in live campus labs?</strong> Every student codes directly in production-grade repositories.
              </p>
            </div>

            <button
              onClick={() => {
                document.querySelector('#upcoming-workshops')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-navy-950 font-headline font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              Explore Live Cohorts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
