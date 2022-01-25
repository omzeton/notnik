<template>
    <aside class="submenu">
        <NoteEntry v-for="note in notes" :name="note.body" :key="note._id" :id="note._id" />
    </aside>
</template>

<script>
import NoteEntry from "./NoteEntry";

export default {
    components: {
        NoteEntry,
    },
    mounted() {
        if (!this.notes.length) this.$store.dispatch("notes/FETCH_ALL_NOTES");
    },
    computed: {
        notes() {
            return this.$store.getters["notes/GET_NOTES"];
        },
    },
};
</script>
