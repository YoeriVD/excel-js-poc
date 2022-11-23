"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BaseXform = require('../base-xform');

var FilterColumnXform = require('./filter-column-xform');

var AutoFilterXform = /*#__PURE__*/function (_BaseXform) {
  _inherits(AutoFilterXform, _BaseXform);

  var _super = _createSuper(AutoFilterXform);

  function AutoFilterXform() {
    var _this;

    _classCallCheck(this, AutoFilterXform);

    _this = _super.call(this);
    _this.map = {
      filterColumn: new FilterColumnXform()
    };
    return _this;
  }

  _createClass(AutoFilterXform, [{
    key: "prepare",
    value: function prepare(model) {
      var _this2 = this;

      model.columns.forEach(function (column, index) {
        _this2.map.filterColumn.prepare(column, {
          index: index
        });
      });
    }
  }, {
    key: "render",
    value: function render(xmlStream, model) {
      var _this3 = this;

      xmlStream.openNode(this.tag, {
        ref: model.autoFilterRef
      });
      model.columns.forEach(function (column) {
        _this3.map.filterColumn.render(xmlStream, column);
      });
      xmlStream.closeNode();
      return true;
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }

      switch (node.name) {
        case this.tag:
          this.model = {
            autoFilterRef: node.attributes.ref,
            columns: []
          };
          return true;

        default:
          this.parser = this.map[node.name];

          if (this.parser) {
            this.parseOpen(node);
            return true;
          }

          throw new Error("Unexpected xml node in parseOpen: ".concat(JSON.stringify(node)));
      }
    }
  }, {
    key: "parseText",
    value: function parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.columns.push(this.parser.model);
          this.parser = undefined;
        }

        return true;
      }

      switch (name) {
        case this.tag:
          return false;

        default:
          throw new Error("Unexpected xml node in parseClose: ".concat(name));
      }
    }
  }, {
    key: "tag",
    get: function get() {
      return 'autoFilter';
    }
  }]);

  return AutoFilterXform;
}(BaseXform);

module.exports = AutoFilterXform;
//# sourceMappingURL=auto-filter-xform.js.map
