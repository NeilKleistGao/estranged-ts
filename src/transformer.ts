import * as ts from "typescript";
import processors_entry from "./processors_entry";

export class Transformer {
  private readonly m_context: ts.TransformationContext;
  private readonly m_checker: ts.TypeChecker;
  private readonly m_visitor: ts.Visitor;
  private readonly m_entries = processors_entry();

  constructor(p_context: ts.TransformationContext, p_checker: ts.TypeChecker) {
    this.m_context = p_context;
    this.m_checker = p_checker;
    this.m_visitor = this.visit.bind(this);
  }

  run(p_sf: ts.SourceFile): ts.SourceFile {
    if (p_sf.isDeclarationFile) return p_sf;
    const statements: ts.Statement[] = [];
  
    for (const s of p_sf.statements) {
      const res = this.visit(s) as ts.Statement[] | ts.Statement | undefined;
      if (res !== undefined) {
        if (Array.isArray(res)) {
          statements.push(...res);
        }
        else {
          statements.push(res);
        }
      }
    }
    
    return ts.factory.updateSourceFile(p_sf, statements);
  }

  private visit(p_node: ts.Node): ts.VisitResult<ts.Node> {
    if (ts.isClassDeclaration(p_node)) {
      let res = p_node;
      for (const pe of this.m_entries.classes_processors) {
        res = pe(p_node);
      }

      return res;
    }

    return ts.visitEachChild(p_node, this.m_visitor, this.m_context);
  }
}
