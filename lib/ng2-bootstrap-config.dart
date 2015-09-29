import 'dart:html';
import 'package:node_shims/js.dart';

enum Ng2BootstrapTheme { BS3, BS4 }

class Ng2BootstrapConfig {
  static Ng2BootstrapTheme _theme;

  static Ng2BootstrapTheme get theme {
    // hack as for now
    dynamic w = window;
    if (w && identical(w.___theme, "bs4")) {
      return Ng2BootstrapTheme.BS4;
    }
    return or(Ng2BootstrapConfig._theme, Ng2BootstrapTheme.BS3);
  }

  static set theme(Ng2BootstrapTheme v) {
    Ng2BootstrapConfig._theme = v;
  }
}