<template>
    <router-link v-if="body && id" :to="`notnik/note/${id}`" class="grid-cell" v-on:click.native="makeSelection">
        <div class="entry">
            <FileIcon />
            <p class="entry__title">{{ title }}</p>
        </div>
    </router-link>
</template>

<script>
import FileIcon from "@/components/Icons/FileIcon.vue";
import { getNoteTitle } from "@/utils";

export default {
    props: {
        body: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        FileIcon,
    },
    computed: {
        title() {
            return getNoteTitle(this.body);
        },
    },
    methods: {
        makeSelection() {
            this.$store.dispatch("notes/SET_ACTIVE_NOTE_ID", this.id);
        },
    },
};
</script>

<style lang="scss" scoped>
.grid-cell {
    display: flex;
    align-items: center;
    justify-content: center;
}
.entry {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $bla4;
    &:hover {
        color: $bla2;
    }
    &:active {
        color: $bla3;
    }
    svg {
        width: 60%;
    }
    &__title {
        position: absolute;
        color: $w;
        font-size: 0.8rem;
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        width: 80%;
        top: 80%;
        text-align: center;
    }
}
</style>
