<template>
    <div class="editor">
        <EditorBottomNavbar />
        <div class="editor__markdown">
            <VueMarkdown :source="body" />
        </div>
        <EditorTopNavbar />
    </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import Prism from "prismjs";

import EditorBottomNavbar from "./EditorBottomNavbar.vue";
import EditorTopNavbar from "./EditorTopNavbar.vue";

import "prismjs/components/prism-javascript";

export default {
    components: {
        VueMarkdown,
        EditorBottomNavbar,
        EditorTopNavbar,
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
