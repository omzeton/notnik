<template>
    <transition name="swing-fade">
        <div v-if="errors.length" class="errors">
            <p class="errors__header">Authentication failed</p>
            <p v-for="(error, index) in errors" :key="index" class="errors__subheader">{{ error }}</p>
        </div>
    </transition>
</template>

<script>
import validation from "@/mixins/validation";
export default {
    props: {
        errors: Array,
    },
};
</script>
