const COMMON_ACTIONS = ["strike", "defend", "cast"];

Hooks.on("renderTokenHUD", renderTokenHud);

async function renderTokenHud(app, html) {

  const actor = app.object.document.actor;

  const root = $("<div class='cah-hud'></div>");

  for (const action of COMMON_ACTIONS.map(name => actor.actions[name]).filter(Boolean)) {
    root.append(makeHudButton(actor, action))
  }

  html.find(".col.middle").append(root);

}

function makeHudButton(actor, action) {
  const btn = $(`<div class="cah-hud-control-icon" data-tooltip-direction="DOWN" data-tooltip="${action.name}">
    <img src="${action.img}"/>
  </div>`);

  btn.on("click", (evt) => {
    actor.useAction(action.id, { dialog: !evt.ctrlKey || action.id === "cast" });
  });

  return btn;
}


