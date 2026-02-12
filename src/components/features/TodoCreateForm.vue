<template>
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
                <div
                    v-if="subjectError"
                    style="color:red"
                >{{ subjectError }}</div>
            </div>
        </div>
        <div
            class="col-6"
            v-if="editing"
        >
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
        <div class="col-12">
            <div class="form-group pb-2">
                <label>Desc</label>
                <div>
                    <textarea v-model="todo.desc" name="" id="" class="form-control" style="height:100px"></textarea>
                </div>
            </div>
        </div>
    </div>

    <button type="submit"
        class="btn btn-primary"
        :disabled="!todoUpdated"
    >
        {{ editing ? 'Update' : 'Create'}}
    </button>
    <button type="button"
        class="btn btn-outline-dark ms-1"
        @click = "movoToTodoListPage"
    >
        Cancel
    </button>
</form>
<transition name="toast-trans">
    <Toast
        v-if="showToast"
        :message = "toastMessage"
        :type="toastAlertType"
    />
</transition>
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
    props: {
        editing : {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false,
            desc: '',
        });
        const subjectError = ref('');
        const originalTodo = ref(null);
        const loading = ref(false);
        const todoId = route.params.id;

        const {
            showToast,
            toastMessage,
            toastAlertType,
            timeOut,
            triggerToast
        } = useToast();

        const getTodo = async () => {
            loading.value = true;
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

        if(props.editing){
            getTodo();
        }

        const onSave = async ()=>{
            subjectError.value = '';
            // subject 확인
            if ( !todo.value.subject){
                subjectError.value = 'Subject is requied!';
                return;
            }

            try {
                let res;
                let todoData = {
                    subject : todo.value.subject,
                    completed : todo.value.completed,
                    desc : todo.value.desc,
                }
                if(props.editing){
                    res = await axios.put(`http://localhost:3000/todos/${todoId}`
                    , todoData );
                    originalTodo.value = {...res.data};
                } else {
                    res = await axios.post(`http://localhost:3000/todos`
                    , todoData);
                     todo.value.subject = '';
                     todo.value.desc = '';
                }
                const messgeSuccess= 'Success ' + (props.editing ? 'Updated!' :'Crated!');
                triggerToast(messgeSuccess);
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
            subjectError,
        }
    }
}
</script>
<style scoped>
.toast-trans-enter-active,
.toast-trans-leave-active {
    transition: all 0.5s ease;
}
.toast-trans-enter-from,
.toast-trans-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
.toast-trans-enter-to,
.toast-trans-leave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>
