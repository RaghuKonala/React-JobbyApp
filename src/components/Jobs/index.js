import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    employmentTypeFilters: [],
    salaryRangeFilter: '',
    searchInput: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getAllJobsData()
  }

  getAllJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypeFilters, salaryRangeFilter, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeFilters.join()}&minimum_package=${salaryRangeFilter}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateSalaryRange = filter => {
    this.setState({salaryRangeFilter: filter}, this.getAllJobsData)
  }

  removeEmploymentType = filter => {
    const {employmentTypeFilters} = this.state
    const updatedArray = employmentTypeFilters.filter(each => each !== filter)
    this.setState({employmentTypeFilters: updatedArray}, this.getAllJobsData)
  }

  updateEmploymentType = filter => {
    this.setState(
      prevState => ({
        employmentTypeFilters: [...prevState.employmentTypeFilters, filter],
      }),
      this.getAllJobsData,
    )
  }

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0

    const renderNoJobs = () => (
      <div className="failure-container">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )

    const renderJobs = () => (
      <ul className="all-jobs-container">
        {jobsData.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )

    return <>{noJobs ? renderNoJobs() : renderJobs()}</>
  }

  renderJobsFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getAllJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSearchField = () => {
    const {searchInput} = this.state
    return (
      <div className="searchfield-container">
        <input
          className="search-field"
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={this.updateSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.getAllJobsData}
        >
          <BsSearch size={20} color="#f8fafc" />
        </button>
      </div>
    )
  }

  renderJobsApiResponse = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-responsive-container">
            <div className="profile-filters-section">
              <ProfileCard />
              <FiltersGroup
                updateEmploymentFilter={this.updateEmploymentType}
                removeEmploymentFilter={this.removeEmploymentType}
                updateSalaryFilter={this.updateSalaryRange}
              />
            </div>
            <div className="searchfield-jobs-section">
              {this.renderSearchField()}
              {this.renderJobsApiResponse()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
