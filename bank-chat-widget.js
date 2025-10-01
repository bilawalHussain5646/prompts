(function (t) {
  "use strict";
  const p = (e, s) => {
      const c = e.__vccOpts || e;
      for (const [n, r] of s) c[n] = r;
      return c;
    },
    d = {
      data() {
        return {
          isOpen: !1,
          messages: [],
          currentPromptId: "start",
          prompts: {},
        };
      },
      mounted() {
        this.loadPrompts().then(() => {
          this.showPrompt(this.currentPromptId);
        });
      },
      methods: {
        async loadPrompts() {
          try {
            const e = await fetch(
              "https://bilawalhussain5646.github.io/prompts/bank-prompts.json"
            );
            this.prompts = await e.json();
          } catch (e) {
            console.error("Error loading prompts:", e);
          }
        },
        toggleChat() {
          (this.isOpen = !this.isOpen),
            this.isOpen &&
              this.messages.length === 0 &&
              this.showPrompt(this.currentPromptId);
        },
        selectOption(e, s) {
          (s.selectedOption = e),
            (s.disabled = !0),
            this.messages.push({ text: e, type: "user" });
          const n = this.prompts[this.currentPromptId].optionsMap?.[e];
          n && this.showPrompt(n);
        },
        showPrompt(e) {
          const s = this.prompts[e];
          if (!s) return;
          this.currentPromptId = e;
          const c = { text: "", type: "bot", typing: !0 };
          this.messages.push(c),
            this.scrollToBottom(),
            setTimeout(() => {
              const n = this.messages.indexOf(c);
              n !== -1 && this.messages.splice(n, 1);
              const r = {
                text: s.text,
                type: "bot",
                options: s.options,
                disabled: !1,
                selectedOption: null,
              };
              this.messages.push(r), this.scrollToBottom();
            }, 1e3);
        },
        scrollToBottom() {
          this.$nextTick(() => {
            const e = this.$refs.messages;
            e && (e.scrollTop = e.scrollHeight);
          });
        },
      },
    },
    m = { key: 0, class: "chat-container" },
    h = { class: "chat-header" },
    k = { class: "chat-messages", ref: "messages" },
    g = { key: 0, class: "avatar" },
    B = { class: "text" },
    _ = { key: 0, class: "inline-options" },
    b = ["disabled", "onClick"];
  function f(e, s, c, n, r, l) {
    return (
      t.openBlock(),
      t.createElementBlock(
        "div",
        { class: t.normalizeClass(["chat-widget", { open: r.isOpen }]) },
        [
          t.createElementVNode(
            "div",
            {
              class: "chat-toggle",
              onClick:
                s[0] || (s[0] = (...o) => l.toggleChat && l.toggleChat(...o)),
            },
            "💬"
          ),
          r.isOpen
            ? (t.openBlock(),
              t.createElementBlock("div", m, [
                t.createElementVNode("div", h, [
                  s[2] ||
                    (s[2] = t.createElementVNode(
                      "div",
                      { class: "title" },
                      "Bank Assistant",
                      -1
                    )),
                  t.createElementVNode(
                    "button",
                    {
                      class: "close-btn",
                      onClick: s[1] || (s[1] = (o) => (r.isOpen = !1)),
                    },
                    "✖"
                  ),
                ]),
                t.createElementVNode(
                  "div",
                  k,
                  [
                    (t.openBlock(!0),
                    t.createElementBlock(
                      t.Fragment,
                      null,
                      t.renderList(
                        r.messages,
                        (o, E) => (
                          t.openBlock(),
                          t.createElementBlock(
                            "div",
                            {
                              key: E,
                              class: t.normalizeClass(["message", o.type]),
                            },
                            [
                              o.type === "bot"
                                ? (t.openBlock(),
                                  t.createElementBlock("div", g, "🤖"))
                                : t.createCommentVNode("", !0),
                              t.createElementVNode("div", B, [
                                t.createTextVNode(
                                  t.toDisplayString(o.text) + " ",
                                  1
                                ),
                                o.options
                                  ? (t.openBlock(),
                                    t.createElementBlock("div", _, [
                                      (t.openBlock(!0),
                                      t.createElementBlock(
                                        t.Fragment,
                                        null,
                                        t.renderList(
                                          o.options,
                                          (a, O) => (
                                            t.openBlock(),
                                            t.createElementBlock(
                                              "button",
                                              {
                                                key: O,
                                                disabled: o.disabled,
                                                class: t.normalizeClass({
                                                  selected:
                                                    a === o.selectedOption,
                                                }),
                                                onClick: (C) =>
                                                  l.selectOption(a, o),
                                              },
                                              t.toDisplayString(a),
                                              11,
                                              b
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]))
                                  : t.createCommentVNode("", !0),
                              ]),
                            ],
                            2
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  512
                ),
              ]))
            : t.createCommentVNode("", !0),
        ],
        2
      )
    );
  }
  const y = p(d, [
      ["render", f],
      ["__scopeId", "data-v-1da4d187"],
    ]),
    i = document.createElement("div");
  (i.id = "bank-chat-widget-root"),
    document.body.appendChild(i),
    t.createApp(y).mount(i);
})(Vue);
