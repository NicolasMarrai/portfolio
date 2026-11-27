"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type TerminalLine = { cmd: string; out: string };

/**
 * Terminal do hero: digita cada comando, mostra a resposta e passa para o próximo.
 * No fim, fica um prompt vazio com o cursor piscando.
 * Uma cópia invisível do conteúdo completo reserva a altura (sem "pulo" de layout).
 * Com "reduzir movimento", mostra tudo de uma vez.
 */
export function HeroTerminal({ lines, title }: { lines: TerminalLine[]; title: string }) {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0); // comando atual
  const [chars, setChars] = useState(0); // caracteres digitados do comando atual
  const [showOut, setShowOut] = useState(false);

  const done = reduce || line >= lines.length;

  useEffect(() => {
    if (done) return;
    const cmd = lines[line].cmd;

    let id: ReturnType<typeof setTimeout>;
    if (chars < cmd.length) {
      id = setTimeout(() => setChars((c) => c + 1), chars === 0 ? 450 : 55);
    } else if (!showOut) {
      id = setTimeout(() => setShowOut(true), 250);
    } else {
      id = setTimeout(() => {
        setLine((l) => l + 1);
        setChars(0);
        setShowOut(false);
      }, 700);
    }
    return () => clearTimeout(id);
  }, [line, chars, showOut, done, lines]);

  const full = (
    <>
      {lines.map((l, i) => (
        <Pair key={i} cmd={l.cmd} out={l.out} />
      ))}
      <Prompt>
        <span className="caret" />
      </Prompt>
    </>
  );

  return (
    <div className="terminal-dark panel overflow-hidden shadow-lg shadow-slate-900/10">
      <p className="border-b border-line px-4 py-2 font-mono text-xs text-fg-muted">{title}</p>

      {/* Leitores de tela recebem o conteúdo completo, sem animação */}
      <div className="sr-only">
        {lines.map((l) => `$ ${l.cmd} → ${l.out}`).join(". ")}
      </div>

      <div aria-hidden className="relative px-4 py-4 font-mono text-sm leading-relaxed sm:text-[0.95rem]">
        {/* reserva a altura final */}
        <div className="invisible">{full}</div>

        <div className="absolute inset-0 px-4 py-4">
          {done ? (
            full
          ) : (
            <>
              {lines.slice(0, line).map((l, i) => (
                <Pair key={i} cmd={l.cmd} out={l.out} />
              ))}
              <Prompt>
                {lines[line].cmd.slice(0, chars)}
                {!showOut ? <span className="caret" /> : null}
              </Prompt>
              {showOut ? <Output>{lines[line].out}</Output> : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p className="whitespace-pre-wrap text-fg">
      <span className="text-lime">$ </span>
      {children}
    </p>
  );
}

function Output({ children }: { children: string }) {
  return (
    <p className="mb-2 whitespace-pre-wrap text-fg-muted">
      <span className="text-cyan">&gt; </span>
      {children}
    </p>
  );
}

function Pair({ cmd, out }: TerminalLine) {
  return (
    <>
      <Prompt>{cmd}</Prompt>
      <Output>{out}</Output>
    </>
  );
}
