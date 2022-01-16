<template>
    <div class="list">
        <div class="list__grid">
            <Note v-for="note in notes" :key="note._id" :body="note.body" :date="note.date" :uId="note.uId" :id="note._id" />
        </div>
    </div>
</template>

<script>
import Note from "./Note";

export default {
    components: {
        Note,
    },
    mounted() {
        this.$store.dispatch("notes/SET_ACTIVE_NOTE_ID", { id: "" });
        if (!this.notes.length) this.$store.dispatch("notes/FETCH_ALL_NOTES");
    },
    computed: {
        notes() {
            return this.$store.getters["notes/GET_NOTES"];
        },
    },
};
</script>
