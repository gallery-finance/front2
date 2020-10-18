import React from 'react'
import { Link } from 'react-router-dom'

const validateForm = (errors) => {
  let valid = true
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false))
  return valid
}

export class WorkshopSubmitPage extends React.Component {
  state = {
    artwork: '',
    artist: '',
    background: '',
    errors: {
      figure: '',
      artwork: '',
      artist: '',
    },
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'figure':
        errors.figure = value === '' ? 'You should select figure' : ''
        break
      case 'artwork':
        errors.artwork = value.length < 1 ? 'Artwork name cannot be empty' : ''
        break
      case 'artist':
        errors.artist = value.length < 1 ? 'Artist name cannot be empty' : ''
        break
      default:
        break
    }

    this.setState({ errors, [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm(this.state.errors)) {
      console.info('Valid Form')
    } else {
      console.error('Invalid Form')
    }
  }

  render() {
    return (
      <>
        <div className="center">
          <ul
            className="breadcrumbs hidden-sm"
            itemScope=""
            itemType="https://schema.org/BreadcrumbList"
          >
            <li
              className="breadcrumbs__item"
              itemProp="itemListElement"
              itemScope=""
              itemType="https://schema.org/ListItem"
            >
              <Link to="/" className="breadcrumbs__link" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>

            <li
              className="breadcrumbs__item"
              itemProp="itemListElement"
              itemScope=""
              itemType="https://schema.org/ListItem"
            >
              <Link
                to="/workshop"
                className="breadcrumbs__link"
                itemProp="item"
              >
                <span itemProp="name">Workshops</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>

            <li
              className="breadcrumbs__item"
              itemProp="itemListElement"
              itemScope=""
              itemType="https://schema.org/ListItem"
            >
              <span itemProp="name">Artwork</span>
              <link
                itemProp="item"
                href="http://gf.wndrbase.com/workshop/voter"
              />
              <meta itemProp="position" content="3" />
            </li>
          </ul>
        </div>

        <article className="center">
          <form
            action="/"
            className="submit-artwork"
            onSubmit={this.handleSubmit}
          >
            <h1 className="submit-artwork__title h3">Submit an Artwork</h1>

            <div className="submit-artwork__select submit-artwork__inputbox">
              <label
                for="submit-artwork-select"
                className="submit-artwork__label"
              >
                Select the figure your art is for
              </label>

              <div className="select">
                <select
                  id="submit-artwork-select"
                  required
                  name="figure"
                  onChange={this.handleChange}
                  className={
                    this.state.errors.figure.length > 0 && 'input--error'
                  }
                >
                  <option value="">Select</option>
                  <option value="1">Value 1</option>
                  <option value="2">Value 2</option>
                </select>
              </div>
              {this.state.errors.figure.length > 0 && (
                <div className="submit-artwork__text-error">
                  You should select figure
                </div>
              )}
            </div>

            <div className="submit-artwork__drop submit-artwork__inputbox">
              <input className="submit-artwork__drop-input" type="file" />

              <div className="submit-artwork__drop-content">
                <svg
                  className="submit-artwork__drop-logo"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path d="M9.5 22.2v1.2l.85-.85L14 18.91l10.65 10.64.35.36.35-.36L32 22.91l5.65 5.64.85.86V9.5h-29v12.7zm.15 5.3l-.15.15V38.5h6.9l.15-.15 5.98-5.97.35-.35-.35-.35-8.18-8.18-.35-.35-.35.35-4 4zM21.5 37.65l-.85.85H38.5v-4.84l-.15-.16-6-6-.35-.35-.35.35L21.5 37.65zM8 6.5h32A1.5 1.5 0 0141.5 8v32a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 40V8A1.5 1.5 0 018 6.5zm23 13a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>

                <p className="submit-artwork__drop-text">
                  Drop your image here, or <b>browse</b>
                </p>

                <small className="submit-artwork__drop-format">
                  Supports: JPG, JPEG2000, PNG
                </small>
              </div>
            </div>

            <div className="submit-artwork__row">
              <div className="submit-artwork__row-item submit-artwork__inputbox">
                <input
                  className={`submit-artwork__input input ${
                    this.state.errors.artwork.length > 0 && 'input--error'
                  }`}
                  placeholder="Artwork Name"
                  name="artwork"
                  value={this.state.artwork}
                  onChange={this.handleChange}
                  required
                />

                {this.state.errors.artwork.length > 0 && (
                  <div className="submit-artwork__text-error">
                    Name of the artwork can not be empty
                  </div>
                )}
              </div>

              <div className="submit-artwork__row-item submit-artwork__inputbox">
                <input
                  className={`submit-artwork__input input ${
                    this.state.errors.artist.length > 0 && 'input--error'
                  }`}
                  placeholder="Artist name"
                  name="artist"
                  value={this.state.artist}
                  onChange={this.handleChange}
                  required
                />

                {this.state.errors.artist.length > 0 && (
                  <div className="submit-artwork__text-error">
                    Name of the artist can not be empty
                  </div>
                )}
              </div>
            </div>

            <div className="submit-artwork__textarea submit-artwork__inputbox">
              <label
                for="submit-artwork-textarea"
                className="submit-artwork__label"
              >
                Background
              </label>

              <textarea
                className="submit-artwork__input input"
                id="submit-artwork-textarea"
                placeholder="no more than 200 caharcters"
                value={this.state.background}
                onChange={this.handleChange}
              ></textarea>
            </div>

            <p className="submit-artwork__note">
              You need to stake <b>20 tokens for 7 days</b> to submit your art
              piece. You can submit more than one art piece.
            </p>

            <button className="submit-artwork__btn btn">Confirm</button>
          </form>
        </article>
      </>
    )
  }
}
