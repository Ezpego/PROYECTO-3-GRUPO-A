const ReactivatePage = (emailValue) => {

    return (
        <div>
            <p>Reactivación cuenta </p>
            <form>
            <label>
          Email:
          <input type="text" value={emailValue} readOnly />
        </label>
            </form>
        </div>
    )

}

export default ReactivatePage;