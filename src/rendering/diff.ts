

export const diff = (parent: Element, real: Element, virtual: Element) => {
  // case 1. real node 는 있으나 virtual node 가 없는 경우
  if (real && !virtual) {
    real.remove();  // 기존 노드 제거
    return;
  }

  // case 2. real node 는 없으나 virtual node 가 있는 경우
  if (!real && virtual) {
    parent.appendChild(virtual);  // 노드 추가
    return;
  }

  // case 3. real node 와 virtual node 가 다른 경우
  if (isNodeChange(real, virtual)) {
    real.replaceWith(virtual);  // 노드 교체
  }

  // children node 에 diff recursion
  const realChildren = Array.from(real.children);
  const virtualChildren = Array.from(virtual.children);
  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    diff(real, realChildren[i], virtualChildren[i]);
  }
}


const isNodeChange = (node1: Element, node2: Element): boolean => {
  const attributes1 = node1.attributes;
  const attributes2 = node2.attributes;

  // attribute 개수가 다를 경우
  if (attributes1.length !== attributes2.length) return true;

  // attribute 내용이 다를 경우
  const diffAttr: Attr = Array.prototype.find.call(attributes1, (attr: Attr) => {
    const { name } = attr;
    return node1.getAttribute(name) !== node2.getAttribute(name);
  });

  if (diffAttr) return true;

  // 자식 element 가 없을 경우 text node 만 비교
  return (
    node1.children.length === 0
    && node2.children.length === 0
    && node1.textContent !== node2.textContent
  );
}
