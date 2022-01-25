<template>
    <div class="full-entry">
        <div class="full-entry__wrapper">
            <Markdown v-if="markdownMode" :body="noteBody" />
            <CodeMirror v-else :body="noteBody" />
        </div>
    </div>
</template>

<script>
import CodeMirror from "./CodeMirror";
import Markdown from "./Markdown";

export default {
    components: {
        CodeMirror,
        Markdown,
    },
    computed: {
        noteBody() {
            if (this.$route.query.new) return "";
            const allNotes = this.$store.getters["notes/GET_NOTES"];
            const activeNote = allNotes.find(note => note._id === this.$route.params.id);
            if (activeNote) {
                return activeNote.body;
            }
            return "";
        },
        markdownMode() {
            return this.$store.getters["ui/GET_IS_MARKDOWN_MODE"];
        },
    },
};
</script>
