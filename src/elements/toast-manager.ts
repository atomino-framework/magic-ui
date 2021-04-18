import {Writable, writable} from "svelte/store";


export let toasts:Writable<any> = writable([])

class ToastManager {
    info(label:string, info:string = '', icon:string = "far fa-info-circle", timeout:number = 3000) {
        this.add('info', info, label, icon, timeout);
    }
    success(label:string, info:string = '', icon:string = "far fa-check", timeout:number = 3000) {
        this.add('success', info, label, icon, timeout);
    }
    error(label:string, info:string = '', icon:string = "far fa-exclamation-circle", timeout:number = 3000) {
        this.add('error', info, label, icon, timeout);
    }
    add(type:string, info:string = '', label:string, icon:string = "far fa-user", timeout:number = 3000) {
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
