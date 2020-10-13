import React from "react";
import PropTypes from "prop-types";

function SelectFileInput({ fileName, handleSelectFile }) {

  return (
    <label className="file-upload-wrapper" htmlFor="input-file">
      <input
        disabled={false}
        id="input-file"
        type="file"
        title=" "
        className="custom-file-upload-hidden"
        accept=".zip"
        // value={value}
        name="input-file"
        onChange={handleSelectFile}
        // className={`${isError ? "error" : ""} form-control`}
        placeholder={"select"}
        // {...rest}
      />
      <input
        className="file-upload-input"
        tabIndex="-1"
        role="button"
        aria-controls="filename"
        value={!fileName ? "" : fileName}
        disabled
      />

      <div
        tabIndex="-1"
        role="button"
        aria-controls="filename"
        className="file-upload-button text-center"
      >
        Upload &nbsp; <i className="fa fa-upload" />
      </div>
    </label>
  );
}

export default SelectFileInput;

SelectFileInput.defaultProps = { fileName: "", handleSelectFile: () => {} };

SelectFileInput.propTypes = {
  fileName: PropTypes.string,
  handleSelectFile: PropTypes.func,
};
