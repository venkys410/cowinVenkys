// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCoverageData: [],
    vaccinationByGenderData: [],
    vaccinationByAgeData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getFormattedCoverageData = data => ({
    dose1: data.dose_1,
    dose2: data.dose_2,
    vaccineDate: data.vaccine_date,
  })

  getFormattedGenderData = GenderData => ({
    count: GenderData.count,
    gender: GenderData.gender,
  })

  getFormattedAgeData = AgeData => ({
    age: AgeData.age,
    count: AgeData.count,
  })

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    const fetchedData = await response.json()
    console.log(response)

    if (response.ok) {
      const formattedVaccinationCoverageData = fetchedData.last_7_days_vaccination.map(
        eachDate => this.getFormattedCoverageData(eachDate),
      )

      const formattedVaccinationByGenderData = fetchedData.vaccination_by_gender.map(
        eachGender => this.getFormattedGenderData(eachGender),
      )

      const formattedVaccinationByAgeData = fetchedData.vaccination_by_age.map(
        eachAge => this.getFormattedAgeData(eachAge),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        vaccinationCoverageData: formattedVaccinationCoverageData,
        vaccinationByAgeData: formattedVaccinationByAgeData,
        vaccinationByGenderData: formattedVaccinationByGenderData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-msg">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {
      vaccinationCoverageData,
      vaccinationByGenderData,
      vaccinationByAgeData,
    } = this.state
    return (
      <>
        <VaccinationCoverage details={vaccinationCoverageData} />
        <VaccinationByGender details={vaccinationByGenderData} />
        <VaccinationByAge details={vaccinationByAgeData} />
      </>
    )
  }

  renderVaccineData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="page-container">
          <div className="app-name">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="logo-name">Co-Win</h1>
          </div>
          <h1 className="app-heading">CoWin Vaccination in India</h1>
          {this.renderVaccineData()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
