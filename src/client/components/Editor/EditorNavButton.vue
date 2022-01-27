<template>
    <button :class="`editor__button editor__button--${icon}`" type="button" @click="onClick"></button>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
    methods: {
        onClick() {
            if (!this.icon) return;
            let actionToDispatch = "";
            switch (this.icon) {
                case "save":
                    actionToDispatch = "notes/SAVE_CURRENT_CHANGES";
                    break;
                case "delete":
                    actionToDispatch = "notes/DELETE_CURRENT_NOTE";
                    break;
            }
            this.$store.dispatch(actionToDispatch);
        },
    },
};
</script>
