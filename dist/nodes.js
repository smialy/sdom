System.register([], function (_export) {
    var _slicedToArray, _get, _inherits, _createClass, _classCallCheck, Node, LeafNode, TextNode, HtmlNode, AttrNode, DatasetNode, ClassNode, RootNode, MultipleNode, NODES;

    _export("walker", walker);

    function walker(parent, config, element) {
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
                walker(node, config[name], element);
                parent.addChild(node);
            }
        });
    }

    function parseConfig(text) {
        var _text$split = text.split("@");

        var _text$split2 = _slicedToArray(_text$split, 2);

        var selector = _text$split2[0];
        var rest = _text$split2[1];

        if (!rest) {
            rest = "text";
        }

        var _rest$split = rest.split(":");

        var _rest$split2 = _slicedToArray(_rest$split, 2);

        var type = _rest$split2[0];
        var options = _rest$split2[1];

        return {
            selector: selector,
            type: type,
            options: options
        };
    }

    function nodeFactory(name, element, config) {
        if (typeof config === "string") {
            config = parseConfig(config);
        }
        if (NODES[config.type]) {
            var dom = element.querySelector(config.selector);
            return NODES[config.type](name, dom, config.options);
        }
        return new TextNode("name", element);
    }
    return {
        setters: [],
        execute: function () {
            "use strict";

            _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

            _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

            _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

            _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

            Node = _export("Node", (function () {
                function Node(type, name, element) {
                    var options = arguments[3] === undefined ? null : arguments[3];

                    _classCallCheck(this, Node);

                    this.type = type;
                    this.name = name;
                    this.element = element;
                    this._childs = [];
                }

                _createClass(Node, {
                    addChild: {
                        value: function addChild(node) {
                            this._childs.push(node);
                        }
                    },
                    update: {
                        value: function update(data) {
                            this._childs.forEach(function (node) {
                                if (typeof data[node.name] !== "undefined") {
                                    node.update(data[node.name]);
                                }
                            });
                        }
                    },
                    find: {
                        value: function find(name) {
                            for (var i = 0; i < this._childs.length; i += 1) {
                                if (this._childs[i].name === name) {
                                    return this._childs[i];
                                }
                            }
                            return null;
                        }
                    },
                    dispose: {
                        value: function dispose() {
                            var childs = this._childs;
                            for (var i = 0; i < childs.length; i += 1) {
                                childs[i].dispose();
                            }
                            this.element = null;
                            this._childs = [];
                        }
                    }
                });

                return Node;
            })());

            LeafNode = (function (_Node) {
                function LeafNode() {
                    _classCallCheck(this, LeafNode);

                    if (_Node != null) {
                        _Node.apply(this, arguments);
                    }
                }

                _inherits(LeafNode, _Node);

                _createClass(LeafNode, {
                    addChild: {
                        value: function addChild(node) {}
                    }
                });

                return LeafNode;
            })(Node);

            TextNode = (function (_LeafNode) {
                function TextNode(name, element) {
                    _classCallCheck(this, TextNode);

                    _get(Object.getPrototypeOf(TextNode.prototype), "constructor", this).call(this, "text", name, element);
                }

                _inherits(TextNode, _LeafNode);

                _createClass(TextNode, {
                    update: {
                        value: function update(value) {
                            this.element.textContent = value;
                        }
                    }
                });

                return TextNode;
            })(LeafNode);

            HtmlNode = (function (_LeafNode2) {
                function HtmlNode(name, element) {
                    _classCallCheck(this, HtmlNode);

                    _get(Object.getPrototypeOf(HtmlNode.prototype), "constructor", this).call(this, "html", name, element);
                }

                _inherits(HtmlNode, _LeafNode2);

                _createClass(HtmlNode, {
                    update: {
                        value: function update(value) {
                            this.element.innerHTML = value;
                        }
                    }
                });

                return HtmlNode;
            })(LeafNode);

            AttrNode = (function (_LeafNode3) {
                function AttrNode(name, element, attrname) {
                    _classCallCheck(this, AttrNode);

                    if (!attrname) {
                        throw new Error("Expected name for attribute name");
                    }
                    _get(Object.getPrototypeOf(AttrNode.prototype), "constructor", this).call(this, "attr", name, element);
                    this.attrname = attrname;
                }

                _inherits(AttrNode, _LeafNode3);

                _createClass(AttrNode, {
                    update: {
                        value: function update(value) {
                            this.element[this.attrname] = value;
                        }
                    }
                });

                return AttrNode;
            })(LeafNode);

            DatasetNode = (function (_LeafNode4) {
                function DatasetNode(name, element, setname) {
                    _classCallCheck(this, DatasetNode);

                    if (!setname) {
                        throw new Error("Expected name for dataset attribute");
                    }
                    _get(Object.getPrototypeOf(DatasetNode.prototype), "constructor", this).call(this, "dataset", name, element);
                    this.setname = setname;
                }

                _inherits(DatasetNode, _LeafNode4);

                _createClass(DatasetNode, {
                    update: {
                        value: function update(value) {
                            this.element.dataset[this.setname] = value;
                        }
                    }
                });

                return DatasetNode;
            })(LeafNode);

            ClassNode = (function (_LeafNode5) {
                function ClassNode(name, element) {
                    var value = arguments[2] === undefined ? null : arguments[2];

                    _classCallCheck(this, ClassNode);

                    _get(Object.getPrototypeOf(ClassNode.prototype), "constructor", this).call(this, "class", name, element);
                    this.value = value;
                }

                _inherits(ClassNode, _LeafNode5);

                _createClass(ClassNode, {
                    update: {
                        value: function update(value) {
                            if (this.value) {
                                if (value) {
                                    this.element.classList.add(this.value);
                                } else {
                                    this.element.classList.remove(this.value);
                                }
                            } else {
                                if (this.actualValue) {
                                    this.element.classList.remove(this.actualValue);
                                }
                                this.actualValue = value;
                                this.element.classList.add(value);
                            }
                        }
                    }
                });

                return ClassNode;
            })(LeafNode);

            RootNode = _export("RootNode", (function (_Node2) {
                function RootNode(element) {
                    _classCallCheck(this, RootNode);

                    _get(Object.getPrototypeOf(RootNode.prototype), "constructor", this).call(this, "root", "root", element);
                }

                _inherits(RootNode, _Node2);

                return RootNode;
            })(Node));
            MultipleNode = _export("MultipleNode", (function (_Node3) {
                function MultipleNode() {
                    _classCallCheck(this, MultipleNode);

                    if (_Node3 != null) {
                        _Node3.apply(this, arguments);
                    }
                }

                _inherits(MultipleNode, _Node3);

                _createClass(MultipleNode, {
                    update: {
                        value: function update(data) {
                            this._childs.forEach(function (node) {
                                node.update(data);
                            });
                        }
                    }
                });

                return MultipleNode;
            })(Node));
            NODES = {
                text: function text(name, element) {
                    return new TextNode(name, element);
                },
                html: function html(name, element) {
                    return new HtmlNode(name, element);
                },
                dataset: function dataset(name, element, options) {
                    return new DatasetNode(name, element, options);
                },
                "class": function _class(name, element, options) {
                    return new ClassNode(name, element, options);
                },
                attr: function attr(name, element, options) {
                    return new AttrNode(name, element, options);
                }
            };
        }
    };
});