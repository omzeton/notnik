<template>
    <div class="full-entry">
        <p class="full-entry__p">
            {{ activeNote.body }}
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        activeNote() {
            const allNotes = this.$store.getters["notes/GET_NOTES"];
            return allNotes.find(note => note._id === this.$route.params.id);
        },
    },
};
</script>

<style lang="scss" scoped>
.full-entry {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 11em 1fr;
    &__p {
        color: $w;
    }
}
</style>
