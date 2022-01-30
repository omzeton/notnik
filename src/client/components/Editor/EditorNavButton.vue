<template>
    <button
        editor__button
        class="editor__button"
        :class="{
            [`editor__button--${icon}`]: true,
            'editor__button--active': isActive,
        }"
        type="button"
        @click="onClick"
    ></button>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
    computed: {
        isActive() {
            return this.$store.getters["notes/IS_EDITING_A_NOTE"];
        },
    },
    methods: {
        onClick() {
            if (!this.icon || !this.isActive) return;
            let actionToDispatch = "";
            switch (this.icon) {
                case "save":
                    actionToDispatch = "notes/SAVE_CURRENT_CHANGES";
                    break;
                case "delete":
                    actionToDispatch = "ui/TOGGLE_DELETION_MODAL";
                    break;
            }
            this.$store.dispatch(actionToDispatch);
        },
    },
};
</script>
