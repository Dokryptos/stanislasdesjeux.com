import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { ImagesIcon } from "@sanity/icons";
import { PresentationIcon } from "@sanity/icons";
import { VideoIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "film",
        title: "Film",
        icon: VideoIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "stillLife",
        title: "StillLife",
        icon: PresentationIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "art",
        title: "Art",
        icon: ImagesIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "homepage",
        title: "Homepage",
        icon: ImagesIcon,
        S,
        context,
      }),
    ]);
