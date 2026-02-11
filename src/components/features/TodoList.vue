<template>

<div
    class="mt-2 card"
    v-for="(todo, index) in todos"
    :key="todo.id"
>
    <div
        class="p-2 card-body d-flex align-items-center"
        style="cursor:pointer"
        @click="moveToPage(todo.id)"
    >
        <div class="form-check flex-grow-1">
            <input
                class="form-check-input"
                type="checkbox"
                :checked="todo.completed"
                @change="toggleTodo(index, $event)"
                @click.stop
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
                @click.stop="deleteTodo(index)"
            >
            Delete
        </button>
        </div>
    </div>
</div>


</template>

<script>
import { useRouter } from 'vue-router';
export default {
    props: {
        todos: {
            type: Array,
            requied: true
        }
    },
    emits: ['toggle-todo','delete-todo'],
    setup(props, {emit}){
        const router = useRouter();
        const toggleTodo = (index, event)=> {
            emit('toggle-todo',index, event.target.checked)
        }
        const deleteTodo = (index)=> {
            emit('delete-todo',index)
        }
        const moveToPage = (todoId) =>{
            //console.log(todoId)
            // router.push('/todos/'+ todoId);
            router.push({
                name: 'todo',
                params: {
                    id: todoId
                }
            })
        }
        return {
            toggleTodo,
            deleteTodo,
            moveToPage
        }
    }
}
</script>

<style scoped lang="scss">
.todo {
    color: gray;
    text-decoration: line-through;
}

</style>
