import './index.css'

const PasswordListItem = props => {
  const {passwordDetails, deletePassword, isChecked} = props
  const {id, backgroundColor, website, userName, password} = passwordDetails
  const onDelete = () => {
    deletePassword(id)
  }
  return (
    <li>
      <div className="text-container">
        <div className={backgroundColor}>
          <h1>{userName.charAt(0).toUpperCase()}</h1>
        </div>
        <div className="para-container">
          <p className="website">{website}</p>
          <p className="user-name">{userName}</p>
          {isChecked ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-img"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        data-testid="delete"
        className="delete-btn"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordListItem
