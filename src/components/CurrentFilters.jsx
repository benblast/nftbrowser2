import styles from "./CurrentFilters.module.css";
import { useFilterContext } from "../contexts/FilterContext";

function CurrentFilters() {
  const { state, traitOptions } = useFilterContext();

  const { BACKGROUND, FACE, HATS, SHIRTS, ITEM, ATTRIBUTES } = state;

  const filterObj = {
    BACKGROUND,
    FACE,
    HATS,
    SHIRTS,
    ITEM,
    ATTRIBUTES,
  };

  return (
    <div className={styles.scrollGrid}>
      {Object.entries(filterObj).map(([traitName, trait]) => (
        <ul key={traitName} className={styles.filterList}>
          {traitName}:{" "}
          {state[traitName].length === traitOptions[traitName].length &&
          state.EDITIONS.length > 0 ? (
            <div>Any</div>
          ) : null}
          {traitOptions[traitName]
            .filter((e) => !trait.includes(e))
            .map((x) => (
              <li key={x}>{x}</li>
            ))}
        </ul>
      ))}
    </div>
  );
}

export default CurrentFilters;
