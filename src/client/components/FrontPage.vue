<template>
    <section class="frontpage">
        <div class="frontpage__auth-panel">
            <LoginForm />
        </div>
    </section>
</template>

<script>
import LoginForm from "./LoginForm";

export default {
    components: {
        LoginForm,
    },
};
</script>
