<template>
<div class="container">
    <h2>To-Do Page</h2>
    <div v-if="loading">
        loading...
    </div>
    <form
        v-else-if="todo"
        @submit.prevent = "onSave"
        >
        <div class="row">
            <div class="col-6">
                <div class="form-group pb-2">
                    <label>Subject</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="todo.subject"
                    >
                </div>
            </div>
            <div class="col-6">
                <div class="form-group pb-2">
                    <label>Status</label>
                    <div>
                        <button type="button"
                            class="btn"
                            :class="todo.completed ? 'btn-success' : 'btn-danger' "
                            @click="toggleTodoStatus"
                        >
                        {{todo.completed ? 'Completed' : 'InCompleted'}}</button>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit"
            class="btn btn-primary"
            :disabled="!todoUpdated"
        >
            Save
        </button>
        <button type="button"
            class="btn btn-outline-dark ms-1"
            @click = "movoToTodoListPage"
        >
            Cancel
        </button>
    </form>
    <Toast
        v-if="showToast"
        :message = "toastMessage"
        :type="toastAlertType"
    />
</div>
</template>
<script>
import { useRoute , useRouter} from 'vue-router';
import { ref , computed } from 'vue';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/ui/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
    components: {
        Toast
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id;

        const {
            showToast,
            toastMessage,
            toastAlertType,
            timeOut,
            triggerToast
        } = useToast();

        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = {...res.data};
                originalTodo.value = {...res.data};

                loading.value = false;
            } catch (error) {
                console.error('Failed to fetch todo:', error);
                triggerToast('Something Wrong','danger');
                loading.value = false;
            }
        }

        const todoUpdated = computed(()=>{
            return !_.isEqual(todo.value,originalTodo.value)
        })

        const toggleTodoStatus = ()=> {
            todo.value.completed = !todo.value.completed
        }
        const movoToTodoListPage = ()=> {
            router.push({
                name:'todos'
            })
        }

        getTodo();

        const onSave = async ()=>{
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject : todo.value.subject,
                    completed : todo.value.completed,
                });
                originalTodo.value = {...res.data};
                triggerToast('Success Saved!');
            } catch (err) {
                triggerToast('Something Wrong','danger');
            }

        }

        return {
            todo,
            loading,
            toggleTodoStatus,
            movoToTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,
        }
    }
}
</script>
