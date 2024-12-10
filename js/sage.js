// Main javascript file for this node set.

// https://github.com/chrisgoringe/Comfy-Custom-Node-How-To/ is incredibly useful.

// https://github.com/chrisgoringe/Comfy-Custom-Node-How-To/wiki/ui_1_starting
// https://github.com/chrisgoringe/Comfy-Custom-Node-How-To/wiki/remove_or_add_widget

import { app } from "../../../scripts/app.js";
import { ComfyWidgets } from "../../../scripts/widgets.js";
import { api } from '../../scripts/api.js';

app.registerExtension({
    name: "arcum42.sage.utils",
    async setup() {
        console.log("Sage Utils loaded.")
    },
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name == "Sage_ViewText") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                onNodeCreated ? onNodeCreated.apply(this, []) : undefined;
                //console.log("ViewText node created!");
            }

            const onExecuted = nodeType.prototype.onExecuted;
            nodeType.prototype.onExecuted = function (message) {
                //console.log("ViewText node executed!");
                console.log(message["text"])
                onExecuted?.apply(this, arguments);

                var w = this.widgets?.find((w) => w.name === "output");
                if (w === undefined) {
                    w = ComfyWidgets["STRING"](this, "output", ["STRING", { multiline: true }], app).widget;
                    w.inputEl.readOnly = true; 
                    w.inputEl.style.opacity = 0.6;
                    w.inputEl.style.fontSize = "9pt";
                }
                w.value = message["text"].join("")
                this.onResize?.(this.size);
            }
        }
    }
})