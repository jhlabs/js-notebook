import { Box } from "@chakra-ui/react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editor = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getEditorValue, monacoEditor) => {
    editor.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getEditorValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const unformatted = editor.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    editor.current.setValue(formatted);
  };

  return (
    <Box width="100%" height="100%">
      {/* <button onClick={onFormatClick}>Format</button> */}
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="light"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </Box>
  );
};
