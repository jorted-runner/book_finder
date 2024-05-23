export function renderWithTemplate(templateFn, parentElement, data, callback, position = 'afterbegin') {
    parentElement.insertAdjacentHTML(position, templateFn);
    if (callback) {
      callback(data);
    }
}

export async function loadTemplate(path) {
    const html = await fetch(path);
    const template = await html.text();
    return template;
  }

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('../partials/header.html');
    const headerElement = document.querySelector('header');
    renderWithTemplate(headerTemplate, headerElement);
}