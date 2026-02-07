import { startReactApp } from "@view/utils/ui";
import { handleCopy } from "@view/action";
import { ImageViewer, ContextMenu } from "@view/ImageViewer";
import { contextMenuStore } from "@view/store";

const App = () => (
  <>
    <ImageViewer />
    <ContextMenu />
  </>
);

startReactApp({
  App,
  beforeRender: () => {
    window.addEventListener("copy", (e) => {
      e.preventDefault();
      handleCopy();
    });

    window.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        contextMenuStore.setState({ anchorPosition: { top: e.clientY, left: e.clientX } });
      },
      true,
    );
  },
});
