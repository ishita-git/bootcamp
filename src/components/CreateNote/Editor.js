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

  const [visibility, setVisibility] = useState("public");

  function onChangeValue(event) {
    setVisibility(event.target.value);
    console.log(event.target.value);
  }

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

var getString = (function() {
  var DIV = document.createElement("div");

  if ('outerHTML' in DIV)
    return function(node) {
      return node.outerHTML;
    };

  return function(node) {
    var div = DIV.cloneNode();
    div.appendChild(node.cloneNode(true));
    return div.innerHTML;
  };

})();

  const fetchData = async () => {
    try {
      const formdata = new FormData();
      formdata.append("description", getString(htmlData));
      let rawdata = await fetch("http://localhost:8080/api/note/create-note", {
        method: "POST",
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        },
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

  };

  return (
    <div>
      <div id="editor" ref={editorDom} />     
      <div onChange={onChangeValue}>
      <button onClick={handleExtractHtml}>Publish Note</button>
      <input type="radio" value="public" name="visibility" checked={visibility === "public"} /> Public
      <input type="radio" value="private" name="visibility" checked={visibility === "private"}/> Private
    </div>
    </div>
  );
}