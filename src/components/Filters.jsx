import styles from "./Filters.module.css";
import { useState } from "react";
import TraitButton from "./TraitButton";
import { useFilterContext } from "../contexts/FilterContext";
import CurrentFilters from "./CurrentFilters";

function Filters() {
  const { traitOptions, dispatch, state, filteredImages } = useFilterContext();
  const [selectedTrait, setSelectedTrait] = useState("BACKGROUND");

  const traitText = (trait) => trait.slice(0, 1) + trait.slice(1).toLowerCase();

  const selectedTraitOptions = traitOptions[selectedTrait];

  function handleSetSelectedTrait(trait) {
    setSelectedTrait(trait[0]);
  }

  const filterLength = state.FILTERED.length;
  const filterAllText = filterLength > 0 ? "RESTORE ALL" : "CLEAR ALL";

  function handleAllFilter() {
    if (filterLength > 0) {
      dispatch({ type: "restoreAllFilters" });
    } else {
      dispatch({ type: "clearAllFilters" });
    }
  }

  return (
    <div className={styles.filterGrid}>
      <div className={styles.spanRow}>
        <div className={styles.columnTitle}>
          <button
            className={styles.titleButton}
            onClick={() => dispatch({ type: "changeFilterType" })}
          >
            {state.exclusiveFiltering
              ? "Exclusive Filters"
              : "Inclusive Filters"}
          </button>
        </div>
        <div className={styles.filterButtons}>
          <button
            className={filterLength > 0 ? styles.restoreAll : styles.clearAll}
            onClick={handleAllFilter}
          >
            {filterAllText}
          </button>
          {Object.entries(traitOptions).map((trait) => (
            <button
              onClick={() => handleSetSelectedTrait(trait)}
              key={trait[0]}
              className={styles.filterButton}
            >
              {traitText(trait[0])}
            </button>
          ))}
        </div>
        <div className={styles.titleGrid}>
          <div className={styles.columnTitle}>
            {traitText(selectedTrait)} Filter
            <ul className={styles.currentTraitList}>
              {/* <button
                onClick={() =>
                  dispatch({
                    type:
                      state[selectedTrait].length > 0
                        ? "restoreSpecificFilter"
                        : "clearSpecificFilter",
                    filterType: selectedTrait,
                  })
                }
              >
                {state[selectedTrait].length > 0
                  ? `Restore ${selectedTrait} Filters`
                  : `Clear ${selectedTrait} Filters`}
              </button> */}
              {selectedTraitOptions !== null &&
                selectedTraitOptions.map((trait) =>
                  trait ? (
                    <li key={trait}>
                      <TraitButton trait={trait} traitType={selectedTrait} />
                    </li>
                  ) : null
                )}
            </ul>
          </div>
          <div>
            <div>
              <div className={styles.columnTitle}>Current Filters</div>
              <div className={styles.columnTitle}>
                {filteredImages.length}
                {filteredImages.length === 1 ? " Image" : " Images"}
              </div>
            </div>
            <CurrentFilters />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
