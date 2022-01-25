<template>
    <li class="submenu__list-item" @click="emitClick">
        <p>{{ shortenedName }}</p>
    </li>
</template>

<script>
import { htmlToText } from "html-to-text";

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    computed: {
        shortenedName() {
            const text = htmlToText(this.name);
            return text.slice(0, 30);
        },
    },
    methods: {
        emitClick() {
            this.$emit("click");
        },
    },
};
</script>
