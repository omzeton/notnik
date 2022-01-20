<template>
    <li class="submenu__list-item" @click="setActiveID">
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
        id: {
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
        setActiveID() {
            this.$store.dispatch("notes/SET_ACTIVE_NOTE_ID", { id: this.id });
        },
    },
};
</script>
