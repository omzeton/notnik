<template>
    <div class="full-entry__markdown-wrapper">
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
    props: {
        body: {
            type: String,
            default: "",
        },
    },
    mounted() {
        Prism.highlightAll();
    },
};
</script>
