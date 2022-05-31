import { Component } from "react";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { StyledCkBox } from "./ckeditor.style";

class CKEditorWrapper extends Component {
  render() {
    return (
      <StyledCkBox>
        <CKEditor editor={ClassicEditor} {...this.props} />
      </StyledCkBox>
    );
  }
}

export default CKEditorWrapper;
