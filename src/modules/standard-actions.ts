import FormAction from "magic/src/components/document/form/action";
import FormDoc from "magic/src/components/document/form/doc";
import modalManager from "magic/src/elements/modal-manager";
import List from "magic/src/components/list/list";
import ListConfig, {ListAction} from "magic/src/components/list/list-config";
import MagicForm from "magic/src/magic-form";
import AttachmentModal from "magic/src/components/document/attachment/attachment-modal.svelte";

let actions = {
	form: {
		attachment: function (categories: object): FormAction {
			categories = Object.values(categories);
			return new FormAction(
				'far fa-folder-open',
				'attachments',
				(doc: FormDoc) => modalManager.show(AttachmentModal, {doc, categories}),
				(doc: FormDoc) => doc.exists
			)
		},
		save: function (): FormAction {
			return new FormAction(
				'far fa-save',
				'save',
				(doc: FormDoc) => doc.save()
			);
		},
		delete: function (): FormAction {
			return new FormAction(
				'fas fa-times',
				'delete',
				(doc: FormDoc) => doc.delete(),
				(doc: FormDoc) => doc.exists
			);
		}
	},
	list: {
		reload: function (list: List): ListAction { return ListConfig.Action("fas fa-recycle", '', list => list.reload()); },
		add: function (form: typeof MagicForm.Doc): ListAction { return ListConfig.Action("fas fa-plus", '', list => form.open(null)); }
	}
}

export default actions;