<template>
    <fragment>
        <button v-if="value" :class="`ql-${name}`" v-bind:value="value"></button>
        <button v-else :class="`ql-${name}`"></button>
    </fragment>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: false,
            default: "",
        },
    },
};
</script>
