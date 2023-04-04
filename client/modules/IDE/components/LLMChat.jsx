import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class LLMChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { text: 'Hello, what change would you like done to your design?' }
      ]
    };
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      const request = e.target.value;
      this.setState({
        messages: this.state.messages.concat({ text: request })
      });
      e.target.value = '';
      if (this.props.file && this.props.file.content !== undefined) {
        this.processRequest(request, this.props.file.content);
      }
    }
  }

  processRequest(request, code) {
    console.log(request, code);
  }

  render() {
    return (
      <section className="llmchat">
        <header
          className="llmchat__header"
          onContextMenu={this.toggleProjectOptions}
        >
          <h3 className="llmchat__title">
            <span>Design Bot</span>
          </h3>
        </header>
        <div className="llmchat__body">
          <div className="llmchat__messages">
            {this.state.messages.map((message) => (
              <div key={message} className="llmchat__message">
                <div className="llmchat__message__content">
                  <div className="llmchat__message__content__text">
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <input
            className="llmchat__input"
            type="text"
            name="chat"
            onKeyUp={this.onKeyUp}
          />
        </div>
      </section>
    );
  }
}

LLMChat.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })
};

LLMChat.defaultProps = {
  file: null
};

function mapStateToProps(state) {
  return {
    file:
      state.files.find((file) => file.isSelectedFile) ||
      state.files.find((file) => file.name === 'sketch.js')
  };
}

export default connect(mapStateToProps)(LLMChat);
