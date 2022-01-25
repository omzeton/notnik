<template>
    <li class="submenu__list-item" @click="emitClick">
        <p>{{ shortenedName }}</p>
    </li>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    computed: {
        shortenedName() {
            return this.name.slice(0, 30);
        },
    },
    methods: {
        emitClick() {
            this.$emit("click");
        },
    },
};
</script>
