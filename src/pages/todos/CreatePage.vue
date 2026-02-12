<template>
<div class="container">
    <h2>Create Todo</h2>
    <TodoCreateForm />
</div>
</template>
<script>
import TodoCreateForm from '@/components/features/TodoCreateForm.vue';

export default {
    components: {
        TodoCreateForm
    },
}
</script>
