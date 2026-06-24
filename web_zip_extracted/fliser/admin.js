(function () {
  const group1List = document.getElementById("adminGroup1List");
  const group2List = document.getElementById("adminGroup2List");
  const adminBackLink = document.getElementById("adminBackLink");
  const labelField = document.getElementById("labelField");
  const propertyField = document.getElementById("propertyField");
  const groupPicker = document.getElementById("groupPicker");
  const suffixPicker = document.getElementById("suffixPicker");
  const newPropertyButton = document.getElementById("newPropertyButton");
  const deletePropertyButton = document.getElementById("deletePropertyButton");
  const newItemButton = document.getElementById("newItemButton");
  const deleteItemButton = document.getElementById("deleteItemButton");
  const saveAdminButton = document.getElementById("saveAdminButton");
  const adminStatus = document.getElementById("adminStatus");
  const keyboard = document.querySelector(".admin-keyboard");
  const fieldMeasure = document.createElement("span");

  const DEFAULT_PROPERTIES = ["L", "L6", "M", "R7", "R8", "7"];
  const MAIN_REFRESH_FLAG = "fliser-main-refresh";

  const state = {
    items: [],
    properties: [],
    selectedId: null,
    selectedProperty: "",
    selectedPropertyIndex: -1,
    propertyEditOriginal: "",
    propertyEditTarget: "",
    propertyEditIsNew: false,
    activeField: null,
    labelCaret: 0,
    propertyCaret: 0,
    dirty: false,
    nextId: 1
  };

  const drag = {
    pending: null,
    active: false,
    itemId: null,
    sourceEl: null,
    previewEl: null,
    placeholderEl: null,
    pointerId: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    targetGroup: null,
    targetBeforeId: null,
    suppressClickUntil: 0
  };

  init().catch((error) => {
    setStatus(error.message || "Kunne ikke laste admin.", true);
  });

  async function init() {
    fieldMeasure.className = "admin-text-measure";
    document.body.appendChild(fieldMeasure);

    const [{ group1, group2 }, properties] = await Promise.all([
      readShiftFile(),
      readPropertiesFile()
    ]);

    state.items = [
      ...group1.map((entry) => createItemFromRaw(entry, "GROUP1")),
      ...group2.map((entry) => createItemFromRaw(entry, "GROUP2"))
    ];
    state.properties = getMergedProperties(properties, state.items);
    state.selectedId = null;
    state.selectedProperty = "";
    state.selectedPropertyIndex = -1;
    state.propertyEditOriginal = "";
    state.propertyEditTarget = "";
    state.propertyEditIsNew = false;
    bindEvents();
    render();
  }

  async function readShiftFile() {
    const response = await fetch(`./skift.txt?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Kunne ikke lese skift.txt");
    }

    const text = await response.text();
    return {
      group1: parseGroup(text, "GROUP1"),
      group2: parseGroup(text, "GROUP2")
    };
  }

  async function readPropertiesFile() {
    try {
      const response = await fetch(`./egenskaper.json?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) {
        return [...DEFAULT_PROPERTIES];
      }

      const data = await response.json();
      return Array.isArray(data)
        ? data.map((value) => String(value).trim()).filter(Boolean)
        : [...DEFAULT_PROPERTIES];
    } catch {
      return [...DEFAULT_PROPERTIES];
    }
  }

  function parseGroup(text, groupName) {
    const line = text
      .split(/\r?\n/)
      .find((entry) => new RegExp(`\\b${groupName}\\b`, "i").test(entry));

    if (!line) {
      return [];
    }

    const start = line.indexOf("[");
    const end = line.lastIndexOf("]");
    if (start === -1 || end === -1 || end <= start) {
      return [];
    }

    return line.slice(start + 1, end)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  function createItemFromRaw(raw, group) {
    const lastSpaceIndex = raw.lastIndexOf(" ");
    const label = lastSpaceIndex === -1 ? raw.trim() : raw.slice(0, lastSpaceIndex).trim();
    const suffix = lastSpaceIndex === -1 ? "" : raw.slice(lastSpaceIndex + 1).trim();

    return {
      id: `item-${state.nextId++}`,
      label,
      suffix,
      group
    };
  }

  function getMergedProperties(properties, items) {
    const merged = new Set([...DEFAULT_PROPERTIES, ...properties]);
    items.forEach((item) => {
      if (item.suffix) {
        merged.add(item.suffix);
      }
    });
    return Array.from(merged);
  }

  function bindEvents() {
    bindEditableField(labelField, "label");
    bindEditableField(propertyField, "property");

    group1List.addEventListener("click", handleListBackgroundClick);
    group2List.addEventListener("click", handleListBackgroundClick);

    newPropertyButton.addEventListener("click", createNewProperty);
    deletePropertyButton.addEventListener("click", deleteSelectedProperty);
    newItemButton.addEventListener("click", createNewItem);
    deleteItemButton.addEventListener("click", deleteSelectedItem);
    saveAdminButton.addEventListener("click", saveChanges);
    adminBackLink.addEventListener("click", handleBackNavigation);

    document.addEventListener("pointermove", handlePointerMove, { passive: false });
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", cancelDrag);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", forceDragCleanup);

    groupPicker.addEventListener("click", (event) => {
      const button = event.target.closest("[data-group]");
      const selected = getSelectedItem();
      if (!button || !selected) {
        return;
      }

      selected.group = button.dataset.group;
      markDirty();
      render();
    });

    suffixPicker.addEventListener("click", (event) => {
      const button = event.target.closest("[data-suffix]");
      const selected = getSelectedItem();
      if (!button) {
        return;
      }

      state.selectedProperty = button.dataset.suffix;
      state.selectedPropertyIndex = Number(button.dataset.index);
      state.propertyEditOriginal = state.selectedProperty;
      state.propertyEditTarget = state.selectedProperty;
      state.propertyEditIsNew = false;
      state.activeField = "property";
      syncCaretToEnd("property");
      if (selected) {
        selected.suffix = state.selectedProperty;
        markDirty();
      }
      render();
    });

    keyboard.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) {
        return;
      }

      const action = button.dataset.action;
      if (action) {
        handleKeyboardAction(action);
        return;
      }

      const key = button.dataset.key;
      if (!key) {
        return;
      }

      appendKey(key);
    });
  }

  function render() {
    renderShiftList(group1List, "GROUP1");
    renderShiftList(group2List, "GROUP2");
    renderEditor();
  }

  function renderShiftList(container, group) {
    container.innerHTML = "";

    const items = state.items.filter((item) => item.group === group);
    items.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "admin-loyve";
      button.dataset.id = item.id;
      button.dataset.group = group;
      if (item.id === state.selectedId) {
        button.classList.add("is-selected");
      }

      const label = document.createElement("span");
      label.className = "admin-loyve-label";
      label.textContent = item.label || "Tomt l\u00F8yve";

      const suffix = document.createElement("span");
      suffix.className = "admin-loyve-suffix";
      suffix.textContent = item.suffix || "-";

      button.append(label, suffix);
      button.addEventListener("pointerdown", (event) => startPendingDrag(event, item.id, button));
      button.addEventListener("click", () => {
        if (Date.now() < drag.suppressClickUntil) {
          return;
        }

        if (state.selectedId === item.id) {
          clearSelection();
          render();
          return;
        }

        state.selectedId = item.id;
        state.activeField = "label";
        syncCaretToEnd("label");
        if (item.suffix) {
          state.selectedProperty = item.suffix;
          state.selectedPropertyIndex = state.properties.findIndex((property) => property === item.suffix);
          state.propertyEditOriginal = item.suffix;
          state.propertyEditTarget = item.suffix;
          state.propertyEditIsNew = false;
        }
        setStatus("");
        render();
      });
      container.appendChild(button);
    });
  }

  function renderEditor() {
    const selected = getSelectedItem();
    const hasSelection = Boolean(selected);
    const hasPropertySelection = Boolean(state.selectedProperty);

    renderEditableField(
      labelField,
      hasSelection ? (selected.label || "Tomt l\u00F8yve") : "Velg eller opprett et l\u00F8yve",
      hasSelection ? selected.label : "",
      "label",
      !hasSelection || !selected.label
    );
    labelField.classList.toggle("is-active", state.activeField === "label");

    renderEditableField(
      propertyField,
      hasPropertySelection ? state.selectedProperty : "Velg eller opprett en egenskap",
      hasPropertySelection ? state.selectedProperty : "",
      "property",
      !hasPropertySelection
    );
    propertyField.classList.toggle("is-active", state.activeField === "property");

    deleteItemButton.disabled = !hasSelection;
    saveAdminButton.disabled = state.items.length === 0;
    deletePropertyButton.disabled = !hasPropertySelection || state.properties.length <= 1;

    groupPicker.querySelectorAll("[data-group]").forEach((button) => {
      const active = hasSelection && button.dataset.group === selected.group;
      button.classList.toggle("is-active", active);
      button.disabled = !hasSelection;
    });

    renderPropertyOptions(selected);
  }

  function renderPropertyOptions(selectedItem) {
    suffixPicker.innerHTML = "";

    state.properties.forEach((property, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "admin-chip";
      button.dataset.suffix = property;
      button.dataset.index = String(index);
      button.textContent = property;
      if (index === state.selectedPropertyIndex) {
        button.classList.add("is-selected-option");
      }
      if (selectedItem && property === selectedItem.suffix) {
        button.classList.add("is-active");
      }
      suffixPicker.appendChild(button);
    });
  }

  function createNewItem() {
    const selected = getSelectedItem();
    const item = {
      id: `item-${state.nextId++}`,
      label: "",
      suffix: state.selectedProperty || state.properties[0] || "",
      group: selected ? selected.group : "GROUP1"
    };

    const insertIndex = selected ? state.items.findIndex((entry) => entry.id === selected.id) + 1 : state.items.length;
    state.items.splice(insertIndex, 0, item);
    state.selectedId = item.id;
    state.activeField = "label";
    syncCaretToEnd("label");
    markDirty();
    setStatus("Nytt l\u00F8yve opprettet. Dra det til riktig plass.");
    render();
  }

  function deleteSelectedItem() {
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }

    const index = state.items.findIndex((item) => item.id === selected.id);
    state.items.splice(index, 1);
    state.selectedId = state.items[index]?.id || state.items[index - 1]?.id || null;
    markDirty();
    syncCaretToEnd("label");
    setStatus("L\u00F8yve slettet.");
    render();
  }

  function createNewProperty() {
    state.properties.push("");
    state.selectedProperty = "";
    state.selectedPropertyIndex = state.properties.length - 1;
    state.propertyEditOriginal = "";
    state.propertyEditTarget = "";
    state.propertyEditIsNew = true;
    state.activeField = "property";
    syncCaretToEnd("property");
    markDirty();
    setStatus("Ny egenskap opprettet.");
    render();
  }

  function deleteSelectedProperty() {
    if (state.selectedPropertyIndex < 0 || state.properties.length <= 1) {
      return;
    }

    const propertyToRemove = state.properties[state.selectedPropertyIndex] || "";
    state.properties.splice(state.selectedPropertyIndex, 1);
    const fallback = state.properties[0] || "";
    state.items.forEach((item) => {
      if (item.suffix === propertyToRemove) {
        item.suffix = fallback;
      }
    });
    state.selectedProperty = fallback;
    state.selectedPropertyIndex = state.properties.length ? 0 : -1;
    state.propertyEditOriginal = fallback;
    state.propertyEditTarget = fallback;
    state.propertyEditIsNew = false;
    markDirty();
    setStatus("Egenskap slettet.");
    render();
  }

  function appendKey(key) {
    if (state.activeField === "property") {
      const value = state.selectedProperty || "";
      applyPropertyEdit(insertAt(value, state.propertyCaret, key));
      state.propertyCaret += key.length;
      return;
    }

    const selected = getSelectedItem();
    if (!selected) {
      setStatus("Opprett eller velg et l\u00F8yve for \u00E5 skrive.", true);
      return;
    }

    selected.label = insertAt(selected.label, state.labelCaret, key);
    state.labelCaret += key.length;
    markDirty();
    render();
  }

  function handleKeyboardAction(action) {
    if (state.activeField === "property") {
      if (!state.selectedProperty && action !== "clear") {
        return;
      }

      if (action === "backspace") {
        if (state.propertyCaret <= 0) {
          return;
        }
        applyPropertyEdit(removeBeforeCaret(state.selectedProperty, state.propertyCaret));
        state.propertyCaret -= 1;
        return;
      } else if (action === "space") {
        applyPropertyEdit(insertAt(state.selectedProperty, state.propertyCaret, " "));
        state.propertyCaret += 1;
        return;
      } else if (action === "clear") {
        applyPropertyEdit("");
        state.propertyCaret = 0;
        return;
      }
    }

    const selected = getSelectedItem();
    if (!selected) {
      return;
    }

    if (action === "backspace") {
      if (state.labelCaret <= 0) {
        return;
      }
      selected.label = removeBeforeCaret(selected.label, state.labelCaret);
      state.labelCaret -= 1;
    } else if (action === "space") {
      selected.label = insertAt(selected.label, state.labelCaret, " ");
      state.labelCaret += 1;
    } else if (action === "clear") {
      selected.label = "";
      state.labelCaret = 0;
    }

    markDirty();
    render();
  }

  function handleDocumentKeyDown(event) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    const target = event.target;
    if (target instanceof HTMLElement) {
      const tagName = target.tagName;
      if (tagName === "INPUT" || tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
    }

    if (!state.activeField) {
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      handleKeyboardAction("backspace");
      return;
    }

    if (event.key === "Delete") {
      event.preventDefault();
      handleKeyboardAction("clear");
      return;
    }

    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      handleKeyboardAction("space");
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCaretBy(-1);
      renderEditor();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCaretBy(1);
      renderEditor();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setCaretPosition(0);
      renderEditor();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      syncCaretToEnd(state.activeField);
      renderEditor();
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      appendKey(event.key);
    }
  }

  function moveCaretBy(delta) {
    if (state.activeField === "property") {
      state.propertyCaret = clampCaret(state.propertyCaret + delta, (state.selectedProperty || "").length);
      return;
    }

    state.labelCaret = clampCaret(state.labelCaret + delta, (getSelectedItem()?.label || "").length);
  }

  function setCaretPosition(position) {
    if (state.activeField === "property") {
      state.propertyCaret = clampCaret(position, (state.selectedProperty || "").length);
      return;
    }

    state.labelCaret = clampCaret(position, (getSelectedItem()?.label || "").length);
  }

  function applyPropertyEdit(nextValue) {
    const previousValue = state.propertyEditIsNew ? "" : state.propertyEditTarget;
    const normalizedNextValue = nextValue;

    if (state.selectedPropertyIndex >= 0 && state.selectedPropertyIndex < state.properties.length) {
      state.properties[state.selectedPropertyIndex] = normalizedNextValue;
    } else {
      state.properties.push(normalizedNextValue);
      state.selectedPropertyIndex = state.properties.length - 1;
    }

    if (previousValue && previousValue !== normalizedNextValue) {
      state.items.forEach((item) => {
        if (item.suffix === previousValue) {
          item.suffix = normalizedNextValue;
        }
      });
    }

    state.selectedProperty = normalizedNextValue;
    state.propertyEditOriginal = normalizedNextValue;
    if (!state.propertyEditIsNew) {
      state.propertyEditTarget = normalizedNextValue;
    }

    const selected = getSelectedItem();
    if (selected) {
      selected.suffix = normalizedNextValue;
    }

    markDirty();
    render();
  }

  function handleListBackgroundClick(event) {
    if (event.target.closest(".admin-loyve")) {
      return;
    }

    clearSelection();
    render();
  }

  function clearSelection() {
    state.selectedId = null;
    state.selectedProperty = "";
    state.selectedPropertyIndex = -1;
    state.propertyEditOriginal = "";
    state.propertyEditTarget = "";
    state.propertyEditIsNew = false;
    state.activeField = null;
    state.labelCaret = 0;
    state.propertyCaret = 0;
    setStatus("");
  }

  function renderEditableField(field, placeholderText, value, fieldName, isPlaceholder) {
    field.innerHTML = "";
    field.classList.toggle("is-placeholder", isPlaceholder);

    if (state.activeField !== fieldName) {
      const text = document.createElement("span");
      text.className = isPlaceholder ? "admin-field-placeholder" : "admin-field-content";
      text.textContent = isPlaceholder ? placeholderText : value;
      field.appendChild(text);
      return;
    }

    const safeValue = value || "";
    const caretIndex = clampCaret(fieldName === "label" ? state.labelCaret : state.propertyCaret, safeValue.length);
    if (fieldName === "label") {
      state.labelCaret = caretIndex;
    } else {
      state.propertyCaret = caretIndex;
    }

    const before = document.createElement("span");
    before.className = "admin-field-content";
    before.textContent = safeValue.slice(0, caretIndex);

    const caret = document.createElement("span");
    caret.className = "admin-caret";
    caret.setAttribute("aria-hidden", "true");

    const after = document.createElement("span");
    after.className = "admin-field-content";
    after.textContent = safeValue.slice(caretIndex);

    field.append(before, caret, after);

    if (!safeValue) {
      const placeholder = document.createElement("span");
      placeholder.className = "admin-field-placeholder admin-field-placeholder-overlay";
      placeholder.textContent = placeholderText;
      field.appendChild(placeholder);
    }
  }

  function bindEditableField(field, fieldName) {
    let pointerId = null;

    field.addEventListener("pointerdown", (event) => {
      state.activeField = fieldName;
      setCaretFromPoint(fieldName, field, event.clientX);
      pointerId = event.pointerId;
      field.setPointerCapture?.(event.pointerId);
      renderEditor();
    });

    field.addEventListener("pointermove", (event) => {
      if (pointerId !== event.pointerId) {
        return;
      }

      setCaretFromPoint(fieldName, field, event.clientX);
      renderEditor();
    });

    const finishPointer = (event) => {
      if (pointerId !== event.pointerId) {
        return;
      }

      field.releasePointerCapture?.(event.pointerId);
      pointerId = null;
    };

    field.addEventListener("pointerup", finishPointer);
    field.addEventListener("pointercancel", finishPointer);
  }

  function setCaretFromPoint(fieldName, field, clientX) {
    const rect = field.getBoundingClientRect();
    const value = fieldName === "label"
      ? (getSelectedItem()?.label || "")
      : (state.selectedProperty || "");
    const nextCaret = getCaretIndexFromX(field, value, clientX - rect.left);

    if (fieldName === "label") {
      state.labelCaret = nextCaret;
    } else {
      state.propertyCaret = nextCaret;
    }
  }

  function getCaretIndexFromX(field, value, localX) {
    const styles = window.getComputedStyle(field);
    fieldMeasure.style.fontFamily = styles.fontFamily;
    fieldMeasure.style.fontSize = styles.fontSize;
    fieldMeasure.style.fontWeight = styles.fontWeight;
    fieldMeasure.style.letterSpacing = styles.letterSpacing;

    const text = value || "";
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const targetX = Math.max(0, localX - paddingLeft);

    for (let index = 0; index <= text.length; index += 1) {
      fieldMeasure.textContent = text.slice(0, index);
      if (targetX <= fieldMeasure.getBoundingClientRect().width) {
        return index;
      }
    }

    return text.length;
  }

  function syncCaretToEnd(fieldName) {
    if (fieldName === "label") {
      state.labelCaret = getSelectedItem()?.label.length || 0;
      return;
    }

    state.propertyCaret = (state.selectedProperty || "").length;
  }

  function clampCaret(index, maxLength) {
    return Math.max(0, Math.min(index, maxLength));
  }

  function insertAt(value, index, text) {
    const safeValue = value || "";
    const safeIndex = clampCaret(index, safeValue.length);
    return `${safeValue.slice(0, safeIndex)}${text}${safeValue.slice(safeIndex)}`;
  }

  function removeBeforeCaret(value, index) {
    const safeValue = value || "";
    const safeIndex = clampCaret(index, safeValue.length);
    if (safeIndex <= 0) {
      return safeValue;
    }

    return `${safeValue.slice(0, safeIndex - 1)}${safeValue.slice(safeIndex)}`;
  }

  function dedupeProperties(properties) {
    const seen = new Set();
    return properties.filter((property) => {
      const key = property.trim().toUpperCase();
      if (!key) {
        return true;
      }
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  function normalizeProperties(properties) {
    return dedupeProperties(properties.map((property) => property.trim()).filter(Boolean));
  }

  function startPendingDrag(event, itemId, element) {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    element.setPointerCapture?.(event.pointerId);
    drag.pending = {
      itemId,
      element,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY
    };
  }

  function handlePointerMove(event) {
    if (drag.pending && !drag.active) {
      const moveX = event.clientX - drag.pending.startX;
      const moveY = event.clientY - drag.pending.startY;
      if (Math.hypot(moveX, moveY) < 10) {
        return;
      }

      beginDrag(event, drag.pending);
      drag.pending = null;
    }

    if (!drag.active) {
      return;
    }

    event.preventDefault();
    positionPreview(event.clientX, event.clientY);
    updateDropTarget(event.clientX, event.clientY);
  }

  function beginDrag(event, pending) {
    const rect = pending.element.getBoundingClientRect();
    drag.active = true;
    drag.itemId = pending.itemId;
    drag.sourceEl = pending.element;
    drag.pointerId = pending.pointerId;
    drag.offsetX = event.clientX - rect.left;
    drag.offsetY = event.clientY - rect.top;
    drag.targetGroup = pending.element.dataset.group || null;
    drag.targetBeforeId = null;

    drag.previewEl = pending.element.cloneNode(true);
    drag.previewEl.classList.add("admin-loyve-preview");
    drag.previewEl.style.width = `${rect.width}px`;
    drag.previewEl.style.height = `${rect.height}px`;
    document.body.appendChild(drag.previewEl);

    drag.placeholderEl = document.createElement("div");
    drag.placeholderEl.className = "admin-loyve-placeholder";
    drag.placeholderEl.style.height = `${rect.height}px`;
    pending.element.after(drag.placeholderEl);
    pending.element.classList.add("is-dragging-origin");
    positionPreview(event.clientX, event.clientY);
    updateDropTarget(event.clientX, event.clientY);
  }

  function positionPreview(clientX, clientY) {
    if (!drag.previewEl) {
      return;
    }

    drag.previewEl.style.left = `${clientX - drag.offsetX}px`;
    drag.previewEl.style.top = `${clientY - drag.offsetY}px`;
  }

  function updateDropTarget(clientX, clientY) {
    const container = getShiftListFromPoint(clientX, clientY);
    if (!container) {
      return;
    }

    drag.targetGroup = container.id === "adminGroup1List" ? "GROUP1" : "GROUP2";

    const candidates = Array.from(container.querySelectorAll(".admin-loyve")).filter((button) => button !== drag.sourceEl);
    let beforeElement = null;

    if (candidates.length) {
      const firstRect = candidates[0].getBoundingClientRect();
      const lastRect = candidates[candidates.length - 1].getBoundingClientRect();

      if (clientY <= firstRect.top + firstRect.height / 2) {
        beforeElement = candidates[0];
      } else if (clientY > lastRect.top + lastRect.height / 2) {
        beforeElement = null;
      }
    }

    if (!beforeElement) {
      for (const candidate of candidates) {
        const rect = candidate.getBoundingClientRect();
        if (clientY < rect.top + rect.height / 2) {
          beforeElement = candidate;
          break;
        }
      }
    }

    drag.targetBeforeId = beforeElement ? beforeElement.dataset.id : null;
    if (beforeElement) {
      container.insertBefore(drag.placeholderEl, beforeElement);
    } else {
      container.appendChild(drag.placeholderEl);
    }
  }

  function getShiftListFromPoint(clientX, clientY) {
    const element = document.elementFromPoint(clientX, clientY);
    const directContainer = element?.closest(".admin-shift-list");
    if (directContainer) {
      return directContainer;
    }

    const containers = [group1List, group2List];
    for (const container of containers) {
      const rect = container.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        return container;
      }
    }

    return null;
  }

  function handlePointerUp() {
    if (drag.pending) {
      drag.pending = null;
      return;
    }

    if (!drag.active) {
      return;
    }

    finishDrag();
  }

  function finishDrag() {
    const itemId = drag.itemId;
    const targetGroup = drag.targetGroup;
    const targetBeforeId = drag.targetBeforeId;

    cleanupDrag();
    if (!itemId || !targetGroup) {
      return;
    }

    placeItem(itemId, targetGroup, targetBeforeId);
    drag.suppressClickUntil = Date.now() + 250;
    markDirty();
    render();
  }

  function cancelDrag() {
    drag.pending = null;
    if (!drag.active) {
      return;
    }

    cleanupDrag();
    render();
  }

  function cleanupDrag() {
    drag.active = false;
    if (drag.sourceEl) {
      drag.sourceEl.classList.remove("is-dragging-origin");
      if (drag.pointerId !== null) {
        drag.sourceEl.releasePointerCapture?.(drag.pointerId);
      }
    }
    drag.previewEl?.remove();
    drag.placeholderEl?.remove();
    drag.itemId = null;
    drag.sourceEl = null;
    drag.previewEl = null;
    drag.placeholderEl = null;
    drag.pointerId = null;
    drag.targetGroup = null;
    drag.targetBeforeId = null;
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      forceDragCleanup();
    }
  }

  function forceDragCleanup() {
    cancelDrag();
  }

  function placeItem(itemId, targetGroup, beforeItemId) {
    const currentIndex = state.items.findIndex((item) => item.id === itemId);
    if (currentIndex === -1) {
      return;
    }

    const [item] = state.items.splice(currentIndex, 1);
    item.group = targetGroup;

    let insertIndex = -1;
    if (beforeItemId) {
      insertIndex = state.items.findIndex((entry) => entry.id === beforeItemId);
    }

    if (insertIndex === -1) {
      const lastTargetIndex = findLastIndex(state.items, (entry) => entry.group === targetGroup);
      if (lastTargetIndex !== -1) {
        insertIndex = lastTargetIndex + 1;
      } else if (targetGroup === "GROUP1") {
        const firstGroup2Index = state.items.findIndex((entry) => entry.group === "GROUP2");
        insertIndex = firstGroup2Index === -1 ? state.items.length : firstGroup2Index;
      } else {
        insertIndex = state.items.length;
      }
    }

    state.items.splice(insertIndex, 0, item);
  }

  function findLastIndex(items, predicate) {
    for (let index = items.length - 1; index >= 0; index -= 1) {
      if (predicate(items[index])) {
        return index;
      }
    }

    return -1;
  }

  async function saveChanges() {
    const validationError = validateState();
    if (validationError) {
      setStatus(validationError, true);
      return;
    }

    const payload = {
      group1: state.items.filter((item) => item.group === "GROUP1").map(formatItemForFile),
      group2: state.items.filter((item) => item.group === "GROUP2").map(formatItemForFile),
      properties: normalizeProperties(state.properties)
    };

    saveAdminButton.disabled = true;
    setStatus("Lagrer...");

    try {
      const response = await fetch("./save_skift.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Lagring feilet.");
      }

      state.dirty = false;
      localStorage.setItem(MAIN_REFRESH_FLAG, String(Date.now()));
      setStatus("Lagret til skift.txt og egenskaper.");
    } catch (error) {
      setStatus(error.message || "Lagring feilet.", true);
    } finally {
      saveAdminButton.disabled = false;
    }
  }

  function validateState() {
    if (!state.items.length) {
      return "Det m\u00E5 finnes minst ett l\u00F8yve.";
    }

    const cleanedProperties = state.properties.map((property) => property.trim()).filter(Boolean);
    if (!cleanedProperties.length) {
      return "Det m\u00E5 finnes minst en egenskap.";
    }

    const uniqueProperties = new Set(cleanedProperties.map((property) => property.toUpperCase()));
    if (uniqueProperties.size !== cleanedProperties.length) {
      return "Egenskaper m\u00E5 v\u00E6re unike.";
    }

    for (const item of state.items) {
      if (!item.label.trim()) {
        return "Alle l\u00F8yver m\u00E5 ha et navn.";
      }
      if (!item.suffix.trim()) {
        return "Alle l\u00F8yver m\u00E5 ha egenskap.";
      }
    }

    return "";
  }

  function formatItemForFile(item) {
    return `${item.label.trim()} ${item.suffix.trim()}`;
  }

  function getSelectedItem() {
    return state.items.find((item) => item.id === state.selectedId) || null;
  }

  function markDirty() {
    state.dirty = true;
  }

  function handleBackNavigation(event) {
    event.preventDefault();
    const refreshToken = localStorage.getItem(MAIN_REFRESH_FLAG) || String(Date.now());
    window.location.replace(`./index.html?adminReturn=${encodeURIComponent(refreshToken)}`);
  }

  function setStatus(message, isError = false) {
    adminStatus.textContent = message;
    adminStatus.classList.toggle("is-error", Boolean(message) && isError);
    adminStatus.classList.toggle("is-success", Boolean(message) && !isError);
  }
})();

