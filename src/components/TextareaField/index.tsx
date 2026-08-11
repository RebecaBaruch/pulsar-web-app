import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";

interface TextareaFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  rows?: number;
  required?: boolean;
  className?: string;
  enableRichText?: boolean; // Permite desativar a barra e o Enter inteligente se quiser em algum campo específico
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  maxLength = 500,
  rows = 4,
  required,
  className = "",
  enableRichText = true,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auxiliar para envolver ou inserir formatação (Negrito, Itálico, Sublinhado) na seleção do cursor
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = "";
    let newCursorPos = start;

    if (selectedText.length > 0) {
      newText =
        value.substring(0, start) +
        prefix +
        selectedText +
        suffix +
        value.substring(end);
      newCursorPos = end + prefix.length + suffix.length;
    } else {
      newText =
        value.substring(0, start) + prefix + suffix + value.substring(end);
      newCursorPos = start + prefix.length;
    }

    if (!maxLength || newText.length <= maxLength) {
      onChange(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  // Alterna/insere o Bullet "• " na linha atual
  const handleToggleBullet = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const currentLine = value.substring(lineStart, start);

    if (currentLine.startsWith("• ")) {
      // Se já tiver bullet, remove
      const newText =
        value.substring(0, lineStart) + value.substring(lineStart + 2);
      onChange(newText);
    } else {
      // Adiciona o bullet no início da linha
      const newText =
        value.substring(0, lineStart) + "• " + value.substring(lineStart);
      onChange(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 2, start + 2);
      }, 0);
    }
  };

  // Intercepta a tecla Enter para criar uma nova linha com "• " automaticamente
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!enableRichText) return;

    if (e.key === "Enter") {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const currentLine = value.substring(lineStart, start);

      if (currentLine.startsWith("• ")) {
        // Se a linha tiver APENAS o "• ", remove e dá Enter para sair da lista
        if (currentLine.trim() === "•") {
          e.preventDefault();
          const newText =
            value.substring(0, lineStart) + value.substring(start);
          onChange(newText);
          return;
        }

        // Caso contrário, cria a nova linha já iniciando com "• "
        e.preventDefault();
        const newText =
          value.substring(0, start) + "\n• " + value.substring(start);
        onChange(newText);

        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + 3, start + 3);
        }, 0);
      }
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-medium mb-2 text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Container pai: controla a borda azul suave quando algo dentro ganha foco */}
      <div className="border border-gray-200 focus-within:border-blue-500 rounded bg-blue-lightest overflow-hidden transition-colors">
        {/* Toolbar superior */}
        {enableRichText && (
          <div className="flex items-center gap-1 px-3 py-1.5 border-b border-gray-200/80 bg-white/50">
            <button
              type="button"
              title="Negrito"
              onClick={() => insertFormatting("**", "**")}
              className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 transition-colors text-xs cursor-pointer focus:outline-none"
            >
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button
              type="button"
              title="Itálico"
              onClick={() => insertFormatting("*", "*")}
              className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 transition-colors text-xs cursor-pointer focus:outline-none"
            >
              <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
              type="button"
              title="Sublinhado"
              onClick={() => insertFormatting("<u>", "</u>")}
              className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 transition-colors text-xs cursor-pointer focus:outline-none"
            >
              <FontAwesomeIcon icon={faUnderline} />
            </button>
            <div className="h-3 w-[1px] bg-gray-300 mx-1" />
            <button
              type="button"
              title="Lista com marcadores"
              onClick={handleToggleBullet}
              className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 transition-colors text-xs cursor-pointer focus:outline-none"
            >
              <FontAwesomeIcon icon={faListUl} />
            </button>
          </div>
        )}

        {/* Área de texto sem NENHUM outline ou ring do navegador */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            rows={rows}
            maxLength={maxLength}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{ outline: "none" }} // Garante que nenhum CSS global ou do navegador aplique o outline azul
            className="w-full px-3 py-2 text-xs border-none outline-none focus:outline-none focus:ring-0 focus:border-none resize-none text-gray-800 placeholder-gray-400 bg-transparent shadow-none"
          />
          {maxLength && (
            <span className="absolute bottom-2.5 right-3 text-[10px] text-gray-400 font-mono pointer-events-none select-none bg-blue-lightest/80 px-1 rounded">
              {value.length} / {maxLength}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextareaField;
