import { useEffect, useLayoutEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getHobby,
  groupLabelForSlug,
  groupSlugForItem,
  hobbyItemPath,
  isHobbyGroupSlug,
  itemsForGroup,
  resolveHobbyItemId,
  type HobbyCategory,
  type HobbyItem,
} from "../data/hobbies";

export type HobbyArchive = {
  hobby: HobbyCategory;
  item: HobbyItem;
  visible: HobbyItem[];
  index: number;
  total: number;
  catalogTotal: number;
  groupKey: string;
  groupLabel: string;
  setGroupKey: (key: string) => void;
  showGroups: boolean;
  goTo: (id: string) => void;
  step: (dir: -1 | 1) => void;
  paddedIndex: string;
  backdrop: string;
};

type ResolvedPath = {
  groupSlug: string;
  itemId: string;
};

function resolvePath(
  hobby: HobbyCategory,
  groupParam?: string,
  itemParam?: string
): ResolvedPath | null {
  if (!groupParam && !itemParam) {
    const groupSlug = hobby.groups[0]?.slug ?? "all";
    const itemId = itemsForGroup(hobby, groupSlug)[0]?.id;
    return itemId ? { groupSlug, itemId } : null;
  }

  if (groupParam && !itemParam) {
    if (isHobbyGroupSlug(hobby, groupParam)) {
      const itemId = itemsForGroup(hobby, groupParam)[0]?.id;
      return itemId ? { groupSlug: groupParam, itemId } : null;
    }

    const itemId = resolveHobbyItemId(hobby, groupParam);
    if (!itemId) return null;
    return { groupSlug: groupSlugForItem(hobby, itemId), itemId };
  }

  if (!itemParam) return null;

  const itemId = resolveHobbyItemId(hobby, itemParam);
  const groupOk = isHobbyGroupSlug(hobby, groupParam);

  if (itemId && groupParam === "all") {
    return { groupSlug: "all", itemId };
  }

  if (itemId && groupOk) {
    const inGroup = itemsForGroup(hobby, groupParam).some((entry) => entry.id === itemId);
    if (inGroup) return { groupSlug: groupParam, itemId };
    return { groupSlug: groupSlugForItem(hobby, itemId), itemId };
  }

  if (itemId) {
    return { groupSlug: groupSlugForItem(hobby, itemId), itemId };
  }

  if (groupOk) {
    const fallback = itemsForGroup(hobby, groupParam)[0]?.id;
    return fallback ? { groupSlug: groupParam, itemId: fallback } : null;
  }

  return null;
}

export function useHobbyArchive(): HobbyArchive | null {
  const { hobbyId, groupSlug: groupParam, itemId: itemParam } = useParams<{
    hobbyId: string;
    groupSlug?: string;
    itemId?: string;
  }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hobby = getHobby(hobbyId);
  const resolved = useMemo(
    () => (hobby ? resolvePath(hobby, groupParam, itemParam) : null),
    [hobby, groupParam, itemParam]
  );

  useLayoutEffect(() => {
    if (!hobby || !resolved) return;
    const canonical = hobbyItemPath(hobby.id, resolved.groupSlug, resolved.itemId);
    if (pathname !== canonical) {
      navigate(canonical, { replace: true });
    }
  }, [hobby, resolved, pathname, navigate]);

  const visible = useMemo(
    () => (hobby && resolved ? itemsForGroup(hobby, resolved.groupSlug) : []),
    [hobby, resolved]
  );

  useEffect(() => {
    if (!hobby || !resolved || visible.length === 0) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const dir = event.key === "ArrowLeft" ? -1 : 1;
      const current = visible.findIndex((entry) => entry.id === resolved.itemId);
      const safeIndex = current < 0 ? 0 : current;
      const next = visible[(safeIndex + dir + visible.length) % visible.length];
      const nextGroup =
        resolved.groupSlug === "all" ? "all" : groupSlugForItem(hobby, next.id);
      navigate(hobbyItemPath(hobby.id, nextGroup, next.id), { replace: true });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hobby, resolved, visible, navigate]);

  if (!hobby || !resolved) return null;

  const item = hobby.items.find((entry) => entry.id === resolved.itemId);
  if (!item) return null;

  const index = visible.findIndex((entry) => entry.id === item.id);
  const total = visible.length;
  const groupKey = resolved.groupSlug;

  const goTo = (nextId: string) => {
    const nextGroup =
      groupKey === "all" ? "all" : groupSlugForItem(hobby, nextId);
    navigate(hobbyItemPath(hobby.id, nextGroup, nextId), { replace: true });
  };

  const selectGroup = (slug: string) => {
    const nextVisible = itemsForGroup(hobby, slug);
    const stays = nextVisible.some((entry) => entry.id === item.id);
    const nextId = stays ? item.id : nextVisible[0]?.id;
    if (!nextId) return;
    navigate(hobbyItemPath(hobby.id, slug, nextId), { replace: true });
  };

  const step = (dir: -1 | 1) => {
    if (total === 0) return;
    const safeIndex = index < 0 ? 0 : index;
    goTo(visible[(safeIndex + dir + total) % total].id);
  };

  return {
    hobby,
    item,
    visible,
    index: Math.max(index, 0),
    total,
    catalogTotal: hobby.items.length,
    groupKey,
    groupLabel: groupLabelForSlug(hobby, groupKey),
    setGroupKey: selectGroup,
    showGroups: hobby.groups.length > 1,
    goTo,
    step,
    paddedIndex: String(Math.max(index, 0) + 1).padStart(2, "0"),
    backdrop: item.hero ?? item.poster,
  };
}
