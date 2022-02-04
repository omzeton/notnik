<template>
    <li class="submenu__list-item" :class="{ 'is-active': isActive }" @click="chooseNote">
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
        id: {
            type: String,
            required: true,
        },
    },
    computed: {
        shortenedName() {
            const text = htmlToText(this.name);
            return text.slice(0, 30);
        },
        isActive() {
            return this.id === this.$store.getters["notes/GET_ACTIVE_NOTE_ID"];
        },
    },
    methods: {
        chooseNote() {
            this.$store.dispatch("notes/MAKE_NOTE_ACTIVE", { id: this.id });
        },
    },
};
</script>
