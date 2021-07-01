<template>
    <div class="status-bar">
        <div class="status-bar__counts">
            <p>Entries: {{ amountOfEntries }}</p>
        </div>
        <div>&nbsp;</div>
        <div class="status-bar__user">
            <p>testtest@test.com</p>
        </div>
        <div class="status-bar__timer">
            <p>01.07.2021 21:53:29</p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        amountOfEntries() {
            return this.$store.getters["notes/GET_NOTES_LENGTH"];
        },
    },
};
</script>

<style lang="scss" scoped>
.status-bar {
    position: fixed;
    bottom: 0;
    left: 3em;
    background-color: $bla3;
    width: calc(100% - 3em);
    height: 1.5em;
    display: grid;
    grid-template-columns: 5% 78% 1fr 1fr;
    box-sizing: border-box;
    &__user,
    &__counts,
    &__timer {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
            font-family: "Montserrat", sans-serif;
            font-size: 0.7rem;
            color: $w2;
            white-space: nowrap;
        }
    }
}
</style>
