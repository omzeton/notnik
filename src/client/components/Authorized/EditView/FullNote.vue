<template>
    <div class="full-entry">
        <div class="full-entry__wrapper">
            <Markdown v-if="markdownMode" :body="noteBody" />
            <Codemirror v-else :body="noteBody" />
        </div>
    </div>
</template>

<script>
import Codemirror from "./Codemirror";
import Markdown from "./Markdown";

export default {
    components: {
        Codemirror,
        Markdown,
    },
    computed: {
        noteBody() {
            if (this.$route.query.new) return "";
            const allNotes = this.$store.getters["notes/GET_NOTES"];
            const activeNote = allNotes.find(note => note._id === this.$route.params.id);
            return activeNote.body;
        },
        markdownMode() {
            return this.$store.getters["ui/GET_IS_MARKDOWN_MODE"];
        },
    },
};
</script>

<style lang="scss" scoped>
[contenteditable] {
    outline: 0px solid transparent;
}

.full-entry {
    position: absolute;
    width: calc(100% - 3em);
    height: calc(100vh - 1.5em);
    right: 0;
    top: 0;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 11em 1fr;
    background-color: $bla2;
    overflow-x: hidden;
    padding: 3em;
    @media screen and (min-width: 900px) {
        padding: 6em;
    }
    @media screen and (min-width: 1200px) {
        padding: 9em;
    }
    @media screen and (min-width: 1400px) {
        padding: 9em 12em;
    }
    @media screen and (min-width: 1800px) {
        padding: 9em 20em;
    }
    @media screen and (min-width: 2200px) {
        padding: 9em 25em;
    }
    &::-webkit-scrollbar {
        height: 1em;
        width: 1em;
    }

    &::-webkit-scrollbar-track {
        background: $bla1;
    }
    &::-webkit-scrollbar-thumb {
        background: $bla3;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: $bla4;
    }
    &::-webkit-scrollbar-thumb:active {
        background: $bla2;
    }
    &__wrapper {
        position: relative;
        height: fit-content;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    &__title {
        color: $w;
        font-family: "Baloo", cursive;
        font-size: 5rem;
        margin-bottom: 1em;
        line-height: 5rem;
    }
    &__markdown-wrapper {
        color: $w2;
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        line-height: 3rem;
        padding-bottom: 20em;
    }
    &__codemirror-wrapper {
        width: 100%;
        max-width: 100%;
        background-color: rebeccapurple;
    }
}
</style>
