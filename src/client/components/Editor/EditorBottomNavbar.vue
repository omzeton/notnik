<template>
    <div class="editor__nav editor__nav--bottom">
        <EditorNavButton icon="save" />
        <EditorNavButton icon="delete" />
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
