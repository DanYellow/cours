import {
    cleanString,
    replaceImage,
} from "./utils";

import { loadDetailsModal } from "./modal";
import loadingImage from "/loading.svg";

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

    const imgTag = template.querySelector("img")
    imgTag.alt = `icône type ${typeData.name}`;
    imgTag.src = loadingImage;
    replaceImage(imgTag, typeData.sprite);

    const typeLabel = template.querySelector("[data-type]");
    typeLabel.classList.add(cleanString(data.name))
    typeLabel.textContent = data.name;

    damageFactorContainer.textContent = `x${data.multiplier}`;

    const effectiveDamageMultiplier = 2;
    const superEffectiveDamageMultiplier = 4;
    const immuneDamageMultiplier = 0;
    damageFactorContainer.classList.toggle(
        "font-bold",
        data.multiplier === effectiveDamageMultiplier ||
        data.multiplier === superEffectiveDamageMultiplier
    );

    if (
        data.multiplier === immuneDamageMultiplier ||
        data.multiplier === effectiveDamageMultiplier ||
        data.multiplier === superEffectiveDamageMultiplier
    ) {
        const cloneHighlight = document.importNode(
            pkmnHighlightTemplateRaw.content,
            true
        );
        const isTypeEffectiveAgainst =
            data.multiplier === effectiveDamageMultiplier;
        const typeAffinityLabel = isTypeEffectiveAgainst ? "Double faiblesse" : "Quadruple faiblesse"
        console.log(data.multiplier)
        cloneHighlight.querySelector("span").textContent = immuneDamageMultiplier === data.multiplier ? "Immunisé" : typeAffinityLabel;

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

const createSibling = (template, data, isCurrentPkmn, isPrevious) => {
    const li = template.querySelector("li");

    li.classList.toggle("shrink-0", isCurrentPkmn);
    li.classList.toggle("hidden", isCurrentPkmn);
    li.classList.toggle("md:[display:revert]", isCurrentPkmn);
    li.classList.toggle("grow", !isCurrentPkmn);
    li.classList.toggle("basis-0", !isCurrentPkmn);

    if (Object.keys(data || {}).length > 0) {
        const imgTag = template.querySelector("img");
        imgTag.src = loadingImage;
        imgTag.alt = `sprite de ${data.name.fr}`;
        replaceImage(imgTag, data.sprites.regular);
        imgTag.classList.toggle("hidden", isCurrentPkmn);

        const name = template.querySelector("[data-name]");
        name.textContent = data.name.fr;

        const pkmnId = template.querySelector("[data-id]");
        pkmnId.textContent = `#${data.pokedex_id}`;
        pkmnId.classList.toggle("!text-center", isCurrentPkmn);

        const siblingUrl = new URL(location);
        siblingUrl.searchParams.set("id", data.pokedex_id);
        siblingUrl.searchParams.delete("region");
        siblingUrl.searchParams.delete("alternate_form_id");
        const aTag = template.querySelector("a");
        aTag.href = siblingUrl;
        aTag.dataset.pokemonData = JSON.stringify(data);
        aTag.addEventListener("click", (e) => loadDetailsModal(e));
        
        if (!isCurrentPkmn) {
            aTag.dataset.testid = isPrevious ? "previous-pkmn" : "next-pkmn";
            const arrow = document.createElement("p");
            arrow.textContent = isPrevious ? "◄" : "►";
            arrow.classList.add(...["font-['serif']", isPrevious ? "-mr-3.5" : "-ml-3.5", "arrow"])
            aTag.prepend(arrow);
        } else {
            const pTag = document.createElement('p');
            pTag.innerHTML = aTag.innerHTML;
            pTag.classList = aTag.classList;
            pTag.classList.remove("hocus:bg-slate-200");
            pTag.classList.add("font-bold");
            aTag.parentNode.replaceChild(pTag, aTag);
        }
    }

    li.inert = Object.keys(data || {}).length === 0;

    return template;
};

export { createSensibility, createRegionalForm, createSibling };