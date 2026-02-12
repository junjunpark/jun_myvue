<template>
<div class="container">
    <div class="d-flex justify-content-between mb-3 mt-3">
        <h2>To-Do List</h2>
        <button
            class="btn btn-primary"
            @click="moveToCreatePage"
        >
            Create Todo
        </button>
    </div>
    <input
        type="text"
        class="form-control"
        v-model="searchText"
        placeholder="search"
        @keyup.enter ="searchTodo"
    >
    <hr>

    <div v-if="!todos.length">
        {{ searchText ? '검색 결과가 없습니다' : 'to-do가 없습니다' }}
    </div>

    <TodoList
        :todos="paginatedTodos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
    />
    <hr>
    <nav v-if="todos.length" aria-label="Page navigation example">
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
<Toast
    v-if="showToast"
    :message = "toastMessage"
    :type="toastAlertType"
/>
</template>

<script>
import { ref, computed, watch } from 'vue';
//import TodoForm from '@/components/features/TodoForm.vue'
import TodoList from '@/components/features/TodoList.vue'
import Toast from '@/components/ui/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';
import CreatePage from '@/pages/todos/CreatePage.vue';
import axios from 'axios';
export default {
    components: {
        //TodoForm,
        TodoList,
        Toast,
        CreatePage
    },
    setup() {
        const router = useRouter();
        const todoStyle = {
            textDecoration : 'line-through',
            color: 'gray'
        }

        const todos = ref([]);
        const error = ref('');
        const limit = 5;
        const currentPage = ref(1);
        const searchText = ref('');

        const {
            showToast,
            toastMessage,
            toastAlertType,
            timeOut,
            triggerToast
        } = useToast();

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
                const url = 'http://localhost:3000/todos';
                const res = await axios.get(url);

                // 클라이언트 측에서 필터링
                let filteredTodos = res.data;
                if (searchText.value) {
                    filteredTodos = res.data.filter(todo =>
                        todo.subject.toLowerCase().includes(searchText.value.toLowerCase())
                    );
                }

                // 역순으로 정렬 (최신 항목이 먼저 보이도록)
                todos.value = filteredTodos.reverse();
                currentPage.value = 1;
            } catch (err){
                console.log(err);
                error.value = 'Network Error'
                triggerToast('Something Wrong','danger');
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
                // 맨 앞에 추가 (unshift 사용)
                todos.value.unshift(res.data);
            } catch (err) {
                console.log(err);
                error.value = 'Network Error'
                triggerToast('Something Wrong','danger');
            }
        }

        const deleteTodo = async (index) => {
            error.value = '';
            const actualIndex = (currentPage.value - 1) * limit + index;
            const id = todos.value[actualIndex].id;
            try {
                await axios.delete(`http://localhost:3000/todos/${id}`)
                todos.value.splice(actualIndex, 1)
                if (paginatedTodos.value.length === 0 && currentPage.value > 1) {
                    currentPage.value--;
                }
            } catch(err) {
                console.log(err);
                error.value = 'Network Error'
                triggerToast('Something Wrong','danger');
            }
        }

        const toggleTodo = async (index, checked) => {
            //console.log(checked)
            error.value = '';
            const actualIndex = (currentPage.value - 1) * limit + index;
            const id = todos.value[actualIndex].id;
            try {
                await axios.patch(`http://localhost:3000/todos/${id}`, {
                    completed: checked
                })
                todos.value[actualIndex].completed = checked;
            } catch(err) {
                console.log(err);
                error.value = 'Network Error'
                triggerToast('Something Wrong','danger');
            }
        }

        const movePage = (page) => {
            if (page < 1 || page > numberOfPages.value) return;
            currentPage.value = page;
        }
        const moveToCreatePage = () => {
            router.push ({
                name: 'todoCreate'
            })
        }

        let timeout = null;
        const searchTodo = ()=>{
            clearTimeout(timeout);
            getTodos();
        }
        watch(searchText, () => {
            clearTimeout(timeout);
            timeout = setTimeout (() =>{
                getTodos();
            },1000);
        })

        return {
            error,
            todoStyle,
            todos,
            addTodo,
            deleteTodo,
            toggleTodo,
            searchText,
            paginatedTodos,
            numberOfPages,
            currentPage,
            movePage,
            moveToCreatePage,
            showToast,
            toastMessage,
            toastAlertType,
        }
    }
}
</script>

<style scoped lang="scss">
</style>
