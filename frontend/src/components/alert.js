export default function Alert({ text, alertSuccess, alert }) {
  return (
    <div
      className={`fixed z-50 shadow rounded-lg  md:flex justify-between items-center top-0 mt-12 mb-8 py-4 px-4 -translate-y-full scale-0 transition ease-in-out delay-150 ${alert &&
        "translate-y-0 scale-100"} ${(alertSuccess && "bg-green-500") ||
        "bg-red-500"}`}
    >
      <div className="flex">
        <div className="mr-2 mt-0.5 sm:mt-0 text-white">
          {(alertSuccess && <i className="fa-solid fa-circle-check"></i>) || (
            <i className="fa-solid fa-circle-exclamation"></i>
          )}
        </div>
        <p className="mr-2 text-md text-white">{text}</p>
      </div>
    </div>
  );
}
