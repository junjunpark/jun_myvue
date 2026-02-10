<script>
export default {
    props: {
        todos: {
            type: Array,
            requied: true
        }
    },
    emits: ['toggle-todo','delete-todo'],
    setup(props, {emit}){
        const toggleTodo = (index)=> {
            emit('toggle-todo',index)
        }
        const deleteTodo = (index)=> {
            emit('delete-todo',index)
        }
        return {
            toggleTodo,
            deleteTodo
        }
    }
}
</script>
<template>

<div
    class="mt-2 card"
    v-for="(todo, index) in todos"
    :key="todo.id"
>
    <div class="p-2 card-body d-flex align-items-center">
        <div class="form-check flex-grow-1">
            <input
                class="form-check-input"
                type="checkbox"
                :checked="todo.completed"
                @change="toggleTodo(index)"
            >
            <!-- <input
                class="form-check-input"
                type="checkbox"
                v-model="todo.completed"
            > -->
            <!-- <label
                class="form-check-label"
                :style="todo.completed ? todoStyle : {} "
            > {{ todo.subject }}</label> -->
            <label
                class="form-check-label"
                :class="{ todo : todo.completed }"
            > {{ todo.subject }}</label>
        </div>
        <div>
            <button
                class="btn btn-danger btn-sm"
                @click="deleteTodo(index)"
            >
            Delete
        </button>
        </div>
    </div>
</div>


</template>
<style scoped lang="scss">
.todo {
    color: gray;
    text-decoration: line-through;
}

</style>
