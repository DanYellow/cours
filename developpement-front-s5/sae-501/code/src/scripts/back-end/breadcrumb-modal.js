const listDisplayDetailsBreadcrumbBtn = document.querySelectorAll(
    "[data-display-details-breadcrumb]"
);
const modal = document.querySelector("[data-modal]");
const tplId = "breadcrumb-details";
const modalTemplate = document.querySelector(`[data-tpl-id='${tplId}']`);
const modalTemplateContent = modalTemplate.content.cloneNode(true);

listDisplayDetailsBreadcrumbBtn.forEach((item) => {
    item.addEventListener("click", async (e) => {
        modal.dataset.modal = tplId;
        const breadcrumbContentRaw = e.currentTarget.dataset.displayDetailsBreadcrumb;
        const breadcrumbContent = breadcrumbContentRaw.split(",");

        const breadcrumbList = modalTemplateContent.querySelector(
            "[data-content-list]"
        );

        const breadcrumbListItemTemplate = document.querySelector(
            "[data-tpl-id='breadcrumb-item']"
        );
        
        breadcrumbContent.forEach((breadcrumbItem) => {
            const breadcrumbListItemTemplateContent = breadcrumbListItemTemplate.content.cloneNode(true);
            breadcrumbListItemTemplateContent.querySelector("a").textContent = breadcrumbItem;

            breadcrumbList.append(breadcrumbListItemTemplateContent);
        });

        while (modal.firstChild) {
            modal.removeChild(modal.firstChild);
        }

        modal.append(modalTemplateContent.cloneNode(true));
        modal.showModal();
    });
});
