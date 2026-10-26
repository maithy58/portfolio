/* =====================================================================
   projeto.js — constrói a página de um projeto a partir de data.js.
   O projeto é escolhido pelo endereço: projeto.html?p=<slug>
   Usa funções de main.js (esc, badge, projectUrl, initLightbox, ...).
   ===================================================================== */

(function () {
  const root = document.getElementById("project");
  const slug = new URLSearchParams(location.search).get("p");
  const list = window.PROJECTS;
  const project = list.find(p => p.slug === slug);

  if (!project) {
    root.innerHTML = `
      <section class="p-head">
        <a class="p-back" href="index.html#indice">← Todos os trabalhos</a>
        <h1 class="p-title">Projeto não encontrado.</h1>
      </section>`;
    return;
  }

  document.title = `${project.title} — maithy`;

  const meta = [
    ["Ano", project.year],
    ["Categoria", CATEGORY[project.category]],
    ["Estado", STATUS[project.status]],
    ["Ferramentas", (project.tools || []).join(", ")],
    ["Contexto", project.context, true],
    ["Contributo", project.role, true]
  ].filter(([, v]) => v);

  const next = list[(list.indexOf(project) + 1) % list.length];

  root.innerHTML = `
    <section class="p-head">
      <a class="p-back" href="index.html#indice">← Todos os trabalhos</a>
      <p class="label">${CATEGORY[project.category]} · ${project.year} ${project.status === "em-desenvolvimento" ? `· ${badge(project)}` : ""}</p>
      <h1 class="p-title">${esc(project.title)}</h1>
      ${project.subtitle ? `<p class="p-sub serif">${esc(project.subtitle)}</p>` : ""}
      <dl class="p-meta">
        ${meta.map(([k, v, wide]) => `<div class="${wide ? "p-meta--wide" : ""}"><dt class="label">${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl>
      <p class="p-summary serif">${esc(project.summary)}</p>
    </section>
    ${project.cover && !usesImage(project, project.cover)
      ? `<figure class="p-cover reveal"><img src="${esc(project.cover)}" alt="${esc(project.title)}" data-zoom></figure>` : ""}
    <div class="blocks">${(project.blocks || []).map(renderBlock).join("")}</div>
    ${next && next !== project ? `
      <a class="p-next" href="${projectUrl(next)}">
        <span class="label">Seguinte →</span>
        <strong>${esc(next.title)}</strong>
      </a>` : ""}`;

  initLightbox([...root.querySelectorAll("[data-zoom]")]);
  observeReveals(root);

  // A capa só aparece no topo se não estiver já num dos blocos
  function usesImage(p, src) {
    return (p.blocks || []).some(b => b.src === src || (b.items || []).some(it => it.src === src));
  }

  /* --- Blocos ----------------------------------------------------- */
  function renderBlock(b) {
    switch (b.type) {
      case "text":
        return `<section class="b-text reveal"><h2>${esc(b.heading)}</h2>
          <div class="b-body">${b.body.map(t => `<p>${esc(t)}</p>`).join("")}</div></section>`;

      case "list":
        return `<section class="b-text reveal"><h2>${esc(b.heading)}</h2>
          <div class="b-body"><ul>${b.items.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div></section>`;

      case "image":
        return `<figure class="b-image b-image--${b.size || "full"} reveal">
          <img src="${esc(b.src)}" alt="${esc(b.caption || project.title)}" loading="lazy" data-zoom>
          ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;

      case "gallery":
        return `<section class="b-gallery reveal">
          ${b.heading ? `<h2 class="b-head">${esc(b.heading)}</h2>` : ""}
          <div class="grid" style="--cols:${b.cols || 3}">
            ${b.items.map(it => `<figure><img src="${esc(it.src)}" alt="${esc(it.caption || project.title)}" loading="lazy" data-zoom>
              ${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ""}</figure>`).join("")}
          </div>
          ${b.caption ? `<p class="b-caption">${esc(b.caption)}</p>` : ""}</section>`;

      default:
        return "";
    }
  }
})();
