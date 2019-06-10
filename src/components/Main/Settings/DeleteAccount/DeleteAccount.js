import React, { useState } from "react";

import Loader from "../../Loader/Loader";

import "./DeleteAccount.css";

const DeleteAccount = props => {
  // type "I'm sure" if you're 100% sure
  // props.deletion

  const [confirm, setConfirm] = useState("");
  const [inputError, setInputError] = useState("");

  const formTest = event => {
    event.preventDefault();
    if (confirm === "I'm sure") {
      props.deletion.function();
    } else {
      setInputError("To confirm account deletion type in ' I'm sure '.");
    }
  };

  const confirmDeletionHandler = event => {
    return setConfirm(event.target.value);
  };

  const hideErrorMsg = () => {
    setInputError("");
  };

  let fetchError = props.deletion.error,
    loading = props.deletion.loading;

  let errorwarning =
    fetchError || inputError !== "" ? (
      <p>{inputError === "" ? fetchError : inputError}</p>
    ) : (
      <p />
    );

  return (
    <form onSubmit={event => formTest(event)} className="DeleteAccount__Form">
      <div className="Form__Heading Delete__Account">
        <h2>Are you really sure?</h2>
        <p>
          Deleting account means all your entries will be erased from our
          servers as well. If you're absolutely sure you want to resign from
          using Notnik simply type <span>I'm sure</span> and click the submit
          button.
        </p>
      </div>
      <input
        type="text"
        onChange={confirmDeletionHandler}
        onFocus={hideErrorMsg}
      />
      <input type="submit" />
      <div
        className="Error__Popup"
        style={
          fetchError || inputError !== "" ? { opacity: 1 } : { opacity: 0 }
        }
      >
        {loading ? <Loader auth={true} /> : errorwarning}
      </div>
    </form>
  );
};

export default DeleteAccount;
