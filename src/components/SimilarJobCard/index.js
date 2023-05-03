import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    employmentType,
  } = jobDetails
  return (
    <li className="similar-jobs-item">
      <div className="align-container">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="align-container">
            <AiFillStar color="#fbbf24" size={20} />
            <p className="job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-jobs-description-container">
        <h1 className="similarjobs-header">Description</h1>
        <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobCard
