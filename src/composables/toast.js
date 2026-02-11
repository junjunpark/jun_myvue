import { ref, onUnmounted } from 'vue';

export const useToast = ()=>{
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeOut = ref(null);

    const triggerToast = (message, type = 'success')=>{
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        timeOut.value = setTimeout(()=>{
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        },2000)
    }
    onUnmounted(()=>{
        clearTimeout(timeOut.value);
    })
    return {
        showToast,
        toastMessage,
        toastAlertType,
        timeOut,
        triggerToast
    }
}

