<template>
    <transition name="fade">
        <div v-if="errors.length" class="errors">
            <p v-for="(error, index) in errors" :key="index" class="errors__subheader">{{ error }}</p>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        errors: Array,
    },
};
</script>
