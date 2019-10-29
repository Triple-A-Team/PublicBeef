import React from 'react'

class Home extends React.Component {
  state = {
    newGames: ""
  }

  async componentDidMount() {
  }

  render() {
    return (

      <section className='Home'>

        <section className='trending container'>
          <div className="row">
            <h2>Trending Games</h2>
          </div>
        </section>

        <section className="conventionBanner container">
          <div className="row">
            <img style={{ width: "50%" }} src="https://s3.amazonaws.com/conventionimages.tabletop.events/C4409D10-69D0-11E9-A67D-738802F0A829/1D6BF11A-69D5-11E9-B536-D7D7686004F6/tabletop-events-logo.jpg" alt="orlando games con 2019 banner" />
          </div>
        </section>

        <section className='newest container'>
          <div className="row">
            <h2>New {'&'} Upcoming Games</h2>
          </div>
          {/* {this.renderNewestGames()} */}
        </section>

        <section className='reviewsPost container'>
          <div className="row">
            <div className="col-6">
              <section className='reviews cards'>
              </section>
            </div>
            <div className="col-6">
              <section className='posts cards'>
              </section>
            </div>
          </div>
        </section>


      </section>
    )
  }
}


export default Home