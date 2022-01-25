<template>
    <div class="editor__nav editor__nav--bottom">
        <EditorNavButton title="Save" />
        <EditorNavButton title="Delete" />
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
