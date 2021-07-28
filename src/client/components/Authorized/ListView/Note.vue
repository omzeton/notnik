<template>
    <div v-if="body && id" class="grid-cell" @click="makeSelection">
        <div class="entry" :class="[isDeletingMode && 'entry--ready-to-delete']">
            <FileIcon />
            <p class="entry__title">{{ title }}</p>
        </div>
    </div>
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
        isDeletingMode() {
            return this.$store.getters["ui/GET_IS_DELETING_MODE"];
        },
    },
    methods: {
        makeSelection() {
            if (!this.isDeletingMode) {
                this.$router.push(`notnik/note/${this.id}`);
                this.$store.dispatch("notes/SET_ACTIVE_NOTE_ID", { id: this.id });
            } else {
                this.$store.dispatch("notes/DELETE_NOTE", { id: this.id });
            }
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
    &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 2px;
        box-shadow: 0px 0px 30px 35px rgba(236, 78, 32, 1);
        z-index: 0;
        opacity: 0;
        transition: opacity 0.3s ease-out;
    }
    &:hover {
        color: $bla2;
    }
    &:active {
        color: $bla3;
    }
    &--ready-to-delete {
        &:hover {
            color: #ed3902;
        }
        &::before {
            opacity: 1;
        }
    }
    svg {
        width: 60%;
        z-index: 10;
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
