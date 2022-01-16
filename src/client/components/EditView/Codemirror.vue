<template>
    <div class="full-entry__codemirror-wrapper">
        <textarea v-if="!codemirrorActive" ref="codemirror" v-model="body" />
    </div>
</template>

<script>
import * as CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

export default {
    props: {
        body: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            codemirrorActive: false,
        };
    },
    mounted() {
        if (!this.codemirrorActive) {
            CodeMirror.fromTextArea(this.$refs.codemirror, {
                theme: "dracula",
                lineNumbers: true,
                lineWrapping: true,
            }).on("change", cm => {
                const body = cm.getValue();
                this.$store.dispatch("notes/UPDATE_ACTIVE_NOTE", { body });
            });
            this.codemirrorActive = true;
        }
    },
};
</script>
