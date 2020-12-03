<template>
    <div class="home-list">
        <div class="home-list__header">
            <h2 class="home-list__header-text">My entries</h2>
        </div>
        <div class="home-list__divider" />
        <div class="home-list__entry-list">
            <div class="home-list__wrapper">
                <MiniEntry v-for="entry in entries" :key="entry._id" :name="entry.title" />
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
    padding: 32px 64px;
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
        height: calc(100% - 150px);
        overflow-y: hidden;
        overflow-x: scroll;
    }
    &__wrapper {
        height: 100%;
        width: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-template-rows: repeat(auto-fill, minmax(140px, 1fr));
        grid-auto-flow: column;
    }
}
</style>
