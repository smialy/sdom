System.register(["./binder"], function (_export) {
	var Binder;

	_export("create", create);

	function create(config, element) {
		return new Binder(config, element);
	}

	return {
		setters: [function (_binder) {
			Binder = _binder["default"];
		}],
		execute: function () {
			"use strict";
		}
	};
});