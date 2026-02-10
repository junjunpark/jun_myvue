<script>
import { ref, computed } from 'vue';
import TodoForm from '@/components/features/TodoForm.vue'
import TodoList from '@/components/features/TodoList.vue'
import axios from 'axios';
export default {
    components: {
        TodoForm,
        TodoList
    },
    setup() {
        const todoStyle = {
            textDecoration : 'line-through',
            color: 'gray'
        }

        const todos = ref([]);
        const error = ref('');
        const limit = 5;
        const currentPage = ref(1);

        const numberOfPages = computed(()=>{
            return Math.ceil(todos.value.length / limit);
        })

        const paginatedTodos = computed(() => {
            const start = (currentPage.value - 1) * limit;
            const end = start + limit;
            return todos.value.slice(start, end);
        })

        const getTodos = async ()=>{
            try {
                const res = await axios.get('http://localhost:3000/todos')
                todos.value = res.data;
            } catch (err){
                console.log(err);
                error.value = 'Network Error'
            }
        }
        getTodos();

        const addTodo = async (todo) => {
            error.value = '';
            try {
                const res = await axios.post('http://localhost:3000/todos', {
                    subject: todo.subject,
                    completed: todo.completed
                })
                todos.value.push(res.data);
            } catch (err) {
                console.log(err);
                error.value = 'Network Error'
            }
        }

        const deleteTodo = async (index) => {
            error.value = '';
            // paginatedTodos의 index를 전체 todos의 index로 변환
            const actualIndex = (currentPage.value - 1) * limit + index;
            const id = todos.value[actualIndex].id;
            try {
                await axios.delete(`http://localhost:3000/todos/${id}`)
                todos.value.splice(actualIndex, 1)
            } catch(err) {
                console.log(err);
                error.value = 'Network Error'
            }
        }

        const toggleTodo = async (index) => {
            error.value = '';
            // paginatedTodos의 index를 전체 todos의 index로 변환
            const actualIndex = (currentPage.value - 1) * limit + index;
            const id = todos.value[actualIndex].id;
            try {
                await axios.patch(`http://localhost:3000/todos/${id}`, {
                    completed: !todos.value[actualIndex].completed
                })
                todos.value[actualIndex].completed = !todos.value[actualIndex].completed;
            } catch(err) {
                console.log(err);
                error.value = 'Network Error'
            }
        }

        const movePage = (page) => {
            if (page < 1 || page > numberOfPages.value) return;
            currentPage.value = page;
        }

        const searchText = ref('');
        const filteredTodos = computed(()=>{
            if(searchText.value){
                return paginatedTodos.value.filter(todo => {
                    return todo.subject.includes(searchText.value)
                })
            }
            return paginatedTodos.value;
        })

        return {
            error,
            todoStyle,
            todos,
            addTodo,
            deleteTodo,
            toggleTodo,
            searchText,
            filteredTodos,
            numberOfPages,
            currentPage,
            movePage,
        }
    }
}
</script>

<template>
<div class="container">
    <h2>To-Do List</h2>

    <input
        type="text"
        class="form-control"
        v-model="searchText"
        placeholder="search"
    >
    <hr>
    <TodoForm @add-todo="addTodo" />
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-if="!filteredTodos.length">to-do가 없습니다</div>

    <TodoList
        :todos="filteredTodos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
    />
    <hr>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                    class="page-link"
                    href="#"
                    @click.prevent="movePage(currentPage - 1)"
                >
                    Previous
                </a>
            </li>
            <li
                v-for="page in numberOfPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
            >
                <a
                    class="page-link"
                    href="#"
                    @click.prevent="movePage(page)"
                >
                    {{ page }}
                </a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === numberOfPages }">
                <a
                    class="page-link"
                    href="#"
                    @click.prevent="movePage(currentPage + 1)"
                >
                    Next
                </a>
            </li>
        </ul>
    </nav>

</div>
</template>

<style scoped lang="scss">
</style>
