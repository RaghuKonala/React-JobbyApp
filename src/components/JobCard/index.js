import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  const renderBasicInfoPart = () => (
    <>
      <div className="align-container">
        <img className="company-logo" src={companyLogoUrl} alt="company logo" />
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
    </>
  )

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="job-item-link">
        {renderBasicInfoPart()}
        <hr className="job-info-separator" />
        <h1 className="job-description-header">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
