import Video from './Video.js';
import { connect } from 'react-redux';


const mapStateToProps = (state,ownProps) => {
  return {
    videoList: state.videoIds.map((id) => state.videos[id]),
    video: state.videos[ownProps.params.id]

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessage: (text) => dispatch(showFlashMessage(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);