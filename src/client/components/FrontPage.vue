<template>
    <section class="frontpage">
        <div class="frontpage__auth-modal">
            <AuthModal />
        </div>
    </section>
</template>

<script>
import AuthModal from "@components/AuthModal";

export default {
    components: {
        AuthModal,
    },
};
</script>
