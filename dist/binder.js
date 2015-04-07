System.register(["./node"], function (_export) {
	var RootNode, Node, MultipleNode, nodeFactory, _createClass, _classCallCheck, Binder;

	function walk(parent, config, element) {
		var node;
		Object.keys(config).forEach(function (name) {
			if (typeof config[name] === "string") {
				node = nodeFactory(name, element, config[name]);
				parent.addChild(node);
			} else if (Array.isArray(config[name])) {
				var multiple = new MultipleNode("multiple", name);
				config[name].forEach(function (sub) {
					node = nodeFactory(name, element, sub);
					multiple.addChild(node);
				});
				parent.addChild(multiple);
			} else {
				node = new Node("node", name);
				walk(node, config[name], element);
				parent.addChild(node);
			}
		});
	}

	return {
		setters: [function (_node) {
			RootNode = _node.RootNode;
			Node = _node.Node;
			MultipleNode = _node.MultipleNode;
			nodeFactory = _node.nodeFactory;
		}],
		execute: function () {
			"use strict";

			_createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

			_classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

			Binder = (function () {
				function Binder(config, element) {
					_classCallCheck(this, Binder);

					//assert(config)
					//assert(element)
					this.root = new RootNode(element);
					walk(this.root, config, element);
				}

				_createClass(Binder, {
					update: {
						value: function update(data) {
							var value = arguments[1] === undefined ? null : arguments[1];

							if (value !== null) {
								var names = data.split(".");
								var node = this.root;
								while (names.length && node) {
									var name = names.shift();
									node = node.find(name);
									if (node && names.length === 0) {
										node.update(value);
										break;
									}
								}
							}
							this.root.update(data);
						}
					}
				});

				return Binder;
			})();

			_export("default", Binder);
		}
	};
});