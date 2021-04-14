import {writable} from "svelte/store";


export let toasts = writable([])

class ToastManager {
    info(label, info = '', icon = "fad fa-info-circle", timeout = 3000) {
        this.add('info', info, label, icon, timeout);
    }
    success(label, info = '', icon = "fas fa-check", timeout = 3000) {
        this.add('success', info, label, icon, timeout);
    }
    error(label, info = '', icon = "fad fa-exclamation-circle", timeout = 3000) {
        this.add('error', info, label, icon, timeout);
    }
    add(type, info = '', label, icon = "fad fa-user", timeout = 3000) {
        let toast = {type, info, label, icon, hide: false};
        toasts.update(toasts => [toast, ...toasts]);
        setTimeout(() => {
            toast.hide = true;
            toasts.update(toasts => toasts)
        }, timeout);
        setTimeout(() => {
            toasts.update(toasts => {
                let index = toasts.indexOf(toast);
                toasts.splice(index, 1);
                return toasts;
            })
        }, timeout + 300);
    }
}

const toastManager = new ToastManager();

export default toastManager;
