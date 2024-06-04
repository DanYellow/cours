import "/src/styles/base.css";
import "/src/styles/tailwind.css";
import "/src/styles/back-end/index.scss";

const tableRoutes = document.querySelector("[data-table-routes] tbody");
const tableRoutesRows = tableRoutes.querySelectorAll("tr");

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
        if (idx % 2 === 0) {
            item.classList.remove(...item.classList);

            item.classList.add("bg-slate-50", "dark:bg-slate-500");
        } else {
            item.classList.remove(...item.classList);
            item.classList.add("hover:bg-neutral-50", "dark:hover:bg-gray-600");
        }
    });
};

document.querySelector("[data-route-search]").addEventListener("input", (e) => {
    const inputValue = e.target.value.trim();
    filterTable(inputValue)
});
