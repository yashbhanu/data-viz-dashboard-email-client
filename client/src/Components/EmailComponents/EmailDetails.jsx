import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/reducer/filterReducer";
import { convertEpochToDateTime } from "../../helper";
import { DetailsLoader } from "./EmailListLoader";

const EmailDetails = ({ selectedEmail }) => {
  const [selectedEmailDetails, setselectedEmailDetails] = useState(null);
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch();
  const {favorites} = useSelector((state) => state.filters);

  const fetchEmailDetails = async () => {
    if (selectedEmail?.id) {
      try {
        setloading(true)
        const res = await fetch(
          `https://flipkart-email-mock.now.sh/?id=${selectedEmail.id}`
        );
        const emailDetails = await res.json();
        setselectedEmailDetails(emailDetails);
        console.log("emailDetails", emailDetails);
      } catch (error) {
        console.error(error?.message || "Something went wrong");
      } finally {
        setloading(false)
      }
    }
  };

  const markAsFav = () => {
    dispatch(addFavorite(selectedEmail.id))
  }

  const unmarkAsFav = () => {
    dispatch(removeFavorite(selectedEmail.id))
  }

  useEffect(() => {
    fetchEmailDetails();
  }, [selectedEmail]);

  return (
    <>
    {selectedEmailDetails && !loading ? (
        <div className="flex w-3/5 rounded-md bg-white border border-borderColor p-6 self-start">
        <span className="bg-accent h-10 w-10 shrink-0 rounded-full text-center text-white leading-10 text-xl font-semibold">
            {selectedEmail?.from?.name[0].toUpperCase() || ""}
        </span>

        <div className="w-full mx-8 space-y-4">
            <div className="flex flex-col gap-3 text-textColor">
            <div className="flex justify-between">
                <span className="text-3xl font-semibold">
                {selectedEmail?.subject}
                </span>
                <button onClick={favorites.includes(selectedEmail.id) ? unmarkAsFav : markAsFav} className="py-1 px-4 text-xs text-center text-white bg-accent rounded-full">
                  {favorites.includes(selectedEmail.id) ? 'Unmark as favorite' : 'Mark as favorite'}
                </button>
            </div>

            <p>{convertEpochToDateTime(selectedEmail?.date)}</p>
            </div>

            <EmailBody body={selectedEmailDetails.body} />
        </div>
        </div>
    ) : (<DetailsLoader />)}
    </>
  );
};

export const EmailBody = ({ body }) => {
  return (
    <div
      className="text-textColor"
      dangerouslySetInnerHTML={{ __html: body }}
    ></div>
  );
};

export default EmailDetails;
