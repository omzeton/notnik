<template>
    <div class="full-entry__markdown-wrapper">
        <VueMarkdown :source="body" />
    </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

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
};
</script>
