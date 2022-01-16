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
