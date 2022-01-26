<template>
    <select :class="`ql-${name}`">
        <option v-for="option in options" :key="option.value" v-bind:value="option.value" :selected="option.selected" />
    </select>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
};
</script>
