import * as ts from "typescript";

type ClassesProcessors = (p_node: ts.ClassDeclaration) => ts.ClassDeclaration;
class ProcessorsEntry {
  readonly classes_processors: ClassesProcessors[];
  // TODO: add more processors

  constructor(p_class: ClassesProcessors[]) {
    this.classes_processors = p_class;
  }
}

import readonly_methods from "./classes_processors/readonly_methods";

export default() => new ProcessorsEntry(
  // classes
  [readonly_methods]
);
