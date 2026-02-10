<script>
import { ref } from 'vue';
export default {
    emits: ['add-todo'],
    setup (props, {emit}){
        const todo = ref('');
        const hasError = ref(false);
        const onSubmit = ()=> {
            // console.log(todo.value);
            if ( todo.value === '') {
                hasError.value = true;
            } else {
                emit('add-todo', {
                    id: Date.now(),
                    subject: todo.value,
                    completed: false
                })
                // todos.value.push({
                //     id: Date.now(),
                //     subject: todo.value,
                //     completed: false
                // })
                hasError.value = false;
                todo.value = '';
            }
        }
        return {
            todo,
            hasError,
            onSubmit,
        }
    }
}


</script>

<template>
<form
        @submit.prevent="onSubmit"
    >
        <div class="d-flex">
            <div class="mr-2 flex-grow-1">
                <input
                    type="text"
                    class="form-control"
                    v-model="todo"
                    placeholder="Type new to-do"
                >
            </div>
            <div>
                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Add
                </button>
            </div>
        </div>
        <div v-if="hasError" style="color:red"> 텍스트를 입력해주세요. </div>
    </form>

</template>
