<template>
    <div class="list">
        <Grid />
    </div>
</template>

<script>
import Note from "./Note";
import Grid from "./Grid";

export default {
    components: {
        Note,
        Grid,
    },
    computed: {
        notes() {
            return this.$store.getters["notes/GET_NOTES"];
        },
    },
    mounted() {
        this.$store.dispatch("notes/SET_ACTIVE_NOTE_ID", { id: "" });
    },
};
</script>

<style lang="scss">
.list {
    position: absolute;
    width: calc(100% - 2em);
    height: 100%;
    right: 0;
    top: 0;
    background-color: $bla3;
    background-image: url("@assets/christmas-dark.png");
    background-repeat: repeat;
    background-size: 15em;
    box-sizing: border-box;
    padding: 1em 1em 2.5em 1em;
    @media (min-width: $md) {
        width: calc(100% - 3em);
    }
}
</style>
