// static/admin/lineStatic.js
CMS.registerEditorComponent({
    id: "lineStatic",
    label: "Static Line",
    fields: [],
    pattern: /^{% lineStatic %}$/,
    fromBlock: function() {
      return {};
    },
    toBlock: function() {
      return `{% lineStatic %}`;
    },
    toPreview: function() {
      return `<div class="line-x-static lx-op-2" style="height: 1px; background-color: #333;"></div>`;
    }
  });
  