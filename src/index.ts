import * as ts from "typescript";
import { Transformer } from "./transformer";

export default(p_program: ts.Program): ts.TransformerFactory<ts.Node> =>
  (p_ctx) => {
    const checker = p_program.getTypeChecker();
    const transformer = new Transformer(p_ctx, checker); // TODO:
    return (p_sf) => {
      return transformer.run(p_sf as ts.SourceFile);
    };
  }
