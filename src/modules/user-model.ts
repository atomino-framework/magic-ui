import toastManager from "../elements/toast-manager";
import {user} from "./store";
import ErrorUnauhtorized from "./error/error-unauhtorized";

export default class UserModel {

	public id: number | null = null;
	public name: string | null = null;
	public avatar: string | null = null;

	constructor(data: any) {
		this.id = data.id;
		this.name = data.name;
		this.avatar = data.avatar;
	}

	static logout() { throw new ErrorUnauhtorized(null); }

	static isAuthenticated(): Promise<any> {
		return fetch('/api/auth').then(xhr => xhr.json()).then(data => {
			if (data !== false) {
				let auth = new UserModel(data);
				toastManager.success('Authenticated', auth.name??'')
				user.update(() => auth)
			} else {
				user.update(() => null)
			}
		});
	}

	static login(login: string, password: string) {
		return fetch('/api/auth/login', {
			method: 'post',
			body: JSON.stringify({login, password})
		}).then(res => {
			if (res.status === 401) throw new ErrorUnauhtorized(null);
			if (res.status !== 200) throw new Error(res.status.toString())
			return res.json();
		}).then(data => {
			return this.isAuthenticated();
		}).catch((error) => {
			if (error instanceof ErrorUnauhtorized) toastManager.error('Login error', 'wrogin login or password');
			else throw error;
		});
	}

}