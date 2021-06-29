<template>
    <div class="list">
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
        this.$store.dispatch("notes/FETCH_ALL_NOTES");
    },
    computed: {
        notes() {
            return this.$store.getters["notes/GET_NOTES"];
        },
    },
};
</script>

<style lang="scss">
.list {
    background-color: var(--bla3);
    background-image: url("@assets/christmas-dark.png");
    background-repeat: repeat;
    background-size: 15em;
    box-sizing: border-box;
    padding: 1em 1em;
    display: grid;
    overflow-y: hidden;
    overflow-x: scroll;
    grid-template-rows: repeat(auto-fill, minmax(9.5em, 9.5em));
    grid-template-columns: repeat(auto-fill, minmax(30em, 30em));
    grid-auto-flow: column;
    column-gap: 1.5em;
    row-gap: 1em;
}
</style>
