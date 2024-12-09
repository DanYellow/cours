import {
    cleanString,
    replaceImage,
} from "./utils";

import loadDetailsModal from "./modal";

const pkmnHighlightTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-highlight']"
);

const createSensibility = (template, data, listTypes) => {
    const typeData = listTypes.find(
        (type) => cleanString(type.name) === cleanString(data.name)
    );
    const damageFactorContainer = template.querySelector(
        "[data-damage-factor]"
    );

    template.querySelector("img").src = typeData.sprite;
    template.querySelector("[data-type]").textContent = data.name;
    damageFactorContainer.textContent = `x${data.multiplier}`;

    const effectiveDamageMultiplier = 2;
    const superEffectiveDamageMultiplier = 4;
    damageFactorContainer.classList.toggle(
        "font-bold",
        data.multiplier === effectiveDamageMultiplier ||
        data.multiplier === superEffectiveDamageMultiplier
    );

    if (
        data.multiplier === effectiveDamageMultiplier ||
        data.multiplier === superEffectiveDamageMultiplier
    ) {
        const cloneHighlight = document.importNode(
            pkmnHighlightTemplateRaw.content,
            true
        );
        const isTypeEffectiveAgainst =
            data.multiplier === effectiveDamageMultiplier;
        cloneHighlight.querySelector("span").textContent =
            isTypeEffectiveAgainst
                ? "Double faiblesse"
                : "Quadruple faiblesse";

        damageFactorContainer.append(cloneHighlight);
    }

    return template;
}

const createRegionalForm = (template, data) => {
    const url = new URL(location);
    url.searchParams.set("id", data.pokedex_id);
    const imgTag = template.querySelector("img");
    replaceImage(imgTag, data.sprite);
    imgTag.alt = `sprite de ${data.name.fr} forme ${data.region}`;
    imgTag.fetchPriority = "low";
    template.querySelector("figcaption").textContent = `${data.name.fr}`;

    const aTag = template.querySelector("[data-pokemon-data]");
    const alternateForm = data.varieties
        ?.filter((_item) => !_item.is_default)
        .find((_item) => {
            return _item.pokemon?.name.includes(data.region);
        });

    if (alternateForm) {
        data.alternate_form_id = alternateForm?.pokemon.url
            ?.split("/")
            .filter(Boolean)
            .at(-1);
        url.searchParams.set("region", data.region);
        url.searchParams.set(
            "alternate_form_id",
            data.alternate_form_id
        );
    }

    aTag.href = url;
    aTag.dataset.pokemonData = JSON.stringify(data);
    aTag.addEventListener("click", (e) => loadDetailsModal(e, data.region));

    return template;
}

export { createSensibility, createRegionalForm };