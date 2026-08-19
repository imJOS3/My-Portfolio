import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getHobby,
  getHobbyItem,
  itemsForGroup,
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
  setGroupKey: (key: string) => void;
  showGroups: boolean;
  goTo: (id: string) => void;
  step: (dir: -1 | 1) => void;
  paddedIndex: string;
  backdrop: string;
};

export function useHobbyArchive(): HobbyArchive | null {
  const { hobbyId, itemId } = useParams<{ hobbyId: string; itemId?: string }>();
  const navigate = useNavigate();
  const hobby = getHobby(hobbyId);
  const [groupKey, setGroupKey] = useState(() => {
    const current = getHobby(hobbyId);
    if (current?.id === "music" && current.groups[0]) {
      return current.groups[0].label;
    }
    return "all";
  });

  const item = hobby ? getHobbyItem(hobby, itemId) : undefined;
  const visible = useMemo(
    () => (hobby ? itemsForGroup(hobby, groupKey) : []),
    [hobby, groupKey]
  );
  const index = item ? visible.findIndex((entry) => entry.id === item.id) : 0;
  const total = visible.length;

  const goTo = (nextId: string) => {
    if (!hobby) return;
    navigate(`/open/${hobby.id}/${nextId}`, { replace: true });
  };

  const selectGroup = (key: string) => {
    setGroupKey(key);
    if (!hobby) return;
    const nextVisible = itemsForGroup(hobby, key);
    const stays = item ? nextVisible.some((entry) => entry.id === item.id) : false;
    if (!stays && nextVisible[0]) {
      navigate(`/open/${hobby.id}/${nextVisible[0].id}`, { replace: true });
    }
  };

  const step = (dir: -1 | 1) => {
    if (!hobby || total === 0) return;
    const safeIndex = index < 0 ? 0 : index;
    const next = (safeIndex + dir + total) % total;
    goTo(visible[next].id);
  };

  useEffect(() => {
    if (!hobby || !item || visible.length === 0) return;
    if (!visible.some((entry) => entry.id === item.id)) {
      goTo(visible[0].id);
    }
  }, [groupKey, hobby, item, visible]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!hobby || total === 0) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const dir = event.key === "ArrowLeft" ? -1 : 1;
      const safeIndex = index < 0 ? 0 : index;
      const next = (safeIndex + dir + total) % total;
      navigate(`/open/${hobby.id}/${visible[next].id}`, { replace: true });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hobby, index, total, visible, navigate]);

  if (!hobby || !item) return null;

  return {
    hobby,
    item,
    visible,
    index: Math.max(index, 0),
    total,
    catalogTotal: hobby.items.length,
    groupKey,
    setGroupKey: selectGroup,
    showGroups: hobby.groups.length > 1,
    goTo,
    step,
    paddedIndex: String(Math.max(index, 0) + 1).padStart(2, "0"),
    backdrop: item.hero ?? item.poster,
  };
}
