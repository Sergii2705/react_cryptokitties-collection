import './ErrorMessage.scss';

interface Props {
  error: Error;
}

export const ErrorMessage:React.FC<Props> = ({ error }) => {
  return (
    <div  className="error">
      <span className="error__exclamation">🛈</span>
      Network error:
      <span className='error__description'>{error.toString()}</span>
    </div>
  )
}