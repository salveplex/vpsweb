window.startKioskApp = function startKioskApp() {
  const queueList = document.getElementById("queueList");
  const queueEmpty = document.getElementById("queueEmpty");
  const group1List = document.getElementById("group1List");
  const group2List = document.getElementById("group2List");
  const sourceGroups = document.querySelector(".source-groups");
  const queuePanel = document.querySelector(".queue-panel");
  const sourcePanel = document.querySelector(".source-panel");
  const resetButton = document.getElementById("resetButton");
  const resetProgress = document.getElementById("resetProgress");
  const sleepButton = document.getElementById("sleepButton");
  const sleepOverlay = document.getElementById("sleepOverlay");
  const refreshButton = document.getElementById("refreshButton");
  const adminEntryButton = document.getElementById("adminEntryButton");
  const adminEntryProgress = document.getElementById("adminEntryProgress");

  const STORAGE_KEY = "fliser-kiosk-queue";
  const MAIN_REFRESH_FLAG = "fliser-main-refresh";
  const STATE_ENDPOINT = "./queue_state.php";
  const RESET_HOLD_MS = 1500;
  const ADMIN_HOLD_MS = 1500;
  const REFERENCE_WIDTH = 1080;
  const REFERENCE_HEIGHT = 1920;
  const ENABLE_TRANSFER_ANIMATION = false;

  const state = {
    group1: [],
    group2: [],
    queue: [],
    statuses: {},
    isSleeping: false,
    savedAt: 0
  };

  const drag = {
    active: false,
    moved: false,
    suppressClickUntil: 0,
    pending: null,
    pointerId: null,
    source: null,
    value: null,
    originalIndex: -1,
    dropIndex: -1,
    previewEl: null,
    placeholderEl: null,
    originEl: null,
    pointerOffsetX: 0,
    pointerOffsetY: 0,
    latestClientX: 0,
    latestClientY: 0,
    lastTouchX: 0,
    lastTouchY: 0,
    frameId: 0,
    queueZones: [],
    queueBounds: null,
    sourceBounds: null
  };

  const resetHold = {
    active: false,
    timer: null,
    startedAt: 0,
    rafId: 0,
    pointerId: null
  };

  const adminHold = {
    active: false,
    timer: null,
    startedAt: 0,
    rafId: 0,
    pointerId: null
  };

  const nativeDrag = {
    active: false,
    source: null,
    value: null,
    originalIndex: -1
  };

  const densityCache = {
    queueCount: -1,
    queueHeight: -1,
    sourceCount: -1,
    sourceHeight: -1
  };
  const sourceRowRegistry = new Map();

  let persistTimer = 0;
  let persistInFlight = null;
  let localPersistTimer = 0;
  let localPersistIdleId = 0;
  let pendingPersistPayload = null;

  async function init() {
    updateViewportScale();
    clearRefreshFlag();
    const [{ group1, group2 }, stored] = await Promise.all([
      readShiftFile(),
      loadPersistedState()
    ]);
    state.group1 = group1;
    state.group2 = group2;
    state.queue = stored.queue.filter((item) => isKnownValue(item, group1, group2));
    state.statuses = stored.statuses || {};
    state.savedAt = Number(stored.savedAt || 0);
    renderSourceLists();
    renderQueue({ syncSourceAvailability: false });
    updateSourceDensity();
    bindEvents();
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

  function isKnownValue(value, group1, group2) {
    return group1.includes(value) || group2.includes(value);
  }

  function bindEvents() {
    document.addEventListener("pointermove", handlePointerMove, { passive: false });
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", cancelDrag);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    document.addEventListener("touchcancel", handleTouchCancel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("touchcancel", handleTouchCancel, { passive: false });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", forceInteractionCleanup);
    window.addEventListener("resize", updateViewportScale);
    window.addEventListener("resize", updateQueueDensity);
    window.addEventListener("resize", updateSourceDensity);
    window.addEventListener("beforeunload", flushPersistedState);
    window.addEventListener("pagehide", flushPersistedState);
    window.addEventListener("pageshow", handlePageShow);

    resetButton.addEventListener("pointerdown", startResetHold);
    resetButton.addEventListener("pointerup", cancelResetHold);
    resetButton.addEventListener("pointerleave", cancelResetHold);
    resetButton.addEventListener("pointercancel", cancelResetHold);
    resetButton.addEventListener("touchstart", startResetHold, { passive: false });
    resetButton.addEventListener("touchend", cancelResetHold);
    resetButton.addEventListener("touchcancel", cancelResetHold);
    resetButton.addEventListener("contextmenu", preventDefaultAction);

    refreshButton.addEventListener("pointerup", handleRefreshPointerUp);
    refreshButton.addEventListener("click", handleRefreshClick);
    queueList.addEventListener("pointerdown", handleQueueListPointerDown);
    queueList.addEventListener("touchstart", handleQueueListTouchStart, { passive: false });
    queueList.addEventListener("pointerup", handleQueueListPointerUp);
    group1List.addEventListener("pointerdown", handleSourceListPointerDown);
    group1List.addEventListener("touchstart", handleSourceListTouchStart, { passive: false });
    group2List.addEventListener("pointerdown", handleSourceListPointerDown);
    group2List.addEventListener("touchstart", handleSourceListTouchStart, { passive: false });

    adminEntryButton.addEventListener("pointerdown", startAdminHold);
    adminEntryButton.addEventListener("pointerup", cancelAdminHold);
    adminEntryButton.addEventListener("pointerleave", cancelAdminHold);
    adminEntryButton.addEventListener("pointercancel", cancelAdminHold);
    adminEntryButton.addEventListener("touchstart", startAdminHold, { passive: false });
    adminEntryButton.addEventListener("touchend", cancelAdminHold);
    adminEntryButton.addEventListener("touchcancel", cancelAdminHold);
    adminEntryButton.addEventListener("contextmenu", preventDefaultAction);

    sleepButton.addEventListener("pointerup", handleSleepButtonPointerUp);
    sleepButton.addEventListener("touchend", handleSleepButtonTouchEnd);
    sleepButton.addEventListener("click", handleSleepButtonClick);
    sleepOverlay.addEventListener("pointerup", handleSleepOverlayPointerUp);
    sleepOverlay.addEventListener("touchend", handleSleepOverlayTouchEnd);
    sleepOverlay.addEventListener("click", handleSleepOverlayClick);
    sleepOverlay.addEventListener("pointerdown", handleSleepOverlayPointerDown, { passive: false });
  }

  function renderSourceLists() {
    sourceRowRegistry.clear();
    renderSourceGroup(group1List, state.group1);
    renderSourceGroup(group2List, state.group2);
    updateSourceAvailability();
  }

  function renderSourceGroup(container, values) {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    values.forEach((value) => {
      const row = createSourceRow(value);
      sourceRowRegistry.set(String(value), row);
      fragment.appendChild(row);
    });

    container.appendChild(fragment);
  }

  function addSourceValueToQueue(value, sourceElement = null) {
    if (drag.active || Date.now() < drag.suppressClickUntil || state.queue.includes(value)) {
      return;
    }

    const previousQueue = state.queue.slice();
    const fromRect = sourceElement ? sourceElement.getBoundingClientRect() : null;
    state.queue.push(value);
    if (!state.statuses[value]) {
      state.statuses[value] = "ready";
    }
    saveState();
    renderQueue({ previousQueue });
    if (fromRect) {
      const targetElement = findQueueCardElement(value);
      animateTransfer(fromRect, targetElement?.getBoundingClientRect(), sourceElement, targetElement);
    }
  }

  function renderQueue({ syncSourceAvailability = true, previousQueue = null } = {}) {
    queueList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    state.queue.forEach((value, index) => {
      fragment.appendChild(buildQueueItemElement(value, index));
    });

    queueList.appendChild(fragment);

    queueEmpty.hidden = state.queue.length > 0;
    if (syncSourceAvailability) {
      updateSourceAvailability(previousQueue);
    }
    updateQueueDensity();
  }

  function removeFromQueue(index, queueItemElement = null) {
    const previousQueue = state.queue.slice();
    const value = state.queue[index];
    const fromRect = queueItemElement ? queueItemElement.getBoundingClientRect() : null;
    const [removed] = state.queue.splice(index, 1);
    delete state.statuses[removed];
    saveState();
    renderQueue({ previousQueue });
    if (fromRect && value) {
      const targetElement = findSourceElement(value);
      animateTransfer(fromRect, targetElement?.getBoundingClientRect(), queueItemElement, targetElement);
    }
  }

  function startDragFromSource(event, value, element) {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    queuePendingDrag({
      source: "source",
      value,
      element,
      pointerEvent: event
    });
  }

  function startDragFromQueue(event, index, element) {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    queuePendingDrag({
      source: "queue",
      value: state.queue[index],
      element,
      pointerEvent: event,
      originalIndex: index
    });
  }

  function queuePendingDrag({ source, value, element, pointerEvent, originalIndex = -1 }) {
    const rect = element.getBoundingClientRect();
    drag.pending = {
      source,
      value,
      element,
      pointerId: pointerEvent.pointerId,
      originalIndex,
      startX: pointerEvent.clientX,
      startY: pointerEvent.clientY,
      startTarget: pointerEvent.target,
      pointerOffsetX: pointerEvent.clientX - rect.left,
      pointerOffsetY: pointerEvent.clientY - rect.top
    };
  }

  function beginDrag({ source, value, element, pointerEvent, originalIndex = -1, pointerOffsetX, pointerOffsetY }) {
    const rect = element.getBoundingClientRect();
    drag.active = true;
    drag.moved = false;
    drag.pending = null;
    drag.pointerId = pointerEvent.pointerId;
    drag.source = source;
    drag.value = value;
    drag.originalIndex = originalIndex;
    drag.originEl = element;
    drag.pointerOffsetX = pointerOffsetX ?? (pointerEvent.clientX - rect.left);
    drag.pointerOffsetY = pointerOffsetY ?? (pointerEvent.clientY - rect.top);
    drag.latestClientX = pointerEvent.clientX;
    drag.latestClientY = pointerEvent.clientY;
    drag.previewEl = createPreview({
      source,
      value,
      element,
      width: rect.width,
      height: rect.height
    });
    element.classList.add("dragging-origin");
    if (source === "queue") {
      element.style.display = "none";
      ensureQueuePlaceholder();
      moveQueuePlaceholder(originalIndex);
    }
    drag.queueBounds = getQueueBounds();
    drag.sourceBounds = sourcePanel.getBoundingClientRect();
    document.documentElement.style.touchAction = "none";
    document.body.style.touchAction = "none";

    document.body.appendChild(drag.previewEl);
    movePreview(pointerEvent.clientX, pointerEvent.clientY);
    pointerEvent.preventDefault();
  }

  function createPreview({ source, value, element, width, height }) {
    const preview = document.createElement("div");
    preview.className = `drag-preview drag-preview-${source}`;

    const label = document.createElement("span");
    label.className = "source-label";
    renderLabelContent(label, value);
    preview.appendChild(label);

    const contentWidth = Math.ceil(element.scrollWidth || width);
    const previewHeight = Math.max(Math.round(height), 56);
    const previewWidth = Math.max(Math.round(width), Math.min(contentWidth + 20, Math.round(width * 1.08)));
    preview.style.width = `${previewWidth}px`;
    preview.style.height = `${previewHeight}px`;
    return preview;
  }

  function buildQueueItemElement(value, index, staticPreview = false) {
    const item = document.createElement("div");
    item.className = "queue-item";
    item.dataset.value = String(value);
    item.dataset.index = String(index);

    const number = document.createElement("div");
    if (!staticPreview) {
      number.setAttribute("role", "button");
      number.setAttribute("aria-label", `Send ${value} tilbake til ute`);
      number.dataset.action = "remove";
    }
    number.className = "queue-number";
    number.textContent = String(index + 1);

    const status = getItemStatus(value);
    const card = document.createElement("div");
    if (!staticPreview) {
      card.setAttribute("role", "button");
      card.dataset.action = "drag";
    }
    card.className = `queue-card queue-card-${status}`;

    const icon = document.createElement("span");
    icon.className = `status-icon status-icon-${status}`;
    icon.setAttribute("aria-hidden", "true");
    applyStatusIcon(icon, status);

    const label = document.createElement("span");
    label.className = "item-label";
    renderLabelContent(label, value);

    const suffix = createSuffixBadge(value);
    suffix.classList.add(`suffix-badge-${status}`);
    if (!staticPreview) {
      suffix.dataset.action = "cycle-status";
    }

    card.append(icon, label);
    item.append(number, card, suffix);
    return item;
  }

  function handleSourceNativeDragStart(event) {
    const sourceItem = event.target instanceof Element ? event.target.closest(".source-item") : null;
    if (!sourceItem) {
      return;
    }

    startNativeDrag(event, "source", sourceItem.dataset.value, -1);
  }

  function handleQueueNativeDragStart(event) {
    const card = event.target instanceof Element ? event.target.closest(".queue-card") : null;
    if (!card) {
      return;
    }

    const item = card.closest(".queue-item");
    if (!item) {
      return;
    }

    const index = Number(item.dataset.index);
    if (!Number.isFinite(index)) {
      return;
    }

    startNativeDrag(event, "queue", item.dataset.value, index);
  }

  function startNativeDrag(event, source, value, originalIndex) {
    if (!value) {
      return;
    }

    nativeDrag.active = true;
    nativeDrag.source = source;
    nativeDrag.value = value;
    nativeDrag.originalIndex = originalIndex;
    drag.pending = null;

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", value);
    }
  }

  function handleQueueNativeDragOver(event) {
    if (!nativeDrag.active) {
      return;
    }

    event.preventDefault();
    queuePanel.classList.add("is-drop-target");
    sourcePanel.classList.remove("is-drop-target");
    updateDropIndicator(getDropQueueIndex(event.clientY));
  }

  function handleQueueNativeDrop(event) {
    if (!nativeDrag.active || !nativeDrag.value) {
      return;
    }

    event.preventDefault();
    const insertIndex = getDropQueueIndex(event.clientY);
    applyNativeQueueDrop(insertIndex);
    clearNativeDrag();
  }

  function applyNativeQueueDrop(insertIndex) {
    const previousQueue = state.queue.slice();
    const value = nativeDrag.value;
    const existingIndex = state.queue.indexOf(value);

    if (existingIndex !== -1) {
      state.queue.splice(existingIndex, 1);
      if (existingIndex < insertIndex) {
        insertIndex -= 1;
      }
    } else if (nativeDrag.source !== "source") {
      return;
    }

    const safeIndex = Math.max(0, Math.min(insertIndex, state.queue.length));
    state.queue.splice(safeIndex, 0, value);
    if (!state.statuses[value]) {
      state.statuses[value] = "ready";
    }
    saveState();
    renderQueue({ previousQueue });
  }

  function handleSourceNativeDragOver(event) {
    if (!nativeDrag.active || nativeDrag.source !== "queue") {
      return;
    }

    event.preventDefault();
    sourcePanel.classList.add("is-drop-target");
    queuePanel.classList.remove("is-drop-target");
    clearDropIndicator();
  }

  function handleSourceNativeDrop(event) {
    if (!nativeDrag.active || nativeDrag.source !== "queue" || !nativeDrag.value) {
      return;
    }

    event.preventDefault();
    removeNativeQueueValue(nativeDrag.value);
    clearNativeDrag();
  }

  function removeNativeQueueValue(value) {
    const existingIndex = state.queue.indexOf(value);
    if (existingIndex === -1) {
      return;
    }

    const previousQueue = state.queue.slice();
    state.queue.splice(existingIndex, 1);
    delete state.statuses[value];
    saveState();
    renderQueue({ previousQueue });
  }

  function handleNativeDragEnd() {
    clearNativeDrag();
  }

  function clearNativeDrag() {
    nativeDrag.active = false;
    nativeDrag.source = null;
    nativeDrag.value = null;
    nativeDrag.originalIndex = -1;
    clearDropIndicator();
    queuePanel.classList.remove("is-drop-target");
    sourcePanel.classList.remove("is-drop-target");
  }
  function handleSourceListPointerDown(event) {
    const sourceItem = event.target instanceof Element ? event.target.closest(".source-item") : null;
    if (!sourceItem) {
      return;
    }

    startDragFromSource(event, sourceItem.dataset.value, sourceItem);
  }

  function handleSourceListTouchStart(event) {
    const sourceItem = event.target instanceof Element ? event.target.closest(".source-item") : null;
    const touch = getPrimaryTouch(event);
    if (!sourceItem || !touch) {
      return;
    }

    event.preventDefault();
    startDragFromSource(createPointerLikeEvent(event, touch), sourceItem.dataset.value, sourceItem);
  }

  function handleSourceListMouseDown(event) {
    const sourceItem = event.target instanceof Element ? event.target.closest(".source-item") : null;
    if (!sourceItem) {
      return;
    }

    startDragFromSource(createMouseLikeEvent(event), sourceItem.dataset.value, sourceItem);
  }

  function handleSourceListClick(event) {
    const sourceItem = event.target instanceof Element ? event.target.closest(".source-item") : null;
    if (!sourceItem || drag.active) {
      return;
    }

    drag.pending = null;
    addSourceValueToQueue(sourceItem.dataset.value, sourceItem);
  }

  function handleQueueListPointerDown(event) {
    const card = event.target instanceof Element ? event.target.closest(".queue-card") : null;
    if (!card) {
      return;
    }

    const item = card.closest(".queue-item");
    if (!item) {
      return;
    }

    const index = Number(item.dataset.index);
    if (!Number.isFinite(index)) {
      return;
    }

    startDragFromQueue(event, index, item);
  }

  function handleQueueListTouchStart(event) {
    const card = event.target instanceof Element ? event.target.closest(".queue-card") : null;
    const touch = getPrimaryTouch(event);
    if (!card || !touch) {
      return;
    }

    const item = card.closest(".queue-item");
    if (!item) {
      return;
    }

    const index = Number(item.dataset.index);
    if (!Number.isFinite(index)) {
      return;
    }

    event.preventDefault();
    startDragFromQueue(createPointerLikeEvent(event, touch), index, item);
  }

  function handleQueueListMouseDown(event) {
    const card = event.target instanceof Element ? event.target.closest(".queue-card") : null;
    if (!card) {
      return;
    }

    const item = card.closest(".queue-item");
    if (!item) {
      return;
    }

    const index = Number(item.dataset.index);
    if (!Number.isFinite(index)) {
      return;
    }

    startDragFromQueue(createMouseLikeEvent(event), index, item);
  }

  function handleQueueListPointerUp(event) {
    handleQueueAction(event, false);
  }

  function handleQueueListClick(event) {
    handleQueueAction(event, true);
  }

  function handleQueueAction(event, allowPendingFallback) {
    const target = event.target instanceof Element ? event.target.closest("[data-action]") : null;
    if (!target) {
      return;
    }

    const item = target.closest(".queue-item");
    if (!item) {
      return;
    }

    const index = Number(item.dataset.index);
    const value = item.dataset.value;
    if (!Number.isFinite(index) || !value) {
      return;
    }

    if (target.dataset.action === "remove") {
      event.preventDefault();
      event.stopPropagation();
      removeFromQueue(index, item);
      return;
    }

    if (target.dataset.action === "cycle-status") {
      event.preventDefault();
      event.stopPropagation();
      if (allowPendingFallback) {
        drag.pending = null;
      }
      cycleQueueStatus(value);
    }
  }

  function movePreview(clientX, clientY) {
    if (!drag.previewEl) {
      return;
    }

    const x = clientX - drag.pointerOffsetX + 28;
    const y = clientY - drag.pointerOffsetY - 18;
    drag.previewEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function handleMouseMove(event) {
    handlePointerMove(createMouseLikeEvent(event));
  }

  function handleTouchMove(event) {
    const touch = getPrimaryTouch(event);
    if (!touch) {
      return;
    }

    drag.lastTouchX = touch.clientX;
    drag.lastTouchY = touch.clientY;
    handlePointerMove(createPointerLikeEvent(event, touch));
  }

  function handlePointerMove(event) {
    if (!drag.active && drag.pending) {
      const deltaX = Math.abs(event.clientX - drag.pending.startX);
      const deltaY = Math.abs(event.clientY - drag.pending.startY);
      if (deltaX > 6 || deltaY > 6) {
        beginDrag({
          source: drag.pending.source,
          value: drag.pending.value,
          element: drag.pending.element,
          pointerEvent: event,
          originalIndex: drag.pending.originalIndex,
          pointerOffsetX: drag.pending.pointerOffsetX,
          pointerOffsetY: drag.pending.pointerOffsetY
        });
        drag.moved = true;
      }
    }

    if (!drag.active) {
      return;
    }

    event.preventDefault();
    drag.latestClientX = event.clientX;
    drag.latestClientY = event.clientY;

    if (!drag.frameId) {
      drag.frameId = requestAnimationFrame(processDragFrame);
    }
  }

  function processDragFrame() {
    drag.frameId = 0;
    if (!drag.active) {
      return;
    }

    movePreview(drag.latestClientX, drag.latestClientY);

    const overQueue = isPointInsideRect(drag.latestClientX, drag.latestClientY, drag.queueBounds);
    const overSource = isPointInsideRect(drag.latestClientX, drag.latestClientY, drag.sourceBounds);
    queuePanel.classList.toggle("is-drop-target", overQueue);
    sourcePanel.classList.toggle("is-drop-target", overSource);

    if (overQueue) {
      updateDropIndicator(getDropQueueIndex(drag.latestClientY));
    } else {
      clearDropIndicator();
    }
  }

  function handleMouseUp(event) {
    handlePointerUp(createMouseLikeEvent(event));
  }

  function handleTouchEnd(event) {
    const touch = getChangedTouch(event) || getPrimaryTouch(event);
    if (touch) {
      drag.lastTouchX = touch.clientX;
      drag.lastTouchY = touch.clientY;
      handlePointerUp(createPointerLikeEvent(event, touch));
      return;
    }

    handlePointerUp({
      clientX: drag.lastTouchX || drag.latestClientX,
      clientY: drag.lastTouchY || drag.latestClientY,
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation()
    });
  }

  function handleTouchCancel(event) {
    cancelResetHold(event);
    cancelAdminHold(event);
    cancelDrag();
  }

  function handlePointerUp(event) {
    if (drag.pending && !drag.active) {
      if (drag.pending.source === "source" && shouldAddPendingSourceItem(event)) {
        const pendingValue = drag.pending.value;
        const pendingElement = drag.pending.element;
        drag.pending = null;
        addSourceValueToQueue(pendingValue, pendingElement);
        return;
      }
      if (drag.pending.source === "queue" && shouldTogglePendingQueueCard(event)) {
        const pendingValue = drag.pending.value;
        drag.pending = null;
        cycleQueueStatus(pendingValue);
        return;
      }
      drag.pending = null;
      return;
    }

    if (!drag.active) {
      return;
    }

    const clientX = Number.isFinite(event.clientX) ? event.clientX : (drag.lastTouchX || drag.latestClientX);
    const clientY = Number.isFinite(event.clientY) ? event.clientY : (drag.lastTouchY || drag.latestClientY);
    const overQueue = isPointInsideRect(clientX, clientY, getQueueBounds());
    const overSource = isPointInsideRect(clientX, clientY, sourcePanel.getBoundingClientRect());

    if (overQueue) {
      const insertIndex = getDropQueueIndex(clientY);
      placeDraggedValue(insertIndex);
    } else if (overSource && drag.source === "queue") {
      removeDraggedValueToSource();
    } else if (drag.source === "queue") {
      saveState();
      renderQueue({ syncSourceAvailability: false });
    }

    cleanupDrag();
  }

  function placeDraggedValue(insertIndex) {
    const previousQueue = state.queue.slice();
    const existingIndex = state.queue.indexOf(drag.value);

    if (existingIndex !== -1) {
      state.queue.splice(existingIndex, 1);
    }

    const safeIndex = Math.max(0, Math.min(insertIndex, state.queue.length));
    state.queue.splice(safeIndex, 0, drag.value);
    if (!state.statuses[drag.value]) {
      state.statuses[drag.value] = "ready";
    }
    saveState();
    renderQueue({ previousQueue });
  }

  function isOverQueue(clientX, clientY) {
    return isPointInsideRect(clientX, clientY, getQueueBounds());
  }

  function isOverSource(clientX, clientY) {
    return isPointInsideRect(clientX, clientY, sourcePanel.getBoundingClientRect());
  }

  function getDropQueueIndex(clientY) {
    const items = getDraggableQueueItems();
    if (!items.length) {
      return 0;
    }

    const firstRect = items[0].getBoundingClientRect();
    if (clientY <= firstRect.top + firstRect.height / 2) {
      return 0;
    }

    const lastRect = items[items.length - 1].getBoundingClientRect();
    if (clientY > lastRect.top + lastRect.height / 2) {
      return items.length;
    }

    const zones = getQueueDropZones();
    for (let index = 0; index < zones.length; index += 1) {
      if (clientY < zones[index]) {
        return index;
      }
    }

    return zones.length;
  }

  function getQueueDropZones() {
    return getDraggableQueueItems()
      .map((item) => {
        const rect = item.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });
  }

  function getDraggableQueueItems() {
    return Array.from(queueList.querySelectorAll(".queue-item"))
      .filter((item) => item !== drag.originEl && item !== drag.placeholderEl);
  }

  function getQueueBounds() {
    const panelRect = queuePanel.getBoundingClientRect();
    const listRect = queueList.getBoundingClientRect();
    return {
      left: panelRect.left,
      right: panelRect.right,
      top: Math.min(panelRect.top, listRect.top),
      bottom: Math.max(panelRect.bottom, listRect.bottom)
    };
  }

  function isPointInsideRect(clientX, clientY, rect) {
    if (!rect) {
      return false;
    }

    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  }

  function updateDropIndicator(index) {
    if (drag.dropIndex === index) {
      return;
    }

    drag.dropIndex = index;
    ensureQueuePlaceholder();
    moveQueuePlaceholder(index);
  }

  function clearDropIndicator() {
    if (drag.placeholderEl && drag.source !== "queue") {
      drag.placeholderEl.remove();
      drag.placeholderEl = null;
    }
    drag.dropIndex = -1;
  }

  function ensureQueuePlaceholder() {
    if (drag.placeholderEl) {
      return drag.placeholderEl;
    }

    const placeholder = document.createElement("div");
    placeholder.className = "queue-drop-placeholder";
    drag.placeholderEl = placeholder;
    return placeholder;
  }

  function moveQueuePlaceholder(index) {
    const placeholder = ensureQueuePlaceholder();
    const items = getDraggableQueueItems();
    const target = items[index];

    if (target) {
      queueList.insertBefore(placeholder, target);
      return;
    }

    queueList.appendChild(placeholder);
  }

  function cancelDrag() {
    drag.pending = null;

    if (!drag.active) {
      return;
    }

    if (drag.frameId) {
      cancelAnimationFrame(drag.frameId);
      drag.frameId = 0;
    }
    clearDropIndicator();
    cleanupDrag();
  }

  function clearQueue() {
    const previousQueue = state.queue.slice();
    state.queue = [];
    state.statuses = {};
    saveState();
    renderQueue({ previousQueue });
  }

  function startResetHold(event) {
    event.preventDefault();
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    cancelResetHold();
    resetHold.active = true;
    resetHold.startedAt = Date.now();
    resetHold.pointerId = event.pointerId ?? null;
    if (event.pointerId !== undefined) {
      resetButton.setPointerCapture?.(event.pointerId);
    }
    resetButton.classList.add("is-holding");
    updateResetProgress();
    resetHold.timer = setTimeout(() => {
      clearQueue();
      cancelResetHold();
    }, RESET_HOLD_MS);
  }

  function startAdminHold(event) {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    preventDefaultAction(event);
    cancelAdminHold();
    adminHold.active = true;
    adminHold.startedAt = performance.now();
    adminHold.pointerId = event.pointerId ?? null;
    if (event.pointerId !== undefined) {
      adminEntryButton.setPointerCapture?.(event.pointerId);
    }
    updateAdminProgress();
  }

  function cancelAdminHold(event) {
    if (event) {
      preventDefaultAction(event);
    }

    if (adminHold.timer) {
      clearTimeout(adminHold.timer);
      adminHold.timer = null;
    }

    if (adminHold.rafId) {
      cancelAnimationFrame(adminHold.rafId);
      adminHold.rafId = 0;
    }

    adminHold.active = false;
    adminHold.startedAt = 0;
    if (adminHold.pointerId !== null) {
      adminEntryButton.releasePointerCapture?.(adminHold.pointerId);
      adminHold.pointerId = null;
    }
    adminEntryProgress.style.width = "0%";
  }

  function updateAdminProgress() {
    if (!adminHold.active) {
      return;
    }

    const elapsed = performance.now() - adminHold.startedAt;
    const progress = Math.min(1, elapsed / ADMIN_HOLD_MS);
    adminEntryProgress.style.width = `${progress * 100}%`;

    if (progress >= 1) {
      openAdminPage();
      return;
    }

    adminHold.rafId = requestAnimationFrame(updateAdminProgress);
  }

  function openAdminPage() {
    if (!adminHold.active && !adminHold.rafId) {
      return;
    }

    adminHold.active = false;
    if (adminHold.rafId) {
      cancelAnimationFrame(adminHold.rafId);
      adminHold.rafId = 0;
    }
    if (adminHold.pointerId !== null) {
      adminEntryButton.releasePointerCapture?.(adminHold.pointerId);
      adminHold.pointerId = null;
    }
    adminEntryProgress.style.width = "100%";
    window.location.href = "./admin.html";
  }

  function cancelResetHold() {
    if (resetHold.timer) {
      clearTimeout(resetHold.timer);
      resetHold.timer = null;
    }
    if (resetHold.rafId) {
      cancelAnimationFrame(resetHold.rafId);
      resetHold.rafId = 0;
    }
    resetHold.active = false;
    if (resetHold.pointerId !== null) {
      resetButton.releasePointerCapture?.(resetHold.pointerId);
      resetHold.pointerId = null;
    }
    resetButton.classList.remove("is-holding");
    resetProgress.style.setProperty("--hold-progress", "0%");
  }

  function preventDefaultAction(event) {
    event.preventDefault();
  }

  function updateResetProgress() {
    if (!resetHold.active) {
      return;
    }

    const elapsed = Date.now() - resetHold.startedAt;
    const percent = Math.max(0, Math.min(100, (elapsed / RESET_HOLD_MS) * 100));
    resetProgress.style.setProperty("--hold-progress", `${percent}%`);
    resetHold.rafId = requestAnimationFrame(updateResetProgress);
  }

  function enterSleepMode() {
    forceInteractionCleanup();
    state.isSleeping = true;
    sleepOverlay.hidden = false;
  }

  function handleRefreshPointerUp(event) {
    event.preventDefault();
    refreshPage();
  }

  function handleRefreshClick(event) {
    event.preventDefault();
    refreshPage();
  }

  function handleSleepButtonPointerUp(event) {
    event.preventDefault();
    enterSleepMode();
  }

  function handleSleepButtonClick(event) {
    event.preventDefault();
    enterSleepMode();
  }

  function handleSleepButtonTouchEnd(event) {
    event.preventDefault();
    enterSleepMode();
  }

  function handleSleepOverlayPointerDown(event) {
    event.preventDefault();
    forceInteractionCleanup();
  }

  function handleSleepOverlayPointerUp(event) {
    event.preventDefault();
    exitSleepMode();
  }

  function handleSleepOverlayClick(event) {
    event.preventDefault();
    exitSleepMode();
  }

  function handleSleepOverlayTouchEnd(event) {
    event.preventDefault();
    exitSleepMode();
  }

  function exitSleepMode() {
    forceInteractionCleanup();
    state.isSleeping = false;
    sleepOverlay.hidden = true;
  }

  function cleanupDrag() {
    if (drag.moved) {
      drag.suppressClickUntil = Date.now() + 250;
    }

    clearDropIndicator();
    queuePanel.classList.remove("is-drop-target");
    sourcePanel.classList.remove("is-drop-target");

    if (drag.originEl) {
      drag.originEl.classList.remove("dragging-origin");
      drag.originEl.style.removeProperty("display");
    }

    if (drag.previewEl && drag.previewEl.parentElement) {
      drag.previewEl.parentElement.removeChild(drag.previewEl);
    }

    if (drag.placeholderEl) {
      drag.placeholderEl.remove();
    }

    drag.active = false;
    drag.moved = false;
    drag.pending = null;
    drag.pointerId = null;
    drag.source = null;
    drag.value = null;
    drag.originalIndex = -1;
    drag.previewEl = null;
    drag.placeholderEl = null;
    drag.originEl = null;
    drag.latestClientX = 0;
    drag.latestClientY = 0;
    drag.lastTouchX = 0;
    drag.lastTouchY = 0;
    drag.queueBounds = null;
    drag.sourceBounds = null;
    document.documentElement.style.removeProperty("touch-action");
    document.body.style.removeProperty("touch-action");
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      forceInteractionCleanup();
    }
  }

  function forceInteractionCleanup() {
    cancelDrag();
    cancelResetHold();
    cancelAdminHold();
    queuePanel.classList.remove("is-drop-target");
    sourcePanel.classList.remove("is-drop-target");
  }

  function getItemStatus(value) {
    return state.statuses[value] || "ready";
  }

  function removeDraggedValueToSource() {
    const existingIndex = state.queue.indexOf(drag.value);
    if (existingIndex !== -1) {
      const previousQueue = state.queue.slice();
      state.queue.splice(existingIndex, 1);
      delete state.statuses[drag.value];
      saveState();
      renderQueue({ previousQueue });
    }
  }

  function cycleQueueStatus(value) {
    if (drag.moved || Date.now() < drag.suppressClickUntil) {
      return;
    }

    const current = getItemStatus(value);
    const next = current === "ready" ? "battery" : current === "battery" ? "train" : "ready";
    state.statuses[value] = next;
    saveState();
    updateRenderedQueueStatus(value, next);
  }

  function shouldTogglePendingQueueCard(event) {
    if (!drag.pending || drag.pending.source !== "queue") {
      return false;
    }

    const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
    if (!releaseTarget || !(releaseTarget instanceof Element)) {
      return false;
    }

    const queueCard = releaseTarget.closest(".queue-card");
    if (!queueCard) {
      return false;
    }

    return drag.pending.startTarget instanceof Node && queueCard.contains(drag.pending.startTarget);
  }

  function shouldAddPendingSourceItem(event) {
    if (!drag.pending || drag.pending.source !== "source") {
      return false;
    }

    const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
    if (!releaseTarget || !(releaseTarget instanceof Element)) {
      return false;
    }

    const sourceItem = releaseTarget.closest(".source-item");
    if (!sourceItem) {
      return false;
    }

    return drag.pending.startTarget instanceof Node && sourceItem.contains(drag.pending.startTarget);
  }

  function updateRenderedQueueStatus(value, status) {
    const item = queueList.querySelector(`.queue-item[data-value="${escapeSelectorValue(String(value))}"]`);
    if (!item) {
      renderQueue();
      return;
    }

    const card = item.querySelector(".queue-card");
    const icon = item.querySelector(".status-icon");
    const suffix = item.querySelector(".suffix-badge");
    if (!card || !icon || !suffix) {
      renderQueue();
      return;
    }

    card.className = `queue-card queue-card-${status}`;
    icon.className = `status-icon status-icon-${status}`;
    suffix.classList.remove("suffix-badge-ready", "suffix-badge-battery", "suffix-badge-train");
    suffix.classList.add(`suffix-badge-${status}`);
    applyStatusIcon(icon, status);
  }

  function updateSourceAvailability(previousQueue = null) {
    const queuedValues = new Set(state.queue);
    const valuesToUpdate = previousQueue
      ? new Set([...previousQueue, ...state.queue])
      : new Set(sourceRowRegistry.keys());

    valuesToUpdate.forEach((value) => {
      const row = sourceRowRegistry.get(String(value));
      const button = row ? row.querySelector(".source-item") : null;
      if (!row || !button) {
        return;
      }

      const isQueued = queuedValues.has(value);
      row.classList.toggle("source-row-placeholder", isQueued);
      button.classList.toggle("source-slot-placeholder", isQueued);
      button.setAttribute("aria-hidden", isQueued ? "true" : "false");
      button.setAttribute("aria-disabled", isQueued ? "true" : "false");
      button.style.pointerEvents = isQueued ? "none" : "auto";
      button.tabIndex = isQueued ? -1 : 0;
    });
  }

  function applyStatusIcon(icon, status) {
    if (!icon) {
      return;
    }

    icon.textContent = "";
    icon.dataset.status = status;
  }

  function updateQueueDensity() {
    const count = state.queue.length;
    const gap = 8;
    const availableHeight = queueList.clientHeight || 0;

    if (densityCache.queueCount === count && densityCache.queueHeight === availableHeight) {
      return;
    }

    if (!count || !availableHeight) {
      queueList.style.removeProperty("--queue-row-height");
      queueList.style.removeProperty("--queue-font-size");
      queueList.style.removeProperty("--queue-prefix-size");
      queueList.style.removeProperty("--queue-side-font-size");
      document.documentElement.style.removeProperty("--runtime-row-height");
      document.documentElement.style.removeProperty("--runtime-loyve-font-size");
      densityCache.queueCount = count;
      densityCache.queueHeight = availableHeight;
      return;
    }

    const rowHeight = Math.max(22, Math.min(104, Math.floor((availableHeight - gap * (count - 1)) / count)));
    const fontSize = Math.max(0.7, Math.min(1.62, rowHeight / 38));
    const prefixSize = Math.max(22, Math.min(74, rowHeight));
    const sideFontSize = Math.max(0.82, Math.min(1.48, rowHeight / 28));

    queueList.style.setProperty("--queue-row-height", `${rowHeight}px`);
    queueList.style.setProperty("--queue-font-size", `${fontSize}rem`);
    queueList.style.setProperty("--queue-prefix-size", `${prefixSize}px`);
    queueList.style.setProperty("--queue-side-font-size", `${sideFontSize}rem`);
    queueList.style.setProperty("--queue-gap", `${gap}px`);
    document.documentElement.style.setProperty("--runtime-row-height", `${rowHeight}px`);
    document.documentElement.style.setProperty("--runtime-loyve-font-size", `${Math.max(fontSize, rowHeight / 38 * 0.46)}rem`);
    densityCache.queueCount = count;
    densityCache.queueHeight = availableHeight;
  }

  function updateSourceDensity() {
    const count = Math.max(state.group1.length, state.group2.length);
    const gap = 8;
    const availableHeight = sourceGroups ? sourceGroups.clientHeight : 0;

    if (densityCache.sourceCount === count && densityCache.sourceHeight === availableHeight) {
      return;
    }

    if (!count || !availableHeight) {
      document.documentElement.style.removeProperty("--source-row-height");
      document.documentElement.style.removeProperty("--source-font-size");
      document.documentElement.style.removeProperty("--source-gap");
      densityCache.sourceCount = count;
      densityCache.sourceHeight = availableHeight;
      return;
    }

    const rowHeight = Math.max(26, Math.min(88, Math.floor((availableHeight - gap * (count - 1)) / count)));
    const fontSize = Math.max(1.32, Math.min(2.62, rowHeight / 26.4));

    document.documentElement.style.setProperty("--source-row-height", `${rowHeight}px`);
    document.documentElement.style.setProperty("--source-font-size", `${fontSize}rem`);
    document.documentElement.style.setProperty("--source-gap", `${gap}px`);
    densityCache.sourceCount = count;
    densityCache.sourceHeight = availableHeight;
  }

  function updateViewportScale() {
    const widthScale = window.innerWidth / REFERENCE_WIDTH;
    const heightScale = window.innerHeight / REFERENCE_HEIGHT;
    const scale = Math.min(widthScale, heightScale);
    const useNativeLayout = Math.abs(widthScale - 1) < 0.03 && Math.abs(heightScale - 1) < 0.03;
    const offsetX = (window.innerWidth - REFERENCE_WIDTH * scale) / 2;
    const offsetY = (window.innerHeight - REFERENCE_HEIGHT * scale) / 2;

    document.documentElement.style.setProperty("--ui-scale", "1");
    document.documentElement.style.setProperty("--viewport-scale", scale.toFixed(6));
    document.documentElement.style.setProperty("--viewport-offset-x", `${Math.max(0, offsetX).toFixed(2)}px`);
    document.documentElement.style.setProperty("--viewport-offset-y", `${Math.max(0, offsetY).toFixed(2)}px`);
    document.body.classList.toggle("layout-native", useNativeLayout);
  }

  function handlePageShow(event) {
    if (event.persisted) {
      clearRefreshFlag();
      window.location.reload();
      return;
    }

    forceInteractionCleanup();
    sleepOverlay.hidden = !state.isSleeping;
    renderQueue();
    updateSourceDensity();

    const refreshToken = localStorage.getItem(MAIN_REFRESH_FLAG);
    if (!refreshToken) {
      return;
    }

    clearRefreshFlag();
    window.location.reload();
  }

  function clearRefreshFlag() {
    localStorage.removeItem(MAIN_REFRESH_FLAG);
  }

  function refreshPage() {
    window.location.reload();
  }

  function animateTransfer(fromRect, toRect, sourceElement, targetElement) {
    if (!ENABLE_TRANSFER_ANIMATION || !fromRect || !toRect || !sourceElement) {
      return;
    }

    const ghost = sourceElement.cloneNode(true);
    ghost.classList.add("transfer-ghost");
    ghost.style.left = `${fromRect.left}px`;
    ghost.style.top = `${fromRect.top}px`;
    ghost.style.width = `${fromRect.width}px`;
    ghost.style.height = `${fromRect.height}px`;
    ghost.style.transform = "translate3d(0, 0, 0) scale(1)";
    document.body.appendChild(ghost);

    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;
    const scaleX = fromRect.width ? toRect.width / fromRect.width : 1;
    const scaleY = fromRect.height ? toRect.height / fromRect.height : 1;

    requestAnimationFrame(() => {
      ghost.classList.add("transfer-ghost-moving");
      ghost.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`;
      ghost.style.opacity = "0.9";
    });

    const cleanup = () => ghost.remove();
    const land = () => triggerLandingShake(targetElement);
    ghost.addEventListener("transitionend", cleanup, { once: true });
    ghost.addEventListener("transitionend", land, { once: true });
    window.setTimeout(() => {
      land();
      cleanup();
    }, 560);
  }

  function findQueueCardElement(value) {
    return queueList.querySelector(`.queue-item[data-value="${escapeSelectorValue(String(value))}"] .queue-card`);
  }

  function findSourceElement(value) {
    return document.querySelector(`.source-item[data-value="${escapeSelectorValue(String(value))}"]`);
  }

  function triggerLandingShake(targetElement) {
    if (!targetElement) {
      return;
    }

    targetElement.classList.remove("transfer-landed");
    void targetElement.offsetWidth;
    targetElement.classList.add("transfer-landed");
    window.setTimeout(() => targetElement.classList.remove("transfer-landed"), 420);
  }

  function escapeSelectorValue(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }

    return value.replace(/["\\]/g, "\\$&");
  }

  function getPrimaryTouch(event) {
    if (!event.touches || event.touches.length === 0) {
      return null;
    }

    return event.touches[0];
  }

  function getChangedTouch(event) {
    if (!event.changedTouches || event.changedTouches.length === 0) {
      return null;
    }

    return event.changedTouches[0];
  }

  function createPointerLikeEvent(event, touch) {
    return {
      button: 0,
      buttons: 1,
      clientX: touch.clientX,
      clientY: touch.clientY,
      pointerId: undefined,
      target: touch.target || event.target,
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation()
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { queue: [], statuses: {}, savedAt: 0 };
      }

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return {
          queue: parsed.map((value) => String(value)).filter(Boolean),
          statuses: {},
          savedAt: 0
        };
      }

      return {
        queue: Array.isArray(parsed.queue) ? parsed.queue.map((value) => String(value)).filter(Boolean) : [],
        statuses: parsed.statuses && typeof parsed.statuses === "object" ? parsed.statuses : {},
        savedAt: Number(parsed.savedAt || 0)
      };
    } catch (error) {
      return { queue: [], statuses: {}, savedAt: 0 };
    }
  }

  function saveState() {
    const payload = getSerializableState();
    state.savedAt = payload.savedAt;
    pendingPersistPayload = payload;
    scheduleLocalStateWrite();
    queuePersistedState(payload);
  }

  function scheduleLocalStateWrite() {
    if (localPersistTimer) {
      clearTimeout(localPersistTimer);
      localPersistTimer = 0;
    }

    if (localPersistIdleId && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(localPersistIdleId);
      localPersistIdleId = 0;
    }

    localPersistTimer = window.setTimeout(() => {
      localPersistTimer = 0;
      if (!pendingPersistPayload) {
        return;
      }

      const write = () => {
        localPersistIdleId = 0;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingPersistPayload));
        } catch {
          // ignorer lokal lagringsfeil og behold server-fallback
        }
      };

      if (typeof window.requestIdleCallback === "function") {
        localPersistIdleId = window.requestIdleCallback(write, { timeout: 250 });
        return;
      }

      write();
    }, 120);
  }

  async function loadPersistedState() {
    const local = loadState();

    try {
      const response = await fetch(`${STATE_ENDPOINT}?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) {
        return local;
      }

      const payload = await response.json();
        if (!payload || payload.ok !== true || !payload.state) {
          return local;
        }

        const serverState = normalizeLoadedState(payload.state);
        const latest = serverState.savedAt > local.savedAt ? serverState : local;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(latest));
        return latest;
      } catch {
        return local;
      }
    }

  function normalizeLoadedState(raw) {
    const queue = Array.isArray(raw.queue)
      ? raw.queue.map((value) => String(value)).filter(Boolean)
      : [];
    const statuses = raw.statuses && typeof raw.statuses === "object"
      ? raw.statuses
      : {};
    const savedAt = Number(raw.savedAt || 0);

    return { queue, statuses, savedAt };
  }

  function getSerializableState() {
    return {
      queue: [...state.queue],
      statuses: { ...state.statuses },
      savedAt: Date.now()
    };
  }

  function queuePersistedState(payload) {
    if (persistTimer) {
      clearTimeout(persistTimer);
    }

    persistTimer = window.setTimeout(() => {
      persistTimer = 0;
      persistInFlight = postPersistedState(payload).finally(() => {
        persistInFlight = null;
      });
    }, 300);
  }

  async function postPersistedState(payload) {
    try {
      const response = await fetch(STATE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        keepalive: true
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json().catch(() => null);
      if (result && result.ok === false) {
        throw new Error(result.error || "Ukjent serverfeil");
      }

      return true;
    } catch {
      console.warn("[queue_state] Serverlagring feilet, bruker lokal fallback.");
      return false;
      // localStorage fungerer fortsatt som fallback
    }
  }

  function flushPersistedState() {
    const payload = pendingPersistPayload || getSerializableState();
    state.savedAt = payload.savedAt;
    pendingPersistPayload = payload;

    if (localPersistTimer) {
      clearTimeout(localPersistTimer);
      localPersistTimer = 0;
    }

    if (localPersistIdleId && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(localPersistIdleId);
      localPersistIdleId = 0;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

    if (persistTimer) {
      clearTimeout(persistTimer);
      persistTimer = 0;
    }

    const body = JSON.stringify(payload);

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(STATE_ENDPOINT, blob);
        return;
      }
    } catch {
      // fall gjennom til fetch
    }

    persistInFlight = postPersistedState(payload);
  }

  function renderLabelContent(target, value) {
    target.textContent = "";
    const parsed = parseDisplayParts(value);
    const match = parsed.main.match(/\(([^)]+)\)/);
    if (!match) {
      target.textContent = parsed.main;
      return;
    }

    const full = parsed.main;
    const start = match.index || 0;
    const end = start + match[0].length;

    appendLabelPart(target, full.slice(0, start), "label-normal");
    appendLabelPart(target, match[1], "label-emphasis");
    appendLabelPart(target, full.slice(end), "label-normal");
  }

  function appendLabelPart(target, text, className) {
    if (!text) {
      return;
    }

    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    target.appendChild(span);
  }

  function parseDisplayParts(value) {
    const trimmed = String(value).trim();
    const match = trimmed.match(/^(.*?)(?:\s+([A-Z0-9]+))?$/);
    return {
      main: (match && match[1] ? match[1] : trimmed).trim(),
      suffix: (match && match[2] ? match[2] : "").trim()
    };
  }

  function createSuffixBadge(value) {
    const parsed = parseDisplayParts(value);
    const suffix = document.createElement("span");
    suffix.className = "suffix-badge";
    suffix.textContent = parsed.suffix;
    if (!parsed.suffix) {
      suffix.classList.add("suffix-badge-empty");
    }
    return suffix;
  }

  function createSourceRow(value) {
    const row = document.createElement("div");
    row.className = "source-row";
    row.dataset.value = String(value);

    const main = document.createElement("div");
    main.className = "source-item source-slot";
    main.setAttribute("role", "button");
    const label = document.createElement("span");
    label.className = "source-label";
    renderLabelContent(label, value);
    main.appendChild(label);

    main.dataset.value = String(value);
    main.tabIndex = 0;

    row.append(main);
    return row;
  }

  init().catch((error) => {
    queueEmpty.hidden = false;
    queueEmpty.textContent = `${error.message}. Start siden via en lokal webserver hvis du aapner filene direkte.`;
  });
};














