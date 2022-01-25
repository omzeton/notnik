<template>
    <div class="editor__nav editor__nav--top">
        <EditorNavButton title="H1" />
        <EditorNavButton title="H2" />
        <EditorNavButton title="H3" />
        <EditorNavButton title="Blockquote" />
        <EditorNavButton title="UL" />
        <EditorNavButton title="OL" />
        <EditorNavButton title="Code" />
        <EditorNavButton title="Bold" />
        <EditorNavButton title="Italic" />
        <EditorNavButton title="Underline" />
    </div>
</template>

<script>
import EditorNavButton from "./EditorNavButton";

export default {
    components: {
        EditorNavButton,
    },
};
</script>
