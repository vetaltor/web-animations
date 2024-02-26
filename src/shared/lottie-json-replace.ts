function findTextLayer(object: Record<string, any>) {
  const { layers } = object;
  if (layers) {
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].ty === 5) {
      }
    }
  }
}

export function lottieJsonReplace(
  object: Record<string, any>,
  dictionary: Record<string, string>
) {
  traverseTextLayers(object.layers, dictionary);
}

function traverseTextLayers(
  layers: Record<string, any>[],
  dictionary: Record<string, string>
) {
  layers.forEach((layer) => {
    if (layer.ty === 5) {
      for (const key in dictionary) {
        if (layer.nm.startsWith(key)) {
          const text = layer.t.d.k[0].s.t;
          layer.t.d.k[0].s.t = dictionary[key];
          console.log(text);
          console.log(dictionary[key]);
        }
      }
    }
    if (layer.layers) {
      traverseTextLayers(layer.layers, dictionary);
    }
  });
}

export function textUpdate(
  renderer: Record<string, any>,
  dictionary: Record<string, string>
) {
  traverseElements(renderer.elements, dictionary);
}

function traverseElements(
  elements: Record<string, any>[],
  dictionary: Record<string, string>
) {
  elements.forEach((element) => {
    if (!element) { // undefined happens
      return;
    }
    if (element.data.ty === 5) {
      for (const key in dictionary) {
        if (element.data.nm.startsWith(key)) {
          element.updateDocumentData({ t: dictionary[key] });
        }
      }
    }
    if (element.elements) {
      traverseElements(element.elements, dictionary);
    }
  });
}
