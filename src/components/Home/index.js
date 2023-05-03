import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const redirectToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-responsive-container">
          <div className="home-content-container">
            <h1 className="home-header">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button
                type="button"
                className="jobs-button"
                onClick={redirectToJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
