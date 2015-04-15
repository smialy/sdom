System.register(['./nodes', './utils'], function (_export) {
    var RootNode, Node, MultipleNode, walker, $utils, _classCallCheck, _createClass, binders, Binder;

    return {
        setters: [function (_nodes) {
            RootNode = _nodes.RootNode;
            Node = _nodes.Node;
            MultipleNode = _nodes.MultipleNode;
            walker = _nodes.walker;
        }, function (_utils) {
            $utils = _utils;
        }],
        execute: function () {
            'use strict';

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

            _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

            binders = {};

            Binder = (function () {
                function Binder(config, element) {
                    _classCallCheck(this, Binder);

                    this._map = {};
                    this.root = new RootNode(element);
                    walker(this.root, config, element);
                }

                _createClass(Binder, [{
                    key: 'update',
                    value: function update(data) {
                        var value = arguments[1] === undefined ? null : arguments[1];

                        if (value !== null) {
                            var names = data.split('.');
                            var node = this.root;
                            while (names.length && node) {
                                var name = names.shift();
                                node = node.find(name);
                                if (node && names.length === 0) {
                                    node.update(value);
                                    break;
                                }
                            }
                        } else {
                            this.root.update(data);
                        }
                    }
                }, {
                    key: 'dispose',
                    value: function dispose() {
                        this.root.dispose();
                        delete binders[utils.uid(element)];
                    }
                }], [{
                    key: 'create',
                    value: function create(config, element) {
                        var uid = $utils.uid(element);
                        if (!(uid in binders)) {
                            binders[uid] = new Binder(config, element);
                        }
                        return binders[uid];
                    }
                }]);

                return Binder;
            })();

            _export('default', Binder);
        }
    };
});