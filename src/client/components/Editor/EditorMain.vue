<template>
    <div class="editor__markdown">
        <quill-editor class="editor__main" ref="quillEditor" v-model="content" :options="editorOptions" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            quill: null,
            editorOptions: {
                theme: "snow",
                modules: {
                    toolbar: "#quillToolbar",
                },
            },
        };
    },
    computed: {
        content: {
            get() {
                return this.$store.getters["notes/GET_ACTIVE_NOTE_BODY"];
            },
            set(body) {
                this.$store.dispatch("notes/UPDATE_ACTIVE_NOTE_BODY", { body });
            },
        },
    },
    mounted() {
        document.querySelector(".ql-editor").setAttribute("spellcheck", false);
    },
};
</script>
