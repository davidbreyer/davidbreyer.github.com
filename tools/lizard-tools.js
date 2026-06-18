(function () {
  const tools = [
    {
      id: "format-lizard",
      name: "Format Lizard",
      url: "https://www.davidbreyer.com/format-lizard/",
      description: "Format JSON, XML, YAML, and CSS in the browser."
    },
    {
      id: "compare-lizard",
      name: "Compare Lizard",
      url: "https://www.davidbreyer.com/compare-lizard/",
      description: "Compare JSON and XML payloads side by side."
    },
    {
      id: "mock-lizard",
      name: "Mock Lizard",
      url: "https://www.davidbreyer.com/mock-lizard/",
      description: "Generate realistic mock API data from sample JSON."
    },
    {
      id: "duplicate-lizard",
      name: "Duplicate Lizard",
      url: "https://www.davidbreyer.com/duplicate-lizard/",
      description: "Find repeated identifiers and duplicate-like XML entries."
    },
    {
      id: "datetime-lizard",
      name: "DateTime Lizard",
      url: "https://www.davidbreyer.com/datetime-lizard/",
      description: "Convert dates for .NET, SQL Server, LINQ, and API work."
    }
  ];

  function inferCurrentTool() {
    const path = window.location.pathname.toLowerCase();
    const match = tools.find((tool) => path.includes(`/${tool.id}/`));
    return match ? match.id : "";
  }

  function getCurrentTool(menu) {
    return menu.dataset.currentTool || document.body.dataset.currentTool || inferCurrentTool();
  }

  function renderToolMenus() {
    document.querySelectorAll(".tools-menu").forEach((menu) => {
      const list = menu.querySelector(".tools-menu-list");

      if (!list) {
        return;
      }

      const currentTool = getCurrentTool(menu);
      const fragment = document.createDocumentFragment();
      const hubLink = document.createElement("a");

      hubLink.href = "https://www.davidbreyer.com/tools/";
      hubLink.textContent = "All Tools";
      fragment.append(hubLink);

      tools.forEach((tool) => {
        const link = document.createElement("a");
        link.href = tool.url;
        link.textContent = tool.name;

        if (tool.id === currentTool) {
          link.setAttribute("aria-current", "page");
        }

        fragment.append(link);
      });

      list.textContent = "";
      list.append(fragment);
    });
  }

  function renderToolHub() {
    const grid = document.querySelector("#toolGrid");

    if (!grid) {
      return;
    }

    const fragment = document.createDocumentFragment();

    tools.forEach((tool, index) => {
      const card = document.createElement("a");
      const number = document.createElement("span");
      const name = document.createElement("span");
      const description = document.createElement("span");

      card.className = "tool-card";
      card.href = tool.url;
      number.className = "tool-number";
      number.textContent = String(index + 1).padStart(2, "0");
      name.className = "tool-name";
      name.textContent = tool.name;
      description.className = "tool-desc";
      description.textContent = tool.description;

      card.append(number, name, description);
      fragment.append(card);
    });

    grid.textContent = "";
    grid.append(fragment);
  }

  function render() {
    renderToolMenus();
    renderToolHub();
  }

  window.LizardTools = {
    tools,
    renderToolMenus,
    renderToolHub,
    render
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
