
<script>
import { ref, computed } from 'vue';
import TodoForm from '@/components/features/TodoForm.vue'
import TodoList from '@/components/features/TodoList.vue'
export default {
    components: {
        TodoForm,
        TodoList
    },
    setup() {
        // const toggle = ref(false);
        // const onToggle = ()=>{
        //     toggle.value = !toggle.value;
        // }
        const todoStyle = {
            textDecoration : 'line-through',
            color: 'gray'
        }

        const todos = ref([]);
        const addTodo = (todo) => {
            //console.log(todo);
            todos.value.push(todo);
        }
        const deleteTodo = (index) => {
            //console.log('delete');
            todos.value.splice(index,1)
        }
        const toggleTodo = (index)=> {
            //console.log(todos.value[index]);
            todos.value[index].completed = !todos.value[index].completed;
            //console.log(todos.value[index]);
        }

        const searchText = ref('');
        const filteredTodos = computed(()=>{
            if(searchText.value){
                return todos.value.filter(todo => {
                    return todo.subject.includes(searchText.value)
                })
            }
            return todos.value;
        })

        return {
            // toggle,
            // onToggle,
            todoStyle,
            todos,
            addTodo,
            deleteTodo,
            toggleTodo,
            searchText,
            filteredTodos,
        }
    }
}
</script>

<template>

<div class="container">
    <!-- <div v-if="toggle">true</div>
    <div v-else="!toggle">false</div>
    <button @click="onToggle">Toggle</button> -->

    <h2>To-Do List</h2>

    <input
        type="text"
        class="form-control"
        v-model="searchText"
        placeholder="search"
    >
    <hr>
    <TodoForm @add-todo="addTodo" />

    <!-- <div v-if="!todos.length">추가된 to-do가 없습니다</div> -->
    <div v-if="!filteredTodos.length">to-do가 없습니다</div>

    <TodoList
        :todos ="filteredTodos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
        />

</div>
</template>

<style scoped lang="scss">
// .todo {
//     color: gray;
//     text-decoration: line-through;
// }
// .form-check-input:checked + .form-check-label {
//   text-decoration: line-through;
//   color: #999;
// }

</style>
