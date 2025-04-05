import 'package:math_expressions/math_expressions.dart';

class Calculator {
  final List<String> _inputs = [];
  double _result = 0;

  String getInput() => _inputs.isEmpty ? "0" : _inputs.join("");
  String getResult() => _result.toString();

  bool _isDigit(String value) {
    return RegExp(r'^\d$').hasMatch(value);
  }

  bool _isOperation(String value) {
    return RegExp(r'^[\+\-\*/]$').hasMatch(value);
  }

  void _addSymbol(String symbol) {
    if (_inputs.isEmpty) {
      if (symbol == "-") _inputs.add(symbol);
      return;
    }

    if (_isOperation(_inputs.last) && _inputs.length > 1) {
      _inputs.last = symbol;
    } else if (symbol == "." && !_isDigit(_inputs.last)) {
      return;
    } else {
      _inputs.add(symbol);
    }
  }

  void addAction(String action) {
    switch (action) {
      case "AC":
        _inputs.clear();
        _result = 0;
        break;
      case "C":
        if (_inputs.isNotEmpty) _inputs.removeLast();
        break;
      case "=":
        if (!_isOperation(_inputs.last)) {
          _result = _evaluateExpression(_inputs.join(""));
          _inputs.clear();
        }
        break;
      default:
        _isDigit(action) ? _inputs.add(action) : _addSymbol(action);
    }
  }

  double _evaluateExpression(String expression) {
    try {
      Expression exp = Parser().parse(expression);
      return exp.evaluate(EvaluationType.REAL, ContextModel());
    } catch (e) {
      return double.nan;
    }
  }
}
