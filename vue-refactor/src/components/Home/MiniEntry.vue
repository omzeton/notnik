<template>
    <div class="mini-card" @click="openEntry">
        <div class="mini-card__image">
            <img src="/assets/img.jpg" />
        </div>
        <div class="mini-card__description">
            <p class="mini-card__header">{{ name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: [String],
            default: '',
        },
    },
    methods: {
        openEntry() {
            this.$store.dispatch('OPEN_OLD_ENTRY');
        },
    },
};
</script>

<style lang="scss">
.mini-card {
    width: 200px;
    height: 100px;
    overflow: hidden;
    background-color: $bla2;
    border-radius: 6px;
    display: flex;
    margin: 0 32px;
    cursor: pointer;
    &__image {
        width: 80px;
        height: 100%;
        overflow: hidden;
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    &__description {
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__header {
        color: $w;
    }
}
</style>
