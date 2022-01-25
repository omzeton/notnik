import Quill, { QuillOptionsStatic } from "quill";

const options: QuillOptionsStatic = {
    modules: {
        toolbar: {
            container: "#quillToolbar",
        },
    },
};

const initQuill = (id: Element) => new Quill(id, options);

export default initQuill;
