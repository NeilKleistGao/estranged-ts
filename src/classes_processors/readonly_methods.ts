import * as ts from "typescript";

function methodToArrow(p_method: ts.MethodDeclaration): ts.Expression {
  return ts.factory.createArrowFunction(undefined,
    p_method.typeParameters,
    p_method.parameters,
    p_method.type,
    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    p_method.body as ts.Block);
}

function turnMethodReadonly(p_method: ts.MethodDeclaration): ts.PropertyDeclaration {
  const temp = ts.getModifiers(p_method);
  let modifiers: ts.Modifier[] = [];
  if (temp !== undefined) {
    modifiers = temp as ts.Modifier[];
  }

  modifiers.push(ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword));

  return ts.factory.createPropertyDeclaration(p_method.decorators,
    modifiers,
    p_method.name,
    undefined,
    p_method.type,
    methodToArrow(p_method));
}

export default(p_node: ts.ClassDeclaration): ts.ClassDeclaration => {
  const members = [];
  for (const member of p_node.members) {
    if (ts.isMethodDeclaration(member) && member.body !== undefined) {
      members.push(turnMethodReadonly(member));
    }
    else {
      members.push(member);
    }
  }

  return ts.factory.createClassDeclaration(p_node.decorators,
    ts.canHaveModifiers(p_node) ? ts.getModifiers(p_node) : undefined,
    p_node.name,
    p_node.typeParameters,
    p_node.heritageClauses,
    members);
}
