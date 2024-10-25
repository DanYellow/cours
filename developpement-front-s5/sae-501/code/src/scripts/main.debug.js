import "/src/styles/base.css";
import "/src/styles/tailwind.css";
import "/src/styles/back-end/index.css";

const tableRoutes = document.querySelector("[data-table-routes] tbody");
const tableRoutesRows = tableRoutes?.querySelectorAll("tr");
const input = document.querySelector("[data-route-search]");

const filterTable = (inputValue) => {
    tableRoutesRows.forEach((item) => {
        const cellRow = item.querySelector('[data-label="NAME"]');
        if (cellRow) {
            if (
                cellRow.innerText
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                    || inputValue === ""
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        }
    });

    const tableRoutesRowsVisible
        = tableRoutes.querySelectorAll("tr:not(.hidden)");
    tableRoutesRowsVisible.forEach((item, idx) => {
        item.classList.remove(...item.classList);
        if (idx % 2 === 0) {
            item.classList.add("bg-slate-50", "dark:bg-slate-500");
        }
        item.classList.add("hover:bg-neutral-100", "dark:hover:bg-gray-600");
    });
};

if (input) {
    const queryKey = "route_name";
    filterTable(input.value);

    input.addEventListener("input", (e) => {
        const inputValue = e.target.value.trim();
        const url = new URL(window.location);
        url.searchParams.set(queryKey, inputValue);
        if (inputValue === "") {
            url.searchParams.delete(queryKey);
        }

        history.replaceState(null, "", url);

        filterTable(inputValue);
    });
}


document.querySelectorAll("[data-file]").forEach((item) => {
    item.addEventListener("click", async (e) => {
        const req = await fetch(e.currentTarget.dataset.file, { method: "GET" });
        const res = await req.json();

        if (res.url) {
            window.location.href = res.url;
        }
    });
});


(() => {
    const url = new URL(window.location);
    const tabIndex = Number(url.searchParams?.get("t") || 0);

    const openTab = (e, idx) => {
        document.querySelectorAll("[data-tab-content]").forEach((item) => {
            item.style.display = "none";
        });

        document.querySelectorAll("[data-tab-name]").forEach((item) => {
            item.classList.remove("active-tab");
        });

        document.querySelector(
            `[data-tab-content="${e.target.dataset.tabName}"]`
        ).style.display = "block";
        document
            .querySelector(`[data-tab-name="${e.target.dataset.tabName}"]`)
            .classList.add("active-tab")

        url.searchParams.set("t", idx);
        history.replaceState(null, "", url);
    };

    if (document.querySelectorAll("[data-tab-content]").length) {
        document.querySelectorAll("[data-tab-content]").forEach((item) => {
            item.style.display = "none";
        });

        document.querySelectorAll("[data-tab-content]")[tabIndex].style.display = "block";
        document.querySelectorAll("[data-tab-name]")[tabIndex].classList.add("active-tab");
    }

    document.querySelectorAll("[data-tab-name]").forEach((item, idx) => {
        item.addEventListener("click", (e) => openTab(e, idx));
    });
})();

