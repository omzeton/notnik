<template>
    <router-link
        :to="route"
        class="nav-button"
    >
        <img
            :src="img"
            :alt="name"
        >
    </router-link>
</template>

<script>
    export default {
        props: {
            name: {
                type: [String],
                default: '',
            },
            img: {
                type: [String],
                default: '',
            },
            route: {
                type: [String],
                default: '',
            },
        },
    };
</script>

<style lang="scss">
.nav-button {
    width: 48px;
    height: 48px;
    background-color: $bla2;
    margin: 24px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
        width: 40%;
        height: 40%;
    }
    &:hover {
        background-color: $bla3;
    }
    &:active {
        background-color: $bla1;
    }
}
</style>
