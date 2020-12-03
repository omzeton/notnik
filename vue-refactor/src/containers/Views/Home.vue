<template>
    <div class="home-list">
        <div class="home-list__entry-list">
            <div class="home-list__wrapper">
                <MiniEntry v-for="entry in entries" :key="entry._id" :data="entry" />
            </div>
        </div>
    </div>
</template>

<script>
import MiniEntry from '../../components/Home/MiniEntry';

export default {
    components: {
        MiniEntry,
    },
    computed: {
        entries() {
            return this.$store.getters.GET_ENTRIES;
        },
    },
    mounted() {
        this.$store.dispatch('FETCH_ENTRIES');
    },
};
</script>

<style lang="scss">
.home-list {
    width: 100%;
    height: 100%;
    background-color: $bla3;
    background-image: url('/assets/christmas-dark.png');
    background-repeat: repeat;
    background-size: 15em;
    background-position: auto;
    box-sizing: border-box;
    &__header {
        width: 100%;
        height: 90px;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: $bold;
        color: $w;
        margin-bottom: 12px;
    }
    &__divider {
        width: 100%;
        height: 1px;
        background-color: $w;
        margin-bottom: 24px;
    }
    &__entry-list {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        overflow-x: scroll;
    }
    &__wrapper {
        height: 100%;
        width: auto;
        display: grid;
        grid-template-rows: repeat(auto-fill, minmax(252px, 252px));
        grid-column-gap: 24px;
        grid-row-gap: 0px;
        grid-auto-flow: column;
        margin-left: 32px;
        margin-top: 32px;
    }
}
</style>
