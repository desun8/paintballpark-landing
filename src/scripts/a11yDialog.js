import "wicg-inert";

const FOCUSABLE_ELEMENTS = [
  "a[href]:not([tabindex^=\"-\"]):not([inert])",
  "area[href]:not([tabindex^=\"-\"]):not([inert])",
  "input:not([disabled]):not([inert])",
  "select:not([disabled]):not([inert])",
  "textarea:not([disabled]):not([inert])",
  "button:not([disabled]):not([inert])",
  "iframe:not([tabindex^=\"-\"]):not([inert])",
  "audio:not([tabindex^=\"-\"]):not([inert])",
  "video:not([tabindex^=\"-\"]):not([inert])",
  "[contenteditable]:not([tabindex^=\"-\"]):not([inert])",
  "[tabindex]:not([tabindex^=\"-\"]):not([inert])"
];

const setInert = (elm, val) => {
  elm.inert = val;
};

const setAriaHidden = (elm, val) => {
  elm.ariaHidden = val;
};

const getSiblings = (el) => [...el.parentNode.childNodes].filter(node => node !== el && node.tagName);

class A11yDialog {
  constructor(dialogElm, btnClose) {
    this.root = dialogElm;
    // TODO: заменить на data-атрибут?
    this.dialog = this.root.querySelector(".dialog-container__dialog");

    this.focusableElms = this.root.querySelectorAll(FOCUSABLE_ELEMENTS.join(","));
    this.firstFocusableElm = this.focusableElms[0];
    this.lastFocusableElm = this.focusableElms[this.focusableElms.length - 1];


    this.siblings = undefined;

    this.btnClose = btnClose;

    this.init();
  }

  getSiblings() {
    // Убираем не нужные элементы (text, comment etc)
    // И у которых нет aria-hidden="true"
    const siblings = getSiblings(this.root);
    return siblings.filter(elm => elm.ariaHidden !== "true");
  }

  setVisible(elm, val) {
    setInert(elm, val);
    setAriaHidden(elm, val);
  }

  setVisibleSiblings(val) {
    this.siblings.forEach(sibling => {
      this.setVisible(sibling, val);
    });
  }

  show() {
    this.dialog.setAttribute("open", "");
    this.setVisible(this.root, false);
    this.setVisible(this.btnClose, false);
    this.setVisibleSiblings(true);
  }

  hide() {
    this.dialog.removeAttribute("open");
    this.setVisible(this.root, true);
    this.setVisibleSiblings(false);
  }

  handleKeyDown(e) {
    const Dialog = this;
    const KEY_TAB = 9;
    const KEY_ESC = 27;

    function handleBackwardTab() {
      if (document.activeElement === Dialog.firstFocusableElm) {
        e.preventDefault();
        Dialog.lastFocusableElm.focus();
      }
    }

    function handleForwardTab() {
      if (document.activeElement === Dialog.lastFocusableElm) {
        e.preventDefault();
        Dialog.firstFocusableElm.focus();
      }
    }

    switch (e.keyCode) {
      case KEY_TAB:
        if (Dialog.focusableElms.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab();
        } else {
          handleForwardTab();
        }
        break;
      case KEY_ESC:
        Dialog.hide();
        break;
      default:
        break;
    }


  };

  init() {
    setInert(this.root, true);
    this.siblings = this.getSiblings();
    this.root.addEventListener('keydown', this.handleKeyDown.bind(this));

    console.log("A11yDialog -> focusableElms ->", this.focusableElms);
    // console.log("A11yDialog -> siblings -> ", this.siblings);
  }
}

// Если кнопка у нас в жопе мира
// Если кнопка "закрыть" находится вне элемента (мадалки/диалога)
// А где то внутри хедера, например.
class A11yDialogOuterBtn extends A11yDialog {
  constructor(...props) {
    super(...props);
    this.btnParentsDeep = 0;
    this.btnParentsTree = [];
  }

  getBtnParent(siblings) {
    try {
      const btn = this.btnClose;
      const parentsTree = [];
      let deep = 0;
      let parentElm = undefined;

      while (!siblings.some(elm => elm === parentElm)) {
        if (parentElm === undefined) {
          parentElm = this.btnClose;
        } else {
          parentElm = parentElm.parentNode;
        }

        if (parentElm === document.body) {
          throw new Error("Не удалось найти родительский элемент === модальному окну");
        }

        deep++;
        parentsTree.push(parentElm);
      }

      this.btnParentsDeep = deep;
      this.btnParentsTree = parentsTree;
    } catch (e) {
      console.warn("A11yDialogOuterBtn", e);
    }

  }

  getBtnSiblings() {
    // Находим элементы, которые нужно скрывать (inert и aria-hidden)
    // Соседи кнопки и соседи родителей,
    // вплоть то главного родителя (который сосед модалки)
    const elms = [...this.btnParentsTree.slice(0, this.btnParentsDeep - 1), this.btnClose];
    let newElms = [];

    elms.forEach(elm => {
      const siblings = getSiblings(elm);
      newElms = [...newElms, ...siblings];
    });

    return newElms;
  }

  getSiblings() {
    const siblings = super.getSiblings();

    this.getBtnParent(siblings);

    const filteredSiblings = siblings.filter(sibling => sibling !== this.btnParentsTree[this.btnParentsDeep - 1]);

    // console.log("siblings -> ", [...filteredSiblings, ...this.getBtnSiblings()]);

    return [...filteredSiblings, ...this.getBtnSiblings()];
  }
}

export { A11yDialog, A11yDialogOuterBtn };
