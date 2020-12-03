<template>
    <div id="app">
        <Layout />
    </div>
</template>

<script>
    import Layout from './containers/Layout';

    export default {
        name: 'App',
        components: {
            Layout,
        },
        mounted() {
            this.$store.dispatch('INIT_APP');
        },
    };
</script>

<style lang="scss">
::selection {
    color: $w;
    background-color: $or;
}
::-webkit-scrollbar {
    height: 0.7em;
    width: 0.7em;
}
::-webkit-scrollbar-track {
    background: $bla1;
}
::-webkit-scrollbar-thumb {
    background: $bla4;
}
::-webkit-scrollbar-thumb:hover {
    background: $bla3;
}

body {
    margin: 0;
    padding: 0;
    background-color: $bla1;
}

#app {
    height: 100vh;
    width: 100vw;
}
</style>
