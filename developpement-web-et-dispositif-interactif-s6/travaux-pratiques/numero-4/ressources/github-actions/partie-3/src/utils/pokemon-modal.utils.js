import {
    cleanString,
    replaceImage,
    typesTextColorGroupHocus,
    typesBorderColor,
} from "#utils";

import loadingImageRaw from "/images/loading.svg?raw";

export const pkmnHighlightTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-highlight']"
);

export const createSensibility = async (template, data, listTypes) => {
    const typeData = listTypes.find(
        (type) => cleanString(type.name.fr) === cleanString(data.name)
    );
    const damageFactorContainer = template.querySelector(
        "[data-damage-factor]"
    );

    const typeIconContainer = template.querySelector("[data-type-icon]");
    typeIconContainer.style.backgroundColor = window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(typeData.name.fr)}`);
    const svgTypeIconReq = await fetch(`/images/types-icons/${typeData.name.en}.svg`);

    const parser = new DOMParser();
    const svgTypeIcon = parser.parseFromString(
        await svgTypeIconReq.text(),
        "image/svg+xml"
    );
    svgTypeIcon.documentElement.setAttribute("role", "img");
    svgTypeIcon.documentElement.setAttribute("aria-labelledby", `icône type ${typeData.name.fr}`);
    svgTypeIcon.documentElement.querySelectorAll("[class]").forEach((item) => {
        if(item.classList.contains("cls-1")) {
            return;
        }
        item.style.fill = window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(typeData.name.fr)}`);
    })
    typeIconContainer.append(svgTypeIcon.documentElement);

    const typeLabel = template.querySelector("[data-type]");
    typeLabel.setAttribute("aria-label", `Type ${data.name}`);
    typeLabel.classList.add(cleanString(data.name));
    typeLabel.style.backgroundColor = window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(typeData.name.fr)}`);
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

        if(data.multiplier === superEffectiveDamageMultiplier) {
            label.classList.replace("bg-slate-900", "bg-red-600");
        }
        if(data.multiplier === immuneDamageMultiplier) {
            label.classList.replace("bg-slate-900", "bg-gray-100");
            label.classList.replace("text-white", "text-slate-950");
        }

        label.textContent = immuneDamageMultiplier === data.multiplier ? "Immunisé" : typeAffinityLabel;

        damageFactorContainer.append(cloneHighlight);
    }

    return template;
}

export const createAlternateForm = (template, data, event) => {
    const url = new URL(location.origin);
    url.searchParams.set("id", data.pokedex_id);
    const imgTag = template.querySelector("img");
    replaceImage(imgTag, data.sprite);
    imgTag.alt = `sprite de ${data.name.fr} forme ${data.region}`;
    imgTag.fetchPriority = "low";
    template.querySelector("[data-pkmn-name]").textContent = `${data.name.fr}`;

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
    aTag.addEventListener("click", (e) => event(e, data.region));

    return template;
}

export const hocusClassRegex = /\shocus.+/;

export const createSibling = ({template, data, isCurrentPkmn, isPreviousPkmn, event}) => {
    const li = template.querySelector("li");

    li.classList.toggle("shrink-0", isCurrentPkmn);
    li.classList.toggle("hidden", isCurrentPkmn);
    li.classList.toggle("sm:[display:revert]", isCurrentPkmn);
    li.classList.toggle("grow", !isCurrentPkmn);
    li.classList.toggle("basis-0", !isCurrentPkmn);

    if (Object.keys(data || {}).length > 0) {
        const imgTag = template.querySelector("img");
        const encodedData = window.btoa(
            loadingImageRaw.replaceAll(
                "#037ef3",
                window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(data.types[0].name)}`)
            )
        );
        imgTag.src = `data:image/svg+xml;base64,${encodedData}`;
        imgTag.alt = `sprite de ${data.name.fr}`;
        imgTag.classList.toggle("hidden", isCurrentPkmn);
        replaceImage(imgTag, data.sprites.regular);

        const name = template.querySelector("[data-name]");
        name.textContent = data.name.fr;

        const pkmnId = template.querySelector("[data-id]");
        pkmnId.textContent = `#${data.pokedex_id}`;
        pkmnId.classList.add("text-right");
        if (isCurrentPkmn) {
            pkmnId.classList.replace("text-right", "text-center");
        }
        if (isPreviousPkmn) {
            pkmnId.classList.replace("text-right", "text-left");
        }

        const siblingUrl = new URL(location);
        siblingUrl.searchParams.set("id", data.pokedex_id);
        siblingUrl.searchParams.delete("region");
        siblingUrl.searchParams.delete("alternate_form_id");

        const aTag = template.querySelector("a");
        aTag.href = siblingUrl;
        aTag.dataset.pokemonData = JSON.stringify(data);
        aTag.addEventListener("click", (e) => event(e));
        aTag.classList.add(...[
            typesBorderColor[`${cleanString(data.types[0].name)}_${cleanString(data.types[1]?.name || data.types?.[0].name)}`]
        ]);

        if (!isCurrentPkmn) {
            aTag.dataset.testid = isPreviousPkmn ? "previous-pkmn" : "next-pkmn";

            const arrow = document.createElement("p");
            arrow.textContent = isPreviousPkmn ? "◄" : "►";
            arrow.classList.add(...[
                isPreviousPkmn ? "-mr-3.5" : "-ml-3.5",
                "arrow",
                "group-hocus:scale-120",
                typesTextColorGroupHocus[cleanString(data.types[0].name)],
            ]);

            aTag.prepend(arrow);
        } else {
            const divTag = document.createElement('div');
            divTag.innerHTML = aTag.innerHTML;
            divTag.classList = aTag.classList;
            divTag.className = divTag.className.replace(hocusClassRegex, ' ')
            divTag.classList.remove("ripple-effect");
            divTag.classList.add("font-bold");
            aTag.parentNode.replaceChild(divTag, aTag);
        }
    }

    li.inert = Object.keys(data || {}).length === 0;

    return template;
};

export const createStatisticEntry = (template, data) => {
    const statName = template.querySelector("[data-stat-name]");
    const statValue = template.querySelector("[data-stat-value]");
    const statBar = template.querySelector("[data-stat-bar]");

    const alpha = 0.45;

    statName.textContent = data.statistics[data.stat.name].name;
    statName.style.backgroundColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / ${alpha})`;
    statName.setAttribute("aria-label", `${data.statistics[data.stat.name].name} de base ${data.base_stat}`);
    statName.style.borderColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / ${alpha})`;

    statValue.textContent = data.base_stat;
    statValue.style.borderColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / ${alpha})`;
    statValue.style.backgroundColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / ${alpha})`;

    statBar.querySelector("div").style.width = `${data.base_stat}px`;
    statBar.querySelector("div").style.backgroundColor = data.statistics[data.stat.name].color;
    statBar.style.backgroundColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / ${alpha})`;
    statBar.style.borderColor = `rgb(from ${data.statistics[data.stat.name].color} r g b / ${alpha})`;

    return { bar: statBar, value: statValue, name: statName }
}

export const getAbilityForLang = (ability, lang = "fr") => {
    const name = ability.names.filter((item) => item.language.name === lang)[0].name;
    const description = ability.flavor_text_entries.filter((item) => item.language.name === lang).at(-1).flavor_text;

    return { name: { fr: name, en: ability.name }, description, id: ability.id };
}

export const getExternalDataForLang = (externalData, lang = "fr") => {
    return {
        ...externalData,
        flavor_text_entries: externalData.flavor_text_entries.filter((item) => item.language.name === lang),
    };
}
