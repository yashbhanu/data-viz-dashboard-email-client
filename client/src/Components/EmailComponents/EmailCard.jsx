import { useDispatch, useSelector } from "react-redux";
import { readEmail } from "../../redux/reducer/filterReducer";
import { capitalizeFirstLetter, convertEpochToDateTime } from "../../helper";

const EmailCard = ({ email, setSelectedEmail, selectedEmail, filterBy }) => {
  const { favorites, read } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleCardClick = () => {
    if(selectedEmail?.id && selectedEmail?.id === email.id) {
      setSelectedEmail(null)
    } else {
      !read.includes(email.id) && dispatch(readEmail(email.id))
      setSelectedEmail(email)
    }
  }

  const getBgColor = () => {
    switch (filterBy) {
      case 'read':
        return read.includes(email.id) ? 'bg-readBg' : 'bg-white'
      case 'unread':
        return !read.includes(email.id) ? 'bg-readBg' : 'bg-white'
      default:
        return 'bg-white'
    }
  }

  return (
    <article
      onClick={handleCardClick}
      className={`flex border gap-6 cursor-pointer ${getBgColor()} ${
        selectedEmail?.id !== email.id ? "border-borderColor" : "border-accent"
      } px-6 py-2 w-full rounded-md`}
    >
      <span className="bg-accent h-10 w-10 shrink-0 rounded-full text-center text-white leading-10 text-xl font-semibold">
        {email?.from?.name[0].toUpperCase() || ""}
      </span>

      <div className="flex flex-col justify-between gap-3 text-textColor">
        <div className="flex flex-col gap-1">
          <p>
            From:{" "}
            <strong>{`${capitalizeFirstLetter(email?.from?.name)} <${
              email?.from?.email
            }>`}</strong>
          </p>
          <p>
            Subject: <strong>{email?.subject}</strong>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>
            {selectedEmail?.id
              ? `${email?.short_description.slice(0, 50)}...`
              : email?.short_description}
          </p>
          <div className="flex gap-12">
            <p>{convertEpochToDateTime(email?.date)}</p>
            {favorites.includes(email.id) && (
              <span className="text-accent text-sm font-medium">Favorite</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default EmailCard;
