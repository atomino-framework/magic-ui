import docManager from "./components/document/doc-manager";
import Doc from "./components/document/doc";


let MagicDoc = {
	manager: docManager,
	Doc: Doc,
	create: Doc.create.bind(Doc)
};

export default MagicDoc;