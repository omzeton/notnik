<template>
    <div class="full-entry">
        <div class="full-entry__wrapper">
            <Markdown v-if="markdownMode" :body="noteBody" />
            <Codemirror v-else :body="noteBody" />
        </div>
    </div>
</template>

<script>
import Codemirror from "./Codemirror";
import Markdown from "./Markdown";

export default {
    components: {
        Codemirror,
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
