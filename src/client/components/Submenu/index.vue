<template>
    <aside class="submenu">
        <NoteEntry
            v-for="note in notes"
            :name="note.body"
            :key="note._id"
            :id="note._id"
            @click="chooseNote(note._id)"
        />
    </aside>
</template>

<script>
import NoteEntry from "./NoteEntry";

export default {
    components: {
        NoteEntry,
    },
    computed: {
        notes() {
            return this.$store.getters["notes/GET_ALL_USER_NOTES"];
        },
    },
    methods: {
        chooseNote(id) {
            this.$store.dispatch("notes/MAKE_NOTE_ACTIVE", { id });
        },
    },
};
</script>
