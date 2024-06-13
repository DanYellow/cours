import "/src/styles/base.css";
import "/src/styles/tailwind.css";
import "/src/styles/back-end/index.scss";

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
                    .includes(inputValue.toLowerCase()) ||
                inputValue === ""
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        }
    });

    const tableRoutesRowsVisible =
        tableRoutes.querySelectorAll("tr:not(.hidden)");
    tableRoutesRowsVisible.forEach((item, idx) => {
        item.classList.remove(...item.classList);
        if (idx % 2 === 0) {
            item.classList.add("bg-slate-50", "dark:bg-slate-500");
        }
        item.classList.add("hover:bg-neutral-50", "dark:hover:bg-gray-600");
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

const openFileBtn = document.querySelector("[data-file]");
if (openFileBtn) {
    openFileBtn.addEventListener("click", (e) => {
        fetch(e.currentTarget.dataset.file, { method: "GET" });
    });
}
