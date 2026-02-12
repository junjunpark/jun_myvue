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
        <div class="flex-grow-1">
            <input
                type="checkbox"
                :checked="todo.completed"
                @change="toggleTodo(index, $event)"
                @click.stop
            >
            <span
                class="ms-2"
                :class="{ todo : todo.completed }"
            > {{ todo.subject }}</span>
        </div>
        <div>
            <button
                class="btn btn-danger btn-sm"
                @click.stop="openModal(todo.id)"
            >
            Delete
            </button>
        </div>
    </div>
</div>

<DeleteModal
  v-if="showModal"
  @close="closeModal"
  @confirm="deleteTodo"
/>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import DeleteModal from '@/components/pages/todos/DeleteModal.vue'

export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    components : {
        DeleteModal
    },
    emits: ['toggle-todo','delete-todo'],
    setup(props, {emit}){
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);

        const toggleTodo = (index, event)=> {
            emit('toggle-todo', index, event.target.checked)
        }

        const openModal = (id)=>{
            todoDeleteId.value = id;
            showModal.value = true;
        }

        const closeModal = ()=>{
            showModal.value = false;
        }

        const deleteTodo = ()=> {
            emit('delete-todo', todoDeleteId.value);
            showModal.value = false;
        }

        const moveToPage = (todoId) =>{
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
            moveToPage,
            showModal,
            openModal,
            closeModal
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
