import FormDoc from "./components/document/form/doc";
import FormFetcher from "./components/document/form/fetcher";
import StringInput from "./components/document/form/inputs/string";
import Section from "./components/document/form/section";
import CheckboxInput from "./components/document/form/inputs/checkbox";
import IntegerInput from "./components/document/form/inputs/integer";
import FloatInput from "./components/document/form/inputs/float";
import CheckboxesInput from "./components/document/form/inputs/checkboxes";
import List from "./components/list/list";
import FormAction from "./components/document/form/action";
import RadioInput from "./components/document/form/inputs/radio";
import SelectInput from "./components/document/form/inputs/select";
import TextInput from "./components/document/form/inputs/text";
import ColorInput from "./components/document/form/inputs/color";
import TimeInput from "./components/document/form/inputs/time";
import DateInput from "./components/document/form/inputs/date";
import DateTimeInput from "./components/document/form/inputs/date";
import SelectorInput from "./components/document/form/inputs/selector";
import EditorInput from "./components/document/form/inputs/editor";
import RelatedInput from "./components/document/form/inputs/related";

export default class MagicForm {
	static create(
		$idPrefix: string,
		list: List,
		icon: string,
		fetcher: FormFetcher,
		buttons: Array<FormAction>,
		label: (item:any) => string,
		info: (item:any) => string = (item) => 'id: ' + item['id'],
	): typeof FormDoc {
		return Object.assign(class extends FormDoc {}, {$idPrefix, list, icon, buttons, label, fetcher, info, sections:[]});
	}

	static Doc: typeof FormDoc = FormDoc;
	static Fetcher: typeof FormFetcher = FormFetcher;
	static Section: typeof Section = Section;
	static inputs = class {
		static string(field: string, label: string | null = null): StringInput { return new StringInput(field, label);}
		static checkbox(field: string, label: string | null = null): CheckboxInput { return new CheckboxInput(field, label);}
		static checkboxes(field: string, label: string | null = null): CheckboxesInput { return new CheckboxesInput(field, label);}
		static integer(field: string, label: string | null = null): IntegerInput { return new IntegerInput(field, label);}
		static float(field: string, label: string | null = null): FloatInput { return new FloatInput(field, label);}
		static radio(field: string, label: string | null = null):RadioInput{ return new RadioInput(field, label);}
		static time(field: string, label: string | null = null):TimeInput{ return new TimeInput(field, label);}
		static select(field: string, label: string | null = null):SelectInput{ return new SelectInput(field, label);}
		static text(field: string, label: string | null = null):TextInput{ return new TextInput(field, label);}
		static color(field: string, label: string | null = null):ColorInput{ return new ColorInput(field, label);}
		static date(field: string, label: string | null = null):DateInput{ return new DateInput(field, label);}
		static datetime(field: string, label: string | null = null):DateTimeInput{ return new DateTimeInput(field, label);}
		static selector(field: string, label: string | null = null):SelectorInput{ return new SelectorInput(field, label);}
		static editor(field: string, label: string | null = null):EditorInput{ return new EditorInput(field, label);}
		static related(field: string, label: string | null = null):RelatedInput{ return new RelatedInput(field, label);}
	}
}