<template>
    <div class="list">
        <Grid />
        <StatusBar />
    </div>
</template>

<script>
import Note from "./Note";
import StatusBar from "./StatusBar";
import Grid from "./Grid";

export default {
    components: {
        Note,
        StatusBar,
        Grid,
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
    position: absolute;
    width: calc(100% - 3em);
    height: 100%;
    right: 0;
    top: 0;
    background-color: $bla3;
    background-image: url("@assets/christmas-dark.png");
    background-repeat: repeat;
    background-size: 15em;
    box-sizing: border-box;
    padding: 1em 1em 2.5em 1em;
}
</style>
