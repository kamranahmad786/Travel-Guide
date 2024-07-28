import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

import LocationContainer from '../LocationContainer'

class Home extends Component {
  state = {
    locationsList: [],
    isloading: false,
  }

  componentDidMount() {
    this.apiUrlPackages()
  }

  apiUrlPackages = async () => {
    this.setState({
      isloading: true,
    })
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(location => ({
        id: location.id,
        name: location.name,
        imageUrl: location.image_url,
        description: location.description,
      }))
      this.setState({
        locationsList: updatedData,
        isloading: false,
      })
    }
  }

  renderLocationsList = () => {
    const {locationsList} = this.state
    return (
      <ul className="locations-list">
        {locationsList.map(location => (
          <LocationContainer locationData={location} key={location.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#52bbf0" height={50} width={50} />
    </div>
  )

  render() {
    const {isloading} = this.state
    return (
      <div className="app-container">
        <h1 className="travel-heading">Travel Guide</h1>
        <hr className="horizontal-line" />
        <div className="locations-container">
          {isloading ? this.renderLoader() : this.renderLocationsList()}
        </div>
      </div>
    )
  }
}

export default Home
