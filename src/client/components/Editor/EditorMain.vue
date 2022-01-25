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
            const activeNote = this.$store.getters["notes/GET_CURRENT_ACTIVE_NOTE"];
            if (activeNote) return activeNote.body;
            return "Please select note to edit";
        },
    },
    methods: {
        onInput(event) {
            console.log({ event });
            console.log(event.target.innerText);
            console.log("input fired");
        },
    },
};
</script>
