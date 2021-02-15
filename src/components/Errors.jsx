
export const Errors = ({errors}) => {
  return (
    <div className="ui error message">
      <ul className="list">
        {errors.map(error => (
          <li key={Object.values(error)}>{Object.values(error)}</li>
        ))}
      </ul>
    </div>
  )
}

