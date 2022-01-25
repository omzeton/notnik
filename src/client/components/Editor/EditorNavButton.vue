<template>
    <button class="editor__button" type="button" @click="onClick">{{ title }}</button>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        onClick() {
            let actionToDispatch = "";
            switch (this.title) {
                case "Save":
                    actionToDispatch = "notes/SAVE_CURRENT_CHANGES";
                    break;
                case "Delete":
                    actionToDispatch = "notes/DELETE_CURRENT_NOTE";
                    break;
            }
            if (actionToDispatch) this.$store.dispatch(actionToDispatch);
        },
    },
};
</script>
