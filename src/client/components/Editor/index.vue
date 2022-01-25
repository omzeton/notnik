<template>
    <div class="editor">
        <VueMarkdown :source="body" />
    </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";

export default {
    components: {
        VueMarkdown,
    },
    computed: {
        noteID() {
            return this.$store.getters["notes/GET_ACTIVE_ID"];
        },
        body() {
            const notes = this.$store.getters["notes/GET_NOTES"];
            const currentActiveNote = notes.find(note => note._id === this.noteID);
            if (currentActiveNote) {
                Prism.highlightAll();
                return currentActiveNote.body;
            }
            return "Please select note to edit";
        },
    },
};
</script>
