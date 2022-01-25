<template>
    <div class="editor__markdown">
        <div class="editor__main" contenteditable="true" @input="onInput($event)">
            {{ content }}
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        content() {
            return this.$store.getters["notes/GET_ACTIVE_NOTE_BODY"];
        },
    },
    methods: {
        onInput(event) {
            this.$store.dispatch("notes/UPDATE_ACTIVE_NOTE_BODY", event.target.innerText);
        },
    },
};
</script>
