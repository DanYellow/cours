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
        (type) => cleanString(type.name.fr) === cleanString(data.name)
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
        const typeAffinityLabel = isTypeEffectiveAgainst ? "Double faiblesse" : "Quadruple faiblesse";
        const label = cloneHighlight.querySelector("span");
        label.classList.toggle("bg-red-600", data.multiplier === superEffectiveDamageMultiplier);
        label.classList.toggle("bg-gray-100", data.multiplier === immuneDamageMultiplier);
        label.classList.toggle("text-slate-950", data.multiplier === immuneDamageMultiplier);
        label.textContent = immuneDamageMultiplier === data.multiplier ? "Immunisé" : typeAffinityLabel;

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

const hocusClassRegex = /\shocus.+\d\s/;

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
            pTag.className = pTag.className.replace(hocusClassRegex, ' ')
            pTag.classList.add("font-bold");
            aTag.parentNode.replaceChild(pTag, aTag);
        }
    }

    li.inert = Object.keys(data || {}).length === 0;

    return template;
};

const createStatisticEntry = (template, data) => {
    const statName = template.querySelector("[data-stat-name]");
    const statValue = template.querySelector("[data-stat-value]");
    const statBar = template.querySelector("[data-stat-bar]");

    statName.textContent = data.statistics[data.stat.name].name;
    statName.style.backgroundColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / 0.4)`;
    statName.setAttribute("aria-label", `${data.statistics[data.stat.name].name} de base ${data.base_stat}`);
    statName.style.borderColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / 0.4)`;

    statValue.textContent = data.base_stat;
    statValue.style.backgroundColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / 0.4)`;

    statBar.querySelector("div").style.width = `${data.base_stat}px`;
    statBar.querySelector("div").style.backgroundColor = data.statistics[data.stat.name].color;
    statBar.style.backgroundColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / 0.4)`;
    statBar.style.borderColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / 0.4)`;

    return { bar: statBar, value: statValue, name: statName }
}

export { createSensibility, createRegionalForm, createSibling, createStatisticEntry };