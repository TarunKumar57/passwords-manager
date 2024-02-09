import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordListItem from '../PasswordListItem'
import './index.css'

const initialBackgroundColors = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    isChecked: false,
    userName: '',
    password: '',
    website: '',
    searchInput: '',
  }

  onAddPassword = event => {
    event.preventDefault()
    const {userName, password, website} = this.state
    const color = `first-letter  ${
      initialBackgroundColors[
        Math.ceil(Math.random() * initialBackgroundColors.length - 1)
      ]
    }`
    const newPassword = {
      id: uuidv4(),
      website,
      userName,
      password,
      backgroundColor: color,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      userName: '',
      password: '',
    }))
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const filteredPasswordList = passwordsList.filter(each => each.id !== id)
    this.setState({
      passwordsList: filteredPasswordList,
    })
  }

  onCheck = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderEmpty = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-passwords-para">No Passwords</p>
    </>
  )

  render() {
    const {
      passwordsList,
      userName,
      password,
      website,
      searchInput,
      isChecked,
    } = this.state
    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="form-img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="mobile-img"
          />
          <form onSubmit={this.onAddPassword}>
            <h1>Add New Password</h1>
            <div className="form-img-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="form-img"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="form-img-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="form-img"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={userName}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="form-img-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="form-img"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="passwords-container">
          <div className="passwords-upper-container">
            <div className="passwords-length">
              <h1>Your passwords</h1>
              <p className="length">{searchResults.length}</p>
            </div>
            <div className="img-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="password-lower-container">
            <div className="checkbox-para-container">
              <input
                type="checkbox"
                className="check-box"
                value={isChecked}
                onChange={this.onCheck}
                id="checkBox"
              />
              <label htmlFor="checkBox" className="show-password-paragraph">
                Show passwords
              </label>
            </div>
            {searchResults.length === 0 ? (
              this.renderEmpty()
            ) : (
              <>
                {searchResults.length !== 0 ? (
                  <ul>
                    {searchResults.map(each => (
                      <PasswordListItem
                        key={each.id}
                        passwordDetails={each}
                        deletePassword={this.deletePassword}
                        isChecked={isChecked}
                      />
                    ))}
                  </ul>
                ) : (
                  this.renderEmpty()
                )}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
