<template>
    <button class="editor__button" type="button">{{ title }}</button>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
