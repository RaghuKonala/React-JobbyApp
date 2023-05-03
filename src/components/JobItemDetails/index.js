import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {HiExternalLink} from 'react-icons/hi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const apiUrl = `https://apis.ccbp.in/jobs/${params.id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const jobDetails = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        skills: fetchedData.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: fetchedData.job_details.title,
      }
      const similarJobs = fetchedData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillsPart = () => {
    const {jobDetails} = this.state
    const {skills} = jobDetails
    return (
      <div className="jobdetails-skills-container">
        <h1 className="jobdetails-subheader">Skills</h1>
        <ul className="skills-list-container">
          {skills.map(eachSkill => (
            <li className="skill-item" key={eachSkill.name}>
              <img
                className="skill-image"
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
              />
              <p className="skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompanyPart = () => {
    const {jobDetails} = this.state
    const {lifeAtCompany} = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <h1 className="jobdetails-subheader">Life at Company</h1>
        <div className="lifeatcompany-align-container">
          <p className="lifeatcompany-description">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="lifeatcompany-image"
          />
        </div>
      </>
    )
  }

  renderJobDetailsCard = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="jobdetails-card-container">
        <div className="align-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="align-container">
              <AiFillStar color="#fbbf24" size={20} />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-jobtype-package-container">
          <div className="align-container">
            <div className="location-jobtype-container">
              <MdLocationOn className="location-briefcase-icon" />
              <p className="job-description">{location}</p>
            </div>
            <div className="location-jobtype-container">
              <BsBriefcaseFill className="location-briefcase-icon" />
              <p className="job-description">{employmentType}</p>
            </div>
          </div>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <hr className="jobdetails-info-separator" />
        <div>
          <div className="jobdetails-description-link-container">
            <h1 className="jobdetails-subheader">Description</h1>
            <a
              className="jobdetails-link"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit <HiExternalLink className="link-icon" />
            </a>
          </div>
          <p className="jobdetails-description">{jobDescription}</p>
        </div>
        {this.renderSkillsPart()}
        {this.renderLifeAtCompanyPart()}
      </div>
    )
  }

  renderJobDetailsSuccessView = () => {
    const {similarJobs} = this.state
    return (
      <>
        {this.renderJobDetailsCard()}
        <h1 className="jobdetails-subheader">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(each => (
            <SimilarJobCard key={each.id} jobDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="jobdetails-failure-container">
      <img
        className="jobdetails-failure-image"
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
        onClick={this.getJobItemDetails}
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

  renderJobDetailsApiResponse = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobitem-details-container">
          <div className="jobitem-details-responsive-container">
            {this.renderJobDetailsApiResponse()}
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
