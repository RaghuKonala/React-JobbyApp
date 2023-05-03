import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {
    updateEmploymentFilter,
    removeEmploymentFilter,
    updateSalaryFilter,
  } = props

  const onClickSalaryFilter = event => {
    updateSalaryFilter(event.target.id)
  }

  const onClickEmploymentFilter = event => {
    if (event.target.checked) {
      updateEmploymentFilter(event.target.id)
    } else {
      removeEmploymentFilter(event.target.id)
    }
  }

  const renderSalaryRange = () => (
    <div className="filters-group-container">
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-list-container">
        {salaryRangesList.map(eachType => (
          <li className="filter-item" key={eachType.salaryRangeId}>
            <input
              type="radio"
              name="option"
              id={eachType.salaryRangeId}
              className="filter-field"
              onChange={onClickSalaryFilter}
            />
            <label htmlFor={eachType.salaryRangeId} className="filter-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderEmploymentType = () => (
    <div className="filters-group-container">
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-list-container">
        {employmentTypesList.map(eachType => (
          <li className="filter-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              className="filter-field"
              onChange={onClickEmploymentFilter}
            />
            <label htmlFor={eachType.employmentTypeId} className="filter-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-container">
      <hr className="filters-separator" />
      {renderEmploymentType()}
      <hr className="filters-separator" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
