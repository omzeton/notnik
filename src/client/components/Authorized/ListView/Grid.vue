<template>
    <div class="note-grid">
        <Note v-for="note in notes" :key="note._id" :body="note.body" :date="note.date" :imgUrl="note.imgUrl" :title="note.title" :uId="note.uId" :id="note._id" />
    </div>
</template>

<script>
import Note from "./Note";

export default {
    components: {
        Note,
    },
    mounted() {
        const notesAreFetched = this.$store.getters["notes/GET_NOTES_ARE_FETCHED"];
        if (!notesAreFetched) this.$store.dispatch("notes/FETCH_ALL_NOTES");
    },
    computed: {
        notes() {
            return this.$store.getters["notes/GET_NOTES"];
        },
    },
};
</script>

<style lang="scss" scoped>
.note-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(auto-fill, 10em);
    grid-template-columns: repeat(auto-fill, 10em);
}
</style>
