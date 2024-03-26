export const Filter = ({ filterText, handleChangeFilterText }) => {
  return (
    <div>
      Filter: <input value={filterText} onChange={handleChangeFilterText} />
    </div>
  )
}

export default Filter
