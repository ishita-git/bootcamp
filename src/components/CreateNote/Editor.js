import React from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import { useEffect, useRef, useState } from "react";

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
});

const plugins = exampleSetup({ schema: mySchema });

export function Editor() {
  const editorRef = useRef(null);
  const editorDom = useRef(null);
  const [htmlData, setHtmlData] = useState("");

  useEffect(() => {
    if (editorRef.current) return;
    const doc = DOMParser.fromSchema(mySchema).parse(editorDom.current);
    editorRef.current = new EditorView(editorDom.current, {
      state: EditorState.create({ doc, plugins })
    });
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    const editorState = editorRef.current.state;
    const doc = editorState.doc;
    // console.log(editorRef.current.dom);
    setHtmlData(editorRef.current.dom);
  }, [editorRef.current]);

  const extractContent = (htmlData) =>{
    var span = document.createElement('span');
    span.innerHTML = htmlData;
    return span.textContent || span.innerText;
  }
  const fetchData = async () => {
    try {
      const formdata = new FormData();
     extractContent(htmlData);
      formdata.append("description", htmlData );
      console.log(formdata)
  
      let rawdata = await fetch("http://localhost:8080/api/note/create-note", {
        method: "POST",
        headers: {},
        body: formdata,
      });
      let data = await rawdata.json();
  
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleExtractHtml = () => {
    fetchData();
    console.log(htmlData);
  };

  return (
    <div>
      <div id="editor" ref={editorDom} />
      <button onClick={handleExtractHtml}>Extract HTML</button>
    </div>
  );
}
