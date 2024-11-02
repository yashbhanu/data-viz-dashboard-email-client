import React, { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
import Pagination from "./Pagination";
import { ListLoader } from "./EmailListLoader";
import EmailDetails from "./EmailDetails";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../helper";
import { setCurrentFilterBy } from "../../redux/reducer/filterReducer";
import { useNavigate } from "react-router-dom";

const EmailClient = () => {
  const navigate = useNavigate();
  const filters = ["unread", "read", "favorites"];
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setselectedEmail] = useState(null);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setloading] = useState(false);
  const { favorites, currentFilter } = useSelector((state) => state.filters);
  const [filterBy, setfilterBy] = useState(currentFilter || "");
  const dispatch = useDispatch();

  const fetchEmail = async () => {
    try {
      setloading(true);
      const res = await fetch(
        `https://flipkart-email-mock.now.sh?page=${page}`
      );
      const emails = await res.json();
      setEmails(emails?.["list"] || []);
      setTotalCount(emails?.["total"] || 0);
    } catch (error) {
      setloading(false);
      console.error(error?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const fetchFavEmails = async () => {
    try {
      setloading(true);
      const res = await fetch(`https://flipkart-email-mock.now.sh`);
      const emails = await res.json();
      const filterFavs = (emails["list"] || []).filter((email) =>
        favorites.includes(email.id)
      );
      setEmails(filterFavs);
    } catch (error) {
      console.error(error?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const setFilter = async (name) => {
    setfilterBy(name);
    setselectedEmail(null);
    dispatch(setCurrentFilterBy(name));
    if (name === "favorites" && filterBy !== "favorites") {
      await fetchFavEmails();
    } else if (filterBy === "favorites" && name !== "favorites") {
      fetchEmail();
    }
  };

  useEffect(() => {
    if (filterBy === "favorites") {
      fetchFavEmails();
    } else {
      fetchEmail();
    }
  }, [page]);

  return (
    <section className="px-8">
      <div className="flex gap-8 text-black text-lg items-center">
        <p>Filter By:</p>
        <div className="flex gap-8">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${
                filterBy === filter
                  ? "bg-filterBtn border border-borderColor rounded-full"
                  : "border border-transparent"
              } px-4 py-1 text-center`}
              onClick={() => setFilter(filter)}
            >
              {capitalizeFirstLetter(filter)}
            </button>
          ))}
        </div>
      </div>
            <button
        onClick={() => navigate("/")}
        className="px-3 py-1 bg-accent absolute top-4 right-8 font-medium text-base text-white rounded-md"
      >
        Go to Dashboard
      </button>
      {emails.length > 0 && !loading ? (
        <>
          <div className="my-12 flex gap-8">
            <div className={`space-y-4 ${selectedEmail ? "w-2/5" : "w-full"}`}>
              {emails.length > 0 &&
                emails.map((email) => (
                  <EmailCard
                    key={email.id}
                    email={email}
                    setSelectedEmail={setselectedEmail}
                    selectedEmail={selectedEmail}
                    filterBy={filterBy}
                  />
                ))}
            </div>

            {selectedEmail && <EmailDetails selectedEmail={selectedEmail} />}
          </div>

          {filterBy !== "favorites" && (
            <Pagination
              totalCount={totalCount}
              currentPage={page}
              limit={10}
              onPageChange={(val) => setpage(val)}
            />
          )}
        </>
      ) : !emails.length && !loading ? (
        <div className="absolute top-1/2 left-1/2 mt-[-50px] ml-[-100px]">
          <span className="text-2xl font-semibold">No Data Found !!</span>
        </div>
      ) : (
        <ListLoader />
      )}
    </section>
  );
};

export default EmailClient;
