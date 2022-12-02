import * as ts from "typescript";
import { Transformer } from "./transformer";

export default(p_program: ts.Program) => {
  return {
    before(p_ctx: ts.TransformationContext) {
      const checker = p_program.getTypeChecker();
      const transformer = new Transformer(p_ctx, checker);
      return (p_sf: ts.SourceFile) => {
        return transformer.run(p_sf as ts.SourceFile);
      };
    },
    after(p_ctx: ts.TransformationContext) {
      return (p_sf: ts.SourceFile) => {
        return p_sf; // TODO:
      };
    }
  };
}
  