import { Oval } from 'react-loader-spinner'

function SpinnerLoading() {
  return (
    <Oval
      height={80}
      width={80}
      color="#3852E7"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#3852E7"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}

export default SpinnerLoading;