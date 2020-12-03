<template>
    <div class="mini-card" @click="openEntry">
        <div class="mini-card__image">
            <img src="/assets/img.jpg" />
        </div>
        <div class="mini-card__description">
            <div class="mini-card__delete" @click="deleteEntry" />
            <h2 class="mini-card__title">{{ data.title }}</h2>
            <h3 class="mini-card__date">{{ data.date }}</h3>
            <div class="mini-card__body">{{ entryBody }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: [Object],
            default: () => {},
        },
    },
    computed: {
        entryBody() {
            const appendix = this.data.body.length <= 61 ? '' : '...';
            return this.data.body.slice(0, 61) + appendix;
        },
    },
    methods: {
        openEntry() {
            this.$store.dispatch('OPEN_OLD_ENTRY', { id: this.data._id });
        },
        deleteEntry() {
            console.log('test');
        },
    },
};
</script>

<style lang="scss">
.mini-card {
    width: 480px;
    height: 200px;
    overflow: hidden;
    background-color: $bla1;
    border-radius: 3px;
    display: flex;
    cursor: pointer;
    box-shadow: 0 0 40px -20px rgba(0, 0, 0, 1);
    transition: background-color 0.3s ease-out;
    &:hover {
        background-color: $bla2;
    }
    &__image {
        width: 160px;
        height: 100%;
        overflow: hidden;
        position: relative;
        &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: #000;
            opacity: 0.5;
            mix-blend-mode: color;
            transition: opacity 0.2s linear;
        }
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    &__description {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        box-sizing: border-box;
        padding: 16px;
        color: $w;
    }
    &__title {
        color: $w;
        font-family: $bold;
        font-size: 20px;
        outline: none;
        white-space: nowrap;
    }
    &__date {
        margin-top: -10px;
        margin-bottom: 32px;
        font-family: $light;
        color: $w2;
        font-size: 12px;
    }
    &__body {
        font-family: $light;
    }
}
</style>
