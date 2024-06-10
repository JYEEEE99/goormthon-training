import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
interface TextEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",

  "color",
  "background",

  "image",
  "blockquote",
  "code-block",
];

const modules = {
  toolbar: [
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["italic", "underline", "strike"],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ["image", "blockquote", "code-block"],
  ],
};

const TextEditor = ({ color, value, setValue }: TextEditorProps) => {
  return (
    <Container noteColor={color}>
      <ReactQuill
        formats={formats}
        modules={modules}
        value={value}
        onChange={setValue}
        placeholder="글을 작성하시용"
      />
    </Container>
  );
};

export default TextEditor;

const Container = styled.div<{ noteColor: string }>`
  .ql-editor {
    height: 200px;
    background-color: ${({ noteColor }) => noteColor};
  }
`;
